export interface UseStretchProps {
  /**
   * When used on flexbox parent, will stretch to parent's height
   * if, it used in radio, checkbox, toggle, it just set margin auto
   */
  stretch?: boolean;

  /**
   * When used on flexbox parent, and there is not enough area, if overflow on, it will overflow the parent box.
   */
  overflow?: boolean;

  /**
   * When used on flexbox parent, will stretch to parent's width
   * if, it used in radio, checkbox, toggle, it just set margin auto
   */
  grow?: boolean;
}
