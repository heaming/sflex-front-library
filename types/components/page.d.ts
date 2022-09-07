import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwPageProps {}
interface KwPageSlots {}
interface KwPage extends ComponentPublicInstance<KwPageProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPage: GlobalComponentConstructor<KwPageProps, KwPageSlots>;
  }
}
