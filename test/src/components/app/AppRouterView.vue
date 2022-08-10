<template>
  <q-page-container>
    <router-view v-slot="{ Component, route }">
      <div v-if="error">
        Failed to load
      </div>
      <suspense
        v-else
        :timeout="0"
        @resolve="onResolve"
      >
        <template #default>
          <component
            :is="Component"
            :key="route.path"
          />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    </router-view>
  </q-page-container>
</template>

<script setup>
const resolved = ref(false);
const errorCaptured = ref(false);
const error = computed(() => !resolved.value && errorCaptured.value);

const { currentRoute } = useRouter();

watch(currentRoute, () => {
  resolved.value = false;
  errorCaptured.value = false;
});

function onResolve() {
  resolved.value = true;
}

onErrorCaptured(() => {
  errorCaptured.value = true;
});

</script>
