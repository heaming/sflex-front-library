<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Checkbox
    </h2>
    <p class="kw-guide-description">
      Checkbox
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="checkboxProps"
        title="checkboxProps"
      />
      <kw-separator />
      <kw-item>
        <kw-item-section side>
          result
        </kw-item-section>
        <kw-item-section>
          <kw-item-label font="caption">
            component
          </kw-item-label>
          <kw-item-label>
            <kw-checkbox
              v-bind="bindingProps"
              v-model="model"
            />
          </kw-item-label>
        </kw-item-section>
        <kw-item-section>
          <kw-item-label font="caption">
            model
          </kw-item-label>
          <kw-item-label>
            {{ model }}
          </kw-item-label>
        </kw-item-section>
      </kw-item>
      <kw-item>
        <kw-item-section side>
          sizing
        </kw-item-section>
        <kw-item-section>
          <kw-item-label font="caption">
            block
          </kw-item-label>
          <div class="items-center bg-lime-5 w100 h100">
            <kw-checkbox
              v-bind="bindingProps"
              v-model="model"
            />
          </div>
        </kw-item-section>
        <kw-item-section>
          <kw-item-label font="caption">
            in flex container
          </kw-item-label>
          <div class="flex items-center bg-lime-5 w100 h100">
            <kw-checkbox
              v-bind="bindingProps"
              v-model="model"
            />
          </div>
        </kw-item-section>
      </kw-item>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-checkbox
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { KwCheckbox } from '../../../../../src/components/checkbox';

const checkboxProps = KwCheckbox.props;

const model = ref('Y');

const bindingProps = ref(null);

const defaultCode = `
      <kw-checkbox
        v-bind="bindingProps"
      />`;
</script>
