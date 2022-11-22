<template>
  <div class="guide-props">
    <div
      v-if="title"
      class="guide-props__title"
    >
      {{ title }}
    </div>
    <div class="guide-props__props-container">
      <div
        v-for="prop in innerValue"
        :key="prop.propKey"
        class="guide-prop"
      >
        <div class="guide-prop__label">
          <div class="guide-prop__key">
            {{ prop.propKey }}
          </div>
          <div class="guide-prop__type">
            {{ prop.type.name || prop.type.map(t => t.name) }}
          </div>
        </div>
        <div class="guide-prop__value">
          <template
            v-if="prop.type === Boolean"
          >
            <kw-toggle
              v-model="prop.value"
              :true-value="true"
              :false-value="false"
              @update:model-value="emitModelValue"
            />
          </template>
          <template
            v-else-if="prop.type === Number"
          >
            <kw-input
              v-model="prop.value"
              type="number"
              @update:model-value="emitModelValue"
            />
          </template>
          <template
            v-else-if="prop.type === String"
          >
            <kw-input
              v-model="prop.value"
              @update:model-value="emitModelValue"
            />
          </template>
          <template v-else>
            <kw-input
              v-model="prop.value"
              @update:model-value="emitModelValue"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const innerProps = defineProps({
  title: { type: String, default: undefined },
  modelValue: {
    type: Object,
    default: undefined,
  },
  props: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const innerValue = [];

// eslint-disable-next-line no-restricted-syntax
for (const propKey of Object.getOwnPropertyNames(innerProps.props)) {
  // eslint-disable-next-line vue/no-setup-props-destructure
  const propDefineObject = innerProps.props[propKey];
  const isPrimitive = propDefineObject.type === String
      || propDefineObject.type === Number
      || propDefineObject.type === Function
      || propDefineObject.type === Boolean;
  let value = propDefineObject.default;
  if (!isPrimitive && typeof value === 'function' && value.length === 0) {
    value = value();
    if (propKey === 'offset') {
      console.log(value);
    }
  }
  if (Array.isArray(value)) {
    value = `[${value}]`;
  }
  innerValue.push({
    propKey,
    value,
    type: propDefineObject.type,
    isPrimitive,
  });
}

const emitModelValue = () => {
  function validType(t, v) {
    const valueTypeName = Array.isArray(v) ? 'array' : typeof v;
    const validNames = String(Array.isArray(t) ? t.map((te) => te.name) : t.name).toLowerCase();
    return validNames.includes(valueTypeName);
  }

  const ev = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const innerElement of innerValue) {
    let { value } = innerElement;
    if (!innerElement.isPrimitive) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // ignored
      }
    }
    if (validType(innerElement.type, value)) {
      ev[innerElement.propKey] = value;
    }
  }

  console.log(ev);

  emit('update:modelValue', ev);
};

emitModelValue();
</script>

<style scoped lang="scss">
@import "~@css/mixins";

.guide-props {
  &__title {
    @include typo("subtitle");

    border-bottom: 1px dotted $info;
    margin-bottom: 20px;
  }

  &__props-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    column-gap: 32px;
    row-gap: 16px;
  }

  &:not(&:first-of-type) {
    margin-top: 20px;
  }
}

.guide-prop {
  flex: 0 1 300px;
  display: flex;
  align-items: center;

  &__label {
    flex: 0 1 92px;
    margin-right: 8px;
  }

  &__key {
    @include typo("body", 500);

    color: $black1;
  }

  &__type {
    @include typo("caption");

    color: $disabled;
  }
}
</style>
