<template>
  <kw-page>
    <div class="result-area">
      <kw-action-top>
        <template #left>
          selected: {{ selected }}
        </template>
        <kw-checkbox v-model="sortableYn">
          Sortable
        </kw-checkbox>
        <kw-btn @click="genKey += 1">
          Regenerate
        </kw-btn>
        <kw-btn @click="onClickAdd">
          Add
        </kw-btn>
      </kw-action-top>
      <kw-tree
        :key="genKey"
        v-model:selected="selected"
        v-model:expanded="expanded"
        :nodes="nodes"
        :sortable="sortableYn === 'Y'"
      />
    </div>
  </kw-page>
</template>

<script setup>

const genKey = ref(1);
const sortableYn = ref('Y');
const selected = ref('1');
const expanded = ref([]);
const nodes = reactive([
  {
    key: '1',
    label: '1',
    children: [
      { key: '1-1', label: '1-1', children: [{ key: '1-1-1', label: '1-1-1', children: [] }] },
      { key: '1-2', label: '1-2', children: [] },
      { key: '1-3', label: '1-3', children: [] },
    ],
  },
  {
    key: '2',
    label: '2',
    children: [
      { key: '2-1', label: '2-1', children: [{ key: '2-1-1', label: '2-1-1', children: [] }] },
      { key: '2-2', label: '2-2', children: [] },
      { key: '2-3', label: '2-3', children: [] },
    ],
  },
  {
    key: '3',
    label: '3',
    children: [

    ],
  },
]);

function recursiveGetNode(key, targets) {
  const node = targets.find((e) => key.startsWith(e.key));

  if (node) {
    return node.key === key
      ? node : recursiveGetNode(key, node.children);
  }
}

function onClickAdd() {
  const node = recursiveGetNode(selected.value, nodes);
  console.log(node);

  if (node) {
    const key = `${selected.value}-${node.children.length + 1}`;
    node.children.push({ key, label: key, children: [] });
  }
}

</script>
