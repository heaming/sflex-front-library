<template>
  <q-form
    v-bind="styleClassAttrs"
    class="kw-search"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <input
      type="submit"
      hidden
    >
    <slot />
    <div class="kw-search--bottom">
      <div
        v-if="isExpandable"
        class="kw-search--view-more"
      >
        <q-btn
          :class="{'q-btn--append': isExpanded}"
          @click="toggleExpand()"
        >
          <span class="block">
            더보기
            <q-tooltip v-if="isExpanded">
              {{ $t('MSG_BTN_COLLAPSE', null, '접기') }}
            </q-tooltip>
            <q-tooltip v-else>
              {{ $t('MSG_BTN_EXPAND', null, '펼치기') }}
            </q-tooltip>
          </span>
        </q-btn>
      </div>
      <div class="row justify-end">
        <slot name="action">
          <q-btn
            :label="$t('MSG_BTN_RESET', null, '초기화')"
            :ripple="false"
            type="reset"
          />
          <q-btn
            :label="$t('MSG_BTN_SEARCH', null, '검색')"
            :ripple="false"
            type="submit"
          />
        </slot>
      </div>
    </div>
  </q-form>
</template>

<script>
import { debounce } from 'lodash-es';
import { confirm } from '../../plugins/dialog';
import { ObserverContextKey, FormTypeContextKey, PageSearchContextKey } from '../../consts/private/symbols';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useForm, { useFormProps } from '../../composables/private/useForm';
import useFormExpandable, { useFormExpandableProps } from '../../composables/private/useFormExpandable';
import { FORM_TYPE } from '../../composables/private/useFormType';
import useLibConfig from '../../composables/private/useLibConfig';
import i18n from '../../i18n';

export default {
  name: 'KwSearch',
  inheritAttrs: false,

  props: {
    ...useFormProps,
    ...useFormExpandableProps,

    modifiedTargets: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['search', 'reset'],

  setup(props, { emit }) {
    const formCtx = useForm();
    const { DEFAULT_DEBOUNCE_WAIT } = useLibConfig();

    const {
      getRegisteredChild,
    } = inject(ObserverContextKey, {});

    async function confirmIfTargetsModified() {
      const targets = props.modifiedTargets.map(getRegisteredChild);
      const isModified = targets.some((e) => e?.ctx.isModified());

      return !isModified || await confirm(i18n.t('MSG_ALT_CHG_CNTN'));
    }

    const onSubmit = debounce(async () => {
      const shouldFocus = !props.noErrorFocus;

      if (await formCtx.validate(shouldFocus, true)
        && await confirmIfTargetsModified()) {
        emit('search', formCtx.values);
      }
    }, DEFAULT_DEBOUNCE_WAIT, { leading: true });

    async function onReset() {
      await formCtx.reset();
      emit('reset');
    }

    const {
      register: registerSearch,
      unregister: unregisterSearch,
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
