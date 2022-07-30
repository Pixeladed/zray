import React, { useMemo } from 'react';

export type EmojiViewProps = {
  name: string;
  utf8?: string;
  images: readonly ImageSource[];
  mode?: 'native' | 'consistent';
  size?: string;
  noPadding?: boolean;
};

export interface ImageSource {
  size: number;
  url: string;
}

const staticStyle: React.CSSProperties = {
  display: 'inline',
  verticalAlign: 'middle',
};
const paddingStyle: React.CSSProperties = {
  padding: '0 0.125em',
};

export const EmojiView = ({
  name,
  utf8,
  images,
  mode,
  size = '1em',
  noPadding,
}: EmojiViewProps) => {
  const htmlContent = utf8 ? { __html: `&#${utf8};` } : undefined;
  const src = images.length ? images[0].url : undefined;
  const srcSet = useMemo(
    () => images.map(image => `${image.url} ${image.size}w`).join(',\n'),
    [images]
  );
  const style = {
    ...staticStyle,
    ...(noPadding ? undefined : paddingStyle),
  };

  if (mode === 'native') {
    return (
      <span
        aria-label={name}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={htmlContent}
      />
    );
  }

  return (
    <img
      width={size}
      height={size}
      className="emoji_view"
      srcSet={srcSet}
      src={src}
      alt={name}
      style={style}
    />
  );
};
