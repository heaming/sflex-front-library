<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [MOBILE] Carousel
    </h2>
    <guide-history-view :items="historyData" />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              the Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-carousel
            </td>
            <td>
              class="kw-carousel--counter"
            </td>
            <td>
              counter on the right side
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Carousel
      </h3>

      <p class="kw-guide-description">
        This is for the counter on the right side<br> Add the class <b>kw-carousel--counter</b> in kw-carousel<br>
        Add kw-carousel-control as example code.<br>
        <em># Notice</em><br>
        <b>PLEASE, Add the comment part of kw-carousel-slide everytime!</b><br>
        This is for none of added product in the list, copy it included in korea text.<br>
        <a href="https://zpl.io/Q0xrRnA"> This is form the reference design in Zeplin</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-carousel
            ref="carousel"
            v-model="slide"
            infinite
            class="kw-carousel--counter"
          >
            <template #control>
              <kw-carousel-control
                class="row justify-between items-center kw-fc--black1"
              >
                <div class="row items-center">
                  <h3>상품내역</h3>
                  <p class="kw-fc--black2 kw-font-dense ml4">
                    (선택한 상품 5개)
                  </p>
                </div>
                <div class="row items-center">
                  <kw-btn
                    borderless
                    class="h16"
                    icon="arrow_left"
                    style="font-size: 16px;"
                    @click="$refs.carousel.previous()"
                  />
                  <p class="kw-font-dense mx8">
                    <span class="kw-fc--positive">{{ slide }}</span>/{{ slideData.length }}
                  </p>
                  <kw-btn
                    borderless
                    class="h16"
                    icon="arrow_right"
                    style="font-size: 16px;"
                    @click="$refs.carousel.next()"
                  />
                </div>
              </kw-carousel-control>
            </template>

            <kw-carousel-slide
              v-for="( item, i ) in slideData"
              :key="i"
              :name="item.name"
            >
              <div
                class="kw-bc--bg-box pa16"
              >
                <div class="row no-wrap justify-between full-width">
                  <div class="column">
                    <p>{{ item.title }}</p>
                    <p class="kw-fc--placeholder kw-font-dense">
                      {{ item.number }}
                    </p>
                  </div>
                  <kw-chip :label="item.chip" />
                </div>
                <kw-separator spaced="12px" />
                <kw-form dense>
                  <kw-form-item
                    label="상품수량"
                    class="text-right"
                  >
                    <p>{{ item.productAmount }}</p>개
                  </kw-form-item>
                </kw-form>
              </div>
            </kw-carousel-slide>
            <!-- If None of added product, add this one/ 상품없을 때 slide="0" -->
            <kw-carousel-slide
              v-if="!slideData.length && !slide"
              :name="0"
            >
              <div class="kw-carousel__placeholder">
                선택한 상품이 없습니다.
              </div>
            </kw-carousel-slide>
            <!--// If None of added product, add this one/ 상품없을 때  slide="0" -->
          </kw-carousel>
        </div>
        <guide-code-view
          :code-value="[case1,caseScript1]"
          :lang="['vue','script']"
          multi
        />
      </q-card>
    </div>

    <!-- <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Normal Carousel
      </h3>

      <p class="kw-guide-description">
        <em># group="list-group"</em><br>
        same name in group is when one of expansions is opened, the other expansions are closed<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="pa20">
            <kw-carousel
              v-model="slide"
              infinite
              arrows
            >
              <kw-carousel-slide
                v-for="( item, i ) in slideData"
                :key="i"
                :name="item.name"
                :img-src="item.src"
              >
                <div class="kw-carousel-slide-caption">
                  <p>{{ item.title }}</p>
                </div>
              </kw-carousel-slide>
            </kw-carousel>
          </div>
          <div class="row justify-center full-width pb30">
            <p class="kw-font-dense">
              <span class="kw-fc--positive">{{ slide }}</span>/{{ slideData.length }}
            </p>
          </div>
        </div>
        <guide-code-view
          :code-value="[case1,caseScript1]"
          :lang="['vue','script']"
          multi
        />
      </q-card>
    </div> -->
  </kw-page>
</template>

<script setup>
const slide = ref(1);
const slideData = [
  {
    name: 1,
    title: '드레서 대용량크리스탈미러(DF10A9500CG)',
    chip: '렌탈',
    number: '2022-0509123',
    productAmount: '1',
    src: 'https://cdn.quasar.dev/img/mountains.jpg',
  },
  {
    name: 2,
    title: '드레서 대용량(DF10A9500CG)',
    chip: '렌탈',
    number: '2022-0509123',
    productAmount: '3',
    src: 'https://cdn.quasar.dev/img/mountains.jpg',
  },
];

const case1 = `
<kw-carousel
  ref="carousel"
  v-model="slide"
  infinite
  class="kw-carousel--counter"
>
  <template #control>
    <kw-carousel-control
      class="row justify-between items-center kw-fc--black1"
    >
      <div class="row items-center">
        <h3>상품내역</h3>
        <p class="kw-fc--black2 kw-font-dense ml4">
          (선택한 상품 5개)
        </p>
      </div>
      <div class="row items-center">
        <kw-btn
          borderless
          class="h16"
          icon="arrow_left"
          style="font-size: 16px;"
          @click="$refs.carousel.previous()"
        />
        <p class="kw-font-dense mx8">
          <span class="kw-fc--positive">{{ slide }}</span>/{{ slideData.length }}
        </p>
        <kw-btn
          borderless
          class="h16"
          icon="arrow_right"
          style="font-size: 16px;"
          @click="$refs.carousel.next()"
        />
      </div>
    </kw-carousel-control>
  </template>

  <kw-carousel-slide
    v-for="( item, i ) in slideData"
    :key="i"
    :name="item.name"
  >
    <div
      class="kw-bc--bg-box pa16"
    >
      <div class="row no-wrap justify-between full-width">
        <div class="column">
          <p>{{ item.title }}</p>
          <p class="kw-fc--placeholder kw-font-dense">
            {{ item.number }}
          </p>
        </div>
        <kw-chip :label="item.chip" />
      </div>
      <kw-separator spaced="12px" />
      <kw-form dense>
        <kw-form-item
          label="상품수량"
          class="text-right"
        >
          <p>{{ item.productAmount }}</p>개
        </kw-form-item>
      </kw-form>
    </div>
  </kw-carousel-slide>
  <!-- If None of added product, add this one/ 상품없을 때 slide="0" -->
  <kw-carousel-slide
    v-if="!slideData.length && !slide"
    :name="0"
  >
    <div class="kw-carousel__placeholder">
      선택한 상품이 없습니다.
    </div>
  </kw-carousel-slide>
  <!--// If None of added product, add this one/ 상품없을 때  slide="0" -->
</kw-carousel>
`;
const caseScript1 = `
const slide = ref(1);
const slideData = [
  {
    name: 1,
    title: '드레서 대용량크리스탈미러(DF10A9500CG)',
    chip: '렌탈',
    number: '2022-0509123',
    productAmount: '1',
  },
  {
    name: 2,
    title: '드레서 대용량(DF10A9500CG)',
    chip: '렌탈',
    number: '2022-0509123',
    productAmount: '3',
  },
];

`;
const historyData = [
  {
    timestamp: '2022-01-16',
    text: 'First added',
  },
];

</script>

<style lang="scss" scoped>

</style>
