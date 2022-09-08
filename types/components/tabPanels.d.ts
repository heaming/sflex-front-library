import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTabPanels
interface KwTabPanelsProps {}
interface KwTabPanelsSlots {}
interface KwTabPanels extends ComponentPublicInstance<KwTabPanelsProps> {}

// KwTabPanel
interface KwTabPanelProps {}
interface KwTabPanelSlots {}
interface KwTabPanel extends ComponentPublicInstance<KwTabPanelProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTabPanels: GlobalComponentConstructor<KwTabPanelsProps, KwTabPanelsSlots>;
    KwTabPanel: GlobalComponentConstructor<KwTabPanelProps, KwTabPanelSlots>;
  }
}
