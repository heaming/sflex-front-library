<template>
  <div class="kw-scroll-picker">
    <q-list
      class="kw-scroll-picker__options"
      :style="optionsStyle"
      @wheel="onWheel"
    >
      <q-item
        v-for="(option, i) in options"
        :key="i"
        :style="getOptionStyle(i)"
        clickable
        tabindex="-1"
        @click="scrollTo(option.value)"
      >
        <q-item-section>
          <q-item-label>
            {{ option.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div
      class="scroll-picker__highlight"
    />
  </div>
</template>

<script>

export default {
  name: 'KwScrollPicker',

  props: {

  },
  emits: [

  ],

  setup() {

  },
};
</script>
