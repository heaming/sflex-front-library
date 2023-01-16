<template>
  <kw-expansion-item
    class="guide-props"
    header-class="guide-props__title"
    padding-target="header"
    padding="10px 0"
  >
    <template #header>
      <kw-item-section>
        <kw-item-label
          v-if="title"
          font="subtitle"
        >
          {{ title }}
        </kw-item-label>
      </kw-item-section>
    </template>
    <suspense>
      <kw-list class="guide-props__props-container">
        <kw-item
          v-for="prop in innerValue"
          :key="prop.propKey"
          class="guide-prop"
        >
          <kw-item-section class="guide-prop__label">
            <kw-item-label class="guide-prop__key">
              {{ prop.propKey }}
            </kw-item-label>
            <kw-item-label class="guide-prop__type">
              {{ prop.type.name || prop.type.map(t => t.name) }}
            </kw-item-label>
          </kw-item-section>
          <kw-item-section class="guide-prop__value">
            <template
              v-if="prop.type === Boolean"
            >
              <kw-toggle
                v-model="prop.value.value"
                :true-value="true"
                :false-value="false"
                @update:model-value="emitModelValue"
              />
            </template>
            <template
              v-else-if="prop.type === Number"
            >
              <kw-input
                v-model="prop.value.value"
                type="number"
                @update:model-value="emitModelValue"
              />
            </template>
            <template
              v-else-if="prop.type === String"
            >
              <kw-input
                v-model="prop.value.value"
                @update:model-value="emitModelValue"
              />
            </template>
            <template v-else>
              <kw-input
                :model-value="prop.value.value !== undefined ? String(prop.value.value) : ''"
                @update:model-value="(v) => {prop.value.value=v; emitModelValue();}"
              />
            </template>
          </kw-item-section>
        </kw-item>
      </kw-list>
    </suspense>
  </kw-expansion-item>
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
  }
  if (innerProps.modelValue?.[propKey]) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    value = innerProps.modelValue?.[propKey];
  }
  if (Array.isArray(value)) {
    value = JSON.stringify(value);
  } else if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  innerValue.push({
    propKey,
    value: ref(value),
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
    value = unref(value);
    if (!innerElement.isPrimitive) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // ignored
      }
    }
    if (value && innerElement.type === Number) {
      value = Number(value) ?? undefined;
    }
    if (validType(innerElement.type, value)) {
      ev[innerElement.propKey] = value;
    }
  }

  emit('update:modelValue', ev);
};

emitModelValue();
</script>

<style lang="scss">
@import "~@css/mixins";

.guide-props__title {
  @include typo("subtitle");

  border-bottom: 1px dotted $info;
}

.guide-props {
  &__props-container {
    margin-top: 20px;
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
