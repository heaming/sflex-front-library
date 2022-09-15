import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwSeparatorProps {
  /**
   * separator margins
   * @defaultValue `30px`
   */
  spaced?: boolean | string;

  /**
   * 지정시 수직 스타일 적용
   */
  vertical?: string;

  /**
   * separator 사이즈
   */
  size?: string;

  /**
   * separator 색상
   * @defaultValue `grey-5`
   */
  color?: string;
}
interface KwSeparatorSlots {}
interface KwSeparator extends ComponentPublicInstance<KwSeparatorProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSeparator: GlobalComponentConstructor<KwSeparatorProps, KwSeparatorSlots>;
  }
}
