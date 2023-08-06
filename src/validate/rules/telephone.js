import { isEmpty } from 'lodash-es';

const regex = /^\d{2,4}-\d{3,4}-\d{4}$/;
const corpNumberRegex = /^\d{4}-\d{4}$/;

function validate(value) {
  const numberList = [
    '02', '031', '032', '033', '041', '042', '043', '044', '051', '052', '053', '054', '055', '061', '062', '063', '064', // 지역번호
    '010', '011', '017', '0504', '0505', // 웹팩스 & 핸드폰
    '1566', '1600', '1670', // 전국대표번호 SK브로드밴드
    '1533', '1577', '1588', '1899', // 전국대표번호 KT
    '1522', '1544', '1644', '1661', // 전국대표번호 LGU+
    '1599', '1800', // 전국대표번호 SK텔링크
    '1688', '1666', // 전국대표번호 세종텔레콤
    '1855', // 전국대표번호 LG헬로비전
    '1811', '1877', // 전국대표번호 KCT
  ];

  const seoul = value.slice(0, 2);
  const areaAndPhone = value.slice(0, 3);
  const corpAndFax = value.slice(0, 4);

  const isValid = numberList.includes(seoul) || numberList.includes(areaAndPhone) || numberList.includes(corpAndFax);
  return isValid && (regex.test(value) || corpNumberRegex.test(value));
}

export default {
  validator: (value) => {
    if (isEmpty(value)) return true;

    const stringValue = String(value);

    if (stringValue.indexOf('-') >= 0) return validate(stringValue);

    const { length } = stringValue;
    let formatNum;
    if (stringValue?.startsWith('0504') || stringValue?.startsWith('0505')) { // WEBFAX
      if (stringValue?.length <= 11) formatNum = stringValue.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
      else formatNum = stringValue.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (length === 11) {
      formatNum = stringValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (length === 8) formatNum = stringValue.replace(/(\d{4})(\d{4})/, '$1-$2'); // 업체번호?
    else if (stringValue.startsWith('02')) {
      if (length <= 9) formatNum = stringValue.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
      else formatNum = stringValue.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else formatNum = stringValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    return validate(formatNum);
  },
  message: 'MSG_VAL_TELEPHONE',
};
