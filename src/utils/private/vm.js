import { isVNode } from 'vue';
import { PageContextKey } from '../../consts/private/symbols';

export function getComponentName(vmOrComponents) {
  if (isVNode(vmOrComponents.vnode)) {
    return vmOrComponents.type.name || vmOrComponents.type.__name;
  }
  return vmOrComponents.default.name || vmOrComponents.default.__name;
}

export function getVm(vnode) {
  return vnode.ref.i;
}

export function injectPageContext(vnodeOrVm) {
  const vm = isVNode(vnodeOrVm) ? getVm(vnodeOrVm) : vnodeOrVm;
  return vm.provides[PageContextKey] || null;
}
