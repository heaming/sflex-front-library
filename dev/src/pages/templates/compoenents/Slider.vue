<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Carousel
    </h2>
    <p class="kw-guide-description">
      리스트
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="listProps"
        title="listProps"
        :props="{
          separator: { type: Boolean, default: undefined },
          padding: { type: Boolean, default: undefined },
          bordered: { type: Boolean, default: undefined },
          dense: { type: Boolean, default: undefined },
          dark: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="itemProps"
        title="labelProps"
        :props="{
          tag: { type: String, default: 'div' },
          active: { type: Boolean, default: undefined },
          clickable: { type: Boolean, default: undefined },
          dense: { type: Boolean, default: undefined },
          insetLevel: { type: Number, default: undefined },
          tabindex: { type: [String, Number], default: undefined },
          focused: { type: Boolean, default: undefined },
          manualFocus: { type: Boolean, default: undefined },
          dark: { type: Boolean, default: undefined },
          to: { type: String, default: undefined },
          replace: { type: Boolean, default: undefined },
          exact: { type: Boolean, default: undefined },
          href: { type: String, default: undefined },
          target: { type: String, default: undefined },
          activeClass: { type: String, default: 'q-router-link--active' },
          exactActiveClass: { type: String, default: 'q-router-link--exact-active' },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="labelProps"
        title="labelProps"
        :props="{
          lines: { type: [Number, String], default: undefined },
          overline: { type: Boolean, default: undefined },
          caption: { type: Boolean, default: undefined },
          header: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="sectionProps"
        title="sectionProps"
        :props="{
          avatar: { type: Boolean, default: undefined },
          thumbnail: { type: Boolean, default: undefined },
          side: { type: Boolean, default: undefined },
          top: { type: Boolean, default: undefined },
          noWrap: { type: Boolean, default: undefined },
        }"
      />
      <kw-separator />

      <kw-list
        ref="list"
        v-bind="listProps"
        class="bg-yellow"
      >
        <kw-item
          v-bind="itemProps"
          class="bg-cyan"
        >
          <kw-item-label
            v-bind="labelProps"
            class="bg-purple"
          >
            kw-item-label
          </kw-item-label>
          <kw-item-section
            v-bind="sectionProps"
            class="bg-green"
          >
            kw-item-section
          </kw-item-section>
        </kw-item>
        <kw-item
          v-bind="itemProps"
          class="bg-cyan"
        >
          <kw-item-label
            v-bind="labelProps"
            class="bg-purple"
          >
            kw-item-label
          </kw-item-label>
          <kw-item-section
            v-bind="sectionProps"
            class="bg-green"
          >
            kw-item-section
          </kw-item-section>
        </kw-item>
      </kw-list>
    </guide-section>
  </kw-page>
</template>

<script setup>
const list = ref();
const sectionProps = ref(null);
const itemProps = ref(null);
const labelProps = ref(null);
const listProps = ref(null);
</script>
