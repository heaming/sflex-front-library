<template>
  <kw-popup
    class="web-home-mgt"
    size="xl"
    :title="$t('MSG_TIT_HOME_MGT')"
  >
    <template #action>
      <kw-btn
        negative
        :label="$t('MSG_BTN_RESET')"
      />
      <kw-btn
        primary
        :label="$t('MSG_BTN_SAVE')"
      />
    </template>
  </kw-popup>
</template>

<script setup>

</script>
