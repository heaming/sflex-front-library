import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QListProps, QListSlots } from 'quasar';

type FallThroughProps = 'separator' | 'padding' | 'bordered' | 'dense' | 'dark';

interface KwListProps extends Pick<QListProps, FallThroughProps> {}
interface KwListSlots extends QListSlots {}

export interface KwList extends ComponentPublicInstance<KwListProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwList: GlobalComponentConstructor<KwListProps, KwListSlots>;
  }
}
