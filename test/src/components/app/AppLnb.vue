<template>
  <q-drawer
    class="kw-lnb"
    :model-value="isExpanded"
    :width="280"
    show-if-above
    bordered
  >
    <q-tree
      ref="lnbRef"
      :key="selectedGnbKey"
      class="kw-lnb-tree"
      :selected="selectedLnbKey"
      :expanded="expandedKeys"
      :nodes="hierarchyedLnbItems"
      :duration="100"
      node-key="key"
      label-key="label"
      no-selection-unset
      no-nodes-label=" "
      @update:selected="onUpdateSelected"
      @update:expanded="onUpdateExpanded"
    >
      <template #default-header="{node}">
        <div :class="{'kw-lnb--selected': isSelected(node.key)}">
          {{ node.label }}
        </div>
      </template>
    </q-tree>

    <kw-btn
      icon="lnb_arrow"
      class="kw-lnb__switch"
      :class="{'kw-lnb__switch--active': isExpanded}"
      @click="toggleLnb"
    />
  </q-drawer>
</template>

<script setup>
import { useLnb } from '~kw-lib';

const {
  lnbRef,
  isExpanded,
  expandedKeys,
  selectedGnbKey,
  selectedLnbKey,
  hierarchyedLnbItems,
  isSelected,
  toggleLnb,
  onUpdateSelected,
  onUpdateExpanded,
} = useLnb();
</script>
