import { UseDense } from './useDense';
import { UseStretch } from './UseStretch';

/**
 * 추가 시, opacity 가 0 인 색을 지정 할 것.
 */
type semanticColor = 'error' | 'black1' | 'black2' | 'normal-text' | 'black3' | 'disabled' | 'black-btn-line' | 'placeholder' | 'line-stroke' | 'line-line' | 'line-bg' | 'bg-white' | 'bg-box' | 'bg-body' | 'primary' | 'secondary' | 'accent' | 'dark' | 'positive' | 'negative' | 'info' | 'warning' | 'bg-grid';

export interface UseBtnStyleProps extends UseDense, UseStretch {
  /**
   * content 영역 '좌우' padding 크기를 지정한다.
   * @example '12px'
   * @see dense
   */
  padding?: string;

  /**
   * 버튼의 최소 너비를 지정한다.
   * @example '90px'
   * @see padding
   * @see dense
   */
  minWidth?: string;

  /**
   * 버튼 디자인 속성.
   *
   * 테두리가 없지만 배경색은 있는 스타일
   *
   * @see underline
   * @see borderless
   * @see outlined
   */
  filled?: string;

  /**
   * 버튼 디자인 속성.
   *
   * 텍스트 underline 이 적용된 버튼,
   *
   * field 와는 달리 버튼 크기는 사이즈가 font style 을 따라간다.
   *
   * @see filled
   * @see borderless
   * @see outlined
   */
  underline?: string;

  /**
   * 버튼 디자인 속성.
   *
   * 버튼 테두리와 기본 패딩이 없는 버튼,
   *
   * 특정한 버튼 스타일링시 기본 값으로 사용하기 좋다.
   *
   * @see filled
   * @see borderless
   * @see outlined
   */
  borderless?: string;

  /**
   * 버튼 디자인 속성.
   *
   * 테두리와 배경이 있는 기본 버튼 스타일
   *
   * @see filled
   * @see borderless
   * @see outlined
   */
  outlined?: string;

  /**
   * 버튼 색 속성.
   *
   * 버튼의 배경 색을 지정한다.
   */
  color?: semanticColor;

  /**
   * 버튼 색 속성.
   *
   * 문자 색을 지정한다.
   */
  textColor?: semanticColor;

  /**
   * 버튼 색 속성.
   *
   * 테두리 색을 지정한다.
   */
  borderColor?: semanticColor;

  /**
   * 버튼 스타일 프리셋 alias
   * 프리셋 props 가 기억이 안날 수 있다.
   * 해당 타입 보고 참고하자.
   * preset = "primary" 는 primary 와 같다.
   */
  preset?: 'primary' | 'negative' | 'secondary' | 'gridAction';

  /**
   * 버튼 스타일 프리셋: 색 속성, 디자인 속성으로 변형 가능하다.
   * 메인 동작 기본 스타일 프리셋.
   */
  primary?: boolean;

  /**
   * 버튼 스타일 프리셋: 색 속성, 디자인 속성으로 변형 가능하다.
   * 취소, 이전 등 부정 스타일 프리셋.
   */
  negative?: boolean;

  /**
   * 버튼 스타일 프리셋: 색 속성, 디자인 속성으로 변형 가능하다.
   * 기본 버튼 스타일 프리셋.
   */
  secondary?: boolean;

  /**
   * 버튼 스타일 프리셋: 색 속성, 디자인 속성으로 변형 가능하다.
   * action bar 내부 기본 버튼 스타일 프리셋.
   */
  gridAction?: boolean;
}
