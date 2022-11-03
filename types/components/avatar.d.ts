import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwAvatarProps {}
interface KwAvatarSlots {
  default: () => VNode[];
}

export interface KwAvatar extends ComponentPublicInstance<KwAvatarProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwAvatar: GlobalComponentConstructor<KwAvatarProps, KwAvatarSlots>;
  }
}
