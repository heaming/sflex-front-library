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
    </kw-list>
  </kw-menu>
</template>

<script>
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';

export default {
  name: 'ContextMenu',

  setup() {
    const isReady = ref();
    const contextConfig = ref({});

    let view;

    function setView(_view) {
      isReady.value = true;
      view = _view;
    }

    function clearView() {
      if (view !== undefined) {
        view = undefined;
      }
    }

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
      const layouts = view.saveColumnLayout();
      const viewOptions = view.header.visible ? recursiveCreateViewOptions(layouts) : [];

      contextConfig.value = {
        column,
        viewOptions,
      };
    }

    function beforeShow() {
      if (view.isEditing()) view.commit();

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

    return {
      isReady,
      contextConfig,
      menuRefs,
      setView,
      beforeShow,
      beforeHide,
      onClickViewOption,
    };
  },
};
</script>
