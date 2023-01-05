import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QListProps, QListSlots } from 'quasar';
import { VueClassProp, VueStyleProp } from 'quasar/dist/types/api/vue-prop-types';

type FallThroughProps = 'separator' | 'bordered';

interface KwListProps extends Pick<QListProps, FallThroughProps> {
  /**
   * 직계 `KwItem` 컴포넌트를 dense style 로 만든다.
   *
   * @default false
   */
  dense?: boolean | undefined;

  /**
   * 직계 `KwItem` 컴포넌트를 padding style 로 만든다.
   *
   * @default false
   */
  padding?: boolean | undefined;

  /**
   * 전체 선택 `checkbox` `item-section` 및 카운터 `item-section`를 숨긴다.
   * 카운터만 노출하고 싶다면 카운터 슬롯을 쓰자.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @default false
   */
  hideSelectAll?: boolean | undefined;

  /**
   * 선택 된 Item 을 바인딩 하는 모델 props.
   * v-model:selected
   * checkbox 사용 시, Item Key Array, 이 외의 경우 item 차제의 Key 가 업데이트 된다.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see items
   * @see itemKey
   * @see checkbox
   * @see radio
   */
  selected?: Array<object> | object | string | number | undefined;

  /**
   * 리스트로 그릴 item Array 데이터.
   * item slot 에 각 item이 넘어간다.
   *
   * * if you use default Slot, It will ignored. *
   */
  items?: Array<object> | Array<string> | Array<number> | undefined;

  /**
   * Item 을 대표하는 Key 값. 유니크한 것이 좋을 것이다.
   * Item 이 primitive 거나, 해당 키 필드가 없다면 item 내에 없다면, item 자체가 키로 관리된다.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see items
   * @default 'key'
   */
  itemKey?: Array<object> | Array<string> | Array<number> | undefined;

  /**
   * 선택 가능한 `checkbox` 가 포함된 `item-section` 을 표시 할 지 여부,
   * 바인딩 되는 값은 `selected` 로 업데이트 되고,
   * 바인딩 `val` 은 `item` 의 `key` 값이다.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see selected
   * @see itemKey
   * @default false
   */
  checkbox?: boolean | undefined;

  /**
   * 선택 가능한 `radio` 가 포함된 `item-section` 을 표시 할 지 여부,
   * 바인딩 되는 값은 `selected` 로 업데이트 되고,
   * 바인딩 `val` 은 `item` 의 `key` 값이다.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see selected
   * @see itemKey
   * @default false
   */
  radio?: boolean | undefined;

  /**
   * `checkbox` 혹은 `radio` 가 포함된 `item-section` vertical alignment 를 지정.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @default 'top'
   */
  selectAlign?: string | undefined;

  /**
   * 전체 선택 `checkbox` 가 포함 된 `item-section` vertical alignment 를 지정.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @default 'center'
   */
  selectAllAlign?: string | undefined;

  /**
   * 내부에 그려질 `kw-item` 에 연결되는 값.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see kw-item tag props
   */
  itemTag?: string | undefined;

  /**
   * 아이템이 없을 떄 표시할 값.
   * 높이가 지정되어야 한다.
   *
   * 아니면 placeholder slot 을 쓰자.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see items
   */
  placeholder?: string | undefined;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean | undefined;

  /**
   * 내부에 그려질 `kw-item` 에 연결되는 값.
   * 기본 클릭 이벤트 핸들러가 지정되어 있으며, 덮어쓰고 싶다면 @click-item 에 함수를 사용.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see onClickItem
   */
  clickable?: boolean | undefined;

  /**
   * 내부에 그려질 `kw-item` 에 연결되는 값
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see onClickItem
   */
  itemClass?: VueClassProp | undefined;

  /**
   * 내부에 그려질 `kw-item` 에 연결되는 값
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see onClickItem
   */
  itemStyle?: VueStyleProp | undefined;

  /**
   * 내부에 그려질 `kw-item` 에 연결되는 값.
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see onClickItem
   */
  activeClass?: string | undefined;

  /**
   * clickable 이 true 일 때, 'item' 클릭시 발생하는 event emit.
   * 기본 이벤트 핸들러는 아이템을 activate 하고,
   * `item` 이 선택 가능 할 때, 곧, 'checkbox' or 'radio' 일 때,
   * 해당 item 을 선택하고 `selected` 를 업데이트 한다.
   *
   * payload: item
   *
   * * if you use default Slot, It will ignored. *
   *
   * @see clickable
   * @see checkbox
   * @see radio
   * @param item
   */
  onClickItem?: (item: object | string | number) => void;
}

interface KwListSlots extends QListSlots {
  /**
   * 기본 컨텐츠 영역
   *
   * 선택 기능을 사용하지 않고 kw-item 부터 직접 그리고 싶은 경우 사용한다.
   */
  default: () => VNode[];

  /**
   * 파일 아이템 이름과 기능 버튼 사이의 영역
   */
  counter: (scope: {
    /**
     * 선택된 item key Array
     */
    selected: Array<object> | object | string | number | undefined;
  }) => VNode[];

  /**
   * 전체 선택과 카운터 뒤 쪽 side section 내부
   * 버튼을 넣고 싶을 수 있다.
   */
  action: () => VNode[];

  /**
   * 각 아이템을 표현한다. kw-item-section 들로 감싸서 그리는 것을 기본 사용으로 한다.
   */
  item: (scope: { item: object | string | number }) => VNode[];

  /**
   * placeholder 영역
   */
  placeholder: () => VNode[];
}

export interface KwList extends ComponentPublicInstance<KwListProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwList: GlobalComponentConstructor<KwListProps, KwListSlots>;
  }
}
