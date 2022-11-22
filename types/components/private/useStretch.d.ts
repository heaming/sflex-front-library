export interface UseStretchProps {
  /**
   * When used on flexbox parent, will stretch to parent's height
   */
  stretch?: boolean;

  /**
   * When used on flexbox parent, and there is not enough area, if overflow on, it will overflow the parent box.
   */
  overflow?: boolean;

  /**
   * When used on flexbox parent, will stretch to parent's width
   */
  grow?: boolean;
}
