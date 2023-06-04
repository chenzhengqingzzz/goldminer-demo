
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Score.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9c0e7Y3mYJGFJis9TRJhJst', 'Score');
// Script/Score.js

"use strict";

/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-30 21:40:36
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 22:47:44
 * @FilePath: /goldminer-demo/assets/Script/Score.js
 * @Description: 得分相关实现
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
    Money: 0,
    Level: 0,
    TargetScore: 0,
    MaxScore: 0,
    MoneyBroad: {
      "default": null,
      type: cc.Component
    },
    TimeBroad: {
      "default": null,
      type: cc.Component
    },
    LevelBroad: {
      "default": null,
      type: cc.Component
    },
    TargetScoreBroad: {
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
    this.LoadMaxScore();
  },
  // update (dt) {},
  updateTime: function updateTime(time) {
    var label = this.TimeBroad.getComponent(cc.Label);
    label.string = "" + time;
  },
  setLevel: function setLevel(level) {
    cc.sys.localStorage.setItem('level', level);
  },
  loadLevel: function loadLevel() {
    this.Level = Number.parseInt(cc.sys.localStorage.getItem('level'));

    if (!this.Level || !Number.isInteger(this.Level)) {
      cc.sys.localStorage.setItem('level', 1);
      this.Level = 1;
    }

    this.updateLevel();
    this.LoadMoney();
  },
  updateLevel: function updateLevel() {
    var label = this.LevelBroad.getComponent(cc.Label);
    label.string = "\u7B2C" + this.Level + "\u5173"; // this.TargetScore=1000*this.Level

    this.TargetScore = 1000 * Math.pow(this.Level, 2);
    this.updateTargetScore();
  },
  LevelUp: function LevelUp() {
    var lv = Number.parseInt(this.Level) + 1;
    cc.sys.localStorage.setItem('level', lv);
    this.SaveMoney();
  },
  addScore: function addScore(score) {
    this.Money += score;
    var label = this.MoneyBroad.getComponent(cc.Label);
    label.string = this.Money + "$";
  },
  updateTargetScore: function updateTargetScore() {
    var label = this.TargetScoreBroad.getComponent(cc.Label);
    label.string = this.TargetScore + "$";
  },
  canNext: function canNext() {
    return this.Money >= this.TargetScore;
  },
  SaveMoney: function SaveMoney() {
    cc.sys.localStorage.setItem('money', this.Money);
  },
  LoadMoney: function LoadMoney() {
    this.Money = Number.parseInt(cc.sys.localStorage.getItem('money'));

    if (!this.Money || !Number.isInteger(this.Money)) {
      cc.sys.localStorage.setItem('money', this.Money);
      this.Money = 0;
    }

    this.addScore(0);
  },
  setMemMoney: function setMemMoney(money) {
    cc.sys.localStorage.setItem('money', money);
  },
  LoadMaxScore: function LoadMaxScore() {
    this.MaxScore = Number.parseInt(cc.sys.localStorage.getItem('maxscore'));

    if (!this.MaxScore || !Number.isInteger(this.MaxScore)) {
      cc.sys.localStorage.setItem('maxscore', this.MaxScore);
      this.MaxScore = 0;
    }
  },
  setMaxScore: function setMaxScore() {
    cc.sys.localStorage.setItem('maxscore', this.Money);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvU2NvcmUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJNb25leSIsIkxldmVsIiwiVGFyZ2V0U2NvcmUiLCJNYXhTY29yZSIsIk1vbmV5QnJvYWQiLCJ0eXBlIiwiVGltZUJyb2FkIiwiTGV2ZWxCcm9hZCIsIlRhcmdldFNjb3JlQnJvYWQiLCJzdGFydCIsIkxvYWRNYXhTY29yZSIsInVwZGF0ZVRpbWUiLCJ0aW1lIiwibGFiZWwiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInNldExldmVsIiwibGV2ZWwiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwibG9hZExldmVsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJnZXRJdGVtIiwiaXNJbnRlZ2VyIiwidXBkYXRlTGV2ZWwiLCJMb2FkTW9uZXkiLCJNYXRoIiwicG93IiwidXBkYXRlVGFyZ2V0U2NvcmUiLCJMZXZlbFVwIiwibHYiLCJTYXZlTW9uZXkiLCJhZGRTY29yZSIsInNjb3JlIiwiY2FuTmV4dCIsInNldE1lbU1vbmV5IiwibW9uZXkiLCJzZXRNYXhTY29yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUMsQ0FERTtBQUVSQyxJQUFBQSxLQUFLLEVBQUMsQ0FGRTtBQUdSQyxJQUFBQSxXQUFXLEVBQUMsQ0FISjtBQUlSQyxJQUFBQSxRQUFRLEVBQUMsQ0FKRDtBQU1SQyxJQUFBQSxVQUFVLEVBQUM7QUFDUCxpQkFBUSxJQUREO0FBRVBDLE1BQUFBLElBQUksRUFBQ1Qs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TSxDQUFDQyxRQUFQLENBQWdCNUIsRUFBRSxDQUFDdUIsR0FBSCxDQUFPQyxZQUFQLENBQW9CSyxPQUFwQixDQUE0QixVQUE1QixDQUFoQixDQUFoQjs7QUFDQSxRQUFHLENBQUMsS0FBS3RCLFFBQU4sSUFBZ0IsQ0FBQ29CLE1BQU0sQ0FBQ0csU0FBUCxDQUFpQixLQUFLdkIsUUFBdEIsQ0FBcEIsRUFBb0Q7QUFDaERQLE1BQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBdUMsS0FBS2xCLFFBQTVDO0FBQ0EsV0FBS0EsUUFBTCxHQUFjLENBQWQ7QUFDSDtBQUNKLEdBekhJO0FBMkhMcUMsRUFBQUEsV0EzSEsseUJBMkhRO0FBQ1Q1QyxJQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLEVBQXVDLEtBQUtyQixLQUE1QztBQUNIO0FBN0hJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBjenFjenF6enp6enooY3pxKVxuICogQEVtYWlsOiB0ZW5jaGVuemhlbmdxaW5nQHFxLmNvbVxuICogQERhdGU6IDIwMjMtMDUtMzAgMjE6NDA6MzZcbiAqIEBMYXN0RWRpdG9yczog6ZmI5q2j5riFTWFjUHJvXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA2LTA0IDIyOjQ3OjQ0XG4gKiBARmlsZVBhdGg6IC9nb2xkbWluZXItZGVtby9hc3NldHMvU2NyaXB0L1Njb3JlLmpzXG4gKiBARGVzY3JpcHRpb246IOW+l+WIhuebuOWFs+WunueOsFxuICogXG4gKiBDb3B5cmlnaHQgKGMpIGJ5IGN6cWN6cXp6enp6eihjenEpLCBBbGwgUmlnaHRzIFJlc2VydmVkLiBcbiAqL1xuLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgTW9uZXk6MCxcbiAgICAgICAgTGV2ZWw6MCxcbiAgICAgICAgVGFyZ2V0U2NvcmU6MCxcbiAgICAgICAgTWF4U2NvcmU6MCxcblxuICAgICAgICBNb25leUJyb2FkOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQ29tcG9uZW50XG4gICAgICAgIH0sICAgICAgICBcbiAgICAgICAgVGltZUJyb2FkOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuQ29tcG9uZW50ICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIExldmVsQnJvYWQ6e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5Db21wb25lbnQgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgVGFyZ2V0U2NvcmVCcm9hZDp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkNvbXBvbmVudCAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5Mb2FkTWF4U2NvcmUoKVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcblxuICAgIHVwZGF0ZVRpbWUodGltZSl7XG4gICAgICAgIGxldCBsYWJlbD10aGlzLlRpbWVCcm9hZC5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG4gICAgICAgIGxhYmVsLnN0cmluZz1gJHt0aW1lfWBcbiAgICB9LFxuXG4gICAgc2V0TGV2ZWwobGV2ZWwpe1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xldmVsJyxsZXZlbCk7XG4gICAgfSxcblxuICAgIGxvYWRMZXZlbCgpe1xuICAgICAgICB0aGlzLkxldmVsID0gTnVtYmVyLnBhcnNlSW50KGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGV2ZWwnKSlcbiAgICAgICAgaWYoIXRoaXMuTGV2ZWx8fCFOdW1iZXIuaXNJbnRlZ2VyKHRoaXMuTGV2ZWwpKXtcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGV2ZWwnLDEpO1xuICAgICAgICAgICAgdGhpcy5MZXZlbD0xXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVMZXZlbCgpXG4gICAgICAgIHRoaXMuTG9hZE1vbmV5KClcbiAgICB9LFxuICAgIHVwZGF0ZUxldmVsKCl7XG4gICAgICAgIGxldCBsYWJlbD10aGlzLkxldmVsQnJvYWQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxuICAgICAgICBsYWJlbC5zdHJpbmc9YOesrCR7dGhpcy5MZXZlbH3lhbNgXG4gICAgICAgIC8vIHRoaXMuVGFyZ2V0U2NvcmU9MTAwMCp0aGlzLkxldmVsXG4gICAgICAgIHRoaXMuVGFyZ2V0U2NvcmU9MTAwMCpNYXRoLnBvdyh0aGlzLkxldmVsLDIpXG4gICAgICAgIHRoaXMudXBkYXRlVGFyZ2V0U2NvcmUoKVxuICAgIH0sXG4gICAgTGV2ZWxVcCgpe1xuICAgICAgICBsZXQgbHY9TnVtYmVyLnBhcnNlSW50KHRoaXMuTGV2ZWwpICsgMVxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xldmVsJywgbHYpO1xuICAgICAgICB0aGlzLlNhdmVNb25leSgpXG4gICAgfSxcblxuICAgIGFkZFNjb3JlKHNjb3JlKXtcbiAgICAgICAgdGhpcy5Nb25leSs9c2NvcmVcbiAgICAgICAgbGV0IGxhYmVsPXRoaXMuTW9uZXlCcm9hZC5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG4gICAgICAgIGxhYmVsLnN0cmluZz1gJHt0aGlzLk1vbmV5fSRgXG4gICAgfSxcblxuICAgIHVwZGF0ZVRhcmdldFNjb3JlKCl7XG4gICAgICAgIGxldCBsYWJlbD10aGlzLlRhcmdldFNjb3JlQnJvYWQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxuICAgICAgICBsYWJlbC5zdHJpbmc9YCR7dGhpcy5UYXJnZXRTY29yZX0kYFxuICAgIH0sXG5cbiAgICBjYW5OZXh0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLk1vbmV5Pj10aGlzLlRhcmdldFNjb3JlXG4gICAgfSxcblxuICAgIFNhdmVNb25leSgpe1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21vbmV5Jyx0aGlzLk1vbmV5KTtcbiAgICB9LFxuXG4gICAgTG9hZE1vbmV5KCl7XG4gICAgICAgIHRoaXMuTW9uZXkgPSBOdW1iZXIucGFyc2VJbnQoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtb25leScpKVxuICAgICAgICBpZighdGhpcy5Nb25leXx8IU51bWJlci5pc0ludGVnZXIodGhpcy5Nb25leSkpe1xuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtb25leScsdGhpcy5Nb25leSk7XG4gICAgICAgICAgICB0aGlzLk1vbmV5PTBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFNjb3JlKDApXG4gICAgfSxcblxuICAgIHNldE1lbU1vbmV5KG1vbmV5KXtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtb25leScsbW9uZXkpO1xuICAgIH0sXG5cbiAgICBMb2FkTWF4U2NvcmUoKXtcbiAgICAgICAgdGhpcy5NYXhTY29yZSA9IE51bWJlci5wYXJzZUludChjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21heHNjb3JlJykpXG4gICAgICAgIGlmKCF0aGlzLk1heFNjb3JlfHwhTnVtYmVyLmlzSW50ZWdlcih0aGlzLk1heFNjb3JlKSl7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21heHNjb3JlJyx0aGlzLk1heFNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuTWF4U2NvcmU9MFxuICAgICAgICB9ICAgICAgICBcbiAgICB9LFxuXG4gICAgc2V0TWF4U2NvcmUoKXtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXhzY29yZScsdGhpcy5Nb25leSk7XG4gICAgfVxuXG59KTtcbiJdfQ==