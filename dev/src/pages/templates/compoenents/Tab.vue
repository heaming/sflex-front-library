<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      tab
    </h2>
    <p class="kw-guide-description">
      tab
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="tabsBindingProps"
        :props="tabsProps"
        title="tabsProps"
      />
      <guide-props
        v-model="tabBindingProps"
        :props="tabProps"
        title="tabProps"
      />
      <guide-props
        v-model="tabPanelsBindingProps"
        :props="tabPanelsProps"
        title="tabPanelsProps"
      />
      <guide-props
        v-model="tabPanelBindingProps"
        :props="tabPanelProps"
        title="tabPanelProps"
      />

      <kw-separator />
      <kw-tabs
        v-model="currentTab"
        v-bind="tabsBindingProps"
      >
        <kw-tab
          v-for="name in tabNames"
          :key="`tab-${name}`"
          :name="name"
          v-bind="tabBindingProps"
        />
      </kw-tabs>
      <kw-tab-panels
        v-model="currentTab"
        v-bind="tabPanelsBindingProps"
      >
        <kw-tab-panel
          v-for="name in tabNames"
          :key="`tab-panel-${name}`"
          :name="name"
          v-bind="tabPanelBindingProps"
        >
          <div>
            {{ `kw-tab-panel-content` }}
          </div>
          <div>
            <span>{{ `name: ${name}` }}</span>
          </div>
        </kw-tab-panel>
      </kw-tab-panels>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div>todo</div>
    </guide-section>
  </kw-page>
</template>

<script setup>
import {
  usePanelChildProps,
  usePanelProps,
} from '../../../../../src/components/tabPanels/private/usePanel';

const tabsProps = {
  align: {
    type: String,
    default: 'left',
  },
  dense: {
    type: Boolean,
    default: undefined,
  },
};
const tabProps = {
  label: {
    type: String,
    default: undefined,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: [Number, String],
    default: undefined,
  },
};
const tabPanelsProps = {
  ...usePanelProps,
};
const tabPanelProps = {
  ...usePanelChildProps,
};

const tabsBindingProps = ref(null);
const tabBindingProps = ref(null);
const tabPanelsBindingProps = ref(null);
const tabPanelBindingProps = ref(null);

const currentTab = ref(1);
const tabNames = [1, 2, 3];

const defaultCode = `
      <kw-tab
        v-bind="bindingProps"
      />`;

</script>
