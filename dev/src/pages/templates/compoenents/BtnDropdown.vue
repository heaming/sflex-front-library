<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Btn
    </h2>
    <p class="kw-guide-description">
      버튼 드랍다운: 버튼을 눌렀을때 menu 혹은 dialog 가 등장하며, 추가적인 버튼 액션을 할 때 사용함.
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps1"
        title="btnStyleProps"
        :props="btnStyleProps"
      />
      <guide-props
        v-model="bindingProps2"
        title="Style presets"
        :props="{
          type: { type: String, default: 'button' },
          label: { type: [Number, String], default: undefined },
          icon: { type: String, default: undefined },
          iconRight: { type: String, default: undefined },
          tabindex: { type: [Number, String], default: undefined },
          disable: { type: Boolean, default: false },

          // about innerClasses
          align: { type: String, default: 'center' },
          stack: { type: Boolean, default: false },
          noWrap: { type: Boolean, default: false },

          modelValue: { type: Boolean, default: undefined },
          dropdownIcon: { type: String, default: 'arrow_down' },
          cover: { type: Boolean, default: false },
          persistent: { type: Boolean, default: false },
          noRouteDismiss: { type: Boolean, default: false },
          autoClose: { type: Boolean, default: false },
          menuAnchor: { type: String, default: 'bottom end' },
          menuSelf: { type: String, default: 'top end' },
          menuOffset: { type: Array, default: () => [0, 4] },
          noIconAnimation: { type: Boolean, default: false },
        }"
      />
      <kw-separator />
      <div class="w300 h300 bg-green flex">
        <kw-btn-dropdown
          v-bind="bindingProps"
        >
          <kw-btn label="btn1" />
          <kw-btn label="btn2" />
        </kw-btn-dropdown>
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=Use default slot."
      :guide-code="defaultCode"
    >
      <kw-btn-dropdown
        v-bind="bindingProps"
      >
        <kw-btn label="btn1" />
        <kw-btn label="btn2" />
      </kw-btn-dropdown>
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useBtnStyleProps } from '../../../../../src/composables/private/useBtnStyle';

const bindingProps1 = ref({
  padding: '12px',
});
const bindingProps2 = ref({
  dropdownIcon: 'more',
});
const bindingProps = computed(() => ({
  ...bindingProps1.value,
  ...bindingProps2.value,
}));

const btnStyleProps = useBtnStyleProps;
const defaultCode = `
      <kw-btn-dropdown
        v-bind="bindingProps"
      >
        <kw-btn label="btn1" />
        <kw-btn label="btn2" />
      </kw-btn-dropdown>`;
</script>

<style scoped>

</style>
