<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Avatar
    </h2>
    <p class="kw-guide-description">
      아바타다.
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="{
          size: { type: String, default: undefined },
          fontSize: { type: String, default: undefined },
          color: { type: String, default: undefined },
          textColor: { type: String, default: undefined },
          icon: { type: String, default: undefined },
          square: { type: Boolean, default: undefined },
          rounded: { type: Boolean, default: undefined },
        }"
      />
      <kw-separator />
      <kw-avatar
        v-bind="bindingProps"
      >
        !
      </kw-avatar>
    </guide-section>
    <guide-section
      title="default slot"
      description="=Use default slot when you want draw picture or image in the avatar."
      :guide-code="defaultCode"
    >
      <kw-avatar>
        <img
          src="~~dev/assets/images/test_image.png"
          alt="test"
        >
      </kw-avatar>
    </guide-section>
    <guide-section
      title="Google"
      description="Or you can write text."
      :guide-code="googleCode"
    >
      <kw-avatar
        color="grey-2"
        text-color="blue-7"
        font-size="2rem"
      >
        G
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="red-7"
        font-size="2rem"
      >
        O
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="yellow-7"
        font-size="2rem"
      >
        O
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="blue-7"
        font-size="2rem"
      >
        G
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="green-7"
        font-size="2rem"
      >
        L
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="red-7"
        font-size="2rem"
      >
        E
      </kw-avatar>
    </guide-section>
  </kw-page>
</template>

<script setup>
const defaultCode = `
          <kw-avatar>
            <img
              src="~~dev/assets/images/test_image.png"
              alt="test"
            >
          </kw-avatar>`;
const googleCode = `
      <kw-avatar
        color="grey-2"
        text-color="blue-7"
        font-size="2rem"
      >
        G
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="red-7"
        font-size="2rem"
      >
        O
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="yellow-7"
        font-size="2rem"
      >
        O
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="blue-7"
        font-size="2rem"
      >
        G
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="green-7"
        font-size="2rem"
      >
        L
      </kw-avatar>
      <kw-avatar
        color="grey-2"
        text-color="red-7"
        font-size="2rem"
      >
        E
      </kw-avatar>`;
const bindingProps = ref(null);
</script>
