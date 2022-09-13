export interface UseOptionsProps {
  /**
   * 옵션 아이템 목록
   */
  options?: Array<any>;

  /**
   * 옵션 아이템에서 사용할 value key
   * @defaultValue `codeId`
   */
  optionValue?: string;

  /**
   * 옵션 아이템에서 사용할 label key
   * @defaultValue `codeName`
   */
  optionLabel?: string;

  /**
   * 옵션 아이템에서 사용할 separator key
   * @defaultValue `separator`
   */
  optionSeparator?: string;

  /**
   * 목록의 첫번째 아이템 표시 여부
   */
  firstOption?: boolean | 'all' | 'select';

  /**
   * 목록의 첫번째 아이템의 optionValue 커스텀 값
   */
  firstOptionValue?: string;

  /**
   * 목록의 첫번째 아이템의 optionLabel 커스텀 값
   */
  firstOptionLabel?: string;
}
