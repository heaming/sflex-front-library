<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [Mobile] Layout
    </h2>
    <div class="kw-guide-section">
      <ul>
        <li>
          Main-header | template#header > &lt;kw-page-mobile-header /&gt;
        </li>
        <li>
          Sub-header | template#sub-header: fixed, located below
        </li>
        <li>
          Action | template#action
        </li>
      </ul>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_mobile-layout.png"
            alt="mobile_example"
            style="width: 40%;"
          >
          <guide-code-view
            :code-value="layoutCode1"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const layoutCode1 = `
<template>
  <kw-page>
    <template #header>
      <!-- mobile main Header -->
    </template>
    <template #sub-header>
      <!-- mobile sub Header -->
    </template>
    <template #action>
      <!-- mobile bottom fixed button-->
    </template>
  </kw-page>
</template>
`;

</script>
<style lang="scss" scoped>
::v-deep(.kw-guide-example) {
  padding: 0 !important;
}

::v-deep(.q-card) {
  padding: 0 !important;
}
</style>
