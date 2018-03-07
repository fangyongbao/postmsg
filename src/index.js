/**
 * postMessage封装
 *
 * @class Postmsg
 */

export default class Postmsg {
  constructor(opts) {
    const opt = {
      origin: '*',
    };
    this.targets = {};
    this.handleMessage = {};
    this.message = window.postMessage;
    this.options = Object.assign(opt, opts);
    this._init();
  }

  /**
   * 初始化postMessage
   * @private
   */
  _init() {
    if (this.message === 'undefined') {
      console.warn('浏览器不支持postMessage');
      return;
    }
  }

  /**
   * 添加目标窗口
   * @public
   */
  addTarget(name, target) {
    if (this.targets[name]) {
      console.warn('目标窗口已存在，请勿重复添加');
    } else {
      this.targets[name] = target;
    }
  }

  /**
   * 添加消息监听方法
   * @public
   */
  addHandleMessage(callBack) {
    if (callBack && typeof callBack === 'function' && typeof this.handleMessage !== 'function') {
      this.handleMessage = callBack;
      if (window.attachEvent) {
        window.attachEvent('onmessage', this.handleMessage);
      } else {
        window.addEventListener('message', this.handleMessage, true);
      }
    }
  }

  /**
   * 向目标窗口发送消息
   * @public
   */
  send(name, msg, origin) {
    if (this.targets[name]) {
      this.targets[name].postMessage(msg, origin || this.options.origin || '*');
    } else {
      console.warn('目标窗口不存在');
    }
  }

  /**
   * 广播消息
   * @public
   */
  broadcast(name, msg, origin) {
    Object.values(this.targets).forEach((target) => {
      target.postMessage(msg, origin || this.options.origin || '*');
    });
  }
}
