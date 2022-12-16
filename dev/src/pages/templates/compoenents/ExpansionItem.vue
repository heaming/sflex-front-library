<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Expension
    </h2>
    <p class="kw-guide-description">
      Expension
    </p>

    <guide-section title="test">
      <div class="flex">
        <div class="flex column w400">
          <kw-option-group
            v-model="padding"
            type="radio"
            :options="[
              { value: undefined, label: 'undefined'},
              { value: true, label: 'true'},
              { value: false, label: 'false'},
            ]"
            option-value="value"
            option-label="label"
            label="padding"
          />
          <kw-input
            v-model="paddingString"
            label="paddingString"
            class="w100"
          />
          <kw-option-group
            v-model="dense"
            type="radio"
            :options="[
              { value: undefined, label: 'undefined'},
              { value: true, label: 'true'},
              { value: false, label: 'false'},
            ]"
            option-value="value"
            option-label="label"
            label="dense"
          />
          <kw-option-group
            v-model="itemDense"
            type="radio"
            :options="[
              { value: undefined, label: 'undefined'},
              { value: true, label: 'true'},
              { value: false, label: 'false'},
            ]"
            option-value="value"
            option-label="label"
            label="itemDense"
          />
          <kw-option-group
            v-model="itemPadding"
            type="radio"
            :options="[
              { value: undefined, label: 'undefined'},
              { value: true, label: 'true'},
              { value: false, label: 'false'},
            ]"
            option-value="value"
            option-label="label"
            label="itemPadding"
          />
          <kw-input
            v-model="itemPaddingString"
            label="itemPaddingString"
            class="w100"
          />
        </div>
        <div class="grow">
          <kw-list
            :item-padding="computedListPadding"
            :dense="dense"
          >
            <kw-item
              :dense="itemDense"
              :padding="computedItemPadding"
              style="background-color: rgb(0 0 0 / 10%);"
            >
              <kw-item-section side>
                <kw-checkbox model-value="Y" />
              </kw-item-section>
              <kw-item-section>
                <kw-item-label>
                  This Is A Item.
                </kw-item-label>
                <kw-item>
                  <kw-checkbox model-value="Y" />
                </kw-item>
              </kw-item-section>
            </kw-item>
            <kw-expansion-item
              :dense="itemDense"
              :padding="computedItemPadding"
              style="background-color: rgb(0 0 0 / 10%);"
            >
              <template #header>
                <kw-item-section style="background-color: rgb(0 0 0 / 10%);">
                  <kw-item-label>
                    This Is A Expension Item Header.
                  </kw-item-label>
                </kw-item-section>
              </template>
              <kw-item>
                This Is A Expension Item Contents.
              </kw-item>
            </kw-expansion-item>
          </kw-list>
        </div>
      </div>
    </guide-section>

    <guide-section
      title="test"
      description="test"
    >
      <kw-list>
        <kw-item>
          <div class="kw-font-body text-weight-bold mt15">
            곽재원(21164) | 성수지점
          </div>
        </kw-item>
        <kw-expansion-item>
          <template #header>
            <div class="col">
              <div class="row justify-between">
                <p class="kw-font-pt14 kw-fc--black3">
                  결재총액
                </p>
                <div class="kw-font-pt16 kw-fc--black1 mr8">
                  30,000 원
                </div>
              </div>
            </div>
          </template>
          <div class="py16 px20">
            <ul class="card-text card-text--between">
              <li>
                <p>상품정보</p>
                <span>
                  비데(BK750RWA)
                </span>
              </li>
              <li>
                <p>서비스정보</p>
                <span>고객 과실</span>
              </li>
            </ul>
          </div>
        </kw-expansion-item>
        <kw-item>
          <div class="kw-font-body text-weight-bold mt15">
            곽재원(21164) | 성수지점
          </div>
          <kw-expansion-item>
            <template #header>
              <div class="col">
                <div class="row justify-between">
                  <p class="kw-font-pt14 kw-fc--black3">
                    결재총액
                  </p>
                  <div class="kw-font-pt16 kw-fc--black1 mr8">
                    30,000 원
                  </div>
                </div>
              </div>
            </template>
            <div class="py16 px20">
              <ul class="card-text card-text--between">
                <li>
                  <p>상품정보</p>
                  <span>
                    비데(BK750RWA)
                  </span>
                </li>
                <li>
                  <p>서비스정보</p>
                  <span>고객 과실</span>
                </li>
              </ul>
            </div>
          </kw-expansion-item>
        </kw-item>
      </kw-list>
    </guide-section>

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

const paddingString = ref('');
const padding = ref(undefined);
const computedListPadding = computed(() => {
  if (paddingString.value.length) {
    return paddingString.value;
  }
  return padding.value;
});
const dense = ref(undefined);
const itemDense = ref(undefined);
const itemPadding = ref(undefined);
const itemPaddingString = ref('');
const computedItemPadding = computed(() => {
  if (itemPaddingString.value.length) {
    return itemPaddingString.value;
  }
  return itemPadding.value;
});
</script>

<style scoped lang="scss">
.kw-list {
  position: relative;
}

.kw-list::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed transparent;
}

.kw-item {
  position: relative;

  &::before {
    position: absolute;
    content: "";
    inset: 0;
    border: 1px dashed #d99;
  }
}
</style>
