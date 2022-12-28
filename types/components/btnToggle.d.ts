import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QBtnToggleProps, QBtnToggleSlots } from 'quasar';
import { UseFieldProps } from './private/useField';
import { UseOptionsProps } from './private/useOptions';
import { semanticColor, UseBtnStyleProps } from './private/useBtnStyle';

type FallThroughProps = 'disable' | 'stack' | 'noWrap' | 'clearable';

interface KwBtnToggleProps extends Pick<QBtnToggleProps, FallThroughProps>, UseFieldProps, UseOptionsProps, UseBtnStyleProps {
  /**
   * 버튼 색 속성.
   *
   * 버튼의 배경 색을 지정한다.
   * @default 'bg-white'
   */
  color?: semanticColor | undefined;

  /**
   * 버튼 색 속성.
   *
   * 문자 색을 지정한다.
   * @default 'black3'
   */
  textColor?: semanticColor | undefined;

  /**
   * 버튼 색 속성.
   *
   * 테두리 색을 지정한다.
   * @default 'line-stroke'
   */
  borderColor?: semanticColor | undefined;

  /**
   * 활성화 된 버튼의 배경색을 지정합니다.
   *
   * @default 'bg-white'
   */
  toggleColor?: semanticColor | undefined;

  /**
   * 활성화 된 버튼의 글자 색을 지정합니다.
   *
   * @default 'primary'
   */
  toggleTextColor?: semanticColor | undefined;

  /**
   * 활성화 된 버튼의 테두리 색을 지정합니다.
   *
   * @default 'primary'
   */
  toggleBorderColor?: semanticColor | undefined;

  /**
   * 버튼 사이의 간격을 지정합니다.
   *
   * @default '4px'
   */
  gap?: string | undefined;

  /**
   * 버튼의 줄 바꿈을 허용합니다. grow 랑 같이 사용해보세요.
   *
   * @see grow
   * @see noWrap
   */
  btnWrap?: boolean | undefined;

  /**
   * 활성화된 버튼의 옵션 값입니다.
   *
   * @default '4px'
   */
  modelValue?: string | undefined;

  /**
   * 활성화 된 버튼의 옵션 값으로 갱신합니다.
   * @param value New model value
   */
  'onUpdate:modelValue'?: (value: any) => void;

  /**
   * 포커스 이벤트
   * @param evt JS event object
   */
  onFocus?: (evt: Event) => void;
}
interface KwBtnToggleSlots extends QBtnToggleSlots {}
export interface KwBtnToggle extends ComponentPublicInstance<KwBtnToggleProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwBtnToggle: GlobalComponentConstructor<KwBtnToggleProps, KwBtnToggleSlots>;
  }
}
