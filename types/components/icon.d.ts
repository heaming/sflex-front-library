import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwIconProps {
  /*
   * 표시할 라벨
   */
  label?: string;

  /*
   * 아이콘
   */
  name?: string;

  /*
   * 아이콘 사이즈
   */
  size?: string;

  /*
   * 라벨 보더 및 텍스트 컬러
   */
  color?: string;

  /*
   * 클릭 가능한 스타일 적용
   */
  clickable?: boolean;

  /*
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /*
   * 클릭 가능한 스타일 적용
   */
  clickable?: boolean;

  /**
   * 클릭 이벤트
   * @param evt JS event object
   */
  onClick?: (evt: Event) => void;
}
interface KwIconSlots {}
export interface KwIcon extends ComponentPublicInstance<KwIconProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwIcon: GlobalComponentConstructor<KwIconProps, KwIconSlots>;
  }
}
