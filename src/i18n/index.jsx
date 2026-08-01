import arMessages from './messages/ar.json';
import caMessages from './messages/ca.json';
// no need to import en messages-- they are in the defaultMessage field
import es419Messages from './messages/es_419.json';
import esEsMessages from './messages/es_es.json';
import frMessages from './messages/fr.json';
import zhcnMessages from './messages/zh_CN.json';
import heMessages from './messages/he.json';
import idMessages from './messages/id.json';
import kokrMessages from './messages/ko_kr.json';
import plMessages from './messages/pl.json';
import ptbrMessages from './messages/pt_br.json';
import ptPtMessages from './messages/pt_pt.json';
import ruMessages from './messages/ru.json';
import thMessages from './messages/th.json';
import ukMessages from './messages/uk.json';

const messages = {
  ar: arMessages,
  'es-419': es419Messages,
  es: esEsMessages,
  'es-es': esEsMessages, // legacy cookie alias
  fr: frMessages,
  'zh-cn': zhcnMessages,
  ca: caMessages,
  he: heMessages,
  id: idMessages,
  'ko-kr': kokrMessages,
  pl: plMessages,
  'pt-br': ptbrMessages,
  pt: ptPtMessages,
  'pt-pt': ptPtMessages, // legacy cookie alias
  ru: ruMessages,
  th: thMessages,
  uk: ukMessages,
};

export default messages;
