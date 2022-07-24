/*
  Code
 */
declare interface Code {
  codeId: string;
  codeName: string;
  parentsCodeId: string;
}

declare interface CodeUtil {
  getCodes(codeId: string): Promise<Code[]>;
  getMultiCodes(...codeIds: string[]): Promise<{ [codeId: string]: Code[] }>;
  getSubCodes(codeId: string, parentCodeValue: string): Promise<Code[]>;
}

export declare const codeUtil: CodeUtil;

/*
  Grid
 */
import { GridView, TreeView, LocalDataProvider, LocalTreeDataProvider, GridExportOptions, DataValues } from 'realgrid';

declare type View = GridView | TreeView;
declare type CellValue = any;
declare type RowValue = Record<string, CellValue>;
declare type OptionRowValue = RowValue | null;

declare type PartialShallow<T> = { [P in keyof T]?: T[P] extends object ? object : T[P] };
declare type PropertyName = string | number | symbol;
declare type ListIterator<T, TResult> = (value: T, index: number, collection: Array<T>) => TResult;
declare type IterateeShorthand<T> = PropertyName | [PropertyName, any] | PartialShallow<T>;
declare type ListIteratee<T, TResult> = ListIterator<T, TResult> | IterateeShorthand<T>;
declare type MemoListIterator<T, TResult, TList> = (prev: TResult, curr: T, index: number, list: TList) => TResult;

declare interface ExportOptions extends Omit<GridExportOptions, 'type' | 'target'> {
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

declare interface GridUtil {
  defineGridView(view?: GridView): GridView;
  defineGridData(data?: LocalDataProvider): LocalDataProvider;
  defineTreeView(view?: TreeView): TreeView;
  defineTreeData(data?: LocalTreeDataProvider): LocalTreeDataProvider;
  focusCellInput(view: View, dataRow: number, fieldName?: string): Promise<void>;
  getRowValue(view: View, dataRow: number): OptionRowValue;
  getRowValues(view: View, dataRows: number[]): OptionRowValue[];
  getCurrentRowValue(view: View): OptionRowValue;
  getCreatedRowValues(view: View): RowValue[];
  getReadRowValues(view: View): RowValue[];
  getUpdatedRowValues(view: View): RowValue[];
  getDeletedRowValues(view: View): RowValue[];
  getChangedRowValues(view: View, isIncludeDeleted: boolean): RowValue[];
  getAllRowValues(view: View, isIncludeDeleted: boolean): RowValue[];
  getCheckedRowValues(view: View, isChangedOnly: boolean): RowValue[];
  getSelectedRowValues(view: View): RowValue[];
  getOrigRowValue(view: View, dataRow: number): OptionRowValue;
  getCellValue(view: View, dataRow: number, fieldName: string): CellValue;
  getOrigCellValue(view: View, dataRow: number, fieldName: string): CellValue;
  getSumValue(view: View, fieldName: string): number;
  every(view: View, predicate: ListIteratee<RowValue, boolean>): boolean;
  filter(view: View, predicate: ListIteratee<RowValue, boolean>): RowValue[];
  find(view: View, predicate: ListIteratee<RowValue, boolean>, fromDataRow: number): RowValue;
  findAll(view: View, predicate: ListIteratee<RowValue, boolean>, fromDataRow: number): RowValue[];
  findDataRow(view: View, predicate: ListIteratee<RowValue, boolean>): number;
  findDataRows(view: View, predicate: ListIteratee<RowValue, boolean>): number[];
  forEach(view: View, iteratee: ListIteratee<RowValue, void>): void;
  map<TResult = any>(view: View, iteratee: ListIteratee<RowValue, TResult>): TResult[];
  reduce<TResult>(view: View, iteratee: MemoListIterator<RowValue, TResult, Array<RowValue>>, accumulator: TResult): TResult;
  some(view: View, predicate: ListIteratee<RowValue, boolean>): boolean;
  deleteCheckedRows(view: View, isIncludeCreated: boolean): RowValue[];
  confirmDeleteCheckedRows(view: View, isIncludeCreated: boolean): Promise<RowValue[]>;
  init(view: View): void;
  reset(view: View): void;
  confirmReset(view: View): Promise<void>;
  isModified(view: View): boolean;
  alertIfisNotModified(view: View, message: string): Promise<boolean>;
  confirmIfIsModified(view: View, message: string): Promise<boolean>;
  validate(view: View, isChangedOnly: boolean, isAlertMessage: boolean): boolean;
  exportView(view: View, options: ExportOptions): Promise<void>;
  getParent(view: TreeView, dataRow: number): number;
  getAncestors(view: TreeView, dataRow: number, isAscending: boolean): number[];
  getChildren(view: TreeView, dataRow: number): number[];
  getDescendants(view: TreeView, dataRow: number): number[];
  getSiblings(view: TreeView, dataRow: number, isIncludeSelf: boolean): number[];
  collapse(view: TreeView, dataRow: number, isCollapseDescendants: boolean): void;
  expand(view: TreeView, dataRow: number, isExpandDescendants: boolean): void;
}

export declare const gridUtil: GridUtil;

/*
  String
 */
declare interface StringUtil {
  getByte(string: string, bytePerKoChar: number): number;
  getMaxByteString(string: string, maxBytes: number, bytesPerKoChar: number): string;
  isOverByte(string: string, maxBytes: number, bytesPerKoChar: number): boolean;
}

export declare const stringUtil: StringUtil;

/*
  File
 */
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

export type TargetPath = 'temp' | 'storage' | 'export';

declare interface FileUtil {
  uploadFile(file: File, targetPath?: TargetPath): Promise<FileInfo>;
  downloadFile(fileInfo: FileInfo, targetPath?: TargetPath): Promise<void>;
  downloadBlob(blob: Blob, fileName: string): void;
}

export declare const fileUtil: FileUtil;
