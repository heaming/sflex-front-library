<template>
  <kw-form ref="formRef">
    <kw-form-row>
      <kw-form-item label="QUASAR">
        <q-input
          v-model="stringModel"
          label="기본"
        />
      </kw-form-item>
      <kw-form-item label="QUASAR">
        <q-input
          v-model="stringModel"
          readonly
          label="기본"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item
        label="기본"
        hint="hint"
        required
      >
        <kw-input
          v-model="stringModel"
          label="기본"
        />
      </kw-form-item>
      <kw-form-item label="여러개">
        <kw-input
          v-model="stringModel"
          readonly
          label="기본"
        />
        <kw-input
          v-model="stringModel"
          readonly
          label="기본"
        /> <span>~</span>
        <kw-input
          v-model="stringModel"
          readonly
          label="기본"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item
        label="placeholder"
        hint="hint"
        required
      >
        <kw-input
          model-value=""
          label="기본"
          placeholder="placeholder"
        />
      </kw-form-item>
      <kw-form-item
        label="placeholder disable"
        hint="hint"
        required
      >
        <kw-input
          disable
          model-value=""
          label="기본"
          placeholder="placeholder"
        />
        <kw-input
          readonly
          model-value=""
          label="기본"
          placeholder="placeholder"
        />
        <kw-input
          readonly
          dense
          model-value=""
          label="기본"
          placeholder="placeholder"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="Readonly">
        <kw-input
          v-model="stringModel"
          readonly
          label="Readonly"
        />
      </kw-form-item>
      <kw-form-item label="disable">
        <kw-input
          v-model="stringModel"
          disable
          label="disable"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="error">
        <kw-input
          v-model="stringModel"
          :rules="() => false"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="error & disable">
        <kw-input
          v-model="stringModel"
          :rules="() => '길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고길고'"
          validate-on-mount
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="slot - before">
        <kw-input
          v-model="stringModel"
          label="before"
        >
          <template #before>
            before
          </template>
        </kw-input>
      </kw-form-item>
      <kw-form-item label="slot - after">
        <kw-input
          v-model="stringModel"
          label="before"
        >
          <template #after>
            after
          </template>
        </kw-input>
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="slot - prepend">
        <kw-input
          v-model="stringModel"
          label="before"
        >
          <template #prepend>
            prepend
          </template>
        </kw-input>
      </kw-form-item>
      <kw-form-item label="slot - append">
        <kw-input
          v-model="stringModel"
          label="before"
        >
          <template #append>
            append
          </template>
        </kw-input>
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="prefix">
        <kw-input
          v-model="stringModel"
          label="before"
          prefix="prefix"
        />
      </kw-form-item>
      <kw-form-item label="suffix">
        <kw-input
          v-model="stringModel"
          label="before"
          suffix="suffix"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="icon">
        <kw-input
          v-model="stringModel"
          label="before"
          icon="alert_16"
        />
      </kw-form-item>
      <kw-form-item
        tem
        label="slot - complicate"
      >
        <kw-input
          v-model="stringModel"
          label="before"
        >
          <template #before>
            Before
          </template>
          <template #after>
            After
          </template>
          <template #prepend>
            Prepend
          </template>
          <template #append>
            Append
          </template>
        </kw-input>
      </kw-form-item>
    </kw-form-row>

    <!-- textarea -->
    <kw-form-row>
      <kw-form-item label="textarea">
        <kw-input
          v-model="stringModel"
          :label="'test'"
          type="textarea"
          :rows="5"
        />
      </kw-form-item>
      <kw-form-item
        label="autogrow autogrowautogrowautogrowautogrowautogrowautogrow"
        required
        hint="hint"
      >
        <kw-input
          v-model="stringModel"
          label="before"
          type="textarea"
          autogrow
          rows="1"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="textarea">
        <kw-input
          v-model="stringModel"
          :label="'test'"
          type="textarea"
          dense
          :rows="1"
        />
      </kw-form-item>
      <kw-form-item label="autogrow">
        <kw-input
          v-model="stringModel"
          label="before"
          type="textarea"
          autogrow
          dense
          rows="5"
        />
      </kw-form-item>
    </kw-form-row>

    <!-- style types -->
    <kw-form-row>
      <kw-form-item label="outlined">
        <kw-input
          v-model="stringModel"
          underline
        />
        <kw-input
          v-model="stringModel"
          underline
          readonly
        />
        <kw-input
          v-model="stringModel"
          underline
          disable
        />
      </kw-form-item>
      <kw-form-item label="underline-error">
        <kw-input
          v-model="stringModel"
          underline
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          underline
          readonly
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          underline
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="underline">
        <kw-input
          v-model="stringModel"
          underline
        />
        <kw-input
          v-model="stringModel"
          underline
          readonly
        />
        <kw-input
          v-model="stringModel"
          underline
          disable
        />
      </kw-form-item>
      <kw-form-item label="underline-error">
        <kw-input
          v-model="stringModel"
          underline
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          underline
          readonly
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          underline
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="borderless">
        <kw-input
          v-model="stringModel"
          borderless
        />
        <kw-input
          v-model="stringModel"
          borderless
          readonly
        />
        <kw-input
          v-model="stringModel"
          borderless
          disable
        />
      </kw-form-item>
      <kw-form-item label="borderless-error">
        <kw-input
          v-model="stringModel"
          borderless
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          borderless
          readonly
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          borderless
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>

    <!-- dense -->
    <kw-form-row>
      <kw-form-item label="dense">
        <kw-input
          v-model="stringModel"
          dense
        />
        <kw-input
          v-model="stringModel"
          dense
          readonly
        />
        <kw-input
          v-model="stringModel"
          dense
          disable
        />
      </kw-form-item>
      <kw-form-item label="error dense">
        <kw-input
          v-model="stringModel"
          dense
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          dense
          readonly
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          dense
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="underline dense">
        <kw-input
          v-model="stringModel"
          dense
          underline
        />
        <kw-input
          v-model="stringModel"
          dense
          underline
          readonly
        />
        <kw-input
          v-model="stringModel"
          dense
          underline
          disable
        />
      </kw-form-item>
      <kw-form-item
        label="underline error dense"
        hint="hint"
        required
      >
        <kw-input
          v-model="stringModel"
          underline
          dense
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          underline
          dense
          readonly
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          underline
          dense
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="borderless dense">
        <kw-input
          v-model="stringModel"
          borderless
          dense
        />
        <kw-input
          v-model="stringModel"
          borderless
          dense
          readonly
        />
        <kw-input
          v-model="stringModel"
          borderless
          dense
          disable
        />
      </kw-form-item>
      <kw-form-item label="borderless error dense">
        <kw-input
          v-model="stringModel"
          borderless
          dense
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          borderless
          dense
          readonly
          :rules="() => 'error'"
          validate-on-mount
        />
        <kw-input
          v-model="stringModel"
          borderless
          dense
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwInput } from '../../../../src/components';

const stringModel = ref('test');
</script>

<style scoped>

</style>
