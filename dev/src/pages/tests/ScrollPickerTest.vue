<template>
  <kw-page>
    <div class="result-area">
      <kw-form :cols="1">
        <kw-form-row>
          <kw-form-item
            :label="value"
          >
            <kw-time-picker
              v-model="value"
            />
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </div>
  </kw-page>
</template>

<script setup>

const value = ref();

</script>
