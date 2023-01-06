<template>
  <q-table
    ref="quasarRef"
    class="kw-table"
    v-bind="styleClassAttrs"
    :rows="rows"
    :row-key="rowKey"
    :columns="columns"
    :loading="loading"
    :icon-first-page="iconFirstPage"
    :icon-prev-page="iconPrevPage"
    :icon-next-page="iconNextPage"
    :icon-last-page="iconLastPage"
    :title="title"
    :hide-header="hideHeader"
    :grid="grid"
    :grid-header="gridHeader"
    :dense="dense"
    :flat="flat"
    :bordered="bordered"
    :square="square"
    :separator="separator"
    :wrap-cells="wrapCells"
    :virtual-scroll="virtualScroll"
    :virtual-scroll-slice-size="virtualScrollSliceSize"
    :virtual-scroll-slice-ratio-before="virtualScrollSliceRatioBefore"
    :virtual-scroll-slice-ratio-after="virtualScrollSliceRatioAfter"
    :virtual-scroll-item-size="virtualScrollItemSize"
    :virtual-scroll-sticky-size-start="virtualScrollStickySizeStart"
    :virtual-scroll-sticky-size-end="virtualScrollStickySizeEnd"
    :table-colspan="tableColspan"
    :no-data-label="noDataLabel"
    :no-results-label="noResultsLabel"
    :loading-label="loadingLabel"
    :selected-rows-label="selectedRowsLabel"
    :rows-per-page-label="rowsPerPageLabel"
    :pagination-label="paginationLabel"
    :color="color"
    :title-class="titleClass"
    :table-style="tableStyle"
    :table-class="tableClass"
    :table-header-style="tableHeaderStyle"
    :table-header-class="tableHeaderClass"
    :card-container-class="cardContainerClass"
    :card-container-style="cardContainerStyle"
    :card-style="cardStyle"
    :card-class="cardClass"
    :hide-bottom="hideBottom"
    :hide-selected-banner="hideSelectedBanner"
    :hide-no-data="hideNoData"
    :hide-pagination="hidePagination"
    :fullscreen="fullscreen"
    :no-route-fullscreen-exit="noRouteFullscreenExit"
    :visible-columns="visibleColumns"
    :filter="filter"
    :filter-method="filterMethod"
    :pagination="pagination"
    :rows-per-page-options="rowsPerPageOptions"
    :expanded="expanded"
    :selection="selection"
    :selected="selected"
    :sort-method="sortMethod"
    :binary-state-sort="binaryStateSort"
    :column-sort-order="columnSortOrder"
    @update:pagination="$emit('update:pagination', $event)"
    @update:expanded="$emit('update:expanded', $event)"
    @update:selected="$emit('update:selected', $event)"
    @update:fullscreen="$emit('update:fullscreen', $event)"
    @row-click="$emit('row-click', $event)"
    @row-dblclick="$emit('row-dblclick', $event)"
    @row-contextmenu="$emit('row-contextmenu', $event)"
    @selection="$emit('selection', $event)"
    @fullscreen="$emit('fullscreen', $event)"
    @request="$emit('request', $event)"
    @virtual-scroll="$emit('virtual-scroll', $event)"
  />
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTable',
  inheritAttrs: false,
  props: {
    // customize props
    // fall through props
    rows: { type: Array, default: () => [] },
    rowKey: { type: [String, Function], default: 'id' },
    columns: { type: Array, default: () => [] },
    loading: { type: Boolean, default: undefined },
    iconFirstPage: { type: String, default: undefined },
    iconPrevPage: { type: String, default: undefined },
    iconNextPage: { type: String, default: undefined },
    iconLastPage: { type: String, default: undefined },
    title: { type: String, default: undefined },
    hideHeader: { type: Boolean, default: undefined },
    grid: { type: Boolean, default: undefined },
    gridHeader: { type: Boolean, default: undefined },
    dense: { type: Boolean, default: undefined },
    flat: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    square: { type: Boolean, default: undefined },
    separator: { type: String, default: 'horizontal', validator: (v) => ['horizontal', 'vertical', 'cell', 'none'].includes(v) },
    wrapCells: { type: Boolean, default: undefined },
    virtualScroll: { type: Boolean, default: undefined },
    virtualScrollSliceSize: { type: [Number, String], default: null },
    virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 },
    virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 },
    virtualScrollItemSize: { type: [Number, String], default: 24 },
    virtualScrollStickySizeStart: { type: [Number, String], default: 0 },
    virtualScrollStickySizeEnd: { type: [Number, String], default: 0 },
    tableColspan: { type: [Number, String], default: undefined },
    noDataLabel: { type: String, default: undefined },
    noResultsLabel: { type: String, default: undefined },
    loadingLabel: { type: String, default: undefined },
    selectedRowsLabel: { type: Function, default: undefined },
    rowsPerPageLabel: { type: String, default: undefined },
    paginationLabel: { type: Function, default: undefined },
    color: { type: String, default: undefined },
    titleClass: { type: [String, Array, Object], default: undefined },
    tableStyle: { type: [String, Array, Object], default: undefined },
    tableClass: { type: [String, Array, Object], default: undefined },
    tableHeaderStyle: { type: [String, Array, Object], default: undefined },
    tableHeaderClass: { type: [String, Array, Object], default: undefined },
    cardContainerClass: { type: [String, Array, Object], default: undefined },
    cardContainerStyle: { type: [String, Array, Object], default: undefined },
    cardStyle: { type: [String, Array, Object], default: undefined },
    cardClass: { type: [String, Array, Object], default: undefined },
    hideBottom: { type: Boolean, default: undefined },
    hideSelectedBanner: { type: Boolean, default: undefined },
    hideNoData: { type: Boolean, default: undefined },
    hidePagination: { type: Boolean, default: undefined },
    fullscreen: { type: Boolean, default: undefined },
    noRouteFullscreenExit: { type: Boolean, default: undefined },
    visibleColumns: { type: Array, default: undefined },
    filter: { type: [String, Object], default: undefined },
    filterMethod: { type: Function, default: undefined },
    pagination: { type: Object, default: undefined },
    rowsPerPageOptions: { type: Array, default: () => [5, 7, 10, 15, 20, 25, 50, 0] },
    expanded: { type: Array, default: undefined },
    selection: { type: String, default: 'none', validator: (v) => ['single', 'multiple', 'none'].includes(v) },
    selected: { type: Array, default: () => [] },
    sortMethod: { type: Function, default: undefined },
    binaryStateSort: { type: Boolean, default: undefined },
    columnSortOrder: { type: String, validator: (v) => v === 'ad' || v === 'da', default: 'ad' },
  },

  emits: [
    'request',
    'virtual-scroll',
    'update:fullscreen',
    'fullscreen',
    'update:expanded',
    'update:selected',
    'selection',
    'update:pagination',
    'row-click',
    'row-dblclick',
    'row-contextmenu',
  ],

  setup() {
    const quasarRef = ref();
    const { styleClassAttrs } = useInheritAttrs();

    const toggleFullscreen = () => quasarRef.value?.toggleFullscreen();
    const setFullscreen = () => quasarRef.value?.setFullscreen();
    const exitFullscreen = () => quasarRef.value?.exitFullscreen();
    const requestServerInteraction = (prop = {}) => quasarRef.value?.requestServerInteraction(prop);
    const setPagination = (pagination, forceServerRequest) => quasarRef.value
      ?.setPagination(pagination, forceServerRequest);
    const firstPage = () => quasarRef.value?.firstPage();
    const prevPage = () => quasarRef.value?.prevPage();
    const nextPage = () => quasarRef.value?.nextPage();
    const lastPage = () => quasarRef.value?.lastPage();
    const isRowSelected = (key) => quasarRef.value?.isRowSelected(key);
    const clearSelection = () => quasarRef.value?.clearSelection();
    const isRowExpanded = (key) => quasarRef.value?.isRowExpanded(key);
    const setExpanded = (expanded) => quasarRef.value?.setExpanded(expanded);
    const sort = (col) => quasarRef.value?.setExpanded(col);
    const resetVirtualScroll = (col) => quasarRef.value?.resetVirtualScroll(col);
    const scrollTo = (index, edge) => quasarRef.value?.scrollTo(index, edge);
    const filteredSortedRows = computed(() => quasarRef.value?.filteredSortedRows);
    const computedRows = computed(() => quasarRef.value?.computedRows);
    const computedRowsNumber = computed(() => quasarRef.value?.computedRowsNumber);

    return {
      quasarRef,
      styleClassAttrs,
      toggleFullscreen,
      setFullscreen,
      exitFullscreen,
      requestServerInteraction,
      setPagination,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      isRowSelected,
      clearSelection,
      isRowExpanded,
      setExpanded,
      sort,
      resetVirtualScroll,
      scrollTo,
      filteredSortedRows,
      computedRows,
      computedRowsNumber,
    };
  },
};
</script>
