import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QCarouselProps, QCarouselSlots, QCarouselControlProps, QCarouselControlSlots, QCarouselSlideProps, QCarouselSlideSlots } from 'quasar';

interface KwCarouselProps extends QCarouselProps {}
interface KwCarouselSlots extends QCarouselSlots {}

interface KwCarouselControlProps extends QCarouselControlProps {}
interface KwCarouselControlSlots extends QCarouselControlSlots {}

interface KwCarouselSlideProps extends QCarouselSlideProps {}
interface KwCarouselSlideSlots extends QCarouselSlideSlots {}

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
