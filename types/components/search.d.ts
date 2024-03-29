import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseObserverProps, UseObserverInstance } from './private/useObserver';

// KwSearch
interface KwSearchProps extends UseObserverProps {
  /**
   * 행에서 설정되는 컬럼 갯수 (행의 cols가 지정되면 행의 값을 우선한다)
   * @defaultValue `3`
   */
  cols?: number;

  /**
   * 아이템 라벨 사이즈 (행의 labelSize가 지정되면 행의 값을 우선한다)
   * @defaultValue `120`
   */
  labelSize?: number;

  /**
   * 아이템의 필드 영역 컨텐츠 정렬 값 (행이나 아이템에 alignContent가 있으면 해당 값을 우선한다)
   * @defaultValue `left`
   */
  alignContent?: 'left' | 'center' | 'right';

  /**
   * 기본으로 보여줄 행 갯수 (expandable 기준이 되는 행 갯수)
   * @defaultValue `2`
   */
  defaultVisibleRows?: number;

  /**
   * 마운트 시 첫 입력 컴포넌트에 포커스할지 여부
   * @defaultValue `false`
   */
  autofocus?: boolean;

  /**
   * 설정시 에러가 발생한 입력 컴포넌트에 포커싱하지 않는다
   * @defaultValue `false`
   */
  noErrorFocus?: boolean;

  /**
   * 설정시 초기화할 경우 입력 컴포넌트에 포커싱하지 않는다
   * @defaultValue `true`
   */
  noResetFocus?: boolean;

  /**
   * 초기화 버튼 미사용 여부
   * @defaultValue `false`
   */
  noResetBtn?: boolean;

  /**
   * `KwObserver, KwForm, KwGrid, KwTreeGrid` name 속성 값이 들어간다.
   *
   * 설정시 타겟들의 데이터 변경 여부를 확인해서, 검색 이벤트를 발생시킬지 결정하는 confirm을 호출한다
   */
  modifiedTargets?: string[];

  /**
   * Observer에서 하위 ObserverChild의 변경여부를 확인할 때, 무시할지 여부
   * @defaultValue `true`
   */
  ignoreOnModified?: boolean;

  /**
   * Observer에서 하위 ObserverChild를 reset할 때, 무시할지 여부
   * @defaultValue `true`
   */
  ignoreOnReset?: boolean;

  /**
   * 검색 이벤트
   * @param values 검색 입력 필드들의 values
   */
  onSearch?: (values: { [name: string]: any }) => void;

  /**
   * 검색 입력 필드 초기화 이벤트
   */
  onReset?: () => void;
}
interface KwSearchSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];

  /**
   * 액션 버튼 영역
   */
  action: () => VNode[];
}
export interface KwSearch extends ComponentPublicInstance<KwSearchProps>, UseObserverInstance {}

// KwSearchRow
interface KwSearchRowProps {
  /**
   * 행에서 설정되는 컬럼 갯수
   */
  cols?: number;

  /**
   * 아이템 라벨 사이즈
   */
  labelSize?: number;

  /**
   * 아이템의 필드 영역 컨텐츠 정렬 값 (아이템에 alignContent가 있으면 해당 값을 우선한다)
   */
  alignContent?: 'left' | 'center' | 'right';
}
interface KwSearchRowSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwSearchRow extends ComponentPublicInstance<KwSearchRowProps> {}

// KwSearchItem
interface KwSearchItemProps {
  /**
   * 라벨에 들어갈 컨텐츠
   */
  label?: string;

  /**
   * 지정시 라벨 영역을 렌더링하지 않는다
   */
  noLabel?: boolean;

  /**
   * 라벨 힌트
   */
  hint?: string;

  /**
   * 아이템의 필드 영역 컨텐츠 정렬 값
   */
  alignContent?: 'left' | 'center' | 'right';

  /**
   * 아이템이 차지할 영역 colspan
   * @defaultValue `1`
   */
  colspan?: number;

  /**
   * 라벨 필수 여부
   */
  required?: boolean;
}
interface KwSearchItemSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];

  /**
   * 라벨 영역, noLabel 지정시 표시되지 않는다
   */
  label: () => VNode[];

  /**
   * 힌트 영역, hint가 지정되어야 표시된다
   */
  hint: () => VNode[];
}
export interface KwSearchItem extends ComponentPublicInstance<KwSearchItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSearch: GlobalComponentConstructor<KwSearchProps, KwSearchSlots>;
    KwSearchRow: GlobalComponentConstructor<KwSearchRowProps, KwSearchRowSlots>;
    KwSearchItem: GlobalComponentConstructor<KwSearchItemProps, KwSearchItemSlots>;
  }
}
