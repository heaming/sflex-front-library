<!----
****************************************************************************************************
* 프로그램 개요
****************************************************************************************************
1. 모듈 : 공통
2. 프로그램 ID : WebBookmarkMgtP
3. 작성자 : mingyu03.kim
4. 작성일 : 2023.10.10
****************************************************************************************************
* 프로그램 설명
****************************************************************************************************
- PC에서 북마크(즐겨찾기) 표시한 페이지를 관리
- PC 화면에서의 왼쪽 Drawer에서 즐겨찾기 탭에서 편집 버튼 클릭시 나타난다.
****************************************************************************************************
--->
<template>
  <kw-popup
    class="web-bookmark-mgt"
    :title="$t('MSG_TIT_BKMK_EDIT')"
    @before-close="onBeforeClose"
  >
    <kw-action-top>
      <template #left>
        <div class="flex gap-xxs">
          <kw-btn
            grid-action
            icon="top"
            :disable="!selected"
            @click="onClickMove(-Infinity)"
          />
          <kw-btn
            grid-action
            icon="up"
            :disable="!selected"
            @click="onClickMove(-1)"
          />
          <kw-btn
            grid-action
            icon="down"
            :disable="!selected"
            @click="onClickMove(1)"
          />
          <kw-btn
            grid-action
            icon="bottom"
            :disable="!selected"
            @click="onClickMove(Infinity)"
          />
        </div>
      </template>

      <kw-btn
        grid-action
        icon="plus"
        no-wrap
        :label="$t('MSG_BTN_ALL_SPREAD')"
        @click="treeRef.expandAll()"
      />
      <kw-btn
        grid-action
        icon="minus"
        no-wrap
        :label="$t('MSG_BTN_ALL_FOLD')"
        @click="treeRef.collapseAll()"
      />
      <kw-btn
        grid-action
        icon="new_folder"
        no-wrap
        :label="$t('MSG_BTN_FLDR_NEW')"
        @click="onClickNewFolder"
      />
    </kw-action-top>

    <kw-scroll-area>
      <div class="web-bookmark-mgt__tree-container">
        <kw-tree
          ref="treeRef"
          v-model:selected="selected"
          v-model:expanded="expanded"
          class="web-bookmark-mgt__tree"
          :nodes="nodes"
          node-key="bookmarkUid"
          selected-color="black1"
          draggable
          @drag-move="onDragMove"
          @drag-update="onDrageUpdate"
        >
          <template #header="{ node }">
            <div
              v-if="node.isDummy"
              class="web-bookmark-mgt__tree-dummy"
            />
            <div
              v-else-if="node.isFolder"
              class="row col items-center"
            >
              <kw-click-outside
                v-if="node.isEdit"
                @click-outside="onClickFolderName(node, false)"
              >
                <div
                  @pointerdown.stop
                  @mousedown.stop
                  @touchstart.stop
                  @click.stop
                  @keypress.stop
                  @keydown.esc="onClickFolderName(node, false)"
                >
                  <kw-input
                    v-model.trim="inputBookmarkName"
                    dense
                    maxlength="100"
                    autofocus
                    validate-on-mount
                    rules="required"
                    :label="$t('MSG_TXT_BKMK_NM')"
                    @keydown.enter="onClickFolderName(node, false)"
                  />
                </div>
              </kw-click-outside>
              <div v-else>
                <span @click.stop="onClickFolderName(node, true)">
                  {{ node.bookmarkName }}&nbsp;({{ node.actualChildrenLength }})
                </span>
              </div>
              <kw-space />
              <kw-icon
                name="delete"
                clickable
                @click.stop="onClickDelete(node)"
              />
            </div>
            <div
              v-else
              class="row items-center"
            >
              <kw-icon
                name="bookmark_on"
                clickable
                @click.stop="onClickDelete(node)"
              />
              <div>
                {{ node.bookmarkName }}
              </div>
            </div>
          </template>
          <template #body="{ node }">
            <div v-if="!(node.isFolder || node.isDummy)">
              {{ node.menuPath }}
            </div>
          </template>
        </kw-tree>
      </div>
    </kw-scroll-area>

    <ul class="kw-notification">
      <li>{{ $t('MSG_TXT_BKMK_NOTI01') }}</li>
      <li>{{ $t('MSG_TXT_BKMK_NOTI02') }}</li>
    </ul>

    <template #action>
      <kw-btn
        negative
        :label="$t('MSG_BTN_CANCEL')"
        @click="cancel()"
      />
      <kw-btn
        primary
        :label="$t('MSG_BTN_SAVE')"
        @click="onClickSave"
      />
    </template>
  </kw-popup>
</template>

<script setup>
import { cloneDeep, filter, find, findIndex, isEqual } from 'lodash-es';
import { getUid } from '../../utils/string';
import { http } from '../../plugins/http';
import { alert, confirm } from '../../plugins/dialog';
import { notify } from '../../plugins/notify';
import useModal from '../../composables/useModal';

const { t } = useI18n();
const { ok, cancel } = useModal();

const treeRef = ref();
const selected = ref(null);
const expanded = ref([]);

let initialBookmarks;
const bookmarks = shallowRef([]);

const recursiveCreateNode = (_bookmarks, currents) => {
  currents ||= filter(_bookmarks, { bookmarkLevel: 0 });

  return currents.map((e) => {
    const bookmarkLevel = e.bookmarkLevel + 1;
    const parentsBookmarkUid = e.bookmarkUid;

    const isFolder = e.folderYn === 'Y';
    const nexts = filter(_bookmarks, { bookmarkLevel, parentsBookmarkUid });

    if (isFolder) {
      nexts.unshift({
        bookmarkLevel,
        bookmarkUid: getUid(),
        parentsBookmarkUid,
        isFolder: false,
        isDummy: true,
      });
    }

    const children = recursiveCreateNode(_bookmarks, nexts);
    const actualChildrenLength = filter(children, { isDummy: false }).length;

    return {
      bookmarkLevel: e.bookmarkLevel,
      bookmarkUid: e.bookmarkUid,
      bookmarkName: e.bookmarkName,
      parentsBookmarkUid: e.parentsBookmarkUid,
      menuPath: e.menuPath,
      isFolder,
      isEdit: false,
      isDummy: e.isDummy === true,
      children,
      actualChildrenLength,
    };
  });
};
const nodes = computed(() => recursiveCreateNode(bookmarks.value));

const recursiveNormalizeBookmarks = (_bookmarks, currents) => {
  currents ||= filter(_bookmarks, { bookmarkLevel: 0 });

  const normalized = [];

  currents.forEach((e, i) => {
    const bookmarkLevel = e.bookmarkLevel + 1;
    const parentsBookmarkUid = e.bookmarkUid;
    const children = filter(_bookmarks, { bookmarkLevel, parentsBookmarkUid });

    normalized.push(
      {
        bookmarkLevel: e.bookmarkLevel,
        bookmarkUid: e.bookmarkUid,
        bookmarkName: e.bookmarkName,
        folderYn: e.folderYn === 'Y' ? 'Y' : 'N',
        menuUid: e.menuUid,
        pageId: e.pageId,
        menuPath: e.menuPath,
        parentsBookmarkUid: e.parentsBookmarkUid || null,
        arrayalOrder: currents.length - i,
      },
      ...recursiveNormalizeBookmarks(_bookmarks, children),
    );
  });

  return normalized;
};

async function fetchBookmarks() {
  const response = await http.get('/sflex/common/common/bookmarks');
  bookmarks.value = recursiveNormalizeBookmarks(response.data);
  initialBookmarks = cloneDeep(bookmarks.value);
}

const inputBookmarkName = ref();

function onClickFolderName(node, isEdit) {
  const { bookmarkUid } = node;
  const target = find(bookmarks.value, { bookmarkUid });

  if (isEdit) {
    node.isEdit = true;
    inputBookmarkName.value = node.bookmarkName;
  } else {
    if (inputBookmarkName.value.trim().length <= 0) return;
    node.isEdit = false;
    node.bookmarkName = inputBookmarkName.value;
    target.bookmarkName = inputBookmarkName.value;
  }

  treeRef.value.$forceUpdate();
}

function onClickNewFolder() {
  const bookmarkUid = getUid('BMK');

  bookmarks.value = [
    {
      bookmarkLevel: 0,
      bookmarkUid,
      bookmarkName: t('MSG_TXT_FLDR_NEW'),
      parentsBookmarkUid: null,
      menuUid: null,
      pageId: 'FOLDER',
      arrayalOrder: 0,
      folderYn: 'Y',
    },
    ...bookmarks.value,
  ];

  expanded.value.push(bookmarkUid);
}

function onDragMove(evt) {
  const sourceIsFolder = evt.sourceNode.isFolder === true;

  if (sourceIsFolder) {
    const { parentsBookmarkUid } = evt.targetNode;
    const targetParentIsFolder = treeRef.value.getNodeByKey(parentsBookmarkUid)?.isFolder === true;

    return !targetParentIsFolder;
  }
}

function onDrageUpdate(evt) {
  const _bookmarks = [...bookmarks.value];

  const i = findIndex(_bookmarks, { bookmarkUid: evt.sourceNode.bookmarkUid });
  const sourceNode = _bookmarks.splice(i, 1)[0];
  const targetParentNode = treeRef.value.getNodeByKey(evt.targetNode.parentsBookmarkUid);

  if (targetParentNode) {
    sourceNode.bookmarkLevel = targetParentNode.bookmarkLevel + 1;
    sourceNode.parentsBookmarkUid = targetParentNode.bookmarkUid;
  } else {
    sourceNode.bookmarkLevel = 0;
    sourceNode.parentsBookmarkUid = null;
  }

  const compared = evt.source.compareDocumentPosition(evt.target); // forward 4, backward 2
  const j = findIndex(_bookmarks, { bookmarkUid: evt.targetNode.bookmarkUid });
  const k = j + (compared === 4 ? 0 : 1);

  const spliced = _bookmarks.splice(k);

  bookmarks.value = [..._bookmarks, sourceNode, ...spliced];
}

const recursiveDeleteBookmarks = (_bookmarks, current) => {
  const { bookmarkUid } = current;
  const i = findIndex(_bookmarks, { bookmarkUid });

  _bookmarks.splice(i, 1);

  const bookmarkLevel = current.bookmarkLevel + 1;
  const parentsBookmarkUid = bookmarkUid;
  const children = filter(_bookmarks, { bookmarkLevel, parentsBookmarkUid });

  children.forEach((e) => {
    recursiveDeleteBookmarks(_bookmarks, e);
  });

  return _bookmarks;
};

function onClickMove(offset) {
  if (!selected.value) return;

  const {
    bookmarkUid,
    bookmarkLevel,
    parentsBookmarkUid,
  } = treeRef.value.getNodeByKey(selected.value);

  const _bookmarks = [...bookmarks.value];
  const siblings = filter(_bookmarks, { bookmarkLevel, parentsBookmarkUid });

  const indexInSiblings = findIndex(siblings, { bookmarkUid });
  const movedIndexInSiblings = Math.min(Math.max(0, indexInSiblings + offset), siblings.length - 1);
  const movedIndexBookmarkUid = siblings[movedIndexInSiblings].bookmarkUid;

  const index = findIndex(_bookmarks, { bookmarkUid });
  const actualMovedIndex = findIndex(_bookmarks, { bookmarkUid: movedIndexBookmarkUid });
  const actualOffset = actualMovedIndex - index;

  if (actualOffset !== 0) {
    const i = findIndex(_bookmarks, { bookmarkUid });
    const j = i + actualOffset;

    const target = _bookmarks.splice(i, 1);
    const spliced = _bookmarks.splice(j);

    bookmarks.value = [
      ..._bookmarks, ...target, ...spliced,
    ];
  }
}

async function onClickDelete(node) {
  const isConfirmed = node.isFolder
    ? await confirm(t('MSG_TXT_BKMK_WANT_DEL_FLD'))
    : await confirm(t('MSG_TXT_BKMK_WANT_DEL', [node.bookmarkName]));

  if (isConfirmed) {
    const _bookmarks = [...bookmarks.value];
    const { bookmarkUid } = node;
    const target = find(bookmarks.value, { bookmarkUid });

    bookmarks.value = recursiveDeleteBookmarks(_bookmarks, target);
  }
}

function onBeforeClose(result) {
  return result === true
    || isEqual(recursiveNormalizeBookmarks(bookmarks.value), initialBookmarks)
    || confirm(t('MSG_ALT_CHG_CNTN'));
}

function validate(normalizedBookmarks) {
  const matched = find(normalizedBookmarks, (e) => !e.bookmarkName);

  if (matched) {
    const { bookmarkUid, parentsBookmarkUid } = matched;
    const node = treeRef.value.getNodeByKey(bookmarkUid);

    if (parentsBookmarkUid) {
      treeRef.value.setExpanded(parentsBookmarkUid, true);
    }

    onClickFolderName(node, true);
  }

  return !matched;
}

async function onClickSave() {
  const normalizedBookmarks = recursiveNormalizeBookmarks(bookmarks.value);

  if (isEqual(normalizedBookmarks, initialBookmarks)) {
    await alert(t('MSG_ALT_NO_CHG_CNTN'));
    return;
  }

  if (validate(normalizedBookmarks) && await confirm(t('MSG_ALT_WANT_SAVE'))) {
    await http.put('/sflex/common/common/bookmarks', normalizedBookmarks);

    notify(t('MSG_ALT_SAVE_DATA'));
    ok();
  }
}

await fetchBookmarks();
</script>
