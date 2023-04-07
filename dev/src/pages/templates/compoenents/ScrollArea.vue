<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      scrollArea
    </h2>
    <p class="kw-guide-description">
      scrollArea
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="scrollAreaProps"
        title="scrollAreaProps"
      />
      <kw-separator />
      <div class="playground-model">
        <kw-form
          :cols="0"
          :label-size="100"
        >
          <kw-form-row>
            <kw-form-item label="parent">
              <kw-field-wrap control-class="gap-xs">
                <kw-input v-model="parentStyle.width">
                  <template #before>
                    width
                  </template>
                </kw-input>
                <kw-input v-model="parentStyle.height">
                  <template #before>
                    height
                  </template>
                </kw-input>
              </kw-field-wrap>
            </kw-form-item>
          </kw-form-row>
          <kw-form-row>
            <kw-form-item label="component">
              <kw-field-wrap control-class="gap-xs">
                <kw-input v-model="componentStyle.width">
                  <template #before>
                    width
                  </template>
                </kw-input>
                <kw-input v-model="componentStyle.height">
                  <template #before>
                    height
                  </template>
                </kw-input>
                <kw-input v-model="componentStyle.padding">
                  <template #before>
                    padding
                  </template>
                </kw-input>
                <kw-input v-model="componentStyle.margin">
                  <template #before>
                    margin
                  </template>
                </kw-input>
              </kw-field-wrap>
            </kw-form-item>
          </kw-form-row>
          <kw-form-row>
            <kw-form-item label="content">
              <kw-field-wrap control-class="gap-xs">
                <kw-input v-model="contentsStyle.width">
                  <template #before>
                    width
                  </template>
                </kw-input>
                <kw-input v-model="contentsStyle.height">
                  <template #before>
                    height
                  </template>
                </kw-input>
              </kw-field-wrap>
            </kw-form-item>
          </kw-form-row>
        </kw-form>
      </div>
      <kw-separator />
      <kw-scroll-area
        v-bind="bindingProps"
        :style="componentStyle"
        class="scroll-area-test__component"
      >
        <div
          class="scroll-area-test__content"
          :style="contentsStyle"
        >
          <div>Content</div>
          <div>{{ `w: ${contentsStyle.width}` }} </div>
          <div>{{ `h: ${contentsStyle.height}` }} </div>
        </div>
      </kw-scroll-area>
      <div class="scroll-area-test">
        <div
          :style="parentStyle"
          class="scroll-area-test__parent flex"
        >
          <kw-scroll-area
            v-bind="bindingProps"
            :style="componentStyle"
            class="scroll-area-test__component"
          >
            <div
              class="scroll-area-test__content"
              :style="contentsStyle"
            >
              <div>Content</div>
              <div>{{ `w: ${contentsStyle.width}` }} </div>
              <div>{{ `h: ${contentsStyle.height}` }} </div>
            </div>
          </kw-scroll-area>
        </div>
        <div class="scroll-area-test__parent-info">
          <div>parent</div>
          <div>{{ `w: ${parentStyle.width}` }} </div>
          <div>{{ `h: ${parentStyle.height}` }} </div>
        </div>
      </div>
      <div class="scroll-area-test-info">
        <span>Parent</span>
        <span>Component</span>
        <span>Client</span>
        <span>ContentsWrappingBox</span>
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="default"
      :guide-code="defaultCode"
    >
      <div class="flex">
        <kw-scroll-area
          style="width: unset; height: unset;"
          class="pa10 bg-green"
          max-width="40em"
          max-height="40em"
        >
          <div
            style="width: 50em; height: 50em; background: linear-gradient(45deg, #f69d3c, #3f87a6);"
          />
        </kw-scroll-area>
      </div>

      <div
        v-scrollbar
        style="width: 30em; height: 30em;"
      >
        <div
          style="width: 50em; height: 50em; background: linear-gradient(45deg, #f69d3c, #3f87a6);"
        />
      </div>

      <div style="width: min-content;">
        <div
          class="w500 h500"
          style="background: linear-gradient(45deg, #f69d3c, #3f87a6);"
        />
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
import KwScrollArea from '../../../../../src/components/scrollArea/KwScrollArea.vue';

const scrollAreaProps = KwScrollArea.props;

const bindingProps = ref({
  maxHeight: '500px',
});

const defaultCode = `
      <kw-scroll-area
        v-bind="bindingProps"
      >
        <div
          class="w500 h500"
          style="background: linear-gradient(#f69d3c, #3f87a6);"
        />
      </kw-scroll-area>`;

const parentStyle = ref({
  width: undefined,
  height: undefined,
});

const componentStyle = ref({
  width: undefined,
  height: undefined,
  padding: undefined,
  margin: undefined,
});

const contentsStyle = ref({
  width: undefined,
  height: undefined,
});

// let timer = null;
//
// const customClass = ref({});
//
// const removeClass = () => {
//   clearTimeout(timer);
//   timer = null;
//   customClass.value['test-class'] = false;
// };
//
// const addClass = () => {
//   customClass.value['test-class'] = true;
// };
//
// const onObserveScroll = () => {
//   addClass();
//   const debounce = 100;
//   if (timer === null) {
//     timer = setTimeout(removeClass, debounce);
//   } else {
//     clearTimeout(timer);
//     timer = setTimeout(removeClass, debounce);
//   }
// };

const vScrollbar = {
  mounted: (el, binding) => {
    const normalizeValue = (val) => ({
      debounce: val?.debounce ?? 1000,
      defaultClass: val?.scrollClass ?? 'kw-scrollbar',
      scrollClass: val?.scrollClass ?? 'kw-scrollbar--scroll',
      ...val,
    });

    const { debounce, defaultClass, scrollClass } = normalizeValue(binding?.value);

    el.classList.add(defaultClass);

    let timer = null;

    const removeClass = () => {
      clearTimeout(timer);
      timer = null;
      el.classList.remove(scrollClass);
    };

    const addClass = () => {
      el.classList.add(scrollClass);
    };

    const trigger = () => {
      addClass();
      if (timer === null) {
        timer = setTimeout(removeClass, debounce);
      } else {
        clearTimeout(timer);
        timer = setTimeout(removeClass, debounce);
      }
    };

    el.onscroll = trigger;
    el.onpointerenter = trigger;
  },
};
</script>

<style scoped lang="scss">
@import "../src/css/mixins";

.scroll-area-test {
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;

  &__parent {
    background-color: $lime-4;
    outline: $blue-7 dashed 2px;
    outline-offset: 6px;
    flex: none;
  }

  &__parent-info {
    flex: 0 1 50%;
    font-size: 4rem;
    margin-left: auto;
    padding: 30px;
    color: #000;
  }

  &__component {
    outline: $red-7 dashed 2px;
    outline-offset: 4px;

    :deep(.kw-scroll-area__wrapper) {
      outline: $green-7 dashed 2px;
      outline-offset: 2px;
    }

    :deep(.q-scrollarea__content) {
      outline: $deep-orange-7 dashed 2px;
    }
  }

  &__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(#f69d3c, #000);
    border: 10px solid $error;
    color: #fff;
    font-size: 4rem;
  }
}

.scroll-area-test-info {
  font-size: 2rem;

  span:nth-of-type(1) {
    color: $blue-7;
  }

  span:nth-of-type(2) {
    color: $red-7;
  }

  span:nth-of-type(3) {
    color: $green-7;
  }

  span:nth-of-type(4) {
    color: $deep-orange-7;
  }
}
</style>
