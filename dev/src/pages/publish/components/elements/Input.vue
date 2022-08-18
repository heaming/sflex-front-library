<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Input
    </h2>
    <p class="kw-guide-description">
      default-height: 40px / searchform - height: 32px
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
              kw-input
            </td>
            <td>
              name="input"<br>
              rules="required"<br>
              placeholder="입력해주세요"<br>
              readonly<br>
              disable
            </td>
            <td>
              Required, Default : "input" <br>
              Required, Default : "required"<br>
              Copy the text from zeplin<br>
              Add the attribute "readonly" in the tag of kw-input<br>
              Add the attribute "disable" in the tag of kw-input<br>
            </td>
          </tr>
          <tr>
            <td>
              kw-form-item / kw-search-item
            </td>
            <td>
              essential
            </td>
            <td>
              Add the class "essential" in the tags of kw-form-item or kw-search-item.
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
        <li>For 'label' width & 'input' width, refer to 'Collections/Form'.</li>
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
        input default(height:40px)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="label">
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="inputCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="essential"
        class="kw-guide-title"
      >
        Essential
      </h3>
      <p class="kw-guide-description">
        add <b> "essential" </b> of the classes in <b>
          &lt;kw-form-item&gt; </b>
        when it needs to be essential to
        input
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="label"
                class="essential"
              >
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="essentialCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="readonly"
        class="kw-guide-title"
      >
        Readonly
      </h3>
      <p class="kw-guide-description">
        add the attribute <b>"readonly"</b> in the tag of "kw-input"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="label">
                <kw-input
                  name="input"
                  readonly
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="inputReadonlyCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disable"
        class="kw-guide-title"
      >
        Disable
      </h3>
      <p class="kw-guide-description">
        add the attribute <b>"disable"</b> in the tag of "kw-input"
      </p>
      <q-card>
        <div>
          <div class="kw-guide-example">
            <kw-form>
              <kw-form-row>
                <kw-form-item label="label">
                  <kw-input
                    name="input"
                    rules="required"
                    placeholder="입력해주세요"
                    disable
                  />
                </kw-form-item>
              </kw-form-row>
            </kw-form>
          </div>
          <guide-code-view
            :code-value="inputDisableCode"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const inputCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="label">
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="label">
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const essentialCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item
      label="label"
      class="essential"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item
      label="label"
      class="essential"
    >
      <kw-input
        name="input"
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const inputReadonlyCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="label">
      <kw-input
        name="input"
        readonly
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="label">
      <kw-input
        name="input"
        readonly
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const inputDisableCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="label">
      <kw-input
        name="input"
        disable
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="label">
      <kw-input
        name="input"
        disable
        rules="required"
        placeholder="입력해주세요"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
</script>
