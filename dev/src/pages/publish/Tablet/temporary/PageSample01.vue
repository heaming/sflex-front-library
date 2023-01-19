<template>
  <kw-page title="월간배정">
    <!-- content AREA -->
    <div
      v-for="n in 10"
      :key="`lorem${n}`"
    >
      {{ lorem }}
    </div>
    <!-- // content AREA -->
    <template #action>
      <!-- located left side -->
      <div class="tablet-action-left">
        <kw-btn
          secondary
          label="이전"
        />
      </div>
      <!-- //located left side -->
      <!-- located right side -->
      <div class="tablet-action-right">
        <kw-btn
          primary
          label="체크고객 이관"
        />
      </div>
      <!-- //located right side -->
    </template>
  </kw-page>
</template>

<script setup>
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>
