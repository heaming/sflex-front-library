<template>
  <q-form
    v-bind="styleClassAttrs"
    class="kw-form kw-search"
    :class="{'kw-search--one-row': oneRow}"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <input
      type="submit"
      hidden
    >
    <slot />
    <kw-btn
      v-if="isExpandable"
      class="kw-search__view-more"
      :class="{'kw-search__view-more--expanded': isExpanded}"
      :label="$t('MSG_BTN_VIEW_MORE', null, '더보기')"
      icon-right="arrow_down"
      text-color="black2"
      borderless
      dense
      @click="toggleExpand()"
    />
    <div class="kw-search__action">
      <slot name="action">
        <kw-btn
          v-if="noResetBtn === false"
          ref="resetBtn"
          v-permission:read
          :label="$t('MSG_BTN_INTL', null, '초기화')"
          :class="$g.platform.is.mobile ? 'w64' : 'w90'"
          secondary
          dense
          :disable="disable"
          type="reset"
        />
        <kw-btn
          ref="searchBtn"
          v-permission:read
          :label="$t('MSG_TXT_SRCH', null, '조회')"
          :class="$g.platform.is.mobile ? 'w64' : 'w90'"
          color="secondary"
          border-color="secondary"
          text-color="bg-white"
          dense
          :disable="disable"
          type="submit"
        />
      </slot>
    </div>
  </q-form>
</template>

<script>
import { debounce } from 'lodash-es';
import { confirm } from '../../plugins/dialog';
import {
  ObserverContextKey,
  FormTypeContextKey,
  PageSearchContextKey,
  PageContextKey,
} from '../../consts/private/symbols';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useForm, { useFormProps } from '../../composables/private/useForm';
import useFormExpandable, {
  useFormExpandableProps,
} from '../../composables/private/useFormExpandable';
import { FORM_TYPE } from '../../composables/private/useFormType';
import libConfig from '../../consts/private/libConfig';
import i18n from '../../i18n';
import useFormLayout, { useFormLayoutProps } from '../../composables/private/useFormLayout';
import { hasPermissionKeyInPage } from '../../directives/permission';
import consts from '../../consts';
import env from '../../consts/private/env';

const ONE_ROW_DEFAULT_COLS = 2;

export default {
  name: 'KwSearch',
  inheritAttrs: false,

  props: {
    ...useFormProps,
    ...useFormLayoutProps,
    ...useFormExpandableProps,

    labelSize: {
      type: Number,
      default: 120,
    },
    oneRow: {
      type: Boolean,
      default: false,
    },
    modifiedTargets: {
      type: Array,
      default: () => [],
    },
    noResetBtn: {
      type: Boolean,
      default: false,
    },

    // override useForm props
    ignoreOnModified: {
      type: Boolean,
      default: true,
    },
    ignoreOnReset: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'search',
    'reset',
  ],

  setup(props, { emit }) {
    const formCtx = useForm();
    const formExpandableCtx = useFormExpandable();
    const {
      getRegisteredChild,
    } = inject(ObserverContextKey, {});
    const { t } = useI18n();
    const pageCtx = inject(PageContextKey, null);
    const hasReadPermission = () => env.TEST === true || hasPermissionKeyInPage(consts.PERMISSION_KEY_READ, pageCtx);

    const resetBtn = ref();
    const searchBtn = ref();

    async function validate() {
      await formCtx.validate(false, false);

      const {
        isExpandable,
        isExpanded,
        toggleExpand,
      } = formExpandableCtx;

      const shouldFocus = !props.noErrorFocus;
      const shouldExpand = isExpandable.value && !isExpanded.value
        && formCtx.getInvalidFields().some((ctx) => ctx.el.value.clientHeight === 0);

      if (shouldExpand) {
        toggleExpand(true);
      }

      return await formCtx.validate(shouldFocus, true);
    }

    async function confirmIfTargetsModified() {
      const targets = props.modifiedTargets.map(getRegisteredChild);
      const isModified = targets.some((e) => e?.ignoreOnModified.value === false && e?.ctx.isModified?.());

      return !isModified || await confirm(i18n.t('MSG_ALT_CHG_CNTN'));
    }

    const onSubmit = debounce(async () => {
      if (hasReadPermission()) {
        if (await validate() && await confirmIfTargetsModified()) {
          emit('search', formCtx.values);
        }
      }
    }, libConfig.DEFAULT_DEBOUNCE_WAIT, { leading: true });

    async function onReset() {
      if (await formCtx.alertIfIsNotModified(t('MSG_ALT_NO_INIT_DATA'))) return;

      if (await formCtx.confirmIfIsModified(t('MSG_ALT_SRCH_RESET'))) {
        await formCtx.reset();
        emit('reset');
      }
    }

    const {
      registerSearch,
      unregisterSearch,
    } = inject(PageSearchContextKey, {});

    const searchCtx = {
      uid: getCurrentInstance().uid,
      name: computed(() => props.name),
      confirmIfTargetsModified,
    };

    registerSearch?.(searchCtx);

    onBeforeUnmount(() => {
      unregisterSearch?.(searchCtx);
    });

    // form type injection
    provide(FormTypeContextKey, FORM_TYPE.SEARCH);

    // ignore observe
    provide(ObserverContextKey, {});

    useFormLayout({
      cols: props.oneRow ? ONE_ROW_DEFAULT_COLS : undefined,
    });

    function focusResetBtn() {
      resetBtn.value.$el.focus();
    }

    function focusSearchBtn() {
      searchBtn.value.$el.focus();
    }

    return {
      ...useInheritAttrs(),
      ...formCtx,
      ...formExpandableCtx,
      validate,
      onSubmit,
      onReset,
      focusSearchBtn,
      focusResetBtn,
      searchBtn,
      resetBtn,
    };
  },
};
</script>
