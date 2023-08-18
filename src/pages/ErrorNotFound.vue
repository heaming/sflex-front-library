<template>
  <div class="fullscreen bg-white text-center q-pa-md flex flex-center">
    <div>
      <!-- <div class="text-h3">
        {{ $router.currentRoute.value.fullPath }}
      </div>
      <br>
      <div class="text-h2">
        페이지가 존재하지 않거나, 접근할 수 없습니다.
      </div> -->

      <svg
        viewBox="0 0 60 60"
        class="scoped-error--svg"
      >
        <path
          d="m28 0 28 52H0z"
          transform="translate(2 4)"
          style="fill: #ed1941;"
        />
        <text
          data-name="!"
          transform="translate(30 47)"
        ><tspan
          x="-5.55"
          y="0"
        >!</tspan></text>
      </svg>
      <h1
        v-if="existsPage"
        class="scoped-error--h1"
      >
        해당 페이지에 권한이 없습니다.
      </h1>
      <h1
        v-else
        class="scoped-error--h1"
      >
        페이지를 찾을 수 없습니다.
      </h1>
      <p class="scoped-error--p">
        <span>요청하신 페이지가 존재하지 않거나,</span> <span>잘못된 접근입니다.</span><br>
        <span>해당 페이지의 주소를 다시 확인하시거나, </span><br>
        <span>아래 링크를 눌러 홈 화면으로</span> <span>이동해주세요.</span>
      </p>
      <kw-btn
        primary
        :to="existsPage ? goBack : '/'"
        class="scoped-error--btn"
        label="이전페이지로 이동"
      />
    </div>
  </div>
</template>

<script setup>
import { filter, find, kebabCase } from 'lodash-es';
import store from '../store';

const router = useRouter();
let existsPage = false;

const currentPath = router.currentRoute.value.path;
const { getters } = useStore();
const apps = store.getters['meta/getApps'];
function recursiveBuildPath(app, menu) {
  const paths = [];

  const { folderYn, pageDestinationValue } = menu;
  const menuIsPage = folderYn === 'N' && !!pageDestinationValue;

  if (menuIsPage) {
    const name = pageDestinationValue;

    paths.push(
      kebabCase(name.substring(0, name.length - 1)),
    );

    const { pageTypeCode, pageId, linkPageId } = menu;

    if (pageTypeCode === 'L') {
      const linkPage = store.getters['meta/getLinkPage'](pageId, linkPageId);
      const linkParams = (linkPage?.pageParameter || []);

      paths.push(
        ...linkParams.map((e) => kebabCase(e.pageParameterValue)),
      );
    }
  }

  const menuUid = menu.parentsMenuUid;
  const menuLevel = menu.menuLevel - 1;
  const matched = find(store.getters['meta/getMenus'], { menuUid, menuLevel });

  if (matched !== undefined) {
    paths.unshift(
      ...recursiveBuildPath(app, matched),
    );
  } else {
    paths.unshift('', app.applicationUrl.toLowerCase());
  }

  return paths;
}

function goBack() {
  router.go(-1);
}

function makePath(app) {
  const menus = getters['meta/getTotalMenus'].data;
  const { applicationId } = app;
  const targets = filter(menus, { applicationId });

  targets.forEach((menu) => {
    const existPath = recursiveBuildPath(app, menu).join('/');
    if (currentPath === existPath) {
      existsPage = true;
    }
  });
}

apps.forEach((app) => {
  makePath(app);
});

//
</script>
