import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QVirtualScrollProps, QVirtualScrollSlots } from 'quasar';

type FallThroughProps = 'type' | 'items' | 'itemsFn' | 'itemsSize' | 'scrollTarget' | 'virtualScrollHorizontal' | 'onVirtualScroll' | 'virtualScrollSliceSize' | 'virtualScrollSliceRatioBefore' | 'virtualScrollSliceRatioAfter' | 'virtualScrollItemSize' | 'virtualScrollStickySizeStart' | 'virtualScrollStickySizeEnd' | 'tableColspan';

interface KwVirtualScrollProps extends Pick<QVirtualScrollProps, FallThroughProps> {}
interface KwVirtualScrollSlots extends QVirtualScrollSlots {}

export interface KwVirtualScroll extends ComponentPublicInstance<KwVirtualScrollProps> {
  scrollTo: (index: string | number, edge?: 'start' | 'center' | 'end' | 'start-force' | 'center-force' | 'end-force') => void;
  reset: () => void;
  refresh: (index?: string | number) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwVirtualScroll: GlobalComponentConstructor<KwVirtualScrollProps, KwVirtualScrollSlots>;
  }
}
