import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwGrid
interface KwGridProps {}
interface KwGridSlots {}
interface KwGrid extends ComponentPublicInstance<KwGridProps> {}

// KwTreeGrid
interface KwTreeGridProps {}
interface KwTreeGridSlots {}
interface KwTreeGrid extends ComponentPublicInstance<KwTreeGridProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwGrid: GlobalComponentConstructor<KwGridProps, KwGridSlots>;
    KwTreeGrid: GlobalComponentConstructor<KwTreeGridProps, KwTreeGridSlots>;
  }
}
