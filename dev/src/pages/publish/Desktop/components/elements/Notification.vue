<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Notification
    </h2>
    <p class="kw-guide-description">
      This is notification text style <br>
      The special symbol is replaced <b>from reference mark(&#8251;) to middot(&middot;) and hypen.</b>
    </p>
    <guide-history-view
      :items="historyData"
    />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              the Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              h4
            </td>
            <td>
              .kw-notification-title
            </td>
            <td>
              Add when notification have title
            </td>
          </tr>
          <tr>
            <td>
              1st depth (ul li)
            </td>
            <td>
              ul.kw-notification
            </td>
            <td>
              Add when notification is 1st depth list style
            </td>
          </tr>
          <tr>
            <td>
              2nd depth (ul li)
            </td>
            <td>
              Inside 1st depth list
            </td>
            <td>
              Add when notification is 2nd depth list style
            </td>
          </tr>
          <tr>
            <td>
              span
            </td>
            <td>
              .kw-fc--primary
            </td>
            <td>
              Highlight(Accent) use helper class.
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          When you need to refrence the notification text which is located below grid, please move to
          <router-link to="/Publish/Components/Temporary/PageSample03">
            Temporary > pagesample03
          </router-link>.
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        each elements description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Notification Title
          </h4>
          <h4 class="kw-notification-title">
            화면안내사항 타이틀
          </h4>
        </div>
        <guide-code-view
          :code-value="titleCode"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Notification List ( 1st depth )
          </h4>
          <ul class="kw-notification">
            <li>
              1depth 안내사항의 1뎁스 내용이 들어갑니다.
            </li>
            <li>
              1depth 안내사항의 <span class="kw-fc--primary">1뎁스 내용</span>이 들어갑니다.
            </li>
          </ul>
        </div>
        <guide-code-view
          :code-value="onedepth"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Notification List ( 2nd depth ): <em>This one can not use individually</em>
          </h4>
          <ul class="kw-notification">
            <li style="font-size: 0; padding-left: 0;">
              <ul>
                <li>2depth 안내사항의 2뎁스 내용이 들어갑니다.</li>
              </ul>
            </li>
          </ul>
        </div>
        <guide-code-view
          :code-value="twodepth"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Combination
      </h3>
      <p class="kw-guide-description">
        This is the sample of combination
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h4 class="kw-notification-title">
            화면안내사항 타이틀
          </h4>
          <ul class="kw-notification">
            <li>
              1depth 안내사항의 1뎁스 내용이 들어갑니다.
            </li>
            <li>
              1depth 안내사항의 1뎁스 내용이 길어져 두줄
              이상의 내용이 들어갈 때는 이렇게 표현됩니다. <br> 안내사항의 1뎁스 내용이 길어져 두줄 이상의 내용이 들어갈 때는 이렇게 표현됩니다.
              <ul>
                <li>2depth 안내사항의 2뎁스 내용이 들어갑니다.</li>
              </ul>
            </li>
          </ul>
        </div>
        <guide-code-view
          :code-value="combCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        In this cases
      </h3>
      <p class="kw-guide-description">
        In this cases, please use "Notification List ( 1st depth )"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/notification_01.png"
            alt="case 1"
            style="border: 1px solid #ccc;"
          ><br><br>
          <img
            src="~~dev/assets/images/notification_02.png"
            alt="case 1"
            style="border: 1px solid #ccc;"
          ><br><br>
          <img
            src="~~dev/assets/images/notification_03.png"
            alt="case 1"
            style="border: 1px solid #ccc;"
          >
          <p class="kw-guide-description">
            In this cases, Highlight(Accent) use helper class(.kw-fc--primary : blue color, No red)."
          </p>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        notification in Action bar - top
      </h3>
      <p class="kw-guide-description">
        It's tooltip in actionbar-top as planing in zeplin, But Make sure to put 'notification' instead of tooltip.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/notificationActionbar.png"
            alt="case 1"
            style="border: 1px solid #ccc;"
          >
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const titleCode = `
  <h4 class="kw-notification-title">
    화면안내사항 타이틀
  </h4>
`;

const onedepth = `
<ul class="kw-notification">
  <li>
    1depth 안내사항의 1뎁스 내용이 들어갑니다.
  </li>
  <li>
    1depth 안내사항의 <span class="kw-fc--primary">1뎁스 내용</span>이 들어갑니다.
  </li>
</ul>
`;

const twodepth = `
<!-- This one can not use individually -->
<ul class="kw-notification">
  <li style="font-size: 0; padding-left: 0;">
    <ul>
      <li>2depth 안내사항의 2뎁스 내용이 들어갑니다.</li>
    </ul>
  </li>
</ul>
`;

const combCode = `
<h4 class="kw-notification-title">
  화면안내사항 타이틀
</h4>
<!-- 1st depth list -->
<ul class="kw-notification">
  <li>
    1depth 안내사항의 1뎁스 내용이 들어갑니다.
  </li>
  <li>
    1depth 안내사항의 1뎁스 내용이 길어져 두줄
    이상의 내용이 들어갈 때는 이렇게 표현됩니다. <br> 안내사항의 1뎁스 내용이 길어져 두줄 이상의 내용이 들어갈 때는 이렇게 표현됩니다.

    <!-- 2nd depth list -->
    <ul>
      <li>2depth 안내사항의 2뎁스 내용이 들어갑니다.</li>
    </ul>
  </li>
</ul>
`;
const historyData = [
  {
    timestamp: '2022-10-13',
    text: 'action bar top notification ',
  },
  {
    timestamp: '2022-09-16',
    text: 'First added',
  },
];
</script>
