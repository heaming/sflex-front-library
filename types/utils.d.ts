// getComponentType
import { Ref } from 'vue';
import { KwComponentNameMap } from './components';
export function getComponentType<K extends keyof KwComponentNameMap>(componentName: K): KwComponentNameMap[K];

declare module '@vue/runtime-core' {
  export function ref<T extends KwComponentNameMap[keyof KwComponentNameMap]>(kwComponent: T): Ref<T | null>;
}

// defineGrid
type GridInitFunction = (data: LocalDataProvider, view: GridView) => void;
export function defineGrid(initFn: GridInitFunction): GridInitFunction;

// defineTreeGrid
type TreeGridInitFunction = (data: LocalTreeDataProvider, view: TreeView) => void;
export function defineTreeGrid(initFn: TreeGridInitFunction): TreeGridInitFunction;

// Global Utils
export function delay(ms?: number): Promise<void>;

// Code
interface Code {
  codeId: string;
  codeName: string;
  parentsCodeId: string;
}

interface CodeUtil {
  /**
   * 공통코드 단건 가져오기
   */
  getCodes(codeId: string): Promise<Code[]>;

  /**
   * 공통코드 다건 가져오기
   */
  getMultiCodes(...codeIds: string[]): Promise<{ [codeId: string]: Code[] }>;

  /**
   * 서브코드 단건 가져오기
   */
  getSubCodes(codeId: string, parentCodeValue: string): Promise<Code[]>;
}

export const codeUtil: CodeUtil;

// File
export type TargetPath = 'temp' | 'storage' | 'export';
declare interface FileInfo {
  /**
   * 서버에 저장된 위치
   */
  serverFileName?: string;

  /**
   * 다운로드 파일 명
   */
  name: string;

  /**
   * 서버 파일 id, serverFileName 서버정보로 덮어 씀
   */
  fileUid?: string;

  /**
   * 내 파일 여부, 암호화 관련키
   */
  myFileYn?: 'Y' | 'N';
}

interface FileUtil {
  /**
   * Blob을 다운로드 한다.
   * @param blob
   * @param fileName 파일명
   */
  downloadBlob(blob: Blob, fileName: string): void;

  /**
   * Blob을 File로 변환한다.
   * @param blob
   */
  convertBlobToFile(blob: Blob): Promise<File>;

  /**
   * 파일을 업로드한다.
   * @param file
   * @param targetPath default `temp`
   */
  upload(file: File, targetPath?: TargetPath): Promise<FileInfo>;

  /**
   * 파일 정보로 부터 파일을 다운로드 한다.
   * @param fileInfo
   * @param targetPath default `temp`
   */
  download(fileInfo: FileInfo, targetPath?: TargetPath): Promise<void>;

  /**
   * xlsx, xls 파일을 서버로 부터 읽어들인다.
   * @param file
   * @param columns 컬럼 정보를 담고 있는 배열
   * @param header 헤더가 끝나는 행 번호, default `1`
   */
  readExcel(file: File, columns?: string[], header?: number): Promise<Array<Record<string, any>>>;

  /**
   * image파일의 src를 리턴한다 (data:image/png;base64,데이터)
   * @param fileUid
   */
  getImageSrcFromFile(fileUid: string): string;
}

export const fileUtil: FileUtil;

// Grid
import { GridView, TreeView, GridExportOptions, DataValues, LocalDataProvider, LocalTreeDataProvider, RowState } from 'realgrid';
import { convertBlobToFile } from '../src/utils/file';
import { registerWindowKeyEvent } from '../src/utils/popup';

type CellValue = any;
type RowValue = Record<string, CellValue>;
type OptionRowValue = RowValue | null;
type PartialShallow<T> = { [P in keyof T]?: T[P] extends object ? object : T[P] };
type PropertyName = string | number | symbol;
type ListIterator<T, TResult> = (value: T, index: number, collection: Array<T>) => TResult;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | PartialShallow<T>;
type ListIteratee<T, TResult> = ListIterator<T, TResult> | IterateeShorthand<T>;
type MemoListIterator<T, TResult, TList> = (prev: TResult, curr: T, index: number, list: TList) => TResult;
type ValidationError = {
  dataRow: number;
  fieldName: string;
  errors: string[];
};

interface ExportOptions extends Omit<GridExportOptions, 'target'> {
  /**
   * @defaultValue `export`
   */
  fileName?: string;

  /**
   * @defaultValue `hidden`
   */
  indicator?: string;

  /**
   * @defaultValue `hidden`
   */
  checkBar?: string;

  /**
   * 행 오브젝트 및 행 배열
   */
  exportData?: DataValues[];

  /**
   * 내보내기 파일명에 접미사 `{fileName}_YYYYMMDDHHmmss`가 붙는다
   */
  timePostfix?: true;

  /**
   * 컬럼의 lookupDisplay 값을 표시된 값으로의 내보내기 여부
   */
  lookupDisplay?: false;

  /**
   * 트리의 데이터 키 필드
   */
  treeKey?: string;
}

interface GridUtil {
  /**
   * 그리드가 보이도록 스크롤을 이동시킨다
   * @param view 그리드 뷰 또는 트리 뷰
   */
  scrollIntoView(view: GridView | TreeView): void;

  /**
   * 지정한 행,필드와 일치하는 셀 포커스
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   * @param column 컬럼명
   */
  focusCellInput(view: GridView | TreeView, dataRow: number, column?: string): Promise<void>;

  /**
   * 지정한 데이터 행의 상태를 가져온다
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  getRowState(view: GridView | TreeView, dataRow: number): keyof typeof RowState | null;

  /**
   * 지정한 데이터 행의 상태가 RowState.NONE 인지 확인
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  isReadRow(view: GridView | TreeView, dataRow: number): boolean;

  /**
   * 지정한 데이터 행의 상태가 RowState.CREATED 인지 확인
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  isCreatedRow(view: GridView | TreeView, dataRow: number): boolean;

  /**
   * 지정한 데이터 행의 상태가 RowState.UPDATED 인지 확인
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  isUpdatedRow(view: GridView | TreeView, dataRow: number): boolean;

  /**
   * 지정한 데이터 행의 상태가 RowState.DELETED 인지 확인
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  isDeletedRow(view: GridView | TreeView, dataRow: number): boolean;

  /**
   * 지정한 데이터 행의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  getRowValue(view: GridView | TreeView, dataRow: number): OptionRowValue;

  /**
   * 지정한 데이터 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRows 데이터 행들
   */
  getRowValues(view: GridView | TreeView, dataRows: number[]): OptionRowValue[];

  /**
   * 현재 선택된 행의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getCurrentRowValue(view: GridView | TreeView): OptionRowValue;

  /**
   * 데이터 상태가 CREATED인 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getCreatedRowValues(view: GridView | TreeView): RowValue[];

  /**
   * 데이터 상태가 NONE인 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getReadRowValues(view: GridView | TreeView): RowValue[];

  /**
   * 데이터 상태가 UPDATED인 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getUpdatedRowValues(view: GridView | TreeView): RowValue[];

  /**
   * 데이터 상태가 DELETED인 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getDeletedRowValues(view: GridView | TreeView): RowValue[];

  /**
   * 데이터 상태가 변경된(NONE이 아닌) 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeDeleted 데이터 상태 DELETED 포함 여부, default `true`
   */
  getChangedRowValues(view: GridView | TreeView, isIncludeDeleted?: boolean): RowValue[];

  /**
   * 전체 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeDeleted 데이터 상태 DELETED 포함 여부, default `false`
   */
  getAllRowValues(view: GridView | TreeView, isIncludeDeleted?: boolean): RowValue[];

  /**
   * 체크박스가 선택된 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isChangedOnly 데이터 상태가 변경된(NONE이 아닌) 값만 가져올지 여부, default `false`
   */
  getCheckedRowValues(view: GridView | TreeView, isChangedOnly?: boolean): RowValue[];

  /**
   * 선택된 영역 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getSelectedRowValues(view: GridView | TreeView): RowValue[];

  /**
   * 지정된 행의 원본(수정되기 전) 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   */
  getOrigRowValue(view: GridView | TreeView, dataRow: number): OptionRowValue;

  /**
   * 지정된 행,필드와 일치하는 셀의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   * @param fieldName 필드명
   */
  getCellValue(view: GridView | TreeView, dataRow: number, fieldName: string): CellValue;

  /**
   * 지정된 행,필드와 일치하는 셀의 원본(수정되기 전) 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   * @param fieldName 필드명
   */
  getOrigCellValue(view: GridView | TreeView, dataRow: number, fieldName: string): CellValue;

  /**
   * 지정된 필드(데이터 타입 숫자)의 전체 합을 계산한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param fieldName 필드명
   */
  getSumValue(view: GridView | TreeView, fieldName: string): number;

  /**
   * 전체 데이터 행에 대하여 조건자가 참을 반환하는지 확인, falsey를 반환하면 중지된다.
   * {@link https://lodash.com/docs/4.17.15#every}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param predicate 조건자
   */
  every(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>): boolean;

  /**
   * 전체 데이터 행에 대하여 조건자가 truthy인 모든 행의 데이터를 반환한다.
   * {@link https://lodash.com/docs/4.17.15#filter}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param predicate 조건자
   */
  filter(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>): RowValue[];

  /**
   * 시작 행부터 전체 행에 대하여 조건자가 truthy인 첫번째 행의 데이터를 반환한다.
   * {@link https://lodash.com/docs/4.17.15#find}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param predicate 조건자
   * @param fromDataRow 시작 행, default `-1`
   */
  find(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>, fromDataRow?: number): RowValue;

  /**
   * 시작 행부터 전체 행에 대하여 조건자가 truthy인 첫번째 행을 반환한다.
   * {@link https://lodash.com/docs/4.17.15#findIndex}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param predicate 조건자
   * @param fromDataRow 시작 행, default `-1`
   */
  findDataRow(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>, fromDataRow?: number): number;

  /**
   * 전체 데이터 행에 대하여 반복자를 실행한다.
   * {@link https://lodash.com/docs/4.17.15#forEach}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param iteratee 반복자
   */
  forEach(view: GridView | TreeView, iteratee: ListIteratee<RowValue, void>): void;

  /**
   *  전체 데이터 행에 대하여 반복자를 실행해 새로운 배열을 반환한다.
   * {@link https://lodash.com/docs/4.17.15#map}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param iteratee 반복자
   */
  map<TResult = any>(view: GridView | TreeView, iteratee: ListIteratee<RowValue, TResult>): TResult[];

  /**
   *  전체 데이터 행에 대하여 반복자를 실행해 누적된 결과값을 반환한다.
   * {@link https://lodash.com/docs/4.17.15#reduce}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param iteratee 반복자
   * @param accumulator 초기 값, 지정하지 않으면 컬렉션의 첫 번째 요소를 초기 값으로 사용.
   */
  reduce<TResult>(view: GridView | TreeView, iteratee: MemoListIterator<RowValue, TResult, Array<RowValue>>, accumulator?: TResult): TResult;

  /**
   * 전체 데이터 행에 대하여 조건자가 하나라도 참을 반환하는지 확인한다.
   * {@link https://lodash.com/docs/4.17.15#some}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param predicate 조건자
   */
  some(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>): boolean;

  /**
   * 선택된 영역의 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부, default `false`
   */
  deleteSelectedRows(view: GridView | TreeView, isIncludeCreated?: boolean): RowValue[];

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 선택된 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부, default `false`
   */
  confirmDeleteSelectedRows(view: GridView | TreeView, isIncludeCreated?: boolean): Promise<RowValue[]>;

  /**
   * 체크박스가 선택된 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부, default `false`
   */
  deleteCheckedRows(view: GridView | TreeView, isIncludeCreated?: boolean): RowValue[];

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 체크박스가 선택된 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부, default `false`
   */
  confirmDeleteCheckedRows(view: GridView | TreeView, isIncludeCreated?: boolean): Promise<RowValue[]>;

  /**
   * 지정된 번호로 행을 추가하고 focus 한다.
   * @param view 그리드 뷰
   * @param dataRow 데이터 행
   * @param rowValue 데이터 행 오브젝트
   * @param column column을 지정하면 매칭되는 컬럼으로 focus 한다. (`false` 지정시 focus 하지 않는다)
   * @param shouldCheck 추가된 행을 체크할지 여부 default `false`
   */
  insertRowAndFocus(view: GridView, dataRow: number, rowValue: RowValue, column?: string | boolean, shouldCheck?: boolean): Promise<boolean>;

  /**
   * 현재 데이터를 초기 값으로 지정한다.
   * 전체 데이터 행의 상태가 NONE이 되며, DELETED인 데이터는 아예 삭제된다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param shouldClearCurrent 행 선택 초기화 여부
   */
  init(view: GridView | TreeView, shouldClearCurrent?: boolean): void;

  /**
   * 초기 값으로 지정된 데이터로 복원한다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  reset(view: GridView | TreeView): void;

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 reset 실행한다
   * @param view 그리드 뷰 또는 트리 뷰
   */
  confirmReset(view: GridView | TreeView): Promise<void>;

  /**
   * 전체 데이터의 변경 유무를 확인한다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  isModified(view: GridView | TreeView): boolean;

  /**
   * 전체 데이터의 변경 유무를 확인하고, 변경되지 않으면 alert 다이얼로그를 호출하고 `true`를 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param message 다이얼로그에 표시할 메세지 내용
   * @return { Promise<boolean> } isNotModified
   */
  alertIfIsNotModified(view: GridView | TreeView, message?: string): Promise<boolean>;

  /**
   * 전체 데이터의 변경 유무를 확인하여
   * 변경되지 않았거나, 또는 변경되었으면 confirm 다이얼로그를 호출하고 확인시 `true`를 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param message 다이얼로그에 표시할 메세지 내용
   * @return { Promise<boolean> } isNotModified || confirm dialog result
   */
  confirmIfIsModified(view: GridView | TreeView, message?: string): Promise<boolean>;

  /**
   * 지정된 행의 유효성 검사를 수행한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   * @param bails 첫 번째 실패한 규칙에서 유효성 검사가 중지됩니다, default `true`
   */
  validateRow(view: GridView | TreeView, dataRow: number, bails: true): Promise<ValidationError[]>;

  /**
   * 그리드의 유효성 검사를 수행한다.

   * @typedef {{isChangedOnly?: boolean, isCheckedOnly?: boolean, isAlertMessage?: boolean, bails?: boolean}} ValidateOptions
   * @property {?boolean} isChangedOnly - 변경된 행들에 대해서만 유효성 검사를 수행할지 여부, default `true`
   * @property {?boolean} isCheckedOnly - 체크된 행들에 대해서만 유효성 검사를 수행할지 여부, default `false`
   * @property {?boolean} isAlertMessage - 유효성 검사를 수행하고 다이얼로그로 표시할지 여부, default `true`
   * @property {?boolean} includeUneditable - 유효성 검사를 수행하고 다이얼로그로 표시할지 여부, default `true`
   * @property {?boolean} bails - 첫 번째 실패한 규칙에서 유효성 검사가 중지됩니다, default `true`
   * @param view 그리드 뷰 또는 트리 뷰
   * @param {?ValidateOptions} options
   */
  validate(view: GridView | TreeView, options?: { isChangedOnly?: boolean; isCheckedOnly?: boolean; isAlertMessage?: boolean; includeUneditable?: boolean; bails?: boolean }): Promise<boolean>;

  /**
   * validate 수행 이후에, 오류 목록을 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  getValidationErrors(view: GridView | TreeView): ValidationError[];

  /**
   * 그리드를 엑셀이나 CSV 내보낸다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param options 내보내기 옵션
   */
  exportView(view: GridView | TreeView, options?: ExportOptions): Promise<void>;

  /**
   * 지정된 행의 부모 행을 반환한다. 부모 행이 없으면 -1 반환.
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   */
  getParent(view: TreeView, dataRow: number): number;

  /**
   * 지정된 행의 조상 행들을 반환한다.
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   * @param isAscending 오름차순으로 반환할지 여부, default `false`
   */
  getAncestors(view: TreeView, dataRow: number, isAscending?: boolean): number[];

  /**
   * 지정된 행의 자식 행들을 반환한다
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   */
  getChildren(view: TreeView, dataRow: number): number[];

  /**
   * 지정된 행의 자손 행들을 반환한다
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   */
  getDescendants(view: TreeView, dataRow: number): number[];

  /**
   * 지정된 행의 형제 행들을 반환한다
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   * @param isIncludeSelf 자신을 포함할지 여부, default `true`
   */
  getSiblings(view: TreeView, dataRow: number, isIncludeSelf?: boolean): number[];

  /**
   * 지정된 행을 접는다.
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   * @param isCollapseDescendants 자손 행 접힘 여부, default `false`
   */
  collapse(view: TreeView, dataRow: number, isCollapseDescendants?: boolean): void;

  /**
   * 지정된 행을 펼친다.
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   * @param isExpandDescendants 자손 행 펼침 여부, default `false`
   */
  expand(view: TreeView, dataRow: number, isExpandDescendants?: boolean): void;
}

export const gridUtil: GridUtil;

// Mobile
interface MobileUtil {
  /**
   * get os type code
   */
  getOsTypeCode(): 'A' | 'I' | null;

  /**
   * get device type code
   */
  getDeviceTypeCode(): 'M' | 'T' | null;

  /**
   * 디바이스 버전 확인
   */
  getDeviceVersion(): Promise<any>;

  /**
   * 디바이스 토큰 확인
   */
  getDeviceToken(): Promise<any>;

  /**
   * 디바이스 ID 확인
   */
  getDeviceId(): Promise<any>;

  /**
   * 카메라 호출
   */
  openCamera(): Promise<any>;

  /**
   * 사진 갤러리 호출
   */
  openPhotoGallery(): Promise<any>;

  /**
   * 바코드 리더기 호출
   */
  openBarcodeReader(): Promise<any>;

  /**
   * Prefernce 설정
   * @param key
   * @param value
   */
  openBarcodeReader(key: string, value: any): Promise<any>;

  /**
   * Prefernce 가져오기
   * @param key
   */
  getPreference(key: string): Promise<any>;

  /**
   * phone 호출
   * @param address
   */
  openPhone(address: string): Promise<any>;

  /**
   * SMS 호출
   * @param address
   * @param body
   */
  openSMS(address: string, body: string): Promise<any>;

  /**
   * TMap 호출
   * @param routeInfo
   */
  openTMap(routeInfo: any): Promise<any>;

  /**
   * 프린트 호출
   * @param printType
   * @param printString
   */
  openPrint(printType: string, printString: string): Promise<any>;

  /**
   * 네트워크 상태 확인
   */
  getNetworkStatus(): Promise<any>;
}

// Popup
interface WindowFeatures {
  [key: string]: any;
  popup?: boolean;
  noopener?: boolean;
  noreferrer?: boolean;
  menubar?: boolean;
  states?: boolean;
  toolbar?: boolean;
  width?: number;
  height?: number;
}

interface PopupUtil {
  /**
   * 팝업을 호출한다.
   * @param url 호출할 팝업 URL
   * @param windowFeatures 팝업 옵션
   */
  open(url: string, windowFeatures?: WindowFeatures): Promise<boolean>;

  /**
   * 열린 팝업에서 호출하는 함수로, 부모창에게 현재 창을 전달한다. (reload시 window사라짐 방지)
   */
  registerWindowKeyEvent(): void;

  /**
   * 열린 팝업에서 호출하는 함수로, `beforeunload`를 등록한다.
   */
  registerCloseEvent(): void;

  /**
   * 열린 팝업에서 호출하는 함수로, `true` 반환한다.
   */
  ok(payload: any): void;

  /**
   * 열린 팝업에서 호출하는 함수로, `false` 반환한다.
   */
  cancel(payload: any): void;
}

export const popupUtil: PopupUtil;

// String
interface StringUtil {
  /**
   * 입력 문자열의 바이트 합을 반환한다.
   * @param s 입력 문자열
   * @param bytesPerKoChar 한글당 바이트 값, default `3`
   */
  getByte(s: string, bytesPerKoChar?: number): number;

  /**
   * 입력 문자열을 최대 바이트까지 잘라서 반환한다.
   * @param s 입력 문자열
   * @param maxBytes 최대 바이트
   * @param bytesPerKoChar 한글당 바이트 값, default `3`
   */
  getMaxByteString(s: string, maxBytes: number, bytesPerKoChar?: number): string;

  /**
   * 입력 문자열이 최대 바이트를 초과하는지 여부 반환한다.
   * @param s 입력 문자열
   * @param maxBytes 최대 바이트
   * @param bytesPerKoChar 한글당 바이트 값, default `3`
   */
  isOverByte(s: string, maxBytes: number, bytesPerKoChar?: number): boolean;

  /**
   * `1234567`을 `1,234,567`과 같은 형식으로 변환한다.
   * @param s 숫자 문자열
   * @param decimalLimit 소숫점 자리 제한(-1인 경우 제한 없음), default `-1`
   */
  getNumberWithComma(s: string, decimalLimit?: number): boolean;

  /**
   * 유니크한 36자리 문자열 반환한다.
   * @param prefix 앞에 추가할 prefix `-`로 구분된다.
   */
  getUid(prefix?: string): boolean;

  /**
   * 세션에서 사용하는 date 형식으로 반환한다.
   * @param value
   * @param format value format, default `YYYYMMDD`
   */
  getDateFormat(value: string, format?: string): string;

  /**
   * 세션에서 사용하는 datetime 형식으로 반환한다.
   * @param value
   * @param format value format, default `YYYYMMDDHHmmss`
   */
  getDatetimeFormat(value: string, format?: string): string;

  /**
   * 세션에서 사용하는 time 형식으로 반환한다.
   * @param value
   * @param format value format, default `HHmmss`
   */
  getTimeFormat(value: string, format?: string): string;
}

export declare const stringUtil: StringUtil;

type StyleProps = string | Array<StyleProps> | object;

declare interface StyleUtil {
  /**
   * css props 들를 object 형태로 변환한다.
   * @param styleProps style props
   */
  castStylePropToObject(...styleProps: StyleProps[]): object;
}

export declare const styleUtil: StyleUtil;
