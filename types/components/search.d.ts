import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwSearch
interface KwSearchProps {}
interface KwSearchSlots {}
interface KwSearch extends ComponentPublicInstance<KwSearchProps> {}

// KwSearchRow
interface KwSearchRowProps {}
interface KwSearchRowSlots {}
interface KwSearchRow extends ComponentPublicInstance<KwSearchRowProps> {}

// KwSearchItem
interface KwSearchItemProps {}
interface KwSearchItemSlots {}
interface KwSearchItem extends ComponentPublicInstance<KwSearchItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSearch: GlobalComponentConstructor<KwSearchProps, KwSearchSlots>;
    KwSearchRow: GlobalComponentConstructor<KwSearchRowProps, KwSearchRowSlots>;
    KwSearchItem: GlobalComponentConstructor<KwSearchItemProps, KwSearchItemSlots>;
  }
}
