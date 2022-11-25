import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QItemLabelProps, QItemLabelSlots, QItemProps, QItemSectionProps, QItemSectionSlots, QItemSlots } from 'quasar';

type FallThroughItemProps = 'tag' | 'active' | 'clickable' | 'dense' | 'insetLevel' | 'tabindex' | 'focused' | 'manualFocus' | 'dark' | 'to' | 'replace' | 'exact' | 'href' | 'target' | 'activeClass' | 'exactActiveClass' | 'disable' | 'onClick';

interface KwItemProps extends Pick<QItemProps, FallThroughItemProps> {}
interface KwItemSlots extends QItemSlots {}

type FallThroughLabelProps = 'lines' | 'overline' | 'caption' | 'header';

interface KwItemLabelProps extends Pick<QItemLabelProps, FallThroughLabelProps> {}
interface KwItemLabelSlots extends QItemLabelSlots {}

type FallThroughSectionProps = 'avatar' | 'thumbnail' | 'side' | 'top' | 'noWrap';

interface KwItemSectionProps extends Pick<QItemSectionProps, FallThroughSectionProps> {}
interface KwItemSectionSlots extends QItemSectionSlots {}

export interface KwItem extends ComponentPublicInstance<KwItemProps> {}
export interface KwItemLabel extends ComponentPublicInstance<KwItemLabelProps> {}
export interface KwItemSection extends ComponentPublicInstance<KwItemSectionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwItem: GlobalComponentConstructor<KwItemProps, KwItemSlots>;
    KwItemLabel: GlobalComponentConstructor<KwItemLabelProps, KwItemLabelSlots>;
    KwItemSection: GlobalComponentConstructor<KwItemSectionProps, KwItemSectionSlots>;
  }
}
