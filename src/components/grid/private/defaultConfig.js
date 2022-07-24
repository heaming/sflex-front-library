import {
  RestoreMode, IndicatorValue, GridFitStyle, ExitGridWhenTab, SortMode,
  SelectionStyle, ValidationLevel, GridBase, TreeView,
} from 'realgrid';

const dataConfig = {
  restoreMode: RestoreMode.AUTO,
  softDeleting: true,
  deleteCreated: true,
};

const viewConfig = {
  header: {
    visible: true,
    showTooltip: true,
    minRowHeight: 35,
  },

  footers: {
    visible: false,
  },

  rowIndicator: {
    visible: false,
    width: 40,
    displayValue: IndicatorValue.ROW,
    zeroBase: (view) => view instanceof TreeView,
    footText: '',
  },

  stateBar: {
    visible: false,
    footText: '',
  },

  checkBar: {
    visible: false,
    width: 40,
    useImages: true,
    footText: '',
  },

  displayOptions: {
    minTableRowHeight: 33,
    columnMovable: true,
    useFocusClass: true,
    showEmptyMessage: true,
    showEmptyTooltip: false,
    emptyMessage: 'No data to display',
    selectionStyle: SelectionStyle.BLOCK,
    fitStyle: GridFitStyle.FILL,
    rowChangeDelay: 100,
    hintDelay: 100,
  },

  editOptions: {
    editable: false,
    editWhenFocused: false,
    commitByCell: true,
    commitWhenLeave: true,
    commitLevel: ValidationLevel.ERROR,
    crossWhenExitLast: true,
    exitGridWhenTab: ExitGridWhenTab.GRID,
    viewGridInside: false,
  },

  editorOptions: {
    viewGridInside: false,
  },

  sortMode: SortMode.EXPLICIT,
  sortingOptions: {
    keepFocusedRow: true,
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
  },

  treeOptions: {
    lineVisible: false,
  },

  hideDeletedRows: true,
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
