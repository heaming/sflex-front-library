<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Layout
    </h2>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Type 1
      </h3>
      <p class="kw-guide-description">
        Use full width
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/layout_type1.png"
            alt="Layout Type 1"
          >
        </div>
        <guide-code-view
          :code-value="layoutCode1"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Type 2
      </h3>
      <p class="kw-guide-description">
        Width : 1536px & Two Columns
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/layout_type2.png"
            alt="Layout Type 1"
          >
        </div>
        <guide-code-view
          :code-value="layoutCode2"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Type 3
      </h3>
      <p class="kw-guide-description">
        Width : 1212px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/layout_type3.png"
            alt="Layout Type 1"
          >
        </div>
        <guide-code-view
          :code-value="layoutCode3"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const layoutCode1 = `
<template>
  <kw-page>
    <!-- Your code -->
  </kw-page>
</template>
< script setup>
// Your script
// Only 'const', never 'return'
</ script>
<style lang="scss" scoped>
  // Your scss
</style>
`;

const layoutCode2 = `
<template>
  <kw-page class="kw-page--md">
    <!-- Your code -->
  </kw-page>
</template>
< script setup>
// Your script
// Only 'const', never 'return'
</ script>
<style lang="scss" scoped>
  // Your scss
</style>
`;

const layoutCode3 = `
<template>
  <kw-page class="kw-page--sm">
    <!-- Your code -->
  </kw-page>
</template>
< script setup>
// Your script
// Only 'const', never 'return'
</ script>
<style lang="scss" scoped>
  // Your scss
</style>
`;
</script>
