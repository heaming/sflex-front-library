import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QCarouselProps, QCarouselSlots, QCarouselControlProps, QCarouselControlSlots, QCarouselSlideProps, QCarouselSlideSlots } from 'quasar';

type FallThroughCarouselProps = 'fullscreen' | 'noRouteFullscreenExit' | 'keepAlive' | 'keepAliveInclude' | 'keepAliveExclude' | 'keepAliveMax' | 'animated' | 'infinite' | 'swipeable' | 'vertical' | 'autoplay' | 'padding' | 'arrows' | 'prevIcon' | 'nextIcon' | 'navigation' | 'navigationPosition' | 'navigationIcon' | 'navigationActiveIcon' | 'thumbnails' | 'modelValue' | 'dark' | 'height' | 'controlColor' | 'controlTextColor' | 'controlType' | 'transitionPrev' | 'transitionNext' | 'transitionDuration' | 'onUpdate:modelValue' | 'onBeforeTransition' | 'onTransition';

type FallThroughCarouselControlProps = 'position' | 'offset';

type FallThroughCarouselSlideProps = 'name' | 'imgSrc' | 'disable';

interface KwCarouselProps extends Pick<QCarouselProps, FallThroughCarouselProps> {}
interface KwCarouselSlots extends QCarouselSlots {}

interface KwCarouselControlProps extends Pick<QCarouselControlProps, FallThroughCarouselControlProps> {}
interface KwCarouselControlSlots extends QCarouselControlSlots {}

interface KwCarouselSlideProps extends Pick<QCarouselSlideProps, FallThroughCarouselSlideProps> {}
interface KwCarouselSlideSlots extends QCarouselSlideSlots {}

export interface KwCarousel extends ComponentPublicInstance<KwCarouselProps> {
  /**
   * Toggle the view to be fullscreen or not fullscreen
   */
  toggleFullscreen: () => void;
  /**
   * Enter the fullscreen view
   */
  setFullscreen: () => void;
  /**
   * Leave the fullscreen view
   */
  exitFullscreen: () => void;
  /**
   * Go to next panel
   */
  next: () => void;
  /**
   * Go to previous panel
   */
  previous: () => void;
  /**
   * Go to specific panel
   * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
   */
  goTo: (panelName: string | number) => void;
}
export interface KwCarouselControl extends ComponentPublicInstance<KwCarouselControlProps> {}
export interface KwCarouselSlide extends ComponentPublicInstance<KwCarouselSlideProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCarousel: GlobalComponentConstructor<KwCarouselProps, KwCarouselSlots>;
    KwCarouselControl: GlobalComponentConstructor<KwCarouselControlProps, KwCarouselControlSlots>;
    KwCarouselSlide: GlobalComponentConstructor<KwCarouselSlideProps, KwCarouselSlideSlots>;
  }
}
