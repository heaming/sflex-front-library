export interface UseDense {
  /**
   * 기준 item 높이 인 40px 이 아닌, 32px 높이 기준의 컴포넌트 Style 로 지정.
   */
  dense?: boolean;

  /**
   * dense props 상속을 막을 지 여부, dense 상태인 field 내 slot 내부에서 dense 적용가능한 컴포넌트 사용시 상속 없이 명시적으로 지정하고 싶을 때 막는다.
   */
  blockInheritDense?: boolean;
}
