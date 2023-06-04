
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Hook.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3124erdDZ9OMowACf7PH1zY', 'Hook');
// Script/Hook.js

"use strict";

/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-06-01 22:30:36
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 22:48:19
 * @FilePath: /goldminer-demo/assets/Script/Hook.js
 * @Description: 矿工钩子相关
 * 
 * Copyright (c) by czqczqzzzzzz(czq), All Rights Reserved. 
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    HookStatus: 0,
    HookSpeed: 1,
    RotateSpeed: 0.5,
    Line: {
      "default": null,
      type: cc.Component
    },
    EmitHookBtn: {
      "default": null,
      type: cc.Component
    },
    ScoreController: {
      "default": null,
      type: cc.Component
    },
    Miner: {
      "default": null,
      type: cc.Component
    },
    Main: {
      "default": null,
      type: cc.Component
    } // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },

  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.scorer = this.ScoreController.getComponent('Score');
    this.EmitHookBtn.node.on(cc.Node.EventType.TOUCH_END, this.EmitHookClick, this);
    this.anim = this.Miner.getComponent(cc.Animation);
    this.anim.play();
  },
  update: function update(dt) {
    this.HookControl();
  },
  EmitHookClick: function EmitHookClick(event) {
    this.HookOut();
  },
  HookIn: function HookIn() {
    this.HookStatus = 2;
    this.anim.play('MinerPullLight');
  },
  HookOut: function HookOut() {
    this.HookStatus = 1;
  },
  onCollisionEnter: function onCollisionEnter(other, self) {
    if (this.HookStatus == 2) {
      return;
    }

    if (other.node.group === 'wall') {
      this.HookIn();
    }

    if (other.node.group === "ore") {
      other.node.group = "default";
      other.node.parent = this.getItem();
      other.node.setPosition(cc.v2(0, 0));
      this.HookIn();
    }
  },
  getItem: function getItem() {
    return this.node.getChildByName("Item");
  },
  // 收集上钩的物品
  cleanItem: function cleanItem() {
    var _this = this;

    var items = this.getItem();
    items.children.forEach(function (item) {
      var score = item.getComponent('Ore').score;

      _this.scorer.addScore(score);

      var main = _this.Main.getComponent('Main');

      main.OreNumber--;
      item.destroy();
    });
  },
  HookRotate: function HookRotate() {
    if (this.HookStatus == 0) {
      if (this.Line.node.angle <= -70) {
        this.RotateSpeed = Math.abs(this.RotateSpeed);
      } else if (this.Line.node.angle >= 70) {
        this.RotateSpeed = -Math.abs(this.RotateSpeed);
      }

      this.Line.node.angle += this.RotateSpeed;
    }
  },
  onHookBack: function onHookBack() {},
  HookControl: function HookControl() {
    //收回吊钩
    if (this.HookStatus == 2 && this.Line.node.height <= 30) {
      this.HookStatus = 0;
      this.cleanItem();
      this.anim.play();
    }

    switch (this.HookStatus) {
      case 0:
        this.HookRotate();
        break;

      case 1:
        this.Line.node.height += this.HookSpeed;
        break;

      case 2:
        this.Line.node.height -= this.HookSpeed;
        break;
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSG9vay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkhvb2tTdGF0dXMiLCJIb29rU3BlZWQiLCJSb3RhdGVTcGVlZCIsIkxpbmUiLCJ0eXBlIiwiRW1pdEhvb2tCdG4iLCJTY29yZUNvbnRyb2xsZXIiLCJNaW5lciIsIk1haW4iLCJzdGFydCIsInNjb3JlciIsImdldENvbXBvbmVudCIsIm5vZGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJFbWl0SG9va0NsaWNrIiwiYW5pbSIsIkFuaW1hdGlvbiIsInBsYXkiLCJ1cGRhdGUiLCJkdCIsIkhvb2tDb250cm9sIiwiZXZlbnQiLCJIb29rT3V0IiwiSG9va0luIiwib25Db2xsaXNpb25FbnRlciIsIm90aGVyIiwic2VsZiIsImdyb3VwIiwicGFyZW50IiwiZ2V0SXRlbSIsInNldFBvc2l0aW9uIiwidjIiLCJnZXRDaGlsZEJ5TmFtZSIsImNsZWFuSXRlbSIsIml0ZW1zIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiaXRlbSIsInNjb3JlIiwiYWRkU2NvcmUiLCJtYWluIiwiT3JlTnVtYmVyIiwiZGVzdHJveSIsIkhvb2tSb3RhdGUiLCJhbmdsZSIsIk1hdGgiLCJhYnMiLCJvbkhvb2tCYWNrIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRSxDQURKO0FBRVJDLElBQUFBLFNBQVMsRUFBRSxDQUZIO0FBR1JDLElBQUFBLFdBQVcsRUFBRSxHQUhMO0FBSVJDLElBQUFB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RCxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsV0FBS29DLFNBQUw7QUFDQSxXQUFLbEIsSUFBTCxDQUFVRSxJQUFWO0FBQ0g7O0FBQ0QsWUFBUSxLQUFLcEIsVUFBYjtBQUNJLFdBQUssQ0FBTDtBQUNJLGFBQUs4QyxVQUFMO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQ0ksYUFBSzNDLElBQUwsQ0FBVVMsSUFBVixDQUFldUMsTUFBZixJQUF5QixLQUFLbEQsU0FBOUI7QUFDQTs7QUFDSixXQUFLLENBQUw7QUFDSSxhQUFLRSxJQUFMLENBQVVTLElBQVYsQ0FBZXVDLE1BQWYsSUFBeUIsS0FBS2xELFNBQTlCO0FBQ0E7QUFUUjtBQVlIO0FBakpJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBjenFjenF6enp6enooY3pxKVxuICogQEVtYWlsOiB0ZW5jaGVuemhlbmdxaW5nQHFxLmNvbVxuICogQERhdGU6IDIwMjMtMDYtMDEgMjI6MzA6MzZcbiAqIEBMYXN0RWRpdG9yczog6ZmI5q2j5riFTWFjUHJvXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA2LTA0IDIyOjQ4OjE5XG4gKiBARmlsZVBhdGg6IC9nb2xkbWluZXItZGVtby9hc3NldHMvU2NyaXB0L0hvb2suanNcbiAqIEBEZXNjcmlwdGlvbjog55+/5bel6ZKp5a2Q55u45YWzXG4gKiBcbiAqIENvcHlyaWdodCAoYykgYnkgY3pxY3pxenp6enp6KGN6cSksIEFsbCBSaWdodHMgUmVzZXJ2ZWQuIFxuICovXG4vLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBIb29rU3RhdHVzOiAwLFxuICAgICAgICBIb29rU3BlZWQ6IDEsXG4gICAgICAgIFJvdGF0ZVNwZWVkOiAwLjUsXG4gICAgICAgIExpbmU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICAgIEVtaXRIb29rQnRuOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBTY29yZUNvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICAgIE1pbmVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBNYWluOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LFxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgIH0sXG5cblxuXG5cblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2NvcmVyID0gdGhpcy5TY29yZUNvbnRyb2xsZXIuZ2V0Q29tcG9uZW50KCdTY29yZScpXG4gICAgICAgIHRoaXMuRW1pdEhvb2tCdG4ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuRW1pdEhvb2tDbGljaywgdGhpcylcbiAgICAgICAgdGhpcy5hbmltID0gdGhpcy5NaW5lci5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKVxuICAgICAgICB0aGlzLmFuaW0ucGxheSgpXG4gICAgfSxcblxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMuSG9va0NvbnRyb2woKVxuXG4gICAgfSxcblxuICAgIEVtaXRIb29rQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5Ib29rT3V0KClcbiAgICB9LFxuXG4gICAgSG9va0luKCkge1xuICAgICAgICB0aGlzLkhvb2tTdGF0dXMgPSAyXG4gICAgICAgIHRoaXMuYW5pbS5wbGF5KCdNaW5lclB1bGxMaWdodCcpXG4gICAgfSxcblxuICAgIEhvb2tPdXQoKSB7XG4gICAgICAgIHRoaXMuSG9va1N0YXR1cyA9IDFcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgICAgICBpZiAodGhpcy5Ib29rU3RhdHVzID09IDIpIHsgcmV0dXJuIH1cbiAgICAgICAgaWYgKG90aGVyLm5vZGUuZ3JvdXAgPT09ICd3YWxsJykge1xuICAgICAgICAgICAgdGhpcy5Ib29rSW4oKVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlci5ub2RlLmdyb3VwID09PSBcIm9yZVwiKSB7XG4gICAgICAgICAgICBvdGhlci5ub2RlLmdyb3VwID0gXCJkZWZhdWx0XCJcbiAgICAgICAgICAgIG90aGVyLm5vZGUucGFyZW50ID0gdGhpcy5nZXRJdGVtKClcbiAgICAgICAgICAgIG90aGVyLm5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgMCkpXG4gICAgICAgICAgICB0aGlzLkhvb2tJbigpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0SXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkl0ZW1cIilcbiAgICB9LFxuXG4gICAgLy8g5pS26ZuG5LiK6ZKp55qE54mp5ZOBXG4gICAgY2xlYW5JdGVtKCkge1xuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLmdldEl0ZW0oKVxuICAgICAgICBpdGVtcy5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHNjb3JlID0gaXRlbS5nZXRDb21wb25lbnQoJ09yZScpLnNjb3JlXG4gICAgICAgICAgICB0aGlzLnNjb3Jlci5hZGRTY29yZShzY29yZSlcbiAgICAgICAgICAgIGxldCBtYWluID0gdGhpcy5NYWluLmdldENvbXBvbmVudCgnTWFpbicpXG4gICAgICAgICAgICBtYWluLk9yZU51bWJlci0tXG4gICAgICAgICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgSG9va1JvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuSG9va1N0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5MaW5lLm5vZGUuYW5nbGUgPD0gLTcwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5Sb3RhdGVTcGVlZCA9IE1hdGguYWJzKHRoaXMuUm90YXRlU3BlZWQpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuTGluZS5ub2RlLmFuZ2xlID49IDcwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5Sb3RhdGVTcGVlZCA9IC1NYXRoLmFicyh0aGlzLlJvdGF0ZVNwZWVkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLkxpbmUubm9kZS5hbmdsZSArPSB0aGlzLlJvdGF0ZVNwZWVkXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Ib29rQmFjaygpIHtcblxuICAgIH0sXG5cbiAgICBIb29rQ29udHJvbCgpIHtcbiAgICAgICAgLy/mlLblm57lkIrpkqlcbiAgICAgICAgaWYgKHRoaXMuSG9va1N0YXR1cyA9PSAyICYmIHRoaXMuTGluZS5ub2RlLmhlaWdodCA8PSAzMCkge1xuICAgICAgICAgICAgdGhpcy5Ib29rU3RhdHVzID0gMFxuICAgICAgICAgICAgdGhpcy5jbGVhbkl0ZW0oKVxuICAgICAgICAgICAgdGhpcy5hbmltLnBsYXkoKVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5Ib29rU3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5Ib29rUm90YXRlKClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuTGluZS5ub2RlLmhlaWdodCArPSB0aGlzLkhvb2tTcGVlZFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5MaW5lLm5vZGUuaGVpZ2h0IC09IHRoaXMuSG9va1NwZWVkXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KTtcbiJdfQ==