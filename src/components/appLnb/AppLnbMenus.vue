<template>
  <div class="lnb-menus">
    <div class="lnb-menus__title">
      {{ title }}
    </div>

    <q-tree
      ref="treeRef"
      :key="selectedGnbKey"
      class="lnb-tree"
      :class="{'lnb-tree--empty': lnbNodes.length === 0}"
      :selected="selectedLnbKey"
      :expanded="expandedKeys"
      :nodes="lnbNodes"
      :duration="100"
      node-key="key"
      label-key="label"
      no-selection-unset
      no-connectors
      @update:selected="onUpdateSelected"
    >
      <template #default-header="{node, expanded}">
        <div
          class="lnb-tree__node row items-center full-width"
          :class="getNodeClass(node)"
        >
          <div class="col">
            {{ node.label }}
          </div>
          <q-icon
            v-if="node.children.length"
            :class="{'rotate-180': expanded}"
            name="arrow_down"
          />
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import { isNavigationFailure } from 'vue-router';
import { alert } from '../../plugins/dialog';

const MATCHER_NOT_FOUND = 1;

export default {
  name: 'AppLnbMenus',

  setup() {
    const { getters } = useStore();
    const { push } = useRouter();
    const { t } = useI18n();

    const treeRef = ref();
    const gnbItems = getters['app/getGnbItems'];
    const lnbItems = getters['app/getLnbItems'];
    const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);
    const selectedLnbKey = computed(() => getters['app/getSelectedLnbKey']);

    const expandedKeys = ref([]);
    const selectedKeys = ref([]);

    const title = ref();
    const lnbNodes = ref([]);

    function createHierarchy(lnbs, nodes) {
      return nodes.map((n) => {
        const subs = lnbs.filter((v) => v.parentsKey === n.key);
        const children = createHierarchy(lnbs, subs);
        return { ...n, children };
      });
    }

    function createLnbNodes(gnbKey) {
      const lnbs = cloneDeep(lnbItems.filter((v) => v.gnbKey === gnbKey));
      const roots = lnbs.filter((v) => v.depth === 0);
      return createHierarchy(lnbs, roots);
    }

    function recursiveGetKeys(gnbKey, lnbKey) {
      const matched = lnbKey ? lnbItems.find((v) => v.gnbKey === gnbKey && v.key === lnbKey) : null;
      return matched ? [...recursiveGetKeys(gnbKey, matched.parentsKey), lnbKey] : [];
    }

    watch(selectedGnbKey, (gnbKey) => {
      title.value = gnbItems.find((v) => v.key === gnbKey)?.label;
      lnbNodes.value = createLnbNodes(gnbKey);
      expandedKeys.value = recursiveGetKeys(gnbKey, selectedLnbKey.value);
    }, { immediate: true });

    watch(selectedLnbKey, (lnbKey) => {
      selectedKeys.value = recursiveGetKeys(selectedGnbKey.value, lnbKey);
    }, { immediate: true });

    async function onUpdateSelectedLeaf(lnbKey) {
      try {
        await push({ name: lnbKey });
      } catch (e) {
        if (isNavigationFailure(e, MATCHER_NOT_FOUND)) { await alert(t('MSG_ALT_PAGE_NOT_FOUND')); }
        throw e;
      }
    }

    function onUpdateSelectedGroup(lnbKey) {
      const expanded = expandedKeys.value;
      const index = expanded.findIndex((v) => v === lnbKey);

      if (index > -1) {
        expanded.splice(index, 1);
      } else {
        expanded.push(lnbKey);
      }
    }

    function onUpdateSelected(lnbKey) {
      const node = treeRef.value.getNodeByKey(lnbKey);
      const isLeaf = node.children.length === 0;

      if (isLeaf) {
        onUpdateSelectedLeaf(lnbKey);
      } else {
        onUpdateSelectedGroup(lnbKey);
      }
    }

    const isSelected = (node) => selectedKeys.value.includes(node.key);
    const getNodeClass = (node) => [
      `lnb-tree__node--depth-${node.depth}`,
      isSelected(node) && 'lnb-tree__node--selected',
    ];

    return {
      treeRef,
      title,
      lnbNodes,
      expandedKeys,
      selectedGnbKey,
      selectedLnbKey,
      onUpdateSelected,
      getNodeClass,
    };
  },
};
</script>
