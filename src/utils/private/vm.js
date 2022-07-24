import { isVNode } from 'vue';

export function getComponentName(vmOrComponents) {
  if (isVNode(vmOrComponents.vnode)) {
    return vmOrComponents.type.name || vmOrComponents.type.__name;
  }
  return vmOrComponents.default.name || vmOrComponents.default.__name;
}
