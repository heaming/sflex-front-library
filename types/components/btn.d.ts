import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseBtnStyleProps } from './private/useBtnStyle';

interface KwBtnProps extends UseBtnStyleProps {
  /**
   * 1) Define the button native type attribute (submit, reset, button) or 2) render component with &lt;a&gt; tag so you can access events even if disable or 3) Use 'href' prop and specify 'type' as a media tag.
   * @default 'button'
   * @example 'a' | 'submit' | 'reset' | 'image/png href="https://quasar.dev" target="_blank"'
   */
  type?: string;

  /**
   * 버튼에 표시되는 텍스트
   */
  label?: string | number;

  /**
   * 아이콘 이름을 지정. label 없이 아이콘만 있다면 너비가 자동 변경되게 해놓음.
   */
  icon?: string;

  /**
   * 라벨 우측에 표시되는 아이콘.
   */
  iconRight?: string;

  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   * @example '/home/dashboard' | { name: 'my-route-name' }
   */
  to?: string | object;

  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean;

  /**
   * Native &lt;a&gt; link href attribute; Has priority over the 'to' and 'replace' props
   * @example 'https://quasar.dev' | { name: 'my-route-name' }
   */
  href?: string;

  /**
   * Native &lt;a&gt; link target attribute; Use it only with 'to' or 'href' props
   * @example '\_blank' | '\_self' | '\_parent' | '\_top'
   */
  target?: string;

  /**
   * Label or content alignment
   *
   * adjust content area's justify-content rule.
   *
   * @default 'center'
   * @example 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly'
   */
  align?: string;

  /**
   * Stack icon and label vertically instead of on same line (like it is by default)
   *
   * adjust content area's flex-direction to column
   */
  stack?: boolean;

  /**
   * Avoid label text wrapping
   * 버튼이 영역 너비를 넘치게 할 수 있습니다.
   *
   * adjust content area's flex-warp to nowrap
   */
  noWrap?: boolean;
}
interface KwBtnSlots {
  /**
   * 기본 컨텐츠 영역, 라벨을 대체한다.
   */
  default: () => VNode[];
}
export interface KwBtn extends ComponentPublicInstance<KwBtnProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwBtn: GlobalComponentConstructor<KwBtnProps, KwBtnSlots>;
  }
}
