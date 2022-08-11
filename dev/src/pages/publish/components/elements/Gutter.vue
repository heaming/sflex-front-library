<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      gutter
    </h2>
    <p class="kw-guide-description">
      Gutter is used to easily define the 'margin' and 'padding' between each component.
      <br>It is provided in the form of a 'class'. 1px, 2px, 3px ... 500px
    </p>
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
              padding/margin
            </th>
            <th>
              position
            </th>
            <th>
              pixel
            </th>
            <th>
              class sample
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span style="color: #999;">[</span> p <span style="color: #999;">|</span>
              m <span style="color: #999;">]</span><br>
              <span style="color: #999;">
                p = padding<br>m = margin
              </span>
            </td>
            <td>
              <span style="color: #999;">[</span> t <span style="color: #999;">|</span> r
              <span style="color: #999;">|</span> b <span style="color: #999;">|</span> l
              <span style="color: #999;">|</span> a <span style="color: #999;">|</span> x
              <span style="color: #999;">|</span> y <span style="color: #999;">]</span><br>
              <span style="color: #999;">
                t = top<br>r = right<br>b = bottom<br>l = left<br>x = horizontal<br>y = vertical<br>
              </span>
            </td>
            <td>
              <span style="color: #999;">[</span> 1 <span style="color: #999;">|</span> 2
              <span style="color: #999;">|</span> ... <span style="color: #999;">|</span> 500
              <span style="color: #999;">]</span>
            </td>
            <td>
              mr30, pa20
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="example"
        class="kw-guide-title"
      >
        Example
      </h3>
      <p class="kw-guide-description">
        mr30(margin-right:30px), pa20(padding:20px)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="gutter-exam-el mr30">
            <div class="pa20">
              200px * 100px
            </div>
          </div>
          <div class="gutter-exam-el">
            <div class="pa20">
              200px * 100px
            </div>
          </div>
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const testCode = `
<div class="kw-guide-example">
  <div class="gutter-exam-el mr30">
    <div class="pa20">
      200px * 100px
    </div>
  </div>
  <div class="gutter-exam-el">
    <div class="pa20">
      200px * 100px
    </div>
  </div>
</div>
`;
</script>
