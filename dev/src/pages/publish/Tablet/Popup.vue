<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Tablet] Popup
    </h2>
    <p class="kw-guide-description">
      There is a new sized popup in tablet devise
    </p>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Size
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              type/size
            </th>
            <th>prop</th>
            <th>
              px
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              sm <br>
              md <br>
              lg <br>
              xl <br>
              2xl <br>
              3xl <br>
              4xl <br>
              <b>full-size</b>
            </td>
            <td class="kw-fc--error">
              size="sm" <br>
              size="md" <br>
              size="lg" <br>
              size="xl" <br>
              size="2xl" <br>
              size="3xl" <br>
              size="4xl" <br>
              <b>size="full"</b>
            </td>
            <td class="text-center">
              460px <br>
              660px <br>
              860px<br>
              1060px<br>
              1260px<br>
              1460px <br>
              1660px <br>
              <b>full size</b>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <router-link to="/Publish/Tablet/Temporary/PopupSample01">
        popup page sample
      </router-link>
    </div>
  </kw-page>
</template>

<script setup>
</script>
