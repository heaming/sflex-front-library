<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      {{ KwToggle.name }}
    </h2>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="toggleProps"
        title="toggleProps"
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
            <kw-toggle
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
            <kw-toggle
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
            <kw-toggle
              v-bind="bindingProps"
              v-model="model"
            />
          </div>
        </kw-item-section>
      </kw-item>
    </guide-section>
  </kw-page>
</template>

<script setup>
import { omit } from 'lodash-es';
import { KwToggle } from '../../../../../src/components/toggle';

const toggleProps = omit(KwToggle.props, 'modelValue');

const bindingProps = ref(null);

const model = ref('Y');
</script>
