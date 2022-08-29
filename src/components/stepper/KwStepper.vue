<template>
  <q-stepper
    ref="stepperRef"
    class="kw-stepper"
    keep-alive
    :transition-duration="0"
  >
    <slot />

    <template #navigation>
      <slot name="navigation" />
    </template>

    <template #message>
      <slot name="message" />
    </template>
  </q-stepper>
</template>

<script>
export default {
  name: 'KwStepper',

  setup() {
    const stepperRef = ref();

    function next() {
      stepperRef.value.next();
    }

    function previous() {
      stepperRef.value.previous();
    }

    function goTo() {
      stepperRef.value.goTo();
    }

    return {
      stepperRef,
      next,
      previous,
      goTo,

    };
  },

};
</script>
