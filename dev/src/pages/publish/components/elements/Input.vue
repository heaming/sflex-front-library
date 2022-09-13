<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Input
    </h2>
    <p class="kw-guide-description">
      default-height: 40px / searchform - height: 32px
    </p>
    <guide-history-view
      :items="guideHistory"
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
            <th>the Element(tag's name)</th>
            <th>Attr or Class</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>kw-input</td>
            <td>
              rules="required"<br>
              placeholder="입력해주세요"<br>
              readonly<br>
              disable
            </td>
            <td>
              Add this when Essential Case<br>
              placeholder<br>
              Add the attribute "readonly" in the tag of kw-input<br>
              Add the attribute "disable" in the tag of kw-input<br>
            </td>
          </tr>
          <tr>
            <td>kw-form-item / kw-search-item</td>
            <td>essential</td>
            <td>Add the class "essential" in the tags of kw-form-item or kw-search-item.</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Notice
      </h3>
      <ul>
        <li class="notice">
          For 'label' width & 'input' width, refer to 'Collections/Form'.
        </li>
        <li class="notice">
          Conclude to remove the placeholder attribute in code, because developer will add that.
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
        input default(height:40px)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="label">
                <kw-input />
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
        - add attribute <b> "required" </b>  in <b> &lt;kw-form-item&gt; </b>
        when it needs to be essential to input <br>
        - add attribute <b>rules="required"</b> in <b>&lt;kw-input&gt;</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="label"
                required
              >
                <kw-input
                  rules="required"
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
                  readonly
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
    <div class="kw-guide-section">
      <h3
        id="disable"
        class="kw-guide-title"
      >
        Input with special symbols
      </h3>
      <p class="kw-guide-description">
        If you need the case of input with hypen or tilde,
        kindly ask to add the <b>( ex: '&lt;span&gt;-&lt;/span&gt;')</b> between input tag. <br>
        Please find the detail about input width in 'collections/searchform' section.
      </p>
      <q-card>
        <div>
          <div class="kw-guide-example">
            <kw-form :cols="2">
              <kw-form-row>
                <kw-form-item label="input(flex/2columns)">
                  <kw-input />
                  <span>-</span>
                  <kw-input />
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="input(fixed/2columns)">
                  <div class="row items-center w296">
                    <kw-input />
                    <span>-</span>
                    <kw-input />
                  </div>
                </kw-form-item>
              </kw-form-row>

              <kw-separator />
              <kw-form-row>
                <kw-form-item label="input(flex/3columns)">
                  <kw-input />
                  <span>-</span>
                  <kw-input />
                  <span>-</span>
                  <kw-input />
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="input(fixed/3columns)">
                  <div class="row items-center w464">
                    <kw-input />
                    <span>-</span>
                    <kw-input />
                    <span>-</span>
                    <kw-input />
                  </div>
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="input with tilde">
                  <kw-input />
                  <span>~</span>
                  <kw-input />
                </kw-form-item>
              </kw-form-row>
            </kw-form>
          </div>
          <guide-code-view
            :code-value="hypenInput"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Textarea
      </h3>
      <p class="kw-guide-description">
        Add <b>type="textarea" and :rows="3"</b> in kw-input.
        default is :row="3"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="textarea">
                <kw-input
                  type="textarea"
                  :rows="3"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="textarea"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const inputCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item
      label="label"
      required
    >
      <kw-input
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-form-item
      label="label"
      required
    >
      <kw-input
        rules="required"
      />
    </kw-form-item>
  </kw-search-row>
</kw-search>
`;

const essentialCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item
      label="label"
      required
    >
      <kw-input
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item
      label="label"
      required
    >
      <kw-input
        rules="required"
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
        readonly
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="label">
      <kw-input
        readonly
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
        disable
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item label="label">
      <kw-input
        disable
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;
const hypenInput = `
<kw-form cols="2">
  <kw-form-row>
    <kw-form-item label="input(flex/2columns)">
      <kw-input />
      <span>-</span>
      <kw-input />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input(fixed/2columns)">
      <div class="row items-center w296">
        <kw-input />
        <span>-</span>
        <kw-input />
      </div>
    </kw-form-item>
  </kw-form-row>
  <!-- seperator -->
  <kw-form-row>
    <kw-form-item label="input(flex/3columns)">
      <kw-input />
      <span>-</span>
      <kw-input />
      <span>-</span>
      <kw-input />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input(fixed/3columns)">
      <div class="row items-center w464">
        <kw-input />
        <span>-</span>
        <kw-input />
        <span>-</span>
        <kw-input />
      </div>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="input with tilde">
      <kw-input />
      <span>~</span>
      <kw-input />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const textarea = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="textarea">
      <kw-input
        type="textarea"
        :rows="3"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const guideHistory = [
  {
    timestamp: '2022-09-08',
    text: 'Add Textarea. the design may be changed later.',
  },
  {
    timestamp: '2022-09-06',
    text: 'change guide content about essential type',
  },
  {
    timestamp: '2022-09-02',
    text: 'add the example of having tilde special symbol',
  },
  {
    timestamp: '2022-09-01',
    text: 'remove the placeholder attribute',
  },

];
</script>
