import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QAvatarProps, QAvatarSlots } from 'quasar';

type FallThroughProps = 'size' | 'fontSize' | 'color' | 'textColor' | 'icon' | 'square' | 'rounded';

interface KwAvatarProps extends Pick<QAvatarProps, FallThroughProps> {}

interface KwAvatarSlots extends QAvatarSlots {}

export interface KwAvatar extends ComponentPublicInstance<KwAvatarProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwAvatar: GlobalComponentConstructor<KwAvatarProps, KwAvatarSlots>;
  }
}
