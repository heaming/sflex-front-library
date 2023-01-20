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
      <div>q-tabs</div>
      <div class="warping-box">
        <q-tabs
          v-model="currentTab"
          v-bind="tabsBindingProps"
        >
          <q-tab
            v-for="name in tabNames"
            :key="`q-tab-${name}`"
            :name="name"
            :label="'long long long long long long long long long long long long long long'"
          />
        </q-tabs>
      </div>
      <div>q-tabs short</div>
      <div class="warping-box">
        <q-tabs
          v-model="currentTab"
          v-bind="tabsBindingProps"
        >
          <q-tab
            v-for="name in tabNames"
            :key="`q-tab-${name}`"
            :name="name"
            :label="'short'"
          />
        </q-tabs>
      </div>
      <div>kw-tabs</div>
      <div class="warping-box">
        <kw-tabs
          v-model="currentTab"
          v-bind="tabsBindingProps"
        >
          <kw-tab
            v-for="name in tabNames"
            :key="`tab-${name}`"
            :name="name"
            :label="'long long long long long long long long long long long long long long'"
            v-bind="tabBindingProps"
          />
        </kw-tabs>
      </div>
      <div>kw-tabs short</div>
      <div class="warping-box">
        <kw-tabs
          v-bind="tabsBindingProps"
          v-model="currentTab"
        >
          <kw-tab
            v-for="name in tabNames"
            :key="`tab-${name}`"
            :name="name"
            :label="'short'"
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
      </div>
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

const tabsProps = {
  color: { type: String, default: undefined },
  bgColor: { type: String, default: undefined },
  borderColor: { type: String, default: undefined },
  activeBorderColor: { type: String, default: undefined },
  activeLine: { type: String, default: 'bottom' },
  align: { type: String, default: 'left' },
  indicator: { type: Boolean, default: undefined },
  noPadding: { type: Boolean, default: undefined },
  dense: { type: Boolean, default: undefined },
  vertical: { type: Boolean, default: undefined },
  activeClass: { type: String, default: undefined },
  activeColor: { type: String, default: undefined },
  activeBgColor: { type: String, default: undefined },
  indicatorColor: { type: String, default: undefined },
  leftIcon: { type: String, default: 'arrow_left' },
  rightIcon: { type: String, default: 'arrow_right' },
  outsideArrows: { type: Boolean, default: true },
  mobileArrows: { type: Boolean, default: undefined },
  switchIndicator: { type: Boolean, default: undefined },
  narrowIndicator: { type: Boolean, default: false },
  inlineLabel: { type: Boolean, default: undefined },
  noCaps: { type: Boolean, default: true },
  contentClass: { type: String, default: undefined },
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
  vertical: {
    type: Boolean,
    default: false,
  },
  animated: {
    type: Boolean,
    default: false,
  },
  infinite: {
    type: Boolean,
    default: false,
  },
  swipeable: {
    type: Boolean,
    default: false,
  },
};
const tabPanelProps = {
  name: {
    type: [Number, String],
    default: undefined,
  },
  disable: {
    type: Boolean,
    default: false,
  },
};

const tabsBindingProps = ref(null);
const tabBindingProps = ref(null);
const tabPanelsBindingProps = ref(null);
const tabPanelBindingProps = ref(null);

const currentTab = ref(1);
const tabNames = ['1', '2', '3'];

const defaultCode = `
      <kw-tab
        v-bind="bindingProps"
      />`;

</script>
<style scoped lang="scss">
.warping-box {
  background-color: $lime-2;
  display: flex;
  width: 1000px;
  height: 200px;

  > .q-tabs {
    max-width: 100%;
  }
}
</style>
