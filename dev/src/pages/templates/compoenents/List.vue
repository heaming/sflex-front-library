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
      :class="{'show-guide-line': showGuideLine}"
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
        title="itemProps"
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

      <kw-toggle
        v-model="showGuideLine"
        :true-value="true"
        :false-value="false"
      />
      <kw-list
        ref="list"
        v-bind="listProps"
      >
        <kw-item-label header>
          header-label
        </kw-item-label>
        <kw-item
          tag="label"
          dense
        >
          <kw-item-section
            side
            top
          >
            <kw-checkbox
              v-model="yn"
              class="h40"
            />
          </kw-item-section>
          <kw-item-section
            v-bind="sectionProps"
          >
            <kw-item-label overline>
              overline
            </kw-item-label>
            <kw-item-label
              lines="1"
            >
              {{ lorem }}
            </kw-item-label>
            <kw-item-label
              lines="2"
            >
              {{ lorem }}
            </kw-item-label>
            <kw-item-label caption>
              caption
            </kw-item-label>
          </kw-item-section>
        </kw-item>
        <kw-item
          v-bind="itemProps"
        >
          <kw-item-section
            thumbnail
          >
            <img
              src="~~@assets/images/logo_kss.svg"
              alt="KS`S"
            >
            thumbnail
          </kw-item-section>
          <kw-item-section
            avatar
          >
            avatar
          </kw-item-section>

          <kw-item-section
            side
          >
            side
          </kw-item-section>
          <kw-item-section
            top
          >
            top
          </kw-item-section>
          <kw-item-section>
            default
          </kw-item-section>
        </kw-item>
        <kw-item
          v-bind="itemProps"
        >
          <kw-item-section
            v-bind="sectionProps"
          >
            <kw-item-label
              v-bind="labelProps"
            >
              kw-item-label
            </kw-item-label>
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
      <kw-list
        class="bg-green"
        :items="[1,2,3,4,{a: 1}]"
      >
        <template #item="{item}">
          {{ item }}
        </template>
      </kw-list>
    </guide-section>
  </kw-page>
</template>

<script setup>
const list = ref();
const sectionProps = ref(null);
const showGuideLine = ref(null);
const itemProps = ref(null);
const labelProps = ref(null);
const listProps = ref(null);
const yn = ref('Y');
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>

<style scoped lang="scss">
.show-guide-line {
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
  }

  .kw-item-section {
    position: relative;
  }

  .kw-item-section::before {
    position: absolute;
    content: "";
    inset: 0;
    border: 1px dashed #ff5353;
  }

  .kw-item-label {
    position: relative;
  }

  .kw-item-label::before {
    position: absolute;
    content: "";
    inset: 0;
    border: 1px dashed #53ffff;
  }
}

</style>
