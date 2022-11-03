import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwCarouselProps {}
interface KwCarouselSlots {
  default: () => VNode[];
}

export interface KwCarousel extends ComponentPublicInstance<KwCarouselProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCarousel: GlobalComponentConstructor<KwCarouselProps, KwCarouselSlots>;
  }
}
