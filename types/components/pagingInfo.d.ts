import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwPagingInfoProps {
  /**
   * 페이지 인덱스
   */
  pageIndex?: number;

  /**
   * 페이지 사이즈
   */
  pageSize?: number;

  /**
   * 페이지 사이즈 옵션 목록
   * @defaultValue `[10, 20, 30, 40, 50]`
   */
  pageSizeOptions?: Array<any>;

  /**
   * 페이지네이션 전체 갯수
   */
  totalCount?: number;

  /**
   * 'v-model:pageIndex'에서 값 변경을 위해 사용
   * @param pageIndex 페이지 인덱스
   */
  'onUpdate:pageIndex'?: (pageIndex: number) => void;

  /**
   * 'v-model:pageSize'에서 값 변경을 위해 사용
   * @param pageSize 페이지 사이즈
   */
  'onUpdate:pageSize'?: (pageSize: number) => void;

  /**
   * 페이지네이션 변경 이벤트
   * @param pageIndex 페이지 인덱스
   * @param pageSize 페이지 사이즈
   */
  onChange?: (pageIndex: number, pageSize: number) => void;
}
interface KwPagingInfoSlots {}

export interface KwPagingInfo extends ComponentPublicInstance<KwPagingInfoProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPagingInfo: GlobalComponentConstructor<KwPagingInfoProps, KwPagingInfoSlots>;
  }
}
