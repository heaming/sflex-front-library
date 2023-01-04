<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Separator
    </h2>
    <p class="kw-guide-description">
      Separator
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="separatorProps"
        title="separatorProps"
      />
      <kw-separator />
      <kw-item-label font="subtitle">
        parent box
      </kw-item-label>
      <kw-list class="flex gap-md">
        <kw-item>
          <kw-item-section side>
            <kw-item-label font="dense">
              parent class
            </kw-item-label>
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="parentBoxClass" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            <kw-item-label font="dense">
              parent height
            </kw-item-label>
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="parentBoxStyle.height" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            <kw-item-label font="dense">
              parent width
            </kw-item-label>
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="parentBoxStyle.width" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            <kw-item-label font="dense">
              parent flex-direction
            </kw-item-label>
          </kw-item-section>
          <kw-item-section>
            <kw-option-group
              v-model="parentBoxStyle['flex-direction']"
              type="radio"
              :options="['row', 'column']"
            />
          </kw-item-section>
        </kw-item>
      </kw-list>
      <kw-separator />
      <div
        :class="parentBoxClass"
        :style="parentBoxStyle"
      >
        <div>before</div>
        <kw-separator
          v-bind="bindingProps"
        />
        <div>after</div>
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
const separatorProps = {
  divider: { type: Boolean, default: false },
  spaced: { type: [Boolean, String], default: null },
  vertical: { type: Boolean, default: undefined },
  inset: { type: Boolean, default: undefined },
  size: { type: String, default: undefined },
  color: { type: String, default: undefined }, // can be transparent
};

const bindingProps = ref(null);

const parentBoxClass = ref('flex bg-lime-1');
const parentBoxStyle = reactive({
  width: '500px',
  height: '500px',
  'flex-direction': undefined,
});

</script>
