import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwAvatarProps {
  /*
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string;

  /*
   * The size in CSS units, including unit name, of the content (icon, text)
   */
  fontSize?: string;

  /*
   * Color name for component from the Quasar Color Palette
   */
  color?: string;

  /*
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: string;

  /*
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string;

  /*
   * Removes border-radius so borders are squared
   */
  square?: boolean;

  /*
   * Removes border-radius so borders are squared
   */
  rounded?: boolean;
}

interface KwAvatarSlots {
  default: () => VNode[];
}

export interface KwAvatar extends ComponentPublicInstance<KwAvatarProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwAvatar: GlobalComponentConstructor<KwAvatarProps, KwAvatarSlots>;
  }
}
