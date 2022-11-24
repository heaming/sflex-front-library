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
        v-model="listProps"
        title="listProps"
        :props="{
          separator: { type: Boolean, default: undefined },
          padding: { type: Boolean, default: undefined },
          bordered: { type: Boolean, default: undefined },
          dense: { type: Boolean, default: undefined },
          dark: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="itemProps"
        title="labelProps"
        :props="{
          tag: { type: String, default: 'div' },
          active: { type: Boolean, default: undefined },
          clickable: { type: Boolean, default: undefined },
          dense: { type: Boolean, default: undefined },
          insetLevel: { type: Number, default: undefined },
          tabindex: { type: [String, Number], default: undefined },
          focused: { type: Boolean, default: undefined },
          manualFocus: { type: Boolean, default: undefined },
          dark: { type: Boolean, default: undefined },
          to: { type: String, default: undefined },
          replace: { type: Boolean, default: undefined },
          exact: { type: Boolean, default: undefined },
          href: { type: String, default: undefined },
          target: { type: String, default: undefined },
          activeClass: { type: String, default: 'q-router-link--active' },
          exactActiveClass: { type: String, default: 'q-router-link--exact-active' },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="labelProps"
        title="labelProps"
        :props="{
          lines: { type: [Number, String], default: undefined },
          overline: { type: Boolean, default: undefined },
          caption: { type: Boolean, default: undefined },
          header: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="sectionProps"
        title="sectionProps"
        :props="{
          avatar: { type: Boolean, default: undefined },
          thumbnail: { type: Boolean, default: undefined },
          side: { type: Boolean, default: undefined },
          top: { type: Boolean, default: undefined },
          noWrap: { type: Boolean, default: undefined },
        }"
      />
      <kw-separator />

      <kw-list
        ref="list"
        v-bind="listProps"
      >
        <kw-item
          v-bind="itemProps"
        >
          <kw-item-label
            v-bind="labelProps"
          >
            kw-item-label
          </kw-item-label>
          <kw-item-section
            v-bind="sectionProps"
          >
            kw-item-section
          </kw-item-section>
        </kw-item>
        <kw-item
          v-bind="itemProps"
        >
          <kw-item-label
            v-bind="labelProps"
          >
            kw-item-label
          </kw-item-label>
          <kw-item-section
            v-bind="sectionProps"
          >
            kw-item-section
          </kw-item-section>
        </kw-item>
        <kw-expansion-item>
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
const sectionProps = ref(null);
const itemProps = ref(null);
const labelProps = ref(null);
const listProps = ref(null);
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

.kw-item::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #6cbf67;
  background-color: rgb(144 211 244 / 5%);
}

.kw-item-section {
  position: relative;
}

.kw-item-section::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #ff5353;
  background-color: rgb(244 211 100 / 10%);
}

.kw-item-label {
  position: relative;
}

.kw-item-label::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #53ffff;
  background-color: rgb(244 211 100 / 10%);
}
</style>
