import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { LocalDataProvider, GridView, LocalTreeDataProvider, TreeView } from 'realgrid';
import { UseObserverProps } from './private/useObserver';

// KwGrid
interface KwGridProps<D = LocalDataProvider, V = GridView> extends UseObserverProps {
  /**
   * View만 생성할지 여부
   */
  createViewOnly?: boolean;

  /**
   * 표시할 그리드 행 갯수
   */
  visibleRows?: number | string;

  /**
   * onMounted 이후에 그리드가 생성되고 난 후에 발생하는 이벤트
   * @param data 그리드 데이터 객체
   * @param view 그리드 뷰 객체
   */
  onInit?: (data: D, view: V) => void;
}
interface KwGridSlots {}
export interface KwGrid<D = LocalDataProvider, V = GridView> extends ComponentPublicInstance<KwGridProps<D, V>> {
  /**
   * 그리드 데이터 객체 반환
   */
  getData: () => D;

  /**
   * 그리드 뷰 객체 반환
   */
  getView: () => V;
}

// KwTreeGrid
interface KwTreeGridProps<D = LocalTreeDataProvider, V = TreeView> extends KwGridProps<D, V> {}
interface KwTreeGridSlots extends KwGridSlots {}
export interface KwTreeGrid<D = LocalTreeDataProvider, V = TreeView> extends KwGrid<D, V> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwGrid: GlobalComponentConstructor<KwGridProps, KwGridSlots>;
    KwTreeGrid: GlobalComponentConstructor<KwTreeGridProps, KwTreeGridSlots>;
  }
}
