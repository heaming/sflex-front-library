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
          imgSrc: { type: String, default: undefined },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="slideProps2"
        title="slideProps2"
        :props="{
          imgSrc: { type: String, default: undefined },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="slideProps3"
        title="slideProps3"
        :props="{
          imgSrc: { type: String, default: undefined },
          disable: { type: Boolean, default: undefined },
        }"
      />
      <guide-props
        v-model="controlProps"
        title="controlProps"
        :props="{
          position: { type: String, default: 'bottom-right' },
          offset: { type: Array, default: () => [18, 18] },
        }"
      />
      <kw-separator />

      <kw-carousel
        ref="carousel"
        v-model="slide"
        v-bind="carouselProps"
        swipeable
        animated
        arrows
        prev-icon="arrow_left"
        next-icon="arrow_right"
        height="300px"
        class="bg-purple text-white rounded-borders"
      >
        <kw-carousel-slide
          :name="slides[0]"
          class="column no-wrap flex-center"
        >
          <kw-avatar>{{ slides[0] }}</kw-avatar>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </kw-carousel-slide>
        <kw-carousel-slide
          :name="slides[1]"
          class="column no-wrap flex-center"
        >
          <kw-avatar>{{ slides[1] }}</kw-avatar>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </kw-carousel-slide>
        <kw-carousel-slide
          :name="slides[2]"
          class="column no-wrap flex-center"
        >
          <kw-avatar>{{ slides[2] }}</kw-avatar>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </kw-carousel-slide>

        <template #control>
          <kw-carousel-control v-bind="controlProps">
            <kw-btn
              color="transparent"
              border-color="transparent"
              text-color="bg-white"
              icon="arrow_left"
              @click="carousel.previous()"
            />
            <kw-btn
              color="transparent"
              border-color="transparent"
              text-color="bg-white"
              icon="arrow_right"
              @click="carousel.next()"
            />
          </kw-carousel-control>
        </template>
      </kw-carousel>
    </guide-section>
  </kw-page>
</template>

<script setup>
const carousel = ref();
const slide = ref(1);
const slides = ref([1, 2, 3]);
const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.';
const carouselProps = ref({
  modelValue: '1',
});
const slideProps1 = ref(null);
const slideProps2 = ref(null);
const slideProps3 = ref(null);
const controlProps = ref(null);
</script>
