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
   */
  downloadBlob(blob: Blob, fileName: string): void;

  /**
   * 파일을 업로드한다.
   */
  upload(file: File, targetPath?: TargetPath = 'temp'): Promise<FileInfo>;

  /**
   * 파일 정보로 부터 파일을 다운로드 한다.
   */
  download(fileInfo: FileInfo, targetPath = 'temp'): Promise<void>;
}

export const fileUtil: FileUtil;

// Grid
import { GridView, TreeView, LocalDataProvider, LocalTreeDataProvider, RowState, GridExportOptions, DataValues } from 'realgrid';

type CellValue = any;
type RowValue = Record<string, CellValue>;
type OptionRowValue = RowValue | null;
type PartialShallow<T> = { [P in keyof T]?: T[P] extends object ? object : T[P] };
type PropertyName = string | number | symbol;
type ListIterator<T, TResult> = (value: T, index: number, collection: Array<T>) => TResult;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | PartialShallow<T>;
type ListIteratee<T, TResult> = ListIterator<T, TResult> | IterateeShorthand<T>;
type MemoListIterator<T, TResult, TList> = (prev: TResult, curr: T, index: number, list: TList) => TResult;

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
   * 지정한 행,필드와 일치하는 셀 포커스
   * @param view 그리드 뷰 또는 트리 뷰
   * @param dataRow 데이터 행
   * @param fieldName 필드명
   */
  focusCellInput(view: GridView | TreeView, dataRow: number, fieldName?: string): Promise<void>;

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
   * @param isIncludeDeleted 데이터 상태 DELETED 포함 여부
   */
  getChangedRowValues(view: GridView | TreeView, isIncludeDeleted = true): RowValue[];

  /**
   * 전체 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeDeleted 데이터 상태 DELETED 포함 여부
   */
  getAllRowValues(view: GridView | TreeView, isIncludeDeleted = true): RowValue[];

  /**
   * 체크박스가 선택된 행들의 데이터를 가져온다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isChangedOnly 데이터 상태가 변경된(NONE이 아닌) 값만 가져올지 여부
   */
  getCheckedRowValues(view: GridView | TreeView, isChangedOnly = false): RowValue[];

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
   * @param fromDataRow 시작 행
   */
  find(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>, fromDataRow = -1): RowValue;

  /**
   * 시작 행부터 전체 행에 대하여 조건자가 truthy인 첫번째 행을 반환한다.
   * {@link https://lodash.com/docs/4.17.15#findIndex}
   * @param view 그리드 뷰 또는 트리 뷰
   * @param predicate 조건자
   * @param fromDataRow 시작 행
   */
  findDataRow(view: GridView | TreeView, predicate: ListIteratee<RowValue, boolean>, fromDataRow = -1): number;

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
  reduce<TResult>(view: GridView | TreeView, iteratee: MemoListIterator<RowValue, TResult, Array<RowValue>>, accumulator: TResult): TResult;

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
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부
   */
  deleteSelectedRows(view: GridView | TreeView, isIncludeCreated = false): RowValue[];

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 선택된 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부
   */
  confirmDeleteSelectedRows(view: GridView | TreeView, isIncludeCreated = false): Promise<RowValue[]>;

  /**
   * 체크박스가 선택된 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부
   */
  deleteCheckedRows(view: GridView | TreeView, isIncludeCreated = false): RowValue[];

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 체크박스가 선택된 행들을 삭제하고 데이터 행 목록을 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isIncludeCreated 데이터 상태가 CREATED인 데이터 행을 포함할지 여부
   */
  confirmDeleteCheckedRows(view: GridView | TreeView, isIncludeCreated = false): Promise<RowValue[]>;

  /**
   * 현재 데이터를 초기 값으로 지정한다.
   * 전체 데이터 행의 상태가 NONE이 되며, DELETED인 데이터는 아예 삭제된다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  init(view: GridView | TreeView): void;

  /**
   * 초기 값으로 지정된 데이터로 복원한다.
   * @param view 그리드 뷰 또는 트리 뷰
   */
  reset(view: GridView | TreeView): void;

  /**
   * confirm 다이얼로그를 호출하고, 확인을 누르면 reset 실행하고 `true`를 반환한다.
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
   */
  alertIfisNotModified(view: GridView | TreeView, message?: string): Promise<boolean>;

  /**
   * 전체 데이터의 변경 유무를 확인하여
   * 변경되지 않았거나, 또는 변경되었으면 confirm 다이얼로그를 호출하고 확인시 `true`를 반환한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param message 다이얼로그에 표시할 메세지 내용
   */
  confirmIfIsModified(view: GridView | TreeView, message?: string): Promise<boolean>;

  /**
   * 그리드의 유효성 검사를 수행한다.
   * @param view 그리드 뷰 또는 트리 뷰
   * @param isChangedOnly 변경된 행들에 대해서만 유효성 검사를 수행할지 여부
   * @param isAlertMessage 유효성 검사를 수행하고 다이얼로그로 표시할지 여부
   */
  validate(view: GridView | TreeView, isChangedOnly = true, isAlertMessage = true): boolean;

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
   * @param isAscending 오름차순으로 반환할지 여부
   */
  getAncestors(view: TreeView, dataRow: number, isAscending = false): number[];

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
   * @param isIncludeSelf 자신을 포함할지 여부
   */
  getSiblings(view: TreeView, dataRow: number, isIncludeSelf = true): number[];

  /**
   * 지정된 행을 접는다.
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   * @param isCollapseDescendants 자손 행 접힘 여부
   */
  collapse(view: TreeView, dataRow: number, isCollapseDescendants = false): void;

  /**
   * 지정된 행을 펼친다.
   * @param view 트리 뷰
   * @param dataRow 데이터 행
   * @param isCollapseDescendants 자손 행 펼침 여부
   */
  expand(view: TreeView, dataRow: number, isExpandDescendants = false): void;
}

export const gridUtil: GridUtil;

// Popup
interface PopupOptions {
  width?: string;
  height?: string;
  popup?: boolean;
  noopener?: boolean;
  noreferrer?: boolean;
  menubar?: boolean;
  toolbar?: boolean;
}

interface PopupUtil {
  /**
   * 팝업을 호출한다.
   * @param url 호출할 팝업 URL
   * @param options 팝업 옵션
   */
  open(url: string, options?: PopupOptions): Promise<boolean>;

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
   * @param bytesPerKoChar 한글당 바이트 값
   */
  getByte(s: string, bytePerKoChar = 3): number;

  /**
   * 입력 문자열을 최대 바이트까지 잘라서 반환한다.
   * @param s 입력 문자열
   * @param maxBytes 최대 바이트
   * @param bytesPerKoChar 한글당 바이트 값
   */
  getMaxByteString(s: string, maxBytes: number, bytesPerKoChar = 3): string;

  /**
   * 입력 문자열이 최대 바이트를 초과하는지 여부 반환한다.
   * @param s 입력 문자열
   * @param maxBytes 최대 바이트
   * @param bytesPerKoChar 한글당 바이트 값
   */
  isOverByte(s: string, maxBytes: number, bytesPerKoChar = 3): boolean;

  /**
   * `1234567`을 `1,234,567`과 같은 형식으로 변환한다.
   * @param s 숫자 문자열
   * @param decimalLimit 소숫점 자리 제한, -1인 경우 제한 없음.
   */
  getNumberWithComma(s: string, decimalLimit = -1): boolean;

  /**
   * 유니크한 36자리 문자열 반환한다.
   * @param prefix 앞에 추가할 prefix `-`로 구분된다.
   */
  getUid(prefix?: string): boolean;
}

export declare const stringUtil: StringUtil;
