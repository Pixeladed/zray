import { Resources } from '../../../base/path';
import { Routes } from '../../../routes';
import { NativeIntegration } from '../integration/integration_native_service';
import { GoogleCalendar } from '@highbeam/interface';
import { IntegrationProfile } from '../../../interface/intergration';
import { OAuthView } from '../../views/oauth/oauth_view';
import {
  GoogleCalendarNativeStore,
  GoogleCalendarProfile,
} from './google_calendar_native_store';
import { calendar_v3, google } from 'googleapis';
import { Assert, exists } from '@highbeam/utils';
import { RefreshTokenUtil } from '../../base/refresh_token_util';
import { SearchResult } from '../../../interface/search';

export class GoogleCalendarNativeService implements NativeIntegration {
  id = 'com.highbeam.google_calendar';
  name = 'Google Calendar';
  icon = Resources.GCAL_CON;

  constructor(
    private readonly redirectOrigin: string,
    private readonly gcalClient: GoogleCalendar.GoogleCalendarClient,
    private readonly store: GoogleCalendarNativeStore,
    private readonly refreshUtil: RefreshTokenUtil
  ) {}

  connect = async () => {
    const redirectUrl = this.createRedirectUrl();
    const oAuthUrl = this.gcalClient.url('oauth');
    oAuthUrl.searchParams.set('redirectUrl', redirectUrl);

    let finish: (profile: IntegrationProfile) => void;
    const promise = new Promise<IntegrationProfile>(resolve => {
      finish = resolve;
    });

    const view = new OAuthView({
      url: oAuthUrl.toString(),
      redirectUrl,
      name: this.name,
      onSuccess: async code => {
        const res = await this.gcalClient.call('exchangeCode', { code });
        const profile = this.store.setProfile(res);
        finish({
          ...this.store.asProfileInfo(profile),
          integrationId: this.id,
        });
      },
    });
    view.open();

    return promise;
  };

  listProfiles = async () => {
    return this.store.findProfiles().map(this.store.asProfileInfo);
  };

  removeProfile = async (profileId: string) => {
    this.store.removeProfile(profileId);
  };

  reset = async () => {
    return this.store.reset();
  };

  search = async (query: string, options: { page: number }) => {
    const profiles = this.store.findProfiles();
    const ops = await Promise.allSettled(
      profiles.map(profile => this.searchInProfile(profile, query, options))
    );
    const results = ops
      .flatMap(op => (op.status === 'fulfilled' ? op.value : undefined))
      .filter(exists);
    return results;
  };

  private searchInProfile = async (
    profile: GoogleCalendarProfile,
    query: string,
    options: { page: number }
  ) => {
    const gcal = google.calendar('v3');

    const refreshedProfile = await this.refreshUtil.maybeRefreshAccessToken(
      profile
    );
    const accessToken = refreshedProfile.accessToken;
    const calendarRes = await gcal.calendarList.list();
    const calendars = calendarRes.data.items || [];
    const byCalendarOps = calendars.map(cal =>
      gcal.events.list({
        calendarId: cal.id || 'primary',
        oauth_token: accessToken,
        q: query,
        singleEvents: true,
        orderBy: 'startTime', // ascending
        maxResults: 20, // limit results to make it faster
      })
    );
    const eventRes = await Promise.all(byCalendarOps);
    const events = eventRes.flatMap(res => res.data);

    const results = events.map(event => this.mapEvent(event, profile));

    return results;
  };

  private mapEvent = (
    event: calendar_v3.Schema$Event,
    profile: GoogleCalendarProfile
  ): SearchResult => {
    const title = event.summary || 'Event';
    const startTime = event.start?.dateTime
      ? new Date(event.start.dateTime)
      : undefined;
    const blurb = event.description ? event.description.substring(0, 50) : '';
    const url = Assert.exists(event.htmlLink, 'expected an event url to exist');

    return {
      id: event.id!,
      integrationId: this.id,
      profileId: profile.id,
      title,
      preview: `${startTime?.toLocaleTimeString() || ''} | ${blurb}`,
      url,
    };
  };

  private createRedirectUrl = () => {
    const url = new URL(this.redirectOrigin);
    url.pathname = Routes.googleCalendarCallback().absolute;
    url.search = '';
    url.hash = '';
    return url.toString();
  };
}
