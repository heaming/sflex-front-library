import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwObserverProps {}
interface KwObserverSlots {}
interface KwObserver extends ComponentPublicInstance<KwObserverProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwObserver: GlobalComponentConstructor<KwObserverProps, KwObserverSlots>;
  }
}
