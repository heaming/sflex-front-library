import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwPaginationProps {}
interface KwPaginationSlots {}
interface KwPagination extends ComponentPublicInstance<KwPaginationProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPagination: GlobalComponentConstructor<KwPaginationProps, KwPaginationSlots>;
  }
}
