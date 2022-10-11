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
          v-permission:read
          :label="$t('MSG_BTN_RESET', null, '초기화')"
          class="w90"
          secondary
          dense
          type="reset"
        />
        <kw-btn
          v-permission:read
          :label="$t('MSG_BTN_SEARCH', null, '검색')"
          class="ml8 w90"
          color="secondary"
          text-color="bg-white"
          dense
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

    // override useForm props
    ignoreOnModified: {
      type: Boolean,
      default: true,
    },
    ignoreOnReset: {
      type: Boolean,
      default: true,
    },
  },

  emits: [
    'search',
    'reset',
  ],

  setup(props, { emit }) {
    const formCtx = useForm();

    const {
      getRegisteredChild,
    } = inject(ObserverContextKey, {});

    async function confirmIfTargetsModified() {
      const targets = props.modifiedTargets.map(getRegisteredChild);
      const isModified = targets.some((e) => e?.ctx.isModified());

      return !isModified || await confirm(i18n.t('MSG_ALT_CHG_CNTN'));
    }

    const pageCtx = inject(PageContextKey, null);
    const hasReadPermission = () => __VUE_TEST_APP__ || hasPermissionKeyInPage(consts.PERMISSION_KEY_READ, pageCtx);

    const onSubmit = debounce(async () => {
      if (hasReadPermission()) {
        const shouldFocus = !props.noErrorFocus;

        if (await formCtx.validate(shouldFocus, true)
          && await confirmIfTargetsModified()) {
          emit('search', formCtx.values);
        }
      }
    }, libConfig.DEFAULT_DEBOUNCE_WAIT, { leading: true });

    async function onReset() {
      await formCtx.reset();
      emit('reset');
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

    useFormLayout();

    return {
      ...useInheritAttrs(),
      ...useFormExpandable(),
      ...formCtx,
      onSubmit,
      onReset,
    };
  },
};
</script>
