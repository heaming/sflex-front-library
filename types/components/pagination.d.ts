import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwPaginationProps {
  /**
   * 페이지 인덱스
   */
  pageIndex?: number;

  /**
   * 페이지 사이즈
   */
  pageSize?: number;

  /**
   * 페이지네이션 전체 갯수
   */
  totalCount?: number;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

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
interface KwPaginationSlots {}
interface KwPagination extends ComponentPublicInstance<KwPaginationProps> {
  /**
   * 페이지 인덱스를 변경한다
   * @param pageIndex 페이지 인덱스
   */
  set: (pageIndex: number) => void;

  /**
   * 페이지 인덱스 기준으로 오프셋 만큼 이동한다
   * @param offset 오프셋
   */
  setByOffset: (offset: number) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPagination: GlobalComponentConstructor<KwPaginationProps, KwPaginationSlots>;
  }
}
