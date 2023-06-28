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
              dense <br>
              grow<br>
              stretch<br>
              overflow<br>
              placeholder="입력해주세요"<br>
              readonly<br>
              disable
            </td>
            <td>
              Add this when Essential Case<br>
              height: 32px <br>
              flex-grow - full width<br>
              align-item: stretch - full height<br>
              overflow - shrink off<br>
              placeholder<br>
              Add the attribute "readonly" in the tag of kw-input<br>
              Add the attribute "disable" in the tag of kw-input<br>
            </td>
          </tr>
          <tr>
            <td>kw-form-item / kw-search-item</td>
            <td>
              required <br>
              hint="value" <br>
              no-label
            </td>
            <td>
              Add 'required' when the essential case in the tags of kw-form-item or kw-search-item. <br>
              Add the class hint="value" in the tags of kw-form-item or kw-search-item. <br>
              Add the 'no-label' in the tags of kw-form-item or kw-search-item attribute when necessary
            </td>
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
              <kw-form-item
                label="label"
              >
                <kw-input shrink />
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
        id="nolabel"
        class="kw-guide-title"
      >
        No label Case
      </h3>
      <p class="kw-guide-description">
        input with no label
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                no-label
              >
                <kw-input />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="nolabelCode"
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
        id="essential"
        class="kw-guide-title"
      >
        With Tooltip Icon
      </h3>
      <p class="kw-guide-description">
        - add attribute <b> hint="value" </b>  in <b> &lt;kw-form-item&gt; </b>
        when it needs to have tooltip icon <br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="label"
                required
                hint="tooltiptext"
              >
                <kw-input
                  rules="required"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="tooltipCode"
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
        Search Input
      </h3>
      <p class="kw-guide-description">
        If you need search input, add icon="search" and clearable prop like below
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="search">
                <kw-input
                  icon="search"
                  clearable
                />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="search(readonly)">
                <kw-input readonly />
                <kw-btn
                  secondary
                  icon="search"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="searchInput"
          lang="vue"
        />
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
        <b>please no more wrap div.row.items-center</b>
      </p>
      <q-card>
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
                <kw-input />
                <span>-</span>
                <kw-input />
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
                <kw-input />
                <span>-</span>
                <kw-input />
                <span>-</span>
                <kw-input />
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
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Textarea
      </h3>
      <p class="kw-guide-description">
        Add <b>type="textarea" and :rows="3"</b> in kw-input.<br>
        default is :rows="3"<br>
        The height of textarea is adjusted by row instead of size class.<br>
        one row is 24px excluded padding top and bottom.<br>
        Put rows similar height like design. don't need mind about same height like design.<br>
        Add <b>counter</b> and <b>maxlength</b> if need to use text counter.
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
            <kw-form-row>
              <kw-form-item label="textarea">
                <kw-input
                  type="textarea"
                  :rows="3"
                  counter
                  maxlength="200"
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
      <kw-input />
      <span>-</span>
      <kw-input />
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
      <kw-input />
      <span>-</span>
      <kw-input />
      <span>-</span>
      <kw-input />
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

const searchInput = `
<kw-input
  icon="search"
  clearable
/>
<!-- readonly일 경우  -->
<kw-input />
  <kw-btn
    secondary
    icon="search"
  />
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
  <kw-form-row>
    <kw-form-item label="textarea">
      <kw-input
        type="textarea"
        :rows="3"
        counter
        maxlength="200"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const tooltipCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item
      label="label"
      required
      hint="tooltiptext"
    >
      <kw-input
        rules="required"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const nolabelCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item
      no-label
    >
      <kw-input />
    </kw-form-item>
  </kw-form-row>
</kw-form>

<!-- if Search Form -->
<kw-search>
  <kw-search-row>
    <kw-search-item
      no-label
    >
      <kw-input />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const guideHistory = [
  {
    timestamp: '2023.06.28',
    text: 'search input의 Readonly 일 경우 추가',
  },
  {
    timestamp: '2023.01.02',
    text: 'no more use div.row.items-center for hypen type',
  },
  {
    timestamp: '2022.11.22',
    text: 'Add new prop about stretch and dense',
  },
  {
    timestamp: '2022.10.06',
    text: 'edit icon name in code',
  },
  {
    timestamp: '2022-09-28',
    text: 'add searchInput type',
  },
  {
    timestamp: '2022-09-21',
    text: 'revised the summary area',
  },
  {
    timestamp: '2022-09-20',
    text: 'add counter and maxlength in textarea',
  },
  {
    timestamp: '2022-09-15',
    text: 'add explanation about textarea',
  },
  {
    timestamp: '2022-09-14',
    text: 'add no label case',
  },
  {
    timestamp: '2022-09-13',
    text: 'add label with tooltip case',
  },
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
