<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Btn
    </h2>
    <p class="kw-guide-description">
      버튼이다.
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps1"
        title="content"
        :props="{
          label: { type: [Number, String], default: undefined },
          icon: { type: String, default: undefined },
          iconRight: { type: String, default: undefined },

          // about innerClasses
          align: { type: String, default: 'center' },
          stack: { type: Boolean, default: false },
          noWrap: { type: Boolean, default: false },
          stretch: { type: Boolean, default: false },
          grow: { type: Boolean, default: false },
        }"
      />
      <guide-props
        v-model="bindingProps2"
        title="Style presets"
        :props="{
          // presets for color and design
          primary: { type: Boolean, default: false },
          negative: { type: Boolean, default: false },
          secondary: { type: Boolean, default: false },
          gridAction: { type: Boolean, default: false },

          preset: { type: String, default: '' },
        }"
      />
      <guide-props
        v-model="bindingProps3"
        title="Styles"
        :props="{
          dense: { type: Boolean, default: undefined },
          blockInheritDense: { type: Boolean, default: undefined },
          padding: { type: String, default: undefined },
          minWidth: { type: String, default: undefined },

          round: { type: Boolean, default: false },
          rounded: { type: Boolean, default: false },

          // design on quasar unelevated style.
          filled: { type: Boolean, default: false },
          underline: { type: Boolean, default: false },
          borderless: { type: Boolean, default: false },
          outlined: { type: Boolean, default: false },

          // color props
          color: { type: String, default: undefined }, // this one should be solid color.
          textColor: { type: String, default: undefined }, // this one should be solid color.
          borderColor: { type: String, default: undefined }, // this one should be solid color.
          // glossy: { type: Boolean, default: false }, // about background tweak. we will not use.

          // presets for color and design
          size: { type: String, default: undefined },
          fontSize: { type: String, default: undefined },
          color: { type: String, default: undefined },
          textColor: { type: String, default: undefined },
          icon: { type: String, default: undefined },
        }"
      />
      <guide-props
        v-model="bindingProps4"
        title="behavior"
        :props="{
          type: { type: String, default: 'button' },
          tabindex: { type: [Number, String], default: undefined },
          disable: { type: Boolean, default: false },
          to: { type: String, default: undefined },
          replace: { type: Boolean, default: undefined },
          href: { type: String, default: undefined },
          target: { type: String, default: undefined },
        }"
      />
      <kw-separator />
      <kw-form>
        <kw-form-row>
          <kw-form-item label="class">
            <kw-input
              v-model="btnClass"
              label="class"
            />
          </kw-form-item>
        </kw-form-row>
      </kw-form>
      <kw-separator />
      <div class="w300 h300 bg-green flex">
        <kw-btn
          v-bind="bindingProps"
          :class="btnClass"
        />
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=Use default slot."
      :guide-code="defaultCode"
    >
      <kw-btn
        rounded
        class="change-hard-rounded"
      >
        <kw-icon
          size="40px"
          name="bookmark_on"
        />
      </kw-btn>
      <kw-btn
        rounded
        class="just-rounded"
      >
        <kw-icon
          size="40px"
          name="bookmark_on"
        />
      </kw-btn>
      <kw-btn
        round
        class="just-rounded"
      >
        <kw-icon
          size="40px"
          name="bookmark_on"
        />
      </kw-btn>
      <kw-btn
        v-bind="bindingProps"
      >
        <div>div1</div>
        <div>div2</div>
      </kw-btn>
    </guide-section>
  </kw-page>
</template>

<script setup>
const bindingProps1 = ref({
  label: 'label',
});
const bindingProps2 = ref(null);
const bindingProps3 = ref(null);
const bindingProps4 = ref(null);
const bindingProps = computed(() => ({
  ...bindingProps1.value,
  ...bindingProps2.value,
  ...bindingProps3.value,
  ...bindingProps4.value,
}));
const btnClass = ref('kw-btn--t-btn');

const defaultCode = `
      <kw-btn
        v-bind="bindingProps"
      >
        <div>div1</div>
        <div>div2</div>
      </kw-btn>`;
</script>

<style lang="scss" scoped>
@import "../src/css/mixins";

.kw-btn {
  &--t-btn {
    &.q-btn {
      @include kw-btn-height-modifier(7px, 1em, 18px, 500, normal, 50%);
    }
  }
}

.change-hard-rounded {
  &.kw-btn {
    @include kw-btn-height-modifier(7px, 1em, 18px, 500, normal, 50%);
  }
}

.just-rounded {
  &.kw-btn {
    @include kw-btn-height-modifier(7px, 1em, 18px, 500);
  }
}

.just-rounded {
  &.kw-btn {
    @include kw-btn-height-modifier(7px, 1em, 18px, 500);
  }
}

</style>
