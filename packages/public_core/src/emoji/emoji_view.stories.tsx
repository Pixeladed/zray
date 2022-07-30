import React from 'react';
import { EmojiView, ImageSource } from './emoji_view';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export const BasicUsage: ComponentStory<typeof EmojiView> = args => (
  <div>
    <fieldset>
      <legend>Standalone</legend>
      <EmojiView {...args} />
    </fieldset>
    <fieldset>
      <legend>Embedded</legend>
      <div>
        <EmojiView {...args} />
        <EmojiView {...args} />
        <EmojiView {...args} />
      </div>
      <h1>
        This is an example title
        <EmojiView {...args} />
      </h1>
      <p>
        A example paragraph where the emoji <EmojiView {...args} /> is in the
        middle of the sentence
      </p>
      <ol>
        <li>
          as
          <EmojiView {...args} />
          child of a list item
        </li>
        <li>
          <small>
            <EmojiView {...args} />
            as child of a small
          </small>
        </li>
      </ol>
      <button>
        <EmojiView {...args} />
      </button>
      <button>
        <EmojiView {...args} /> Part of a button
      </button>
    </fieldset>
  </div>
);

const images: ImageSource[] = [
  { size: 16, url: 'https://via.placeholder.com/16' },
  { size: 32, url: 'https://via.placeholder.com/32' },
  { size: 64, url: 'https://via.placeholder.com/64' },
  { size: 128, url: 'https://via.placeholder.com/128' },
];
const utf8 = [undefined, '128512', '128513'];

export default {
  component: EmojiView,
  argTypes: {
    utf8: {
      defaultValue: utf8[1],
      options: utf8,
      control: { type: 'select' },
    },
    name: {
      defaultValue: 'laugh',
    },
    images: {
      defaultValue: images,
    },
  },
} as ComponentMeta<typeof EmojiView>;
