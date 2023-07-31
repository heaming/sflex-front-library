import { isVNode } from 'vue';
import { PageContextKey } from '../../consts/private/symbols';

export function getComponentName(vmOrComponents) {
  if (isVNode(vmOrComponents.vnode)) {
    return vmOrComponents.type.name || vmOrComponents.type.__name;
  }
  return vmOrComponents.default.name || vmOrComponents.default.__name;
}

export function getVm(vnode) {
  return vnode.ref?.i || vnode.ctx;
}

export function injectPageContext(vnodeOrVm) {
  const vm = isVNode(vnodeOrVm) ? getVm(vnodeOrVm) : vnodeOrVm;
  return vm.provides[PageContextKey] || null;
}

function fillNormalizedVNodes(children, vnode) {
  if (typeof vnode.type === 'symbol') {
    if (Array.isArray(vnode.children) === true) {
      vnode.children.forEach((child) => {
        fillNormalizedVNodes(children, child);
      });
    }
  } else {
    children.add(vnode);
  }
}

// vnodes from rendered in advanced slots
export function getNormalizedVNodes(vnodes) {
  const children = new Set();

  vnodes.forEach((vnode) => {
    fillNormalizedVNodes(children, vnode);
  });

  return Array.from(children);
}
