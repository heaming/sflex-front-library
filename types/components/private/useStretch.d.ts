export interface UseStretchProps {
  /**
   * When used on flexbox parent, will stretch to parent's height
   * if, it used in radio, checkbox, toggle, it just set margin auto
   */
  stretch?: boolean;

  /**
   * When used on flexbox parent, it will not be affected by flex system.
   */
  notFlexible?: boolean;

  /**
   * When used on flexbox parent, will stretch to parent's width
   * if, it used in radio, checkbox, toggle, it just set margin auto
   */
  grow?: boolean;

  /**
   * When used on flexbox parent and this component not shrink,
   * With this, it Will Shrink.
   */
  shrink?: boolean;
}
