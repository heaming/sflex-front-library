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
      :nodes="hierarchyedLnbs"
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
      icon="lnb_arrow|0 0 16 16"
      class="kw-lnb-switch"
      :class="{'kw-lnb-switch--active': isExpanded}"
      @click="toggleLnb"
    />
  </q-drawer>
</template>

<script setup>
import { useLnb } from '~lib';

const {
  lnbRef,
  isExpanded,
  expandedKeys,
  selectedGnbKey,
  selectedLnbKey,
  // eslint-disable-next-line no-unused-vars
  selectedLnbKeys,
  hierarchyedLnbs,
  isSelected,
  toggleLnb,
  onUpdateSelected,
  onUpdateExpanded,
} = useLnb();
</script>
