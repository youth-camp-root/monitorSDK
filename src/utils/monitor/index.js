import { injectXHR } from "./lib/xhr"
import { injectResource } from "./lib/resource"
import {injectJsError} from "./lib/jsError"
import {injectPromiseError} from "./lib/promiseError"
import {injectBlankScreen} from "./lib/blankError"
// 网络请求监控
injectXHR();
// 资源监控
injectResource();
// js错误监控
injectJsError();
// promise错误监控
injectPromiseError();
// FP,FCP,DOMREADY,DNS监控
injectBlankScreen();
