import part from "../common/part.js";
import util from "../common/util.js";

let tag = 'comment';
let element = null;
let appid = '';
let appkey = '';
let onupdate = null;
let abbrMatch = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    if (params) {
      let result = util.decodePass(params.valine.pass, params.valine.pointer);
      appid = result.appid;
      appkey = result.appkey;
      params.abbrMatch && (abbrMatch = params.abbrMatch);
      params.onupdate && (onupdate = params.onupdate);
    }
    callback && callback(element);
  });
};

const update = o => {
  if (!element) return;
  let v = document.querySelector('.leancloud_visitors');
  if (v) {
    v.id = window.location.pathname.replace(/\/[^\/]+.html$/, '/');
    v.setAttribute('data-flag-title', document.title.replace(/ - [^-]+$/, ''));
  }
  onupdate && onupdate(appid, appkey);
};

export default {
  tag,
  init,
  update
};