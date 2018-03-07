'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * postMessage封装
 *
 * @class Postmsg
 */

var Postmsg = function () {
  function Postmsg(opts) {
    _classCallCheck(this, Postmsg);

    var opt = {
      origin: '*'
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


  _createClass(Postmsg, [{
    key: '_init',
    value: function _init() {
      if (this.message === 'undefined') {
        console.warn('浏览器不支持postMessage');
        return;
      }
    }

    /**
     * 添加目标窗口
     * @public
     */

  }, {
    key: 'addTarget',
    value: function addTarget(name, target) {
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

  }, {
    key: 'addHandleMessage',
    value: function addHandleMessage(callBack) {
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

  }, {
    key: 'send',
    value: function send(name, msg, origin) {
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

  }, {
    key: 'broadcast',
    value: function broadcast(name, msg, origin) {
      var _this = this;

      Object.values(this.targets).forEach(function (target) {
        target.postMessage(msg, origin || _this.options.origin || '*');
      });
    }
  }]);

  return Postmsg;
}();

exports.default = Postmsg;
module.exports = exports['default'];