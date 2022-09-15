import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseObserverProps, UseObserverInstance } from './private/useObserver';

// KwForm
interface KwFormProps extends UseObserverProps {
  /**
   * 행에서 설정되는 컬럼 갯수 (행의 cols가 있으면 행의 값을 우선한다)
   * @defaultValue `3`
   */
  cols?: number;

  /**
   * 아이템 라벨 사이즈
   * @defaultValue `150`
   */
  labelSize?: number;

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
   * submit 이벤트
   * @param values 등록된 하위 입력 컴포넌트 값들
   */
  onSubmit: (values: { [name: string]: any }) => Promise<void>;

  /**
   * reset 이벤트
   */
  onReset: () => Promise<void>;
}
interface KwFormSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
interface KwForm extends ComponentPublicInstance<KwFormProps>, UseObserverInstance {}

// KwFormRow
interface KwFormRowProps {
  /**
   * 행에서 설정되는 컬럼 갯수
   */
  cols?: number;

  /**
   * 아이템 라벨 사이즈
   */
  labelSize?: number;
}
interface KwFormRowSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
interface KwFormRow extends ComponentPublicInstance<KwFormRowProps> {}

// KwFormItem
interface KwFormItemProps {
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
   * 아이템이 차지할 영역 colspan
   * @defaultValue `1`
   */
  colspan?: number;

  /**
   * 라벨 필수 여부
   */
  required?: boolean;
}
interface KwFormItemSlots {
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
interface KwFormItem extends ComponentPublicInstance<KwFormItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwForm: GlobalComponentConstructor<KwFormProps, KwFormSlots>;
    KwFormRow: GlobalComponentConstructor<KwFormRowProps, KwFormRowSlots>;
    KwFormItem: GlobalComponentConstructor<KwFormItemProps, KwFormItemSlots>;
  }
}
