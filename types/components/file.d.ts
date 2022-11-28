import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QFile, QFileProps, QFileSlots, QScrollArea } from 'quasar';
import { QRejectedEntry } from 'quasar/dist/types/api';
import { VueClassProp } from 'quasar/dist/types/api/vue-prop-types';
import { UseFieldProps, UseFieldStyleProps } from './private/useField';

type FallThroughSlots = 'prepend' | 'append' | 'before' | 'after' | 'hint' | 'loading';

type FallThroughProps = 'prefix' | 'suffix' | 'hint' | 'hideHint' | 'color' | 'bgColor' | 'loading' | 'counter' | 'clearable' | 'clearIcon' | 'disable' | 'readonly' | 'multiple' | 'accept' | 'maxFileSize' | 'maxFiles' | 'maxTotalSize' | 'filter' | 'append' | 'displayValue' | 'tabindex' | 'inputClass' | 'inputStyle';

type InstanceUpdateType = boolean | 'upload' | 'remove';

interface NormalizedFile {
  name: string;
  size: number;
  type: string;
  lastModified: string;
  dummy?: boolean;
  nativeFile?: File;
}

interface KwFileProps extends Pick<QFileProps, FallThroughProps>, UseFieldProps, UseFieldStyleProps {
  /**
   * 파일이 변경을 취소 할 수 있는지 여부를 지정한다.
   * 업로드 예정인 파일은 삭제하고,
   * 업로드 된 파일은 삭제 예정 (instance Update 가 remove 를 포함할 경우, 바로 삭제한다.)
   * 업로드 삭제 예정인 파일은 업로드 됨 상태로 되돌린다.
   *
   * @default true
   */
  removable?: boolean | undefined;

  /**
   * 삭제 아이콘을 지정한다.
   *
   * @default 'clear'
   */
  removeIcon?: string | undefined;

  /**
   * remove or upload 실패 시, 재시도 가능 여부를 지정한다.
   *
   * @default 'clear'
   */
  retryPossible?: boolean | undefined;

  /**
   * 재시도 아이콘을 지정한다.
   *
   * @default 'retry'
   */
  retryIcon?: string | undefined;

  /**
   * update 를 즉시 시도할 지 여부를 결정한다.
   * true: upload 혹은 remove 시 즉시 서버의 해당 요청을 날린 후 상태를 업데이트 한다.
   * 'upload' : upload 만,
   * 'remove' : remove 만,
   * false : upload, remove 모두 update 를 사용자가 직접 실행한다.
   *
   * @default false
   */
  instanceUpdate?: InstanceUpdateType | undefined;

  /**
   * 서버로 요청을 보낼 수 있는지 여부를 결정한다.
   *
   * @default true
   */
  updatable?: boolean | undefined;

  /**
   * 업데이트 아이콘을 설정한다.
   *
   * @default 'upload_off'
   */
  updateIcon?: string | undefined;

  /**
   * 파일의 종류에 제한을 거는 props 에 걸러졌을 경우, 에러 메시지를 지정한다.
   */
  rejectMessage?: ((rejectedEntries: QRejectedEntry[]) => string) | string | undefined;

  /**
   * input placeholder
   *
   * @default 파일 선택
   */
  placeholder?: string | (() => string) | undefined;

  /**
   * placeholder 영역의 class
   */
  placeholderClass?: VueClassProp;

  /**
   * 파일 컴포넌트 클릭 시, 파일 선택을 할 지 결정한다.
   * 정확히는, input[type='file'] 의 기본 이벤트를 트리거 할지 여부를 결정한다.
   */
  pickFileWhenClick?: boolean | undefined;

  /**
   * 기본 파일 선택 표시 여부를 설정한다.
   * 미 설정시, pickFileWhenClick 과 반대 값을 따른다.
   * @see pickFileWhenClick
   */
  pickFileBtn?: boolean | undefined;

  /**
   * 파일 아이템 앞에 체크박스 표시 여부를 설정한다.
   * @see clearSelected, updateSelected, downloadSelected, revertSelected
   * @default false
   */
  selectable?: boolean | undefined;

  /**
   * Label for the counter; The 'counter' prop is necessary to enable this one
   * @param props Object containing counter label information
   * @returns String to display for the counter label => computedCounter
   */
  counterLabel?: ((totalSize?: string, filesNumber?: number, maxFiles?: number) => string) | undefined;

  /**
   * 파일 다운로드 가능 여부를 지정한다.
   * @default false
   */
  downloadable?: boolean | undefined;

  /**
   * 파일 다운로드 아이콘을 지정한다.
   * @default 'download_off'
   */
  downloadIcon?: string | undefined;

  /**
   * 파일 다운로드 전 훅 이벤트 emit
   * false 를 리턴할 경우 파일 다운로드를 멈춘다.
   * @default 'download_off'
   */
  onBeforeDownload?: ((file: NormalizedFile) => boolean | void) | undefined;

  /**
   * 파일 다운로드 완료 이벤트 emit
   */
  onDownloaded?: ((file: NormalizedFile) => void) | undefined;

  /**
   * table header 와 같은 영역을 사용할지 여부.
   *
   * @default false
   */
  useHeader?: boolean | undefined;

  /**
   * 컴포넌트 내부 가로 스크롤 가능 여부를 지정
   * append-file, append-header slot 의 너비가 너무 길어졌을 떄 사용.
   *
   * @see useHeader
   * @see append-file
   * @see append-header
   */
  scrollHorizontal?: boolean | undefined;

  /**
   * append-file, append-header slot 앞 쪽 너비를 지정한다.
   * append-file, append-header slot 의 너비가 너무 길어졌을 떄 사용.
   *
   * @see useHeader
   * @see scrollHorizontal
   * @see append-file
   * @see append-header
   */
  fileNameWidth?: string | undefined;

  /**
   * append-file, append-header slot 뒤 쪽 너비를 지정한다.
   * append-file, append-header slot 의 너비가 너무 길어졌을 떄 사용.
   *
   * @see useHeader
   * @see scrollHorizontal
   * @see append-file
   * @see append-header
   */
  asideWidth?: string | undefined;

  /**
   * 파일 영역이 스크롤 됬을 때, 이벤트 emit
   *
   * @see scrollHorizontal
   */
  'onScroll:file'?: (info: {
    /**
     * Vue reference to the QScrollArea which triggered the event
     */
    ref: QScrollArea;
    /**
     * Vertical scroll position (in px)
     */
    verticalPosition: number;
    /**
     * Vertical scroll percentage (0.0 <= x <= 1.0)
     */
    verticalPercentage: number;
    /**
     * Vertical scroll size (in px)
     */
    verticalSize: number;
    /**
     * Height of the container (in px)
     */
    verticalContainerSize: number;
    /**
     * Horizontal scroll position (in px)
     */
    horizontalPosition: number;
    /**
     * Horizontal scroll percentage (0.0 <= x <= 1.0)
     */
    horizontalPercentage: number;
    /**
     * Horizontal scroll size (in px)
     */
    horizontalSize: number;
    /**
     * Width of the container (in px)
     */
    horizontalContainerSize: number;
  }) => void;

  /**
   * 헤더 영역이 스크롤 됬을 때, 이벤트 emit
   *
   * @see useHeader
   * @see scrollHorizontal
   */
  'onScroll:header'?: (info: {
    /**
     * Vue reference to the QScrollArea which triggered the event
     */
    ref: QScrollArea;
    /**
     * Vertical scroll position (in px)
     */
    verticalPosition: number;
    /**
     * Vertical scroll percentage (0.0 <= x <= 1.0)
     */
    verticalPercentage: number;
    /**
     * Vertical scroll size (in px)
     */
    verticalSize: number;
    /**
     * Height of the container (in px)
     */
    verticalContainerSize: number;
    /**
     * Horizontal scroll position (in px)
     */
    horizontalPosition: number;
    /**
     * Horizontal scroll percentage (0.0 <= x <= 1.0)
     */
    horizontalPercentage: number;
    /**
     * Horizontal scroll size (in px)
     */
    horizontalSize: number;
    /**
     * Width of the container (in px)
     */
    horizontalContainerSize: number;
  }) => void;

  /**
   * 파일이 컴포넌트에서 거부 되었을 때 event emit.
   *
   * payload: rejectMessage, rejectedEntries
   *
   * @see rejectMessage
   * @param rejectedEntries Array of { failedPropValidation: string, file: File } Objects for files that do not pass the validation
   */
  onRejected?: (rejectedEntries: QRejectedEntry[]) => void;

  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  'onUpdate:modelValue'?: (value: any) => void;
}
interface KwFileSlots extends Pick<QFileSlots, FallThroughSlots> {
  /**
   * 파일 아이템 이름과 기능 버튼 사이의 영역
   */
  'append-file': (scope: {
    /**
     * Selection index
     */
    index: number;
    /**
     * File object
     */
    file: NormalizedFile;
    /**
     * Reference to the QFile component
     */
    ref: QFile;
  }) => VNode[];

  /**
   * 헤더 파일명과 기능 버튼 사이의 영역
   */
  'append-header': (scope: {
    /**
     * Selection index
     */
    index: number;
    /**
     * File object
     */
    file: NormalizedFile;
    /**
     * Reference to the QFile component
     */
    ref: QFile;
  }) => VNode[];
}
export interface KwFile extends ComponentPublicInstance<KwFileProps> {
  /**
   * 파일 선택.
   */
  pickFiles: () => void;
  /**
   * 선택된 값을 비웁니다.
   */
  clearSelected: () => void;
  /**
   * 선택된 파일의 상태에 따라 서버에 업데이트합니다.
   */
  updateSelected: () => void;
  /**
   * 선택된 파일을 다운로드 합니다.  가능하다면.
   */
  downloadSelected: () => void;
  /**
   * 선택된 파일의 상태를 되돌립니다.
   */
  revertSelected: () => void;
  /**
   * 전체 파일을 상태에 따라 서버에 업데이트 합니다.
   */
  updateAll: () => void;
  /**
   * 전체 파일의 상태를 되돌립니다.
   */
  revertAll: () => void;
  /**
   * 전체 파일을 다운로드 합니다.  가능하다면.
   */
  downloadAll: () => void;
  /**
   * 서버에 업로드 되있는 파일만 가져옵니다.
   */
  getUploadedFiles: () => Array<NormalizedFile>;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwFile: GlobalComponentConstructor<KwFileProps, KwFileSlots>;
  }
}
