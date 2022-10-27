export interface UseFieldProps {
  /**
   * Form에 등록될 때 사용될 key 값으로 범위 내에서 유일한 값이어야 한다
   */
  name?: string;

  /**
   * 유효성 검사시 표시할 label
   */
  label?: string;

  /**
   * 에러 상태로 지정하는 커스텀 플래그
   * (필요한 경우에만 사용한다)
   */
  error?: boolean;

  /**
   * 에러 상태일 시 표시할 커스텀 메시지
   * (필요한 경우에만 사용한다)
   */
  errorMessage?: string;

  /**
   * 적용할 유효성 규칙
   */
  rules?: string | Object | Function;

  /**
   * 적용된 규칙에 대한 커스텀 메시지
   */
  customMessages?: Object;

  /**
   * onMounted 시에 유효성 검사 수행할지 여부
   */
  validateOnMount?: boolean;

  /**
   * 값이 변경될 시에 유효성 검사 수행할지 여부
   * @defaultValue `true`
   */
  validateOnValueUpdate?: boolean;

  /**
   * 상위 Observer, Form에서 isModified 수행 시 제외할지 여부
   */
  ignoreOnModified?: boolean;

  /**
   * 상위 Observer, Form에서 reset 수행 시 제외할지 여부
   */
  ignoreOnReset?: boolean;
}

export interface UseFieldStyleProps {
  /**
   * 공간을 덜 차지하는 스타일 적용
   */
  dense?: boolean;

  /**
   * 밑줄 라인 스타일 적용
   */
  underline?: boolean;

  /**
   * 테두리가 없는 스타일 적용
   */
  borderless?: boolean;
}

export interface UseFieldInstance {
  /**
   * 컴포넌트를 현재 상태로 초기화 한다
   */
  init: () => Promise<void>;

  /**
   * 컴포넌트를 초기 상태로 돌린다
   * @param shouldFocus 입력 컴포넌트 포커싱 여부
   */
  reset: (shouldFocus?: boolean) => Promise<void>;

  /**
   * 컴포넌트 유효성 검사 상태를 초기화 한다
   */
  resetValidation: () => Promise<void>;

  /**
   * 컴포넌트 유효성 검사를 수행한다
   * @param shouldFocus 유효성 검사 실패시, 입력 컴포넌트 포커싱 여부
   */
  validate: (shouldFocus?: boolean) => Promise<boolean>;

  /**
   * 컴포넌트의 데이터 변경 여부를 반환한다
   */
  isModified: () => boolean;

  /**
   * 컴포넌트의 데이터가 변경되지 않았으면, alert 를 표시한다
   * (데이터가 변경되지 않았으면 true 반환)
   * @param message alert에 표시할 메시지
   * @return { Promise<boolean> } isNotModified
   */
  alertIfIsNotModified: (message?: string) => Promise<boolean>;

  /**
   * 컴포넌트의 데이터가 변경되었으면 confirm 을 표시한다
   * (데이터가 변경되지 않았거나, confirm 에서 확인 선택시 true 반환)
   * @param message confirm 에 표시할 메시지
   * @return { Promise<boolean> } isNotModified || confirm dialog result
   */
  confirmIfIsModified: (message?: string) => Promise<boolean>;

  /**
   * 컴포넌트에 포커싱한다
   */
  focus: () => void;

  /**
   * 컴포넌트에 포커싱 해제
   */
  blur: () => void;
}
