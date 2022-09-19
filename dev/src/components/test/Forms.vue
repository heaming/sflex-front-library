<template>
  <h1>Default</h1>
  <kw-form>
    <kw-form-row>
      <kw-form-item label="button toggle">
        test
      </kw-form-item>
      <kw-form-item
        label="button toggle"
        align-content="center"
      >
        <p>test</p>
        <p>test2</p>
        <p>test3</p>
      </kw-form-item>
    </kw-form-row>
  </kw-form>

  <h1>one row == no padding</h1>
  <kw-form
    one-row
  >
    <kw-form-row>
      <kw-form-item label="button toggle">
        test
      </kw-form-item>
      <kw-form-item
        label="button toggle"
        class="kw-form-item--text-right"
      >
        test
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <h1>dense</h1>
  <kw-form
    dense
  >
    <kw-form-row cols="1">
      <kw-form-item label="button toggle">
        test
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="contents overflow">
        <kw-input v-model="strModel" />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <h1>auto-height 가능하면 쓰지 마시오.</h1>
  <span>case1 any kw field</span>
  <kw-form
    label="auto-height"
    class="kw-form--auto-height"
  >
    <kw-form-row cols="1">
      <kw-form-item label="field only">
        <kw-input v-model="strModel" />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <span>case2 text</span>
  <kw-form
    label="auto-height"
    class="kw-form--auto-height"
  >
    <kw-form-row cols="1">
      <kw-form-item label="text only">
        test
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <span>case3 both</span>
  <kw-form
    label="auto-height"
    class="kw-form--auto-height"
  >
    <kw-form-row cols="1">
      <kw-form-item label="both">
        <kw-input v-model="strModel" />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row cols="1">
      <kw-form-item label="exist">
        test
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <h1>cols</h1>
  <kw-form
    cols="4"
  >
    <kw-form-row
      v-for="r in 4"
      :key="'kw-form-row' + r"
    >
      <kw-form-item
        v-for="n in r"
        :key="'kw-form-row' + r + 'kw-form-item' + n"
        :label="`items ${n}`"
      >
        test
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item
        :colspan="3"
        label="colspan3"
      >
        colspan3
      </kw-form-item>
      <kw-form-item
        :colspan="1"
        label="colspan1"
      >
        :)
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <h1>auto col counting => cols="0"</h1>
  <kw-form
    cols="0"
  >
    <kw-form-row
      v-for="r in 6"
      :key="'kw-form-row' + r"
    >
      <kw-form-item
        v-for="n in r"
        :key="'kw-form-row' + r + 'kw-form-item' + n"
        :label="`items ${n}`"
      >
        test
      </kw-form-item>
    </kw-form-row>

    <kw-form-row>
      <kw-form-item
        :colspan="3"
        label="break!"
      >
        in auto counting col, you can not use colspan.
      </kw-form-item>
      <kw-form-item
        :colspan="1"
        label="break!"
      >
        in auto counting col, you can not use colspan.
      </kw-form-item>
    </kw-form-row>
    <kw-form-row :cols="4">
      <kw-form-item
        :colspan="3"
        label="break!"
      >
        if you want use colspan, declare cols in row or form!
      </kw-form-item>
      <kw-form-item
        :colspan="1"
        label="break!"
      >
        :)
      </kw-form-item>
    </kw-form-row>
  </kw-form>

  <h1>contents align</h1>
  <kw-form
    dense
    cols="1"
  >
    <kw-form-row>
      <kw-form-item
        label="align-content center"
      >
        default = left
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item
        label="align-content center"
        align-content="center"
      >
        center
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item
        label="align-content right"
        align-content="right"
      >
        right
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwForm, KwFormRow, KwFormItem } from '../../../../src/components';

const strModel = ref('');
</script>

<style scoped lang="scss">
.kw-form::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #2f8af3;
}

.kw-form-row {
  position: relative;
}

.kw-form-row::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #6cbf67;
  background-color: rgb(144 211 244 / 5%);
}

.kw-form-item {
  position: relative;
}

.kw-form-item::before {
  position: absolute;
  content: "";
  inset: 0;
  border: 1px dashed #ff5353;
  background-color: rgb(244 211 100 / 10%);
}
</style>
