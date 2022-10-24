// register global component
// which that tag starts with `Kw`
import { KwActionBar } from './components/actionBar';
import { KwBtn } from './components/btn';
import { KwBtnToggle } from './components/btnToggle';
import { KwChart } from './components/chart';
import { KwCheckbox } from './components/checkbox';
import { KwChip } from './components/chip';
import { KwDate, KwDatePicker, KwDateRangePicker } from './components/datePicker';
import { KwEditor } from './components/editor';
import { KwField } from './components/field';
import { KwFile } from './components/file';
import { KwForm, KwFormRow, KwFormItem } from './components/form';
import { KwGrid, KwTreeGrid } from './components/grid';
import { KwIcon } from './components/icon';
import { KwInput } from './components/input';
import { KwObserver } from './components/observer';
import { KwOptionGroup } from './components/optionGroup';
import { KwPage } from './components/page';
import { KwPagination } from './components/pagination';
import { KwPagingInfo } from './components/pagingInfo';
import { KwPopup } from './components/popup';
import { KwRadio } from './components/radio';
import { KwSearch, KwSearchRow, KwSearchItem } from './components/search';
import { KwSelect } from './components/select';
import { KwSeparator } from './components/separator';
import { KwStep, KwStepper, KwStepperNavigation } from './components/stepper';
import { KwTabPanel, KwTabPanels } from './components/tabPanels';
import { KwTab, KwTabs } from './components/tabs';
import { KwTimePicker } from './components/timePicker';
import { KwToggle } from './components/toggle';
import { KwTooltip } from './components/tooltip';

export interface KwComponentNameMap {
  KwActionBar: KwActionBar;
  KwBtn: KwBtn;
  KwBtnToggle: KwBtnToggle;
  KwChart: KwChart;
  KwCheckbox: KwCheckbox;
  KwChip: KwChip;
  KwDate: KwDate;
  KwDatePicker: KwDatePicker;
  KwDateRangePicker: KwDateRangePicker;
  KwEditor: KwEditor;
  KwField: KwField;
  KwFile: KwFile;
  KwForm: KwForm;
  KwFormRow: KwFormRow;
  KwFormItem: KwFormItem;
  KwGrid: KwGrid;
  KwTreeGrid: KwTreeGrid;
  KwIcon: KwIcon;
  KwInput: KwInput;
  KwObserver: KwObserver;
  KwOptionGroup: KwOptionGroup;
  KwPage: KwPage;
  KwPagination: KwPagination;
  KwPagingInfo: KwPagingInfo;
  KwPopup: KwPopup;
  KwRadio: KwRadio;
  KwSearch: KwSearch;
  KwSearchRow: KwSearchRow;
  KwSearchItem: KwSearchItem;
  KwSelect: KwSelect;
  KwSeparator: KwSeparator;
  KwStep: KwStep;
  KwStepper: KwStepper;
  KwStepperNavigation: KwStepperNavigation;
  KwTabPanels: KwTabPanels;
  KwTabPanel: KwTabPanel;
  KwTabs: KwTabs;
  KwTab: KwTab;
  KwTimePicker: KwTimePicker;
  KwToggle: KwToggle;
  KwTooltip: KwTooltip;
}
