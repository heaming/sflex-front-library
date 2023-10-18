import {
  RestoreMode, IndicatorValue, GridFitStyle, ExitGridWhenTab, SortMode,
  SelectionStyle, ValidationLevel, GridBase, TreeView, RowGroupAdornments, ExpanderVisibility, HandleVisibility,
} from 'realgrid';
import env from '../../../consts/private/env';
import i18n from '../../../i18n';

const dataConfig = {
  restoreMode: RestoreMode.AUTO,
  softDeleting: true,
  deleteCreated: true,
};

const viewConfig = {
  header: {
    visible: true,
    showTooltip: true,
    minRowHeight: 36,
  },
  footers: {
    visible: false,
  },
  stateBar: {
    visible: env.VITE_REALGRID_STATUSBAR,
    width: 50,
    footText: '',
  },
  checkBar: {
    visible: false,
    width: 50,
    useImages: true,
    footText: '',
  },
  rowIndicator: {
    visible: false,
    width: 50,
    displayValue: IndicatorValue.INDEX,
    displayOrder: 1,
    zeroBase: (view) => view instanceof TreeView,
    headText: 'No',
    footText: '',
  },

  displayOptions: {
    minTableRowHeight: 42,
    minCellWidth: 10,
    columnMovable: true,
    useFocusClass: true,
    showChangeMarker: true,
    showEmptyMessage: true,
    showEmptyTooltip: false,
    emptyMessage: () => i18n.t('MSG_ALT_NO_INFO_SRCH', null, '조회 결과가 없습니다.'),
    selectionStyle: SelectionStyle.BLOCK,
    fitStyle: GridFitStyle.FILL,
    rowChangeDelay: 100,
    hintDelay: 100,
    fitStyleIncludeFixed: true,
  },
  editOptions: {
    editable: false,
    editWhenFocused: true,
    columnEditableFirst: false,
    commitByCell: true,
    commitWhenLeave: true,
    commitLevel: ValidationLevel.ERROR,
    crossWhenExitLast: true,
    exitGridWhenTab: ExitGridWhenTab.GRID,
    exceptDataClickWhenButton: true,
  },
  editorOptions: {
    viewGridInside: false,
  },

  rowGroup: {
    mergeMode: false,
    mergeExpanderVisibility: ExpanderVisibility.NONE,
    indentVisible: false,
    expandedAdornments: RowGroupAdornments.FOOTER,
    collapsedAdornments: RowGroupAdornments.NONE,
    sorting: true,
  },
  groupPanel: {
    visible: false,
  },

  sortMode: SortMode.EXPLICIT,
  sortingOptions: {
    enabled: true,
    commitBeforeFiltering: true,
    handleVisibility: HandleVisibility.VISIBLE,
    keepFocusedRow: false,
  },
  filteringOptions: {
    enabled: false,
    commitBeforeFiltering: true,
    handleVisibility: HandleVisibility.VISIBLE,
    includeParentItem: true,
    automating: {
      lookupDisplay: true,
    },
    selector: {
      showButtons: true,
    },
  },

  copyOptions: {
    copyDisplayText: true,
    lookupDisplay: true,
  },
  pasteOptions: {
    checkReadOnly: true,
    convertLookupLabel: true,
    enableAppend: false,
    numberChars: () => [','],
    eventEachRow: true,
  },

  treeOptions: {
    lineVisible: true,
  },

  scrollBarWidth: 14, // 10 -> 14
  scrollBarHeight: 14, // 10 -> 14
  hideDeletedRows: env.VITE_REALGRID_HIDE_DELETE_ROWS,
  undoable: false,
};

function setDefaultConfig(root, obj, config) {
  Object.keys(config).forEach((key) => {
    const value = config[key];
    const valueType = typeof value;
    const isUndefinedConfig = valueType === 'object' && obj[key] === undefined;

    if (isUndefinedConfig) { return; }

    if (valueType === 'function') {
      if (typeof obj[key] === 'function') {
        obj[key](value(root));
      } else {
        obj[key] = value(root);
      }
      return;
    }

    if (value && valueType === 'object') {
      setDefaultConfig(root, obj[key], value);
      return;
    }

    obj[key] = value;
  });
}

export default (obj) => {
  const config = obj instanceof GridBase
    ? viewConfig : dataConfig;

  setDefaultConfig(obj, obj, config);
};
