<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Pagination
    </h2>
    <p class="kw-guide-description">
      Pagination & PageInfo
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="paginationProps"
        title="paginationProps"
      />
      <guide-props
        v-model="bindingProps1"
        :props="pageInfoProps"
        title="pageInfoProps"
      />
      <kw-separator />
      <kw-paging-info
        v-bind="bindingProps1"
      />
      <kw-pagination
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-paging-info
        v-bind="bindingProps1"
      />
      <kw-pagination
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
const paginationProps = {
  pageIndex: {
    type: Number,
    default: undefined,
  },
  pageSize: {
    type: Number,
    default: undefined,
  },
  pageSizeOptions: {
    type: Array,
    default: undefined,
  },
  totalCount: {
    type: Number,
    default: undefined,
  },
};
const pageInfoProps = {
  pageIndex: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  disable: {
    type: Boolean,
    default: false,
  },
};

const bindingProps = ref({
  totalCount: 45,
});
const bindingProps1 = ref({
  totalCount: 45,
});

const defaultCode = `
      <kw-paging-info
        v-bind="bindingProps1"
      />
      <kw-pagination
        v-bind="bindingProps"
      />`;
</script>
