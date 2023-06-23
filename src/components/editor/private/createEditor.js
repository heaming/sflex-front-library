import SunEditor from 'suneditor';
import { ko } from 'suneditor/src/lang';
import {
  blockquote, align, font, fontSize, fontColor, table,
  formatBlock, lineHeight, template, link, image, list,
} from 'suneditor/src/plugins';

const { create } = SunEditor.init({
  // region [value]
  value: '',
  placeholder: '',
  // endregion

  /**
   * display & layout
   */
  // region [Display]
  display: null,
  position: null,
  height: null,
  width: '100%',
  // minHeight: '50px', // editing area 의 높이이다.
  maxHeight: null,
  minWidth: null,
  maxWidth: null,
  popupDisplay: 'local', // 이미지 삽입과 같은 내부 popup 의 position
  // endregion

  // region [Layout]
  rtl: false, // 버튼 위치까지 싹 바뀌므로 layout 에 둔 듯.
  // endregion

  // region [IFrame]
  iframe: false, // iframe 으로 감싼다. 메인 프레임의 css 는 영향을 미치지 않는다.
  iframeAttributes: {
    scrolling: 'no',
  }, // does not work...?
  iframeCSSFileName: [
    `${window.location.protocol}//${window.location.host}/css/suneditorContents.css`,
  ], // iframe 에 적용 할 css
  // endregion

  // region [buttonList (= header)]
  mode: 'classic', // classic, inline, balloon, balloon-always
  buttonList: [
    // ['undo', 'redo'],
    ['font', 'fontSize'],
    ['bold', 'underline', 'italic', 'strike'],
    // ['subscript', 'superscript'],
    ['fontColor', 'hiliteColor'], // , 'textStyle'
    // ['removeFormat'],
    // '/', // Line break
    // ['outdent', 'indent'],
    ['align', 'list', 'lineHeight'],
    // ['table', 'link', 'image', 'video'],
    ['table', 'image', 'link'],
    // ['fullScreen', 'showBlocks'],
    ['codeView', 'preview', 'print'],
    // ['save', 'template'],
  ],
  // endregion

  // region [edit default]
  defaultTag: 'p', // 문단을 구성하는 tag
  // textTags: {
  //   bold: 'strong', // or strong
  //   underline: 'ins', // or ins
  //   italic: 'em', // or em
  //   strike: 'strike', // or strike
  // },
  // historyStackDelayTime: 400, // undo 시 영향.
  lineAttrReset: 'style',
  defaultStyle: 'font-family: "Noto Sans KR", sans-serif; font-size: 16px;',
  // endregion

  // region [contents define & tag limit]
  // addTagsWhitelist: 'html|head|header|body|style|//',
  fullPage: false, // true: html 및 head tag 를 포함하여 수정한다.; false: body 태그 내부만 수정한다.
  // addTagsWhitelist: 'html|head|header|body|style|div|header|button|span|aside|a|//',
  // pasteTagsWhitelist: 'html|head|header|body|style|div|header|button|span|aside|a|//',
  // attributesWhitelist: { all: 'style' },
  // tagsBlacklist: '',
  // pasteTagsBlacklist: '',
  // attributesBlacklist: null,
  // endregion

  // region [Character count]
  charCounter: false,
  charCounterType: 'byte', // 'char' | 'byte' | 'byte-html'
  charCounterLabel: null,
  maxCharCount: null,
  // endregion

  // region [resizeBar (= footer)]
  resizingBar: false,
  resizeEnable: false,
  showPathLabel: true, // 편집 중인 tag 의 위치를 breadcrumb 형식으로 왼쪽에 붙여 표시
  // endregion

  /**
   * plugins & setting
   */
  // region [Plugins]
  plugins: [
    blockquote,
    align,
    font,
    fontSize,
    fontColor,
    table,
    formatBlock,
    lineHeight,
    template,
    link,
    image,
    list,
  ],
  // image
  // font
  font: [
    '굴림',
    '굴림체',
    '돋움',
    '돋움체',
    '바탕',
    '궁서',
    '궁서체',
    '"Noto Sans KR", sans-serif',
    'Arial',
    'tahoma',
    'Courier New,Courier',
    'Ubuntu',
  ],
  fontSize: [8, 10, 14, 18, 24, 36],
  fontSizeUnit: 'px',
  // endregion

  // region [lang, etc...]
  lang: ko,
  // callBackSave(contents, isChanged) {
  //   console.log(contents, isChanged);
  // },
  // endregion
});

export default create;
