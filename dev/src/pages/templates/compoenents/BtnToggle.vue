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
        title="fieldProps"
        :props="fieldProps"
      />
      <guide-props
        v-model="bindingProps2"
        title="optionsProps"
        :props="optionsProps"
      />
      <guide-props
        v-model="bindingProps3"
        title="btnStyleProps"
        :props="btnStyleProps"
      />

      <guide-props
        v-model="bindingProps5"
        title="fieldWrapProps"
        :props="fieldWrapProps"
      />
      <guide-props
        v-model="bindingProps4"
        title="toggleBtnProps"
        :props="{
          toggleColor: { type: String, default: 'bg-white' },
          toggleTextColor: { type: String, default: 'primary' },
          toggleBorderColor: { type: String, default: 'primary' },
          gap: { type: String, default: '4px' },
          disable: { type: Boolean, default: false },
          stack: { type: Boolean, default: false },
          noWrap: { type: Boolean, default: false },
          clearable: { type: Boolean, default: false },
          btnWrap: { type: Boolean, default: false },
        }"
      />
      <kw-separator />
      <div class="w300 h300 bg-green flex">
        <kw-btn-toggle
          v-bind="bindingProps"
        />
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=Use default slot."
      :guide-code="defaultCode"
    >
      <kw-btn-toggle
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useOptionsProps } from '../../../../../src/composables/private/useOptions';
import { useBtnStyleProps } from '../../../../../src/composables/private/useBtnStyle';
import { useFieldWrapProps } from '../../../../../src/composables/private/useFieldWrap';

const bindingProps1 = ref(null);
const bindingProps2 = ref({
  options: [
    'test',
    'test2',
    'test3',
    'long long long~~~~~~~~~~ word with white space',
    2313213213213213,
    2313213213213213,
    2313213213213213,
  ],
});
const bindingProps3 = ref(null);
const bindingProps4 = ref(null);
const bindingProps5 = ref(null);
const bindingProps = computed(() => ({
  ...bindingProps1.value,
  ...bindingProps2.value,
  ...bindingProps3.value,
  ...bindingProps4.value,
  ...bindingProps5.value,
}));

const defaultCode = `
      <kw-btn-toggle
        v-bind="bindingProps"
      />`;
const fieldProps = useFieldProps;
const optionsProps = useOptionsProps;
const btnStyleProps = useBtnStyleProps;
const fieldWrapProps = useFieldWrapProps;
</script>
