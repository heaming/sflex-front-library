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
        title="KwAvatarProps"
        :props="avatarProps"
      />
      <guide-props
        v-model="bindingAttrs"
        title="Style attrs"
        :props="{
          class: {type: String, default: undefined},
          style: {type: String, default: undefined},
        }"
      />
      <kw-separator />
      <kw-avatar
        v-bind="{...bindingAttrs, ...bindingProps}"
      >
        !
      </kw-avatar>
      <kw-avatar border-color="primary">
        1
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
import KwAvatar from '../../../../../src/components/avatar/KwAvatar.vue';

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

const avatarProps = KwAvatar.props;
const bindingProps = ref(null);
const bindingAttrs = ref(null);
</script>
