<template>
  <kw-menu
    v-if="isReady"
    :ref="(vm) => menuRefs[0] = vm"
    class="kw-grid__context-menu"
    context-menu
    no-focus
    no-refocus
    :transition-duration="0"
    @before-show="beforeShow"
    @before-hide="beforeHide"
  >
    <kw-list
      dense
      item-padding="0 10px"
    >
      <kw-item clickable>
        <kw-item-section>
          {{ $t('MSG_TXT_COL_VIEW_SETTINGS', null, '컬럼 보기 설정') }}
        </kw-item-section>
        <kw-item-section side>
          <kw-icon name="arrow_right" />
        </kw-item-section>
        <kw-menu
          :ref="(vm) => menuRefs[1] = vm"
          anchor="top end"
          self="top start"
          class="kw-grid__context-menu sub-menu"
          no-focus
          no-refocus
          :transition-duration="0"
        >
          <kw-list
            dense
            item-padding="0 10px"
          >
            <template #placeholder>
              <div class="flex items-center justify-center px10 h32">
                No columns to configurable
              </div>
            </template>
            <kw-item
              v-for="option of contextConfig.viewOptions"
              :key="option.column"
              clickable
              @click="onClickViewOption(option)"
            >
              <kw-item-section>
                {{ option.label }}
              </kw-item-section>
              <kw-item-section side>
                <kw-checkbox
                  :model-value="option.visible"
                  :true-value="true"
                  :false-value="false"
                  dense
                  @update:model-value="onClickViewOption(option)"
                />
              </kw-item-section>
            </kw-item>
          </kw-list>
        </kw-menu>
      </kw-item>
      <kw-item clickable>
        <kw-item-section>
          <div @click="onClickFixGrid">
            {{ isFixed() }}
          </div>
        </kw-item-section>
      </kw-item>
      <kw-item
        v-if="canPersonalize"
        clickable
      >
        <kw-item-section>
          {{ $t('MSG_TXT_GRID_PERSONALIZE', null, '그리드 개인화') }}
        </kw-item-section>
        <kw-item-section side>
          <kw-icon name="arrow_right" />
        </kw-item-section>
        <kw-menu
          :ref="(vm) => menuRefs[2] = vm"
          anchor="top end"
          self="top start"
          class="kw-grid__context-menu sub-menu"
          no-focus
          no-refocus
          :transition-duration="0"
        >
          <kw-list
            dense
            item-padding="0 10px"
          >
            <kw-item
              clickable
              @click="onClickSaveLayouts"
            >
              <kw-item-section>
                개인화 저장
              </kw-item-section>
            </kw-item>
            <kw-item
              clickable
              @click="onClickInitLayouts"
            >
              <kw-item-section>
                초기화
              </kw-item-section>
            </kw-item>
          </kw-list>
        </kw-menu>
      </kw-item>
    </kw-list>
  </kw-menu>
</template>

<script>
import { pick } from 'lodash-es';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { localStorage } from '../../plugins/storage';
import { PageUniqueIdContextKey } from '../../consts/private/symbols';
import { notify } from '../../plugins/notify';

export default {
  name: 'ContextMenu',

  setup() {
    const isReady = ref();
    const contextConfig = ref({});
    const canPersonalize = ref(false);

    let view;

    function isFixed() {
      if (view) {
        const { colCount } = view.getFixedOptions();
        return colCount === 0 ? '틀 고정' : '틀 고정 해제';
      }
      return '틀 고정';
    }

    function setView(_view) {
      isReady.value = true;
      view = _view;
    }

    function clearView() {
      if (view !== undefined) {
        view = undefined;
      }
    }

    const {
      createUniqueId,
    } = inject(PageUniqueIdContextKey, {});

    let storageLayoutsKey;
    let storageKey;

    const menuRefs = ref([]);
    const contentEls = computed(() => menuRefs.value.map((e) => e && e.contentEl));
    const clickOutsideProps = {
      innerRefs: contentEls,
      onClickOutside() {
        menuRefs.value[0]?.hide();
      },
    };

    onBeforeUnmount(() => {
      clearView();
      removeClickOutside(clickOutsideProps);
    });

    function recursiveCreateViewOptions(layouts) {
      return layouts.reduce((options, layout) => {
        if (layout.column) {
          const { name, header, visible } = view.columnByName(layout.column);

          options.push({
            column: name,
            label: header.text || name,
            visible,
          });
        } else if (layout.items) {
          options.push(
            ...recursiveCreateViewOptions(layout.items),
          );
        }
        return options;
      }, []);
    }

    function updateContextConfig() {
      const { column } = view.__contextMenuClickData__ || view.getCurrent();
      const gridName = view.__gridName__;
      const layouts = view.saveColumnLayout();
      const { colCount } = view.getFixedOptions();
      const viewOptions = view.header.visible ? recursiveCreateViewOptions(layouts.slice(colCount)) : [];
      storageKey = createUniqueId(gridName); // use name props in useObserverChildProps
      storageLayoutsKey = `${storageKey}__layouts`;

      contextConfig.value = {
        column,
        viewOptions,
      };
    }

    function beforeShow() {
      if (view.isEditing()) view.commit();
      canPersonalize.value = !!view.__gridName__;
      updateContextConfig();
      addClickOutside(clickOutsideProps);
    }

    function beforeHide() {
      removeClickOutside(clickOutsideProps);
    }

    function onClickViewOption(opt) {
      view.setColumnProperty(opt.column, 'visible', !opt.visible);
      updateContextConfig();
    }

    function initLayouts() {
      if (view) {
        view.beginUpdate();
        view.__ignoreOnColumnPropertyChanged__ = true;

        view.setColumnLayout(view.__originalLayouts__);

        view.__originalColumnInfos__?.forEach((e) => {
          view.setColumnProperty(e.name, 'visible', e.visible === true);
        });

        view.endUpdate();
        setTimeout(() => {
          view.__ignoreOnColumnPropertyChanged__ = false;
        });
      }
    }

    function onClickSaveLayouts() {
      if (view) {
        const layouts = view.saveColumnLayout();
        const columns = view.getColumns().map((e) => pick(e, ['name', 'visible']));
        const fixedOptions = view.getFixedOptions();
        localStorage.set(storageLayoutsKey, { layouts, columns, fixedOptions });
        notify('개인화 저장이 완료되었습니다.');
        menuRefs.value[0]?.hide();
      }
    }

    function onClickInitLayouts() {
      if (view) {
        initLayouts();
        localStorage.remove(storageLayoutsKey);
        notify('개인화가 초기화되었습니다.');
        menuRefs.value[0]?.hide();
      }
    }

    function onClickFixGrid() {
      const { colCount } = view.getFixedOptions();

      const { column } = view.__contextMenuClickData__ || view.getCurrent();
      if (!column) {
        notify('데이터 영역에서만 틀 고정이 가능합니다.');
        menuRefs.value[0]?.hide();
        return;
      }
      const displayIdx = view.getColumns().find((col) => col.fieldName === column || col.name === column)?.displayIndex;

      view.setFixedOptions({ colCount: colCount !== 0 ? 0 : displayIdx + 1, resizable: true });
      menuRefs.value[0]?.hide();
    }

    return {
      isReady,
      contextConfig,
      menuRefs,
      setView,
      beforeShow,
      beforeHide,
      onClickViewOption,
      onClickSaveLayouts,
      onClickInitLayouts,
      initLayouts,
      canPersonalize,
      onClickFixGrid,
      isFixed,
    };
  },
};
</script>
