import { login } from "./utils/login"
import { injectXHR } from "./lib/xhr"
import {injectJsError} from "./lib/jsError"
import {injectPromiseError} from "./lib/promiseError"
import {injectBlankScreen} from "./lib/blankError"
import {countStayTime} from "./lib/stayTime"
// 注册账户
login();
// 网络请求监控
injectXHR();
// js错误监控
injectJsError();
// promise错误监控
injectPromiseError();
// FP,FCP,DOMREADY,DNS监控
injectBlankScreen();
// stay time
countStayTime();
