import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwSuspense
interface KwSuspenseProps {
  /**
   * 스피너 호출 여부
   * @defaultValue `true`
   */
  spinner?: boolean;

  /**
   * 해결 이벤트
   */
  onResolve?: () => void;

  /**
   * 에러 이벤트
   */
  onError?: (e: Error) => void;
}
interface KwSuspenseSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];

  /**
   *  서스팬스 대체 컨텐츠 영역
   */
  fallback: () => VNode[];

  /**
   * 에러 컨텐츠 영역
   */
  error: () => VNode[];
}
interface KwSuspense extends ComponentPublicInstance<KwSuspenseProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSuspense: GlobalComponentConstructor<KwSuspenseProps, KwSuspenseSlots>;
  }
}
