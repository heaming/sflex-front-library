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
    >
      <guide-props
        v-model="listBindingProps"
        title="listProps"
        :props="listProps"
      />
      <guide-props
        v-model="itemBindingProps"
        title="itemBindingProps"
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
        v-model="labelBindingProps"
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
      <kw-expansion-item
        class="guide-props"
        header-class="guide-props__title"
        padding-target="header"
        padding="10px 0"
      >
        <template #header>
          <kw-item-section>
            <kw-item-label font="subtitle">
              class and style
            </kw-item-label>
          </kw-item-section>
        </template>
        <kw-list class="guide-props__props-container">
          <kw-item class="guide-prop">
            <kw-item-section class="guide-prop__label">
              <kw-item-label class="guide-prop__key">
                showGuideLine
              </kw-item-label>
            </kw-item-section>
            <kw-item-section class="guide-prop__value">
              <kw-toggle
                v-model="showGuideLine"
                :true-value="true"
                :false-value="false"
              />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section class="guide-prop__label">
              <kw-item-label class="guide-prop__key">
                list class
              </kw-item-label>
              <kw-item-label class="guide-prop__type">
                VueClassProps
              </kw-item-label>
            </kw-item-section>
            <kw-item-section class="guide-prop__value">
              <kw-input v-model="listBindingProps.class" />
            </kw-item-section>
          </kw-item>

          <kw-item class="guide-prop">
            <kw-item-section class="guide-prop__label">
              <kw-item-label class="guide-prop__key">
                list style
              </kw-item-label>
              <kw-item-label class="guide-prop__type">
                VueStyleProps
              </kw-item-label>
            </kw-item-section>
            <kw-item-section class="guide-prop__value">
              <kw-input v-model="listBindingProps.style" />
            </kw-item-section>
          </kw-item>
        </kw-list>
      </kw-expansion-item>
      <kw-separator />
      <div
        class="bg-lime-1"
        :class="{'show-guide-line': showGuideLine}"
      >
        <kw-list
          ref="list"
          v-bind="listBindingProps"
          checkbox
          select-align="center"
        >
          <template #item="{item, index}">
            <kw-item-section>
              {{ `index:  ${index}, ` }} {{ item }}
            </kw-item-section>
          </template>
          <template #expansion>
            <div class="bg-green h100 flex justify-center">
              Give ME TACO!!
            </div>
          </template>
        </kw-list>
      </div>
    </guide-section>
    <guide-section
      title="use default slot - 다양한 아이템 모양"
    >
      <kw-list
        ref="list"
        v-bind="listBindingProps"
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
          v-bind="itemBindingProps"
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
          v-bind="itemBindingProps"
        >
          <kw-item-section
            v-bind="sectionProps"
          >
            <kw-item-label
              v-bind="labelBindingProps"
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
    </guide-section>
    <guide-section
      title="use item-slot"
    >
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
import GuideSection from '~dev/components/guide/GuideSection.vue';
import { ref } from 'vue';
import { useDenseProps } from '../../../../../src/composables/private/useDense';

const items = [
  { key: 1, value: 'taco', expansion: 'salsa' },
  { key: 2, value: 'spam' },
  { key: 3, value: 'tuna' },
  { key: 4, value: 'brisket' },
  { key: 5, value: 'chicken' },
];

const listProps = {
  ...useDenseProps,
  itemPadding: { type: [String, Boolean], default: undefined },

  hideSelectAll: { type: Boolean, default: false },
  selected: { type: [Array, Object, String, Number], default: undefined },
  items: { type: Array, default: () => items },
  itemKey: { type: String, default: 'key' },
  checkbox: { type: Boolean, default: false },
  radio: { type: Boolean, default: false },
  selectAlign: { type: String, default: 'top' },
  selectAllAlign: { type: String, default: 'center' },
  itemTag: { type: String, default: undefined },
  placeholder: { type: String, default: undefined },
  disable: { type: Boolean, default: undefined },
  clickable: { type: Boolean, default: undefined },
  itemClass: { type: [Array, Object, String], default: undefined },
  itemStyle: { type: [Array, Object, String], default: undefined },
  activeClass: { type: String, default: undefined },
  expansion: { type: Boolean, default: undefined },
  // fall through props
  separator: { type: Boolean, default: undefined },
  bordered: { type: Boolean, default: undefined },
  onClickItem: { type: Function, default: undefined },
};

const list = ref();

const sectionProps = ref(null);
const showGuideLine = ref(null);
const itemBindingProps = ref(null);
const labelBindingProps = ref(null);
const listBindingProps = ref(null);
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
