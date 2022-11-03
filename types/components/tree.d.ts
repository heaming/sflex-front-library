import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwTreeNode {
  children?: (Node extends unknown ? KwTreeNode : Node)[];
  disabled?: boolean;
  expandable?: boolean;
  selectable?: boolean;
  [index: string]: any;
}

interface KwTreeProps {
  /**
   * 트리 노드 배열
   */
  nodes?: KwTreeNode[];

  /**
   * 노드 키 속성 이름
   * @defaultValue `key`
   */
  nodeKey?: string;

  /**
   * 노드 라벨 속성 이름
   * @defaultValue `label`
   */
  labelKey?: string;

  /**
   * 자식노드 배열 속성 이름
   * @defaultValue `children`
   */
  childrenKey?: string;

  /**
   * 트리 커넥터 사용 여부
   */
  noConnectors?: boolean;

  /**
   * 선택된 노드 컬러
   */
  selectedColor?: string;

  /**
   * 확장된 노드 키 배열
   */
  expanded?: any[];

  /**
   * 선택된 노트 키
   */
  selected?: any;

  /**
   * 선택된 노드 해제 가능 여부
   */
  noSelectionUnset?: boolean;

  /**
   * 처음 렌더링 시 전부 확장시킬지 여부
   */
  defaultExpandAll?: boolean;

  /**
   * 아코디언 모드 여부
   */
  accordion?: boolean;

  /**
   * 트랜지션 끄기 여부
   */
  noTransition?: boolean;

  /**
   * 노드 배열 필터링 시 사용할 텍스트
   */
  filter?: string;

  /**
   * The function to use to filter the tree nodes; For best performance, reference it from your scope and do not define it inline
   * Default value: (see source code)
   * @param node Node currently being filtered
   * @param filter Filter text to match against
   * @returns Matches or not
   */
  filterMethod?: (node: any, filter: string) => boolean;

  /**
   * 노드 배열이 없을 때 표시할 라벨
   */
  noNodesLabel?: string;

  /**
   * 필터링 시 결과가 없을 때 표시할 라벨
   */
  noResultsLabel?: string;

  /**
   * 지정 시 리프 노드만 선택 가능하다
   */
  selectLeafOnly?: boolean;

  /**
   * 노드 확장여부 변경할 때 발생하는 이벤트
   * @param expanded 확장된 노드 키 배열
   */
  'onUpdate:expanded'?: (expanded: readonly any[]) => void;

  /**
   * 선택된 노드 변경할 때 발생하는 이벤트
   * @param target 선택된 노드 키
   */
  'onUpdate:selected'?: (target: any) => void;
}

interface KwTreeSlots {
  /**
   * 노드 헤더 영역
   * @param scope
   */
  header: (scope: {
    /**
     * 노드가 확장됐는지 여부, 확장 상태를 변경하는 새로운 부울 값을 직접 할당할 수 있습니다.
     */
    expanded: boolean;

    /**
     * 노드 리프 여부
     */
    isLeaf: boolean;

    /**
     * 노드 오브젝트
     */
    node: any;

    /**
     * 노드 키
     */
    key: any;
  }) => VNode[];

  /**
   * 노드 바디 영역
   * @param scope
   */
  body: (scope: {
    /**
     * 노드가 확장됐는지 여부, 확장 상태를 변경하는 새로운 부울 값을 직접 할당할 수 있습니다.
     */
    expanded: boolean;

    /**
     * 노드 리프 여부
     */
    isLeaf: boolean;

    /**
     * 노드 오브젝트
     */
    node: any;

    /**
     * 노드 키
     */
    key: any;
  }) => VNode[];
}

export interface KwTree extends ComponentPublicInstance<KwTreeProps> {
  /**
   * 주어진 키에 해당하는 노드 반환
   * @param key 노드 키
   */
  getNodeByKey: (key: any) => any | undefined;

  /**
   * 확장된 노드 배열 반환
   */
  getExpandedNodes: () => readonly any[];

  /**
   * 주어진 키에 해당하는 노드 확장 여부
   * @param key 노드 키
   */
  isExpanded: (key: any) => boolean;

  /**
   * 주어진 키에 해당하는 노드가 리프 노드인지 여부
   * @param key 노드 키
   */
  isLeaf: (key: any) => boolean;

  /**
   * 모든 노드를 확장시킨다
   */
  expandAll: () => void;

  /**
   * 모든 노드를 접는다
   */
  collapseAll: () => void;

  /**
   * 주어진 키에 해당하는 노드 확장여부 설정
   * @param key 노드 키
   * @param state 확장 여부
   */
  setExpanded: (key: any, state: boolean) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTree: GlobalComponentConstructor<KwTreeProps, KwTreeSlots>;
  }
}
