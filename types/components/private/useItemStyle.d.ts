import { UseDenseProps } from './useDense';
import { UseStretchProps } from './UseStretch';

export interface UseItemStyleProps extends UseDenseProps, UseStretchProps {
  /**
   * item 의 기본 padding 을 세팅한다.
   * String 값을 가질 경우  inline style 로 지정된다.
   * @see KwList item-padding props.
   * @see $kw-item-padding
   */
  padding?: boolean | string | undefined;

  /**
   * padding 상속 여부를 결정한다.
   * item 내부의 item 이 중첩해서 들어갈 경우,
   * 특히 expansionItem 을 사용시 필요 할 수 있다.
   */
  blockInheritPadding?: boolean | undefined;
}
