<template>
  <kw-page class="kw-guide">
    <h2>Input</h2>
    <p class="kw-guide-description">
      default-height:40px, searchform- 32px;
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        input default( height:40px)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="지점명">
                <kw-input
                  name="input"
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item label="지점명"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="essential"
        class="kw-guide-title"
      >
        essential
      </h3>
      <p class="kw-guide-description">
        add <span class="kw-guide-highlight"> "essential" </span> of the classes in <span class="kw-guide-highlight">
          &lt;kw-form-item&gt; </span>
        when it needs to be essential to
        input<br>
        put the attribute <span class="kw-guide-highlight">rules="required'
        </span>in the tag of kw-input, when it should be required.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="담당자명"
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
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명" class="essential"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="readonly"
        class="kw-guide-title"
      >
        readonly
      </h3>
      <p class="kw-guide-description">
        add <span class="kw-guide-highlight">v-model="readonlyValue"</span> in the tag of "kw-input"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item label="지역명">
                <kw-input
                  v-model="readonlyValue"
                  name="input"
                  readonly
                  rules="required"
                  placeholder="입력해주세요"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명"><br>
            &lt;kw-input<br>
            name="input"<br>
            v-model="readonlyValue"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="disable"
        class="kw-guide-title"
      >
        disable
      </h3>
      <p class="kw-guide-description">
        add <span class="kw-guide-highlight">disable</span> in the tag of "kw-input"
      </p>
      <q-card>
        <div>
          <div class="kw-guide-example">
            <kw-form>
              <kw-form-row>
                <kw-form-item label="권역명">
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
          <div class="kw-guide-code">
            <code>
              &lt;kw-form> <br>
              &lt;kw-form-row><br>
              &lt;kw-form-item  label="담당자명"><br>
              &lt;kw-input<br>
              name="input"<br>
              rules="required"<br>
              placeholder="입력해주세요"
              disable<br>
              /><br>
              &lt;/kw-form-item>
              &lt;/kw-form-row><br>
              &lt;/kw-form><br>
            </code>
          </div>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="column"
        class="kw-guide-title"
      >
        column
      </h3>
      <p class="kw-guide-description">
        There are the 4 types of column. Add kw-input as many as it needs until 4 columns in kw-form-row
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="cols"
                colspan="2"
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
        <div class="kw-guide-codeButton">
          <button>
            Show code &darr;
          </button>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            disable<br>
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="column"
        class="kw-guide-title"
      >
        column
      </h3>
      <p class="kw-guide-description">
        There are the 4 types of column. Add kw-input as many as it needs until 4 columns in kw-form-row
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form cols="1">
            <kw-form-row>
              <kw-form-item
                label="cols"
                colspan="2"
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
        <div class="kw-guide-codeButton">
          <button>
            Show code &darr;
          </button>
        </div>
        <div class="kw-guide-code">
          <code>
            &lt;kw-form> <br>
            &lt;kw-form-row><br>
            &lt;kw-form-item  label="담당자명"><br>
            &lt;kw-input<br>
            name="input"<br>
            rules="required"<br>
            placeholder="입력해주세요"
            disable<br>
            /><br>
            &lt;/kw-form-item>
            &lt;/kw-form-row><br>
            &lt;/kw-form><br>
          </code>
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
</script>
<style lang="scss">
.q-field__native { max-width: 310px; }
.mw100 > div > div > div > input { max-width: 100% !important; }
</style>
