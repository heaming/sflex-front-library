export interface UseObserverProps {
  /**
   * Observer에 등록할 떄 key 값으로 사용된다.
   */
  name?: string;

  /**
   * Observer에서 하위 ObserverChild의 변경여부를 확인할 때, 무시할지 여부
   */
  ignoreOnModified?: boolean;

  /**
   * Observer에서 하위 ObserverChild를 reset할 때, 무시할지 여부
   */
  ignoreOnReset?: boolean;
}

export interface UseObserverInstance {
  /**
   * 하위 Observer, Form, Grid를 현재 상태로 초기화 한다
   */
  init: () => Promise<void>;

  /**
   * 하위 Observer, Form, Grid를 초기 상태로 돌린다
   * @param shouldFocus 입력 컴포넌트 포커싱 여부
   */
  reset: (shouldFocus?: boolean) => Promise<void>;

  /**
   * 하위 Observer, Form의 유효성 검사 상태를 초기화 한다
   */
  resetValidation: () => Promise<void>;

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 reset 실행한다
   * @param message alert에 표시할 메시지
   * @param shouldFocus 초기화 후 포커스 여부
   */
  confirmReset(message?: string, shouldFocus?: boolean): Promise<void>;

  /**
   * 하위 Observer, Form의 유효성 검사를 수행한다
   * @param shouldFocus 유효성 검사 실패시, 입력 컴포넌트 포커싱 여부
   */
  validate: (shouldFocus?: boolean) => Promise<boolean>;

  /**
   * 하위 Observer, Form, Grid의 데이터 변경 여부를 반환한다
   */
  isModified: () => boolean;

  /**
   * 하위 Observer, Form, Grid의 데이터가 변경되지 않았으면, alert를 표시한다
   * (데이터가 변경되지 않았으면 true 반환)
   * @param message alert에 표시할 메시지
   * @return { Promise<boolean> } isNotModified
   */
  alertIfIsNotModified: (message?: string) => Promise<boolean>;

  /**
   * 하위 Observer, Form, Grid의 데이터가 변경되었으면 confirm을 표시한다
   * (데이터가 변경되지 않았거나, confirm에서 확인 선택시 true 반환)
   * @param message confirm에 표시할 메시지
   * @return { Promise<boolean> } isNotModified || confirm dialog result
   */
  confirmIfIsModified: (message?: string) => Promise<boolean>;
}
