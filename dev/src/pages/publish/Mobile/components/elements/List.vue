<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] List
    </h2>
    <guide-history-view :items="historyData" />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Summary
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
            <td rowspan="6">
              kw-list
            </td>
            <td>
              v-model:selected="arrModel"<br>
            </td>
            <td>
              arrModel for selected radio or checkbox
            </td>
          </tr>
          <tr>
            <td>
              separator
            </td>
            <td>
              seperator between kw-item
            </td>
          </tr>
          <tr>
            <td>
              item-padding/ item-padding=""
            </td>
            <td>
              default top and bottom of kw-item: 16px,
            </td>
          </tr>
          <tr>
            <td>
              checkbox or radio
            </td>
            <td>
              add checkbox or radio,
            </td>
          </tr>
          <tr>
            <td>
              hide-select-all
              clickable
            </td>
            <td>
              default: false/ Add it, hide the select all button
              add it as default all time
            </td>
          </tr>
          <tr>
            <td>
              clickable
            </td>
            <td>
              add it as default all time
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              kw-item-section
            </td>
            <td>top/ center / bottom</td>
            <td>adjust the location</td>
          </tr>
          <tr>
            <td>side</td>
            <td>create flexible space width padding 8px </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Radio, Checkbox and checkbox select all
      </h3>

      <div class="kw-guide-description">
        <em># Add radio or checkbox in list</em><br>
        default: false.<br>
        Make it as true , add "radio" or "checkbox" in kw-list<br>
        <em># hide-select-all</em><br>
        default: false<br>
        Make it as true when use it with checkbox, add <b>"hide-select-all"</b><br>
        <em># align for radio or checkbox </em><br>
        select-align="bottom" (top, center and bottom -default:top)<br>
        Add <b>select-align="bottom"</b> in kw-list.<br>
        <em># align for radio or checkbox </em><br>
        select-all-align="center" (top, center and bottom -default:center)<br>
        Add <b>select-all-align="bottom"</b> in kw-list.<br>
      </div>
      <q-card>
        <div class="kw-guide-example">
          <h3 class="my15">
            checkbox
          </h3>
          <kw-list
            v-model:selected="arrModel"
            :items="items"
            separator
            checkbox
            hide-select-all
            clickable
            item-key="id"
            item-padding
          >
            <template #item="{ item }">
              <kw-item-section
                center
              >
                <kw-item-label>
                  {{ item.title }}
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  class="text-primary"
                >
                  {{ item.addressCode }}
                </kw-item-label>
                <kw-item-label>
                  {{ item.address }}
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  lines="2"
                >
                  {{ item.addressDetail }}
                </kw-item-label>
              </kw-item-section>
            </template>
          </kw-list>
          <h3 class="my15">
            checkbox with select all
          </h3>
          <kw-list
            v-model:selected="arrModel1"
            :items="items"
            separator
            item-padding
            checkbox
            clickable
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section>
                <kw-item-label>
                  {{ item.title }}
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  class="text-primary"
                >
                  {{ item.addressCode }}
                </kw-item-label>
                <kw-item-label>
                  {{ item.address }}
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  lines="2"
                >
                  {{ item.addressDetail }}
                </kw-item-label>
              </kw-item-section>
            </template>
          </kw-list>
          <h3 class="my15">
            Radio
          </h3>
          <kw-list
            v-model:selected="arrModel2"
            :items="items"
            separator
            item-padding
            radio
            hide-select-all
            clickable
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section>
                <kw-item-label>
                  {{ item.title }}
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  class="text-primary"
                >
                  {{ item.addressCode }}
                </kw-item-label>
                <kw-item-label>
                  {{ item.address }}
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  lines="2"
                >
                  {{ item.addressDetail }}
                </kw-item-label>
              </kw-item-section>
            </template>
          </kw-list>
        </div>

        <guide-code-view
          :code-value="[case1, script1]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        padding and seperator
      </h3>

      <p class="kw-guide-description">
        item-padding is 16px for kw-item. <br>
        If you want to add the other padding between kw-item,
        use helper class in kw-item-section amd remove padding props from kw-list.<br>
        No need to add seperator, Remove 'seperator' from kw-list
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h3 class="my15">
            padding and seperator
          </h3>
          <kw-list
            :items="items"
            separator
            item-padding
            clickable
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section
                top
                side
              >
                <kw-item-label>
                  {{ item.title }}
                </kw-item-label>
              </kw-item-section>
            </template>
          </kw-list>
          <h3 class="my15">
            no padding and seperator /add "my20" as helper class
          </h3>
          <kw-list
            :items="items"
            clickable
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section
                top
                side
                class="my20"
              >
                <kw-item-label>
                  {{ item.title }}
                </kw-item-label>
              </kw-item-section>
            </template>
          </kw-list>
        </div>
        <guide-code-view
          :code-value="[case2, script1]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        section/ kw-item-label
      </h3>

      <p class="kw-guide-description">
        <em># section - side props</em><br>
        <b>Side in kw-item-section</b> : It's made flexible width.<br>
        Add it on left side, it has padding-right: 8px<br>
        Add it on right side, it has padding-left: 8px<br>
        <b>no side in kw-item-section</b> : it's the rest of space except of side props in kw-item-section.<br>
        And divide the rest of space equally<br>
        <em># section - top/center/bottom</em><br>
        default: center <br>
        Adjust the content to top / center / bottom<br>
        <em># kw-item-label</em><br>
        use it with font="caption"<br>
        use it with line="1", adjust the shown line.<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h3 class="my15">
            two side and one of default section
          </h3>
          <kw-list
            :items="items2"
            separator
            padding
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section
                side
              >
                side
              </kw-item-section>
              <kw-item-section
                center
                class="kw-bc--line-bg pa10"
              >
                <kw-item-label>
                  <span>{{ item.text }}</span>
                </kw-item-label>
              </kw-item-section>
              <kw-item-section
                side
              >
                side
              </kw-item-section>
            </template>
          </kw-list>
          <h3 class="my15">
            two side and one two of default sections
          </h3>
          <kw-list
            :items="items2"
            separator
            padding
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section
                side
              >
                side<br>(padding-right:8px)
              </kw-item-section>
              <kw-item-section
                center
                class="kw-bc--line-bg pa10"
              >
                <kw-item-label>
                  <span>{{ item.text }}</span>
                </kw-item-label>
              </kw-item-section>
              <kw-item-section
                class="kw-bc--line-bg pa10"
              >
                <kw-item-label>
                  <span>{{ item.text }}</span>
                </kw-item-label>
              </kw-item-section>
              <kw-item-section
                side
              >
                side<br>(padding-left:8px)
              </kw-item-section>
            </template>
          </kw-list>

          <h3 class="my15">
            top / center / bottom
          </h3>
          <kw-list
            :items="items2"
            separator
            padding
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section
                top
              >
                top
              </kw-item-section>
              <kw-item-section
                class="kw-bc--line-bg py20 px10"
              >
                <kw-item-label>
                  <span>{{ item.text }}</span>
                  default:center
                </kw-item-label>
              </kw-item-section>
              <kw-item-section
                bottom
              >
                bottom
              </kw-item-section>
            </template>
          </kw-list>
          <h3 class="my15">
            kw-item-label
          </h3>
          <kw-list
            :items="items2"
            separator
            padding
            clickable
            item-key="id"
          >
            <template #item="{ item }">
              <kw-item-section center>
                <kw-item-label>
                  line="2"
                </kw-item-label>
                <kw-item-label
                  font="caption"
                  lines="2"
                >
                  {{ item.lorem }}
                </kw-item-label>
                <kw-item-label>
                  line="1"
                </kw-item-label>
                <kw-item-label
                  lines="1"
                >
                  {{ item.lorem }}
                </kw-item-label>
              </kw-item-section>
            </template>
          </kw-list>
        </div>
        <guide-code-view
          :code-value="[case3, script3]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        div
      </h3>

      <p class="kw-guide-description">
        If it's hard to make with kw-item-section and kw-item-label, it's okay to make with 'div'tag
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h3 class="my15">
            div
          </h3>
          <kw-list
            :items="items2"
            separator
            padding
            item-key="id"
          >
            <template #item="{ item }">
              <div class="w120">
                <img
                  :src="item.src"
                  alt="img"
                  class="w100"
                >
              </div>
              <div
                class="row justify-between"
                style="width: 100%;"
              >
                <div>
                  <p>
                    p tag
                  </p>
                  <span>{{ item.title }}</span>
                </div>
                <kw-chip
                  label="완료"
                  color="primary"
                  outline
                />
              </div>
            </template>
          </kw-list>
        </div>
        <guide-code-view
          :code-value="[case4, script3]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <!-- <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        검색결과 없을 때
      </h3>

      <q-card>
        <div class="kw-guide-example">
          <kw-list
            v-model:selected="arrModel"
            :items="items22"
            separator
            padding
            checkbox
            hide-select-all
            clickable
            item-key="id"
          >
            <template #placeholder>
              {{ placeholde }}
            </template>
          </kw-list>
        </div>
      </q-card>
    </div> -->
  </kw-page>
</template>

<script setup>
const case1 = `
<h3 class="my15">
  checkbox
</h3>
<kw-list
  v-model:selected="arrModel"
  :items="items"
  separator
  padding
  checkbox
  hide-select-all
  clickable
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section
      center
    >
      <kw-item-label>
        {{ item.title }}
      </kw-item-label>
      <kw-item-label
        font="caption"
        class="text-primary"
      >
        {{ item.addressCode }}
      </kw-item-label>
      <kw-item-label>
        {{ item.address }}
      </kw-item-label>
      <kw-item-label
        font="caption"
        lines="2"
      >
        {{ item.addressDetail }}
      </kw-item-label>
    </kw-item-section>
  </template>
</kw-list>
<h3 class="my15">
  checkbox with select all
</h3>
<kw-list
  v-model:selected="arrModel"
  :items="items"
  separator
  padding
  checkbox
  clickable
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section>
      <kw-item-label>
        {{ item.title }}
      </kw-item-label>
      <kw-item-label
        font="caption"
        class="text-primary"
      >
        {{ item.addressCode }}
      </kw-item-label>
      <kw-item-label>
        {{ item.address }}
      </kw-item-label>
      <kw-item-label
        font="caption"
        lines="2"
      >
        {{ item.addressDetail }}
      </kw-item-label>
    </kw-item-section>
  </template>
</kw-list>
<h3 class="my15">
  Radio
</h3>
<kw-list
  v-model:selected="arrModel"
  :items="items"
  separator
  padding
  radio
  hide-select-all
  clickable
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section>
      <kw-item-label>
        {{ item.title }}
      </kw-item-label>
      <kw-item-label
        font="caption"
        class="text-primary"
      >
        {{ item.addressCode }}
      </kw-item-label>
      <kw-item-label>
        {{ item.address }}
      </kw-item-label>
      <kw-item-label
        font="caption"
        lines="2"
      >
        {{ item.addressDetail }}
      </kw-item-label>
    </kw-item-section>
  </template>
</kw-list>
`;

const script1 = `
const arrModel = ref([]);

const items = ref([
  {
    id: '1', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '2', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '3', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
]);
`;

const case2 = `
<h3 class="my15">
  padding and seperator
</h3>
<kw-list
  :items="items"
  separator
  padding
  clickable
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section
      top
      side
    >
      <kw-item-label>
        {{ item.title }}
      </kw-item-label>
    </kw-item-section>
  </template>
</kw-list>
<h3 class="my15">
  no padding and seperator /add "my20" as helper class
</h3>
<kw-list
  :items="items"
  clickable
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section
      top
      side
      class="my20"
    >
      <kw-item-label>
        {{ item.title }}
      </kw-item-label>
    </kw-item-section>
  </template>
</kw-list>
`;

const script3 = `
const items2 = ref([
  {
    id: '1', text: 'text', src: 'https://cdn.quasar.dev/img/mountains.jpg' },
]);
`;
const case3 = `
<h3 class="my15">
  two side and one of default section
</h3>
<kw-list
  :items="items2"
  separator
  padding
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section
      side
    >
      side
    </kw-item-section>
    <kw-item-section
      center
      class="kw-bc--line-bg pa10"
    >
      <kw-item-label>
        <span>{{ item.text }}</span>
      </kw-item-label>
    </kw-item-section>
    <kw-item-section
      side
    >
      side
    </kw-item-section>
  </template>
</kw-list>
<h3 class="my15">
  two side and one two of default sections
</h3>
<kw-list
  :items="items2"
  separator
  padding
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section
      side
    >
      side<br>(padding-right:8px)
    </kw-item-section>
    <kw-item-section
      center
      class="kw-bc--line-bg pa10"
    >
      <kw-item-label>
        <span>{{ item.text }}</span>
      </kw-item-label>
    </kw-item-section>
    <kw-item-section
      class="kw-bc--line-bg pa10"
    >
      <kw-item-label>
        <span>{{ item.text }}</span>
      </kw-item-label>
    </kw-item-section>
    <kw-item-section
      side
    >
      side<br>(padding-left:8px)
    </kw-item-section>
  </template>
</kw-list>

<h3 class="my15">
  top / center / bottom
</h3>
<kw-list
  :items="items2"
  separator
  padding
  item-key="id"
>
  <template #item="{ item }">
    <kw-item-section
      top
    >
      top
    </kw-item-section>
    <kw-item-section
      class="kw-bc--line-bg py20 px10"
    >
      <kw-item-label>
        <span>{{ item.text }}</span>
        default:center
      </kw-item-label>
    </kw-item-section>
    <kw-item-section
      bottom
    >
      bottom
    </kw-item-section>
  </template>
</kw-list>
`;
const case4 = `
<h3 class="my15">
    div
  </h3>
  <kw-list
    :items="items2"
    separator
    padding
    item-key="id"
  >
    <template #item="{ item }">
      <div class="w120">
        <img
          :src="item.src"
          alt="img"
          class="w100"
        >
      </div>
      <div
        class="row justify-between"
        style="width: 100%;"
      >
        <div>
          <p>
            p tag
          </p>
          <span>{{ item.title }}</span>
        </div>
        <kw-chip
          label="완료"
          color="primary"
          outline
        />
      </div>
    </template>
  </kw-list>
`;
const arrModel = ref([]);
const arrModel1 = ref([]);
const arrModel2 = ref([]);
const items = ref([
  {
    id: '1', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)', src: 'https://cdn.quasar.dev/img/mountains.jpg' },
  { id: '2', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)', src: 'https://cdn.quasar.dev/img/mountains.jpg' },
  { id: '3', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)', src: 'https://cdn.quasar.dev/img/mountains.jpg' },
]);
// const placeholde = '검색결과 없습니다';
const items2 = ref([
  {
    id: '1', text: 'text', src: 'https://cdn.quasar.dev/img/mountains.jpg', lorem: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Molestiae autem, illo error nesciunt unde consequuntur atque incidunt, aliquid voluptates tempora veritatis! A illo velit, vitae laudantium tempora incidunt voluptatum quas?' },
]);
const historyData = [
  {
    timestamp: '2022-12-08',
    text: 'First added',
  },
];

</script>
