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
        title="props"
        :props="kwBtn.props"
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
        class="just-rounded-but-round-is-strong"
      >
        <kw-icon
          size="40px"
          name="bookmark_on"
        />
      </kw-btn>
      <kw-btn
        round
        class="just-rounded-but-round-is-strong"
      >
        <kw-icon
          size="40px"
          name="bookmark_on"
        />
      </kw-btn>
      <kw-btn
        padding="8px"
        rounded="50%"
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
import kwBtn from '../../../../../src/components/btn/KwBtn.vue';

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

.just-rounded-but-round-is-strong {
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
