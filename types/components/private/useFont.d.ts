type fontType = 'title' | 'subtitle' | 'body' | 'dense' | 'caption';

export interface UseFontProps {
  /**
   * Set component font style.
   *
   * @see $title, $subtitle, $body, $dense, $caption in variable.scss
   */
  font?: fontType | undefined;

  /**
   * Set component lineHeight.
   */
  lineHeight?: string | undefined;

  /**
   * Set component lineHeight.
   */
  fontSize?: string | undefined;

  /**
   * Set component lineHeight.
   */
  fontWeight?: string | undefined;

  /**
   * Set component lineHeight.
   */
  letterSpacing?: string | undefined;
}
