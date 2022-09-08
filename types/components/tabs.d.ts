import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTabs
interface KwTabsProps {}
interface KwTabsSlots {}
interface KwTabs extends ComponentPublicInstance<KwTabsProps> {}

// KwTab
interface KwTabProps {}
interface KwTabSlots {}
interface KwTab extends ComponentPublicInstance<KwTabProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTabs: GlobalComponentConstructor<KwTabsProps, KwTabsSlots>;
    KwTab: GlobalComponentConstructor<KwTabProps, KwTabSlots>;
  }
}
