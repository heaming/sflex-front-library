import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QBtnProps } from 'quasar';
import { UseBtnStyleProps } from './private/useBtnStyle';

type FallThroughProps = 'label' | 'disable' | 'to' | 'replace' | 'href' | 'target' | 'stack' | 'noWrap' | 'loading';

interface KwBtnProps extends Pick<QBtnProps, FallThroughProps>, UseBtnStyleProps {
  /**
   * 버튼에 표시되는 텍스트
   */
  label?: string | number | undefined;

  /**
   * 아이콘 이름을 지정. label 없이 아이콘만 있다면 너비가 자동 변경되게 해놓음.
   */
  icon?: string | undefined;

  /**
   * 라벨 우측에 표시되는 아이콘.
   */
  iconRight?: string | undefined;

  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean | undefined;

  /**
   * Label or content alignment
   *
   * adjust content area's justify-content rule.
   *
   * @default 'center'
   * @example 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly'
   */
  align?: string | undefined;

  /**
   * Avoid label text wrapping
   * 버튼이 영역 너비를 넘치게 할 수 있습니다.
   *
   * adjust content area's flex-warp to nowrap
   */
  noWrap?: boolean | undefined;
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
