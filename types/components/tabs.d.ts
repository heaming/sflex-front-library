import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QTabsProps } from 'quasar';

type FallThroughProps = 'vertical' | 'outsideArrows' | 'mobileArrows' | 'activeColor' | 'activeBgColor' | 'indicatorColor' | 'contentClass' | 'activeClass' | 'leftIcon' | 'rightIcon' | 'switchIndicator' | 'narrowIndicator' | 'inlineLabel' | 'onUpdate:modelValue';

// KwTabs
interface KwTabsProps extends Pick<QTabsProps, FallThroughProps> {
  /**
   * 현재 선택된 탭의 name 값을 바인딩 하는 값.
   * @example v-model="selectedTab"
   */
  modelValue?: number | string;

  /**
   * tab 들을 어떻게 배치할 지 지정한다.
   *
   * !전체적인 content 외부 스타일링을 위해 전체적인 레이아웃이 바뀌어서 커스텀 됨.
   *
   * @default left
   */
  align?: 'left' | 'center' | 'right' | 'start' | 'end' | 'justify';

  /**
   * dense 스타일로 표시한다.
   * font 가 작아지고, 높이가 줄어들고 기본 패딩이 사라진다.
   *
   * tab 모양에도 영향을 미친다.
   *
   * @default left
   */
  dense?: boolean | undefined;

  /**
   * Tabs 영역 내부에 스크롤링이 일어났을 떄, 곧 탭이 주어진 공간보다 많을 때, 좌측 스크롤 이동 버튼의 아이콘을 지정한다.
   * 모바일에서는 터치 이벤트로 스크롤 하는 것이 기본으로, mobileArrows 없이는 표기되지 않는다.
   *
   * @default 'arrow_left'
   * @see outsideArrows
   * @see mobileArrows
   */
  leftIcon?: string | undefined;

  /**
   * Tabs 영역 내부에 스크롤링이 일어났을 떄, 곧 탭이 주어진 공간보다 많을 때, 우측 스크롤 이동 버튼의 아이콘을 지정한다.
   * 모바일에서는 터치 이벤트로 스크롤 하는 것이 기본으로, mobileArrows 없이는 표기되지 않는다.
   *
   * @default 'arrow_right'
   * @see outsideArrows
   * @see mobileArrows
   */
  rightIcon?: string | undefined;

  /**
   * 퀘이사 기본 인디케이터를 표시한다.
   * 현재 스타일과 상당히 조화롭지 않으니, 스타일을 대거 수정할 것이 아니면 사용하지 않도록 하자.
   * 쓰고 싶다면 border 를 그리는 혹은 비슷하게 표시하는 관련한 스타일을 전부 제거하고 사용하자.
   */
  indicator?: string | undefined;

  /**
   * Tab 의 text color 를 지정한다.
   */
  color?: string | undefined;

  /**
   * Tab 의  background-color 를 지정한다.
   */
  bgColor?: string | undefined;

  /**
   * Tab 의  border-color 를 지정한다.
   */
  borderColor?: string | undefined;

  /**
   * 활성화 된 Tab 의  border-color 를 지정한다.
   */
  activeBorderColor?: string | undefined;

  /**
   * 프로젝트에서 원하는 스타일이다.
   *
   * 해당 위치에 있는 패녈과 선택된 탭을 연결된 느낌을 준다.
   *
   * @default 'bottom'
   */
  activeLine?: 'bottom' | 'top' | 'left' | 'right' | undefined;

  /**
   * 기본 패딩을 없엔다.
   */
  noPadding?: boolean | undefined;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: any) => void;
}
interface KwTabsSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwTabs extends ComponentPublicInstance<KwTabsProps> {}

// KwTab
interface KwTabProps {
  /**
   * modelValue 키 값으로 사용된다
   */
  name?: number | string;

  /**
   * 탭 라벨
   */
  label?: string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string;
}
interface KwTabSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwTab extends ComponentPublicInstance<KwTabProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTabs: GlobalComponentConstructor<KwTabsProps, KwTabsSlots>;
    KwTab: GlobalComponentConstructor<KwTabProps, KwTabSlots>;
  }
}
