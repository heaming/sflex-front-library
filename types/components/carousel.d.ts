import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwCarouselProps {}
interface KwCarouselSlots {
  default: () => VNode[];
  control: () => VNode[];
  navigationIcon: (scope: { index: number; maxIndex: number; name: any; active: boolean; btnProps: object; onClick: (evt: Event) => void }) => VNode[];
}

interface KwCarouselControlProps {}
interface KwCarouselControlSlots {
  default: () => VNode[];
}

interface KwCarouselSlideProps {}
interface KwCarouselSlideSlots {
  default: () => VNode[];
}

export interface KwCarousel extends ComponentPublicInstance<KwCarouselProps> {}
export interface KwCarouselControl extends ComponentPublicInstance<KwCarouselControlProps> {}
export interface KwCarouselSlide extends ComponentPublicInstance<KwCarouselSlideProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCarousel: GlobalComponentConstructor<KwCarouselProps, KwCarouselSlots>;
    KwCarouselControl: GlobalComponentConstructor<KwCarouselControlProps, KwCarouselControlSlots>;
    KwCarouselSlide: GlobalComponentConstructor<KwCarouselSlideProps, KwCarouselSlideSlots>;
  }
}
