<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      tree
    </h2>
    <p class="kw-guide-description">
      tree
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="treeProps"
        title="treeProps"
      />
      <kw-separator />
      <kw-tree
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-tree
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
const treeProps = {
  // fall through props
  expanded: { type: Array, default: undefined },
  selected: { type: String, default: undefined },
  nodes: { type: Array, default: () => [] },
  nodeKey: { type: String, default: 'key' },
  labelKey: { type: String, default: 'label' },
  childrenKey: { type: String, default: 'children' },
  noNodesLabel: { type: String, default: undefined },
  noResultsLabel: { type: String, default: undefined },
  noSelectionUnset: { type: Boolean, default: true },
  defaultExpandAll: { type: Boolean, default: false },
  accordion: { type: Boolean, default: false },
  duration: { type: Number, default: 100 },
  noTransition: { type: Boolean, default: false },
  noConnectors: { type: Boolean, default: false },
  selectedColor: { type: String, default: 'primary' },
  filter: { type: String, default: undefined },
  filterMethod: { type: Function, default: undefined },

  // customize props
  selectLeafOnly: { type: Boolean, default: false },
};

const bindingProps = ref({
  nodes: [{ key: '/Templates/Grid', label: 'Grid', gnbKey: 'Templates', depth: 0, parentsKey: '/Templates', children: [{ key: '/Templates/Grid/Button', label: 'Button', gnbKey: 'Templates', depth: 1, parentsKey: '/Templates/Grid', children: [{ gnbKey: 'Templates', key: '/Templates/Grid/Button/ActionButton', label: 'ActionButton', depth: 2, parentsKey: '/Templates/Grid/Button', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Button/Button', label: 'Button', depth: 2, parentsKey: '/Templates/Grid/Button', children: [] }] }, { key: '/Templates/Grid/Editor', label: 'Editor', gnbKey: 'Templates', depth: 1, parentsKey: '/Templates/Grid', children: [{ gnbKey: 'Templates', key: '/Templates/Grid/Editor/Checkbox', label: 'Checkbox', depth: 2, parentsKey: '/Templates/Grid/Editor', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Editor/Date', label: 'Date', depth: 2, parentsKey: '/Templates/Grid/Editor', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Editor/List', label: 'List', depth: 2, parentsKey: '/Templates/Grid/Editor', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Editor/Number', label: 'Number', depth: 2, parentsKey: '/Templates/Grid/Editor', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Editor/Text', label: 'Text', depth: 2, parentsKey: '/Templates/Grid/Editor', children: [] }] }, { gnbKey: 'Templates', key: '/Templates/Grid/ColumnLayout', label: 'ColumnLayout', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/DynamicButton', label: 'DynamicButton', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/DynamicEditable', label: 'DynamicEditable', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Filtering', label: 'Filtering', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Grouping', label: 'Grouping', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/StyleCallback', label: 'StyleCallback', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/TreeGrid', label: 'TreeGrid', depth: 1, parentsKey: '/Templates/Grid', children: [] }, { gnbKey: 'Templates', key: '/Templates/Grid/Validation', label: 'Validation', depth: 1, parentsKey: '/Templates/Grid', children: [] }] }, { key: '/Templates/Compoenents', label: 'Compoenents', gnbKey: 'Templates', depth: 0, parentsKey: '/Templates', children: [{ gnbKey: 'Templates', key: '/Templates/Compoenents/Avatar', label: 'Avatar', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Btn', label: 'Btn', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/BtnDropdown', label: 'BtnDropdown', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/BtnToggle', label: 'BtnToggle', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Card', label: 'Card', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Carousel', label: 'Carousel', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Chart', label: 'Chart', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Checkbox', label: 'Checkbox', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Chip', label: 'Chip', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/DatePicker', label: 'DatePicker', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Editor', label: 'Editor', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/File', label: 'File', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Form', label: 'Form', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Icon', label: 'Icon', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Input', label: 'Input', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/List', label: 'List', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/OptionGroup', label: 'OptionGroup', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Pagination', label: 'Pagination', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Radio', label: 'Radio', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/ScrollArea', label: 'ScrollArea', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Slider', label: 'Slider', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Stepper', label: 'Stepper', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Tab', label: 'Tab', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/TimePicker', label: 'TimePicker', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Toggle', label: 'Toggle', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Tooltip', label: 'Tooltip', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }, { gnbKey: 'Templates', key: '/Templates/Compoenents/Tree', label: 'Tree', depth: 1, parentsKey: '/Templates/Compoenents', children: [] }] }],
});

const defaultCode = `
      <kw-tree
        v-bind="bindingProps"
      />`;
</script>
