import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwChipProps {
  /*
   * 표시할 라벨
   */
  label?: string;

  /*
   * 라벨 좌측 아이콘
   */
  icon?: string;

  /*
   * 라벨 우측 아이콘
   */
  iconRight?: string;

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
interface KwChipSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwChip extends ComponentPublicInstance<KwChipProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwChip: GlobalComponentConstructor<KwChipProps, KwChipSlots>;
  }
}
