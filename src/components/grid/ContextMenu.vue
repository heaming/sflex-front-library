<template>
  <kw-menu
    v-if="isReady"
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

export default {
  name: 'ContextMenu',

  setup() {
    const isReady = ref();
    const contextConfig = ref({});

    let view;
    let clickData;

    function setView(_view) {
      isReady.value = true;
      view = _view;
      view.onContextMenuPopup = (g, x, y, _clickData) => {
        clickData = { ..._clickData };
      };
    }

    onBeforeUnmount(() => {
      if (view !== undefined) {
        view.onContextMenuPopup = null;
        view = null;
      }
    });

    function recursiveCreateViewOptions(layouts) {
      const visibleLayouts = layouts.filter((e) => e.visible);

      return visibleLayouts.reduce((viewOptions, layout) => {
        if (layout.column) {
          const { name, header, visible } = view.columnByName(layout.column);

          viewOptions.push({
            column: name,
            label: header.text || name,
            visible,
          });
        } else if (layout.items) {
          viewOptions.push(
            ...recursiveCreateViewOptions(layout.items),
          );
        }

        return viewOptions;
      }, []);
    }

    function setContextConfig() {
      const { column } = clickData || view.getCurrent();
      const layouts = view.saveColumnLayout();

      const viewOptions = view.header.visible
        ? recursiveCreateViewOptions(layouts) : [];

      contextConfig.value = {
        column,
        viewOptions,
      };
    }

    function beforeShow() {
      if (view.isEditing()) {
        view.commit();
      }
      setContextConfig();
    }

    function beforeHide() {
      clickData = undefined;
    }

    function onClickViewOption(opt) {
      view.setColumnProperty(opt.column, 'visible', !opt.visible);
      setContextConfig();
    }

    return {
      isReady,
      contextConfig,
      setView,
      beforeShow,
      beforeHide,
      onClickViewOption,
    };
  },
};
</script>
