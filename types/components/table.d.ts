import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QTableProps, QTableSlots } from 'quasar';

type FallThroughProps =
  | 'rows'
  | 'rowKey'
  | 'columns'
  | 'loading'
  | 'iconFirstPage'
  | 'iconPrevPage'
  | 'iconNextPage'
  | 'iconLastPage'
  | 'title'
  | 'hideHeader'
  | 'grid'
  | 'gridHeader'
  | 'dense'
  | 'flat'
  | 'bordered'
  | 'square'
  | 'separator'
  | 'wrapCells'
  | 'virtualScroll'
  | 'virtualScrollSliceSize'
  | 'virtualScrollSliceRatioBefore'
  | 'virtualScrollSliceRatioAfter'
  | 'virtualScrollItemSize'
  | 'virtualScrollStickySizeStart'
  | 'virtualScrollStickySizeEnd'
  | 'tableColspan'
  | 'noDataLabel'
  | 'noResultsLabel'
  | 'loadingLabel'
  | 'selectedRowsLabel'
  | 'rowsPerPageLabel'
  | 'paginationLabel'
  | 'color'
  | 'titleClass'
  | 'tableStyle'
  | 'tableClass'
  | 'tableHeaderStyle'
  | 'tableHeaderClass'
  | 'cardContainerClass'
  | 'cardContainerStyle'
  | 'cardStyle'
  | 'cardClass'
  | 'hideBottom'
  | 'hideSelectedBanner'
  | 'hideNoData'
  | 'hidePagination'
  | 'fullscreen'
  | 'noRouteFullscreenExit'
  | 'visibleColumns'
  | 'filter'
  | 'filterMethod'
  | 'pagination'
  | 'rowsPerPageOptions'
  | 'expanded'
  | 'selection'
  | 'selected'
  | 'sortMethod'
  | 'binaryStateSort'
  | 'columnSortOrder'
  | 'onRowClick'
  | 'onRowDblclick'
  | 'onRowContextmenu'
  | 'onSelection'
  | 'onUpdate:pagination'
  | 'onUpdate:expanded'
  | 'onVirtualScroll';

interface KwTableProps extends Pick<QTableProps, FallThroughProps> {}

interface KwTableSlots extends QTableSlots {}

export interface KwTable extends ComponentPublicInstance<KwTableProps> {
  /**
   * Toggles fullscreen mode
   */
  toggleFullscreen: () => void;
  /**
   * Enter the fullscreen view
   */
  setFullscreen: () => void;
  /**
   * Leave the fullscreen view
   */
  exitFullscreen: () => void;
  /**
   * Trigger a server request (emits 'request' event)
   * @param props Request details
   */
  requestServerInteraction: (props?: {
    /**
     * Optional pagination object
     */
    pagination?: {
      /**
       * Column name (from column definition)
       */
      sortBy?: string;
      /**
       * Is sorting in descending order?
       */
      descending?: boolean;
      /**
       * Page number (1-based)
       */
      page?: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage?: number;
      /**
       * For server-side fetching only. How many total database rows are there to be added to the table.
       */
      rowsNumber?: number;
    };
    /**
     * Filtering method (the 'filter-method' prop)
     * @param rows Array of rows
     * @param terms Terms to filter with (is essentially the 'filter' prop value)
     * @param cols Optional column definitions
     * @param getCellValue Optional function to get a cell value
     * @returns Filtered rows
     */
    filter?: (rows: readonly any[], terms: string | any, cols?: readonly any[], getCellValue?: (col?: any, row?: any) => any) => readonly any[];
  }) => void;
  /**
   * Unless using an external pagination Object (through 'v-model:pagination' prop), you can use this method and force the internal pagination to change
   * @param pagination Pagination object
   * @param forceServerRequest Also force a server request
   */
  setPagination: (
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy?: string;
      /**
       * Is sorting in descending order?
       */
      descending?: boolean;
      /**
       * Page number (1-based)
       */
      page?: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage?: number;
    },
    forceServerRequest?: boolean,
  ) => void;
  /**
   * Navigates to first page
   */
  firstPage: () => void;
  /**
   * Navigates to previous page, if available
   */
  prevPage: () => void;
  /**
   * Navigates to next page, if available
   */
  nextPage: () => void;
  /**
   * Navigates to last page
   */
  lastPage: () => void;
  /**
   * Determine if a row has been selected by user
   * @param key Row key value
   * @returns Is row selected or not?
   */
  isRowSelected: (key: any) => boolean;
  /**
   * Clears user selection (emits 'update:selected' with empty array)
   */
  clearSelection: () => void;
  /**
   * Determine if a row is expanded or not
   * @param key Row key value
   * @returns Is row expanded or not?
   */
  isRowExpanded: (key: any) => boolean;
  /**
   * Sets the expanded rows keys array; Especially useful if not using an external 'expanded' state otherwise just emits 'update:expanded' with the value
   * @param expanded Array containing keys of the expanded rows
   */
  setExpanded: (expanded: readonly any[]) => void;
  /**
   * Trigger a table sort
   * @param col Column name or column definition object
   */
  sort: (col: string | any) => void;
  /**
   * Resets the virtual scroll (if using it) computations; Needed for custom edge-cases
   */
  resetVirtualScroll: () => void;
  /**
   * Scroll the table to the row with the specified index in page (0 based)
   * @param index The index of the row in page (0 based)
   * @param edge Only for virtual scroll - the edge to align to if the row is not visible already; If the '-force' version is used then it always aligns
   */
  scrollTo: (index: string | number, edge?: 'start' | 'center' | 'end' | 'start-force' | 'center-force' | 'end-force') => void;
  /**
   * The filtered and sorted rows (same as the rows prop if using server-side fetching)
   */
  readonly filteredSortedRows: readonly any[];
  /**
   * Paginated, filtered, and sorted rows (same as the rows prop if using server-side fetching)
   */
  readonly computedRows: readonly any[];
  /**
   * The number of computed rows
   */
  readonly computedRowsNumber: number;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTable: GlobalComponentConstructor<KwTableProps, KwTableSlots>;
  }
}
