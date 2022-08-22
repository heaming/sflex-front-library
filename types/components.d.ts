import { ComponentPublicInstance } from 'vue';

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwActionBar: GlobalComponentConstructor<KwActionBarProps, KwActionBarSlots>;
    KwBtn: GlobalComponentConstructor<KwBtnProps, KwBtnSlots>;
    KwBtnToggle: GlobalComponentConstructor<KwBtnToggleProps, KwBtnToggleSlots>;
    KwChart: GlobalComponentConstructor<kwChartProps, kwChartSlots>;
    KwCheckbox: GlobalComponentConstructor<KwCheckboxProps, KwCheckboxSlots>;
    KwChip: GlobalComponentConstructor<KwChipProps, KwChipSlots>;
    KwDate: GlobalComponentConstructor<KwDateProps, KwDateSlots>;
    KwDatePicker: GlobalComponentConstructor<KwDatePickerProps, KwDatePickerSlots>;
    KwDatePickerRange: GlobalComponentConstructor<KwDatePickerRangeProps, KwDatePickerRangeSlots>;
    KwEditor: GlobalComponentConstructor<KwEditorProps, KwEditorSlots>;
    KwField: GlobalComponentConstructor<KwFieldProps, KwFieldSlots>;
    KwFile: GlobalComponentConstructor<KwFileProps, KwFileSlots>;
    KwForm: GlobalComponentConstructor<KwFormProps, KwFormSlots>;
    KwFormRow: GlobalComponentConstructor<KwFormRowProps, KwFormRowSlots>;
    KwFormItem: GlobalComponentConstructor<KwFormItemProps, KwFormItemSlots>;
    KwGrid: GlobalComponentConstructor<KwGridrops, KwGridSlots>;
    KwTreeGrid: GlobalComponentConstructor<KwTreeGridProps, KwTreeGridSlots>;
    KwInput: GlobalComponentConstructor<KwInputProps, KwInputSlots>;
    KwObserver: GlobalComponentConstructor<KwObserverProps, KwObserverSlots>;
    KwOptionGroup: GlobalComponentConstructor<KwOptionGroupProps, KwOptionGroupSlots>;
    KwPage: GlobalComponentConstructor<KwPageProps, KwPageSlots>;
    KwPageHeader: GlobalComponentConstructor<KwPageHeaderProps, KwPageHeaderSlots>;
    KwPagination: GlobalComponentConstructor<KwPaginationProps, KwPaginationSlots>;
    KwPopupContainer: GlobalComponentConstructor<KwPopupContainerProps, KwPopupContainerSlots>;
    KwPopup: GlobalComponentConstructor<KwPopupProps, KwPopupSlots>;
    KwRadio: GlobalComponentConstructor<KwRadioProps, KwRadioSlots>;
    KwSearch: GlobalComponentConstructor<KwSearchProps, KwSearchSlots>;
    KwSearchRow: GlobalComponentConstructor<KwSearchRowProps, KwSearchRowSlots>;
    KwSearchItem: GlobalComponentConstructor<KwSearchItemProps, KwSearchItemSlots>;
    KwSeparator: GlobalComponentConstructor<KwSeparatorProps, KwSeparatorSlots>;
    KwTabPanels: GlobalComponentConstructor<KwTabPanelsProps, KwTabPanelsSlots>;
    KwTabPanel: GlobalComponentConstructor<KwTabPanelProps, KwTabPanelSlots>;
    KwTabs: GlobalComponentConstructor<KwTabsProps, KwTabsSlots>;
    KwTab: GlobalComponentConstructor<KwTabProps, KwTabSlots>;
    KwTimePicker: GlobalComponentConstructor<KwTimePickerProps, KwTimePickerSlots>;
    KwToggle: GlobalComponentConstructor<KwToggleProps, KwToggleSlots>;
    KwTooltip: GlobalComponentConstructor<KwTooltipProps, KwTooltipSlots>;
  }
}
