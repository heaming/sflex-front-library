<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Card
    </h2>
    <p class="kw-guide-description">
      카드
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="cardProps"
        title="cardProps"
        :props="{
          tag: { type: String, default: 'div' },
          dark: { type: Boolean, default: undefined },
          square: { type: Boolean, default: undefined },
          flat: { type: Boolean, default: undefined },
          bordered: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="sectionProps"
        title="sectionProps"
        :props="{
          tag: { type: String, default: 'div' },
          horizontal: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="actionProps"
        title="actionProps"
        :props="{
          align: { type: String, default: 'left' },
          vertical: { type: Boolean, default: undefined },
        }"
      />
      <kw-separator />
      <kw-card
        v-bind="cardProps"
      >
        <div class="text-title">
          {{ JSON.stringify(cardProps) }}
        </div>
        <kw-card-section
          v-bind="sectionProps"
        >
          kw-card-section1
          {{ JSON.stringify(sectionProps) }}
        </kw-card-section>
        <kw-card-section
          v-bind="sectionProps"
        >
          kw-card-section2
          {{ JSON.stringify(sectionProps) }}
        </kw-card-section>
        <kw-card-actions
          v-bind="actionProps"
        >
          <kw-btn label="action1" />
          <kw-btn
            label="action2"
            primary
          />
        </kw-card-actions>
      </kw-card>
    </guide-section>
  </kw-page>
</template>

<script setup>
const cardProps = ref(null);
const sectionProps = ref(null);
const actionProps = ref(null);
</script>
