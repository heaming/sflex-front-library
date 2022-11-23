import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QAvatarProps, QAvatarSlots } from 'quasar';

interface KwAvatarProps extends QAvatarProps {}

interface KwAvatarSlots extends QAvatarSlots {}

export interface KwAvatar extends ComponentPublicInstance<KwAvatarProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwAvatar: GlobalComponentConstructor<KwAvatarProps, KwAvatarSlots>;
  }
}
