<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Carousel
    </h2>
    <p class="kw-guide-description">
      캐로셀
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="carouselProps"
        title="carouselProps"
        :props="{
          fullscreen: { type: Boolean, default: undefined },
          noRouteFullscreenExit: { type: Boolean, default: undefined },
          keepAlive: { type: Boolean, default: undefined },
          keepAliveInclude: { type: [String, Array], default: undefined },
          keepAliveExclude: { type: [String, Array], default: undefined },
          keepAliveMax: { type: Number, default: undefined },
          animated: { type: Boolean, default: undefined },
          infinite: { type: Boolean, default: undefined },
          swipeable: { type: Boolean, default: undefined },
          vertical: { type: Boolean, default: undefined },
          autoplay: { type: [Number, Boolean], default: undefined },
          padding: { type: Boolean, default: undefined },
          arrows: { type: Boolean, default: undefined },
          prevIcon: { type: String, default: undefined },
          nextIcon: { type: String, default: undefined },
          navigation: { type: Boolean, default: undefined },
          navigationPosition: { type: String, default: undefined },
          navigationIcon: { type: String, default: undefined },
          navigationActiveIcon: { type: String, default: undefined },
          thumbnails: { type: Boolean, default: undefined },
          modelValue: { type: [Object, String, Number, Array, Boolean], default: 1 },
          dark: { type: Boolean, default: undefined },
          height: { type: String, default: undefined },
          controlColor: { type: String, default: undefined },
          controlTextColor: { type: String, default: undefined },
          controlType: { type: String, default: undefined },
          transitionPrev: { type: String, default: undefined },
          transitionNext: { type: String, default: undefined },
          transitionDuration: { type: [String, Number], default: undefined },
        }"
      />
      <guide-props
        v-model="slideProps1"
        title="slideProps1"
        :props="{
          name: { type: [Object, String, Number, Array, Boolean], default: 1 },
          imgSrc: { type: Boolean, default: undefined },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="slideProps2"
        title="slideProps2"
        :props="{
          name: { type: [Object, String, Number, Array, Boolean], default: 2 },
          imgSrc: { type: Boolean, default: undefined },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="slideProps3"
        title="slideProps3"
        :props="{
          name: { type: [Object, String, Number, Array, Boolean], default: 3 },
          imgSrc: { type: Boolean, default: undefined },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="controlProps"
        title="controlProps"
        :props="{
          position: { type: String, default: undefined },
          offset: { type: Array, default: undefined },
        }"
      />
      <kw-separator />
      <kw-carousel
        v-bind="carouselProps"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
      >
        <kw-carousel-slide
          v-bind="slideProps1"
        >
          <div
            class="bg-green w500 h500"
          >
            slide1
          </div>
        </kw-carousel-slide>
        <kw-carousel-slide
          v-bind="slideProps2"
        >
          <div class="bg-orange w500 h500">
            slide2
          </div>
        </kw-carousel-slide>
        <kw-carousel-slide
          v-bind="slideProps3"
        >
          <div class="bg-blue w500 h500">
            slide2
          </div>
        </kw-carousel-slide>
        <kw-carousel-control
          v-if="false"
          v-bind="controlProps"
        >
          control
        </kw-carousel-control>
      </kw-carousel>
    </guide-section>
  </kw-page>
</template>

<script setup>
const carouselProps = ref(null);
const slideProps1 = ref(null);
const slideProps2 = ref(null);
const slideProps3 = ref(null);
const controlProps = ref(null);
</script>
