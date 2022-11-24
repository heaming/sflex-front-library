<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      List & Item
    </h2>
    <p class="kw-guide-description">
      리스트
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        title="listProps"
        :props="expansionItemProps"
      />
      <kw-separator />

      <kw-list
        ref="list"
      >
        <kw-expansion-item
          v-bind="bindingProps"
        >
          <template #header>
            header
          </template>
          <template #default>
            default
          </template>
        </kw-expansion-item>
        <kw-expansion-item
          v-bind="bindingProps"
        >
          <template #header>
            header
          </template>
          <template #default>
            default
          </template>
        </kw-expansion-item>
      </kw-list>
    </guide-section>
  </kw-page>
</template>

<script setup>
const list = ref();
const bindingProps = ref(null);

const expansionItemProps = { toggleAriaLabel: { type: String, default: undefined },
  icon: { type: String, default: undefined },
  label: { type: String, default: undefined },
  labelLines: { type: [Number, String], default: undefined },
  caption: { type: String, default: undefined },
  captionLines: { type: [Number, String], default: undefined },
  dense: { type: Boolean, default: undefined },
  expandIcon: { type: String, default: undefined },
  expandedIcon: { type: String, default: undefined },
  expandIconClass: { type: [Array, String, Object], default: undefined },
  duration: { type: Number, default: undefined },
  headerInsetLevel: { type: Number, default: undefined },
  contentInsetLevel: { type: Number, default: undefined },
  expandSeparator: { type: Boolean, default: undefined },
  defaultOpened: { type: Boolean, default: undefined },
  expandIconToggle: { type: Boolean, default: undefined },
  switchToggleSide: { type: Boolean, default: undefined },
  denseToggle: { type: Boolean, default: undefined },
  group: { type: String, default: undefined },
  popup: { type: Boolean, default: undefined },
  headerStyle: { type: [Array, String, Object], default: undefined },
  headerClass: { type: [Array, String, Object], default: undefined },
  dark: { type: String, default: undefined },
  to: { type: String, default: undefined },
  replace: { type: Boolean, default: undefined },
  exact: { type: Boolean, default: undefined },
  href: { type: String, default: undefined },
  target: { type: String, default: undefined },
  activeClass: { type: String, default: 'q-router-link--active' },
  exactActiveClass: { type: String, default: 'q-router-link--exact-active' },
  disable: { type: Boolean, default: undefined },
  modelValue: { type: Boolean, default: null } };
</script>

<style scoped lang="scss">
.kw-list {
  position: relative;
}

.kw-list::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #2f8af3;
}
</style>
