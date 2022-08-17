<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Flex
    </h2>
    <p class="kw-guide-description">
      There are most components in front-library.however, few cases may not be
      existed in front-library.<br>
      In this case, check out the page ( <a
        href="https://quasar.dev/layout/grid/flex-playground"
        target="_blank"
      >https://quasar.dev/layout/grid/flex-playground</a> ) from Quasar <br>
      And Create the page with 'the helper classes' from Quasar.
      The example is as below
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          Ensure how to use flex system from Quasar Please ( The link of flex system: <a
            href="https://quasar.dev/layout/grid/flex-playground"
            target="_blank"
          >https://quasar.dev/layout/grid/flex-playground</a> )
        </li>
        <li>
          Spacing between the items in the example, Go to reference page of gutter. (publish/components/Elements)
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Example
      </h3>
      <p class="kw-guide-description">
        Add the class "row" and the necessary classes
        (such as justify-content, justify-end) in container.<br>
        The tag which is included 'flex-exam' is called container.
        And The tags of div or p in the container is called child (in the example).<br>
        Ignore the class of item when you use flex system. this is for example class
      </p>
      <q-card>
        <div class="kw-guide-example">
          <!-- justify-between -->
          <div class="flex-exam row justify-between items-center">
            <div class="item">
              Box
            </div>
            <div class="item">
              justify-between
            </div>
            <div class="item">
              Box
            </div>
          </div>
          <!-- justify-start -->
          <div class="flex-exam row justify-start items-center ">
            <div class="item mr10">
              Box
            </div>
            <div class="item mr10">
              Box
            </div>
            <p>
              Justify-start: Left Side
            </p>
          </div>
          <!-- justify-end -->
          <div class="flex-exam row justify-end items-center">
            <p class="mr10">
              Justify-end: Right Side
            </p>
            <div class="item mr10">
              Box
            </div>
            <div class="item">
              Box
            </div>
          </div>
          <div class="flex-exam row justify-between">
            <div class="flex-exam row justify-start items-center">
              <div class="item mr10">
                Left side: justify-start
              </div>
            </div>
            <div class="flex-exam row justify-end items-center">
              <div class="item mr10">
                Right side: justify-end
              </div>
              <div class="item">
                Right side: justify-end
              </div>
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
<!-- justify-between -->
<!-- The class of item is for decorating the example, ignore this class when you copy the code or using the flex system-->
<div class="row justify-between items-center">
  <div class="item">
    Box
  </div>
  <div class="item">
    justify-between
  </div>
  <div class="item">
    Box
  </div>
</div>
<!-- justify-start -->
<div class="row justify-start items-center">
  <div class="item mr10">
    Box
  </div>
  <div class="item mr10">
    Box
  </div>
  <p>
    Justify-start: Left Side
  </p>
</div>
<!-- justify-end -->
<div class="row justify-end items-center">
  <p class="mr10">
    Justify-end: Right Side
  </p>
  <div class="item mr10">
    Box
  </div>
  <div class="item">
    Box
  </div>
</div>
<!-- two inner rows are wrapped by the outside of row. The one of inner rows is justify-start(left side), The other one is justify-end(right side) -->
<div class="row justify-between">
  <div class="row justify-start items-center">
    <div class="item mr10">
      Left side: justify-start
    </div>
  </div>
  <div class="row justify-end items-center">
    <div class="item mr10">
      Right side: justify-end
    </div>
    <div class="item">
      Right side: justify-end
    </div>
  </div>
</div>
`;

</script>
