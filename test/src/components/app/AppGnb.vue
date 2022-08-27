<template>
  <q-header class="kw-gnb">
    <q-toolbar class="row justify-between">
      <div class="row justify-start items-center">
        <div>
          <q-avatar>
            <img
              src="~~assets/images/logo_redpen.svg"
              alt="KSS빨간펜"
            >
          </q-avatar>
        </div>
        <div>
          <a
            v-for="{key, label} of gnbs"
            :key="key"
            href="javascript:void(0)"
            class="kw-gnb--link"
            :class="{'kw-gnb--link-active': isSelected(key)}"
            @click="updateSelected(key)"
          >
            {{ label }}
          </a>
        </div>
      </div>
      <div class="row justify-end items-center">
        <div>
          <kw-input
            name="input"
            placeholder="메뉴검색"
            class="gnb-search w220"
          />
        </div>
        <div>
          <kw-btn
            icon="search_24"
            class="kw-btn--icon-only ml-24"
            size="24px"
          />
        </div>
        <div>
          <kw-btn
            icon="alert_24"
            class="kw-btn--icon-only ml20"
            size="24px"
          />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useGnb } from '~kw-lib';

const {
  gnbs,
  isSelected,
  updateSelected,
} = useGnb();
</script>
