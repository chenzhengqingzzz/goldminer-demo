
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/GameOver');
require('./assets/Script/Hook');
require('./assets/Script/Main');
require('./assets/Script/Menu');
require('./assets/Script/Ore');
require('./assets/Script/Score');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '89730/MDvdBuregoCKeSUh1', 'Main');
// Script/Main.js

"use strict";

/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-29 16:25:36
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 22:46:02
 * @FilePath: /goldminer-demo/assets/Script/Main.js
 * @Description: 游戏主要代码 包括倒计时 游戏过关、结束等相关逻辑
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
    OreNumber: 0,
    MaxOreNumber: 20,
    Time: 60,
    Hook: {
      "default": null,
      type: cc.Component
    },
    OreArea: {
      "default": null,
      type: cc.Component
    },
    OreData: {
      "default": null,
      type: cc.JsonAsset
    },
    Ore: {
      "default": null,
      type: cc.Prefab
    },
    GameOverUI: {
      "default": null,
      type: cc.Component
    },
    ScoreController: {
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
  onLoad: function onLoad() {
    var manager = cc.director.getCollisionManager(); //获取碰撞检测系统

    manager.enabled = true; //默认碰撞检测系统是禁用的，需要手动开启碰撞检测系统
    // manager.enabledDebugDraw = true;//开启后可在debug中显示碰撞区域        
  },
  start: function start() {
    this.scorer = this.ScoreController.getComponent('Score');
    this.scorer.loadLevel();
    this.startTimer();
  },
  update: function update(dt) {
    if (this.OreNumber < this.MaxOreNumber) {
      var num = Math.round(Math.random() * (this.OreData.json.length - 1));
      var data = this.OreData.json[num];
      this.generateOres(data);
    }
  },
  generateOres: function generateOres(data) {
    var ore = cc.instantiate(this.Ore);
    cc.resources.load('Atlas/level-sheet', cc.SpriteAtlas, function (err, atlas) {
      if (!err) {
        var spriteFrame = atlas.getSpriteFrame(data.res);
        ore.getComponent('Ore').score = data.score;
        ore.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      } else {
        console.log(err);
      }
    }); //更换图片外观

    ore.y = Math.random() * this.OreArea.node.height;
    ore.x = Math.random() * this.OreArea.node.width;
    this.OreArea.node.addChild(ore);
    this.OreNumber++;
  },
  _GamePauseAminationCallBack: function _GamePauseAminationCallBack() {
    cc.game.pause();
  },
  showGameOver: function showGameOver() {
    this.GameOverUI.node.active = true;
  },
  GameOver: function GameOver() {
    this.stopTimer(); // this.showGameOver()
    // cc.game.pause()
    //显示弹出框

    var finished = cc.callFunc(this._GamePauseAminationCallBack, this);
    var action = cc.sequence(cc.scaleTo(0.3, 1, 1), finished); // action.easing(cc.easeBounceOut(0.3));

    var gameover = this.GameOverUI.getComponent('GameOver');

    if (this.scorer.Money > this.scorer.MaxScore) {
      this.scorer.setMaxScore();
    }

    if (this.scorer.canNext()) {
      gameover.setGameOverText("\u606D\u559C\u4F60\uFF0C\u901A\u8FC7\u672C\u5173\uFF01\n\u4F60\u7684\u5F97\u5206\u662F" + this.scorer.Money + "\n\u5F53\u524D\u6700\u9AD8\u5F97\u5206\u4E3A" + this.scorer.MaxScore);
      this.scorer.LevelUp();
    } else {
      gameover.setGameOverText('时间到！游戏结束');
      this.scorer.setLevel(1);
      this.scorer.setMemMoney(0);
    }

    this.GameOverUI.node.runAction(action);
  },
  Next: function Next() {
    // GameOverUI.active=false
    // this.init()
    cc.game.resume(); // clearInterval(this.timer)

    cc.director.loadScene('Game');
  },
  startTimer: function startTimer() {
    var _this = this;

    this.timer = setInterval(function () {
      _this.Time--;

      _this.scorer.updateTime(_this.Time);

      if (_this.Time < 1) {
        _this.GameOver();
      }
    }, 1000);
  },
  stopTimer: function stopTimer() {
    clearInterval(this.timer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTWFpbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIk9yZU51bWJlciIsIk1heE9yZU51bWJlciIsIlRpbWUiLCJIb29rIiwidHlwZSIsIk9yZUFyZWEiLCJPcmVEYXRhIiwiSnNvbkFzc2V0IiwiT3JlIiwiUHJlZmFiIiwiR2FtZU92ZXJVSSIsIlNjb3JlQ29udHJvbGxlciIsIm9uTG9hZCIsIm1hbmFnZXIiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwic3RhcnQiLCJzY29yZXIiLCJnZXRDb21wb25lbnQiLCJsb2FkTGV2ZWwiLCJzdGFydFRpbWVyIiwidXBkYXRlIiwiZHQiLCJudW0iLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJqc29uIiwibGVuZ3RoIiwiZGF0YSIsImdlbmVyYXRlT3JlcyIsIm9yZSIsImluc3RhbnRpYXRlIiwicmVzb3VyY2VzIiwibG9hZCIsIlNwcml0ZUF0bGFzIiwiZXJyIiwiYXRsYXMiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwicmVzIiwic2NvcmUiLCJTcHJpdGUiLCJjb25zb2xlIiwibG9nIiwieSIsIm5vZGUiLCJoZWlnaHQiLCJ4Iiwid2lkdGgiLCJhZGRDaGlsZCIsIl9HYW1lUGF1c2VBbWluYXRpb25DYWxsQmFjayIsImdhbWUiLCJwYXVzZSIsInNob3dHYW1lT3ZlciIsImFjdGl2ZSIsIkdhbWVPdmVyIiwic3RvcFRpbWVyIiwiZmluaXNoZWQiLCJjYWxsRnVuYyIsImFjdGlvbiIsInNlcXVlbmNlIiwic2NhbGVUbyIsImdhbWVvdmVyIiwiTW9uZXkiLCJNYXhTY29yZSIsInNldE1heFNjb3JlIiwiY2FuTmV4dCIsInNldEdhbWVPdmVyVGV4dCIsIkxldmVsVXAiLCJzZXRMZXZlbCIsInNldE1lbU1vbmV5IiwicnVuQWN0aW9uIiwiTmV4dCIsInJlc3VtZSIsImxvYWRTY2VuZSIsInRpbWVy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QUw7O0FBQ0EsTUFBQSxLQUFJLENBQUNnQixNQUFMLENBQVk2RCxVQUFaLENBQXVCLEtBQUksQ0FBQzdFLElBQTVCOztBQUVBLFVBQUksS0FBSSxDQUFDQSxJQUFMLEdBQVksQ0FBaEIsRUFBbUI7QUFDZixRQUFBLEtBQUksQ0FBQ3VELFFBQUw7QUFDSDtBQUVKLEtBUnVCLEVBUXJCLElBUnFCLENBQXhCO0FBU0gsR0EzSkk7QUE2SkxDLEVBQUFBLFNBN0pLLHVCQTZKTztBQUNSc0IsSUFBQUEsYUFBYSxDQUFDLEtBQUtILEtBQU4sQ0FBYjtBQUNIO0FBL0pJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBjenFjenF6enp6enooY3pxKVxuICogQEVtYWlsOiB0ZW5jaGVuemhlbmdxaW5nQHFxLmNvbVxuICogQERhdGU6IDIwMjMtMDUtMjkgMTY6MjU6MzZcbiAqIEBMYXN0RWRpdG9yczog6ZmI5q2j5riFTWFjUHJvXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA2LTA0IDIyOjQ2OjAyXG4gKiBARmlsZVBhdGg6IC9nb2xkbWluZXItZGVtby9hc3NldHMvU2NyaXB0L01haW4uanNcbiAqIEBEZXNjcmlwdGlvbjog5ri45oiP5Li76KaB5Luj56CBIOWMheaLrOWAkuiuoeaXtiDmuLjmiI/ov4flhbPjgIHnu5PmnZ/nrYnnm7jlhbPpgLvovpFcbiAqIFxuICogQ29weXJpZ2h0IChjKSBieSBjenFjenF6enp6enooY3pxKSwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gXG4gKi9cblxuLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgT3JlTnVtYmVyOiAwLFxuICAgICAgICBNYXhPcmVOdW1iZXI6IDIwLFxuICAgICAgICBUaW1lOiA2MCxcblxuICAgICAgICBIb29rOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBPcmVBcmVhOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50XG4gICAgICAgIH0sXG4gICAgICAgIE9yZURhdGE6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Kc29uQXNzZXRcbiAgICAgICAgfSxcbiAgICAgICAgT3JlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgR2FtZU92ZXJVSToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudFxuICAgICAgICB9LFxuICAgICAgICBTY29yZUNvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnRcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpOy8v6I635Y+W56Kw5pKe5qOA5rWL57O757ufXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7Ly/pu5jorqTnorDmkp7mo4DmtYvns7vnu5/mmK/npoHnlKjnmoTvvIzpnIDopoHmiYvliqjlvIDlkK/norDmkp7mo4DmtYvns7vnu59cbiAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTsvL+W8gOWQr+WQjuWPr+WcqGRlYnVn5Lit5pi+56S656Kw5pKe5Yy65Z+fICAgICAgICBcbiAgICB9LFxuXG5cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNjb3JlciA9IHRoaXMuU2NvcmVDb250cm9sbGVyLmdldENvbXBvbmVudCgnU2NvcmUnKVxuICAgICAgICB0aGlzLnNjb3Jlci5sb2FkTGV2ZWwoKVxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKVxuICAgIH0sXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuT3JlTnVtYmVyIDwgdGhpcy5NYXhPcmVOdW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBudW0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5PcmVEYXRhLmpzb24ubGVuZ3RoIC0gMSkpXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuT3JlRGF0YS5qc29uW251bV1cbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVPcmVzKGRhdGEpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVPcmVzKGRhdGEpIHtcbiAgICAgICAgbGV0IG9yZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT3JlKVxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnQXRsYXMvbGV2ZWwtc2hlZXQnLCBjYy5TcHJpdGVBdGxhcywgZnVuY3Rpb24gKGVyciwgYXRsYXMpIHtcbiAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoZGF0YS5yZXMpXG4gICAgICAgICAgICAgICAgb3JlLmdldENvbXBvbmVudCgnT3JlJykuc2NvcmUgPSBkYXRhLnNjb3JlXG4gICAgICAgICAgICAgICAgb3JlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7Ly/mm7TmjaLlm77niYflpJbop4JcblxuICAgICAgICBvcmUueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLk9yZUFyZWEubm9kZS5oZWlnaHRcbiAgICAgICAgb3JlLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5PcmVBcmVhLm5vZGUud2lkdGhcblxuICAgICAgICB0aGlzLk9yZUFyZWEubm9kZS5hZGRDaGlsZChvcmUpXG4gICAgICAgIHRoaXMuT3JlTnVtYmVyKytcbiAgICB9LFxuXG4gICAgX0dhbWVQYXVzZUFtaW5hdGlvbkNhbGxCYWNrKCkge1xuICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XG4gICAgfSxcblxuICAgIHNob3dHYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5HYW1lT3ZlclVJLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBHYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKVxuXG4gICAgICAgIC8vIHRoaXMuc2hvd0dhbWVPdmVyKClcbiAgICAgICAgLy8gY2MuZ2FtZS5wYXVzZSgpXG5cbiAgICAgICAgLy/mmL7npLrlvLnlh7rmoYZcbiAgICAgICAgbGV0IGZpbmlzaGVkID0gY2MuY2FsbEZ1bmModGhpcy5fR2FtZVBhdXNlQW1pbmF0aW9uQ2FsbEJhY2ssIHRoaXMpO1xuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEsIDEpLCBmaW5pc2hlZCk7XG5cbiAgICAgICAgLy8gYWN0aW9uLmVhc2luZyhjYy5lYXNlQm91bmNlT3V0KDAuMykpO1xuICAgICAgICB2YXIgZ2FtZW92ZXIgPSB0aGlzLkdhbWVPdmVyVUkuZ2V0Q29tcG9uZW50KCdHYW1lT3ZlcicpXG4gICAgICAgIGlmICh0aGlzLnNjb3Jlci5Nb25leSA+IHRoaXMuc2NvcmVyLk1heFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3Jlci5zZXRNYXhTY29yZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NvcmVyLmNhbk5leHQoKSkge1xuICAgICAgICAgICAgZ2FtZW92ZXIuc2V0R2FtZU92ZXJUZXh0KGDmga3llpzkvaDvvIzpgJrov4fmnKzlhbPvvIFcXG7kvaDnmoTlvpfliIbmmK8ke3RoaXMuc2NvcmVyLk1vbmV5fVxcbuW9k+WJjeacgOmrmOW+l+WIhuS4uiR7dGhpcy5zY29yZXIuTWF4U2NvcmV9YClcbiAgICAgICAgICAgIHRoaXMuc2NvcmVyLkxldmVsVXAoKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lb3Zlci5zZXRHYW1lT3ZlclRleHQoJ+aXtumXtOWIsO+8gea4uOaIj+e7k+adnycpXG4gICAgICAgICAgICB0aGlzLnNjb3Jlci5zZXRMZXZlbCgxKVxuICAgICAgICAgICAgdGhpcy5zY29yZXIuc2V0TWVtTW9uZXkoMClcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5HYW1lT3ZlclVJLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgfSxcblxuXG5cbiAgICBOZXh0KCkge1xuICAgICAgICAvLyBHYW1lT3ZlclVJLmFjdGl2ZT1mYWxzZVxuICAgICAgICAvLyB0aGlzLmluaXQoKVxuICAgICAgICBjYy5nYW1lLnJlc3VtZSgpXG4gICAgICAgIC8vIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcblxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWUnKVxuXG4gICAgfSxcblxuXG4gICAgc3RhcnRUaW1lcigpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuVGltZS0tXG4gICAgICAgICAgICB0aGlzLnNjb3Jlci51cGRhdGVUaW1lKHRoaXMuVGltZSlcblxuICAgICAgICAgICAgaWYgKHRoaXMuVGltZSA8IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVPdmVyKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCAxMDAwKVxuICAgIH0sXG5cbiAgICBzdG9wVGltZXIoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICB9XG5cblxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Menu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1c8fawD1VIkqVBLJstvipu', 'Menu');
// Script/Menu.js

"use strict";

/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-29 21:50:31
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 22:49:20
 * @FilePath: /goldminer-demo/assets/Script/Menu.js
 * @Description: 主菜单
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
  properties: {// foo: {
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
  start: function start() {},
  // update (dt) {},
  GameStart: function GameStart() {
    cc.director.loadScene("Game");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTWVudS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0IiwiR2FtZVN0YXJ0IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsQ0FDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmUSxHQUhQO0FBcUJMO0FBRUE7QUFFQUMsRUFBQUEsS0F6QkssbUJBeUJHLENBRVAsQ0EzQkk7QUE2Qkw7QUFDQUMsRUFBQUEsU0E5QkssdUJBOEJPO0FBQ1JMLElBQUFBLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0g7QUFoQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IGN6cWN6cXp6enp6eihjenEpXG4gKiBARW1haWw6IHRlbmNoZW56aGVuZ3FpbmdAcXEuY29tXG4gKiBARGF0ZTogMjAyMy0wNS0yOSAyMTo1MDozMVxuICogQExhc3RFZGl0b3JzOiDpmYjmraPmuIVNYWNQcm9cbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjMtMDYtMDQgMjI6NDk6MjBcbiAqIEBGaWxlUGF0aDogL2dvbGRtaW5lci1kZW1vL2Fzc2V0cy9TY3JpcHQvTWVudS5qc1xuICogQERlc2NyaXB0aW9uOiDkuLvoj5zljZVcbiAqIFxuICogQ29weXJpZ2h0IChjKSBieSBjenFjenF6enp6enooY3pxKSwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gXG4gKi9cbi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG4gICAgR2FtZVN0YXJ0KCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lXCIpXG4gICAgfVxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameOver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d249DXModIC74LRYI0V5rN', 'GameOver');
// Script/GameOver.js

"use strict";

/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-29 22:30:36
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 22:45:26
 * @FilePath: /goldminer-demo/assets/Script/GameOver.js
 * @Description: 游戏结束
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
    GameOverText: {
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
  start: function start() {},
  update: function update(dt) {// if(this.active){
    //     cc.game.pause()
    // }
  },
  setGameOverText: function setGameOverText(str) {
    var label = this.GameOverText.getComponent(cc.Label);
    label.string = str;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZU92ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJHYW1lT3ZlclRleHQiLCJ0eXBlIiwic3RhcnQiLCJ1cGRhdGUiLCJkdCIsInNldEdhbWVPdmVyVGV4dCIsInN0ciIsImxhYmVsIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ0U7QUFGQyxLQUROLENBS1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQW5CUSxHQUhQO0FBeUJMO0FBRUE7QUFFQUksRUFBQUEsS0E3QkssbUJBNkJHLENBRVAsQ0EvQkk7QUFpQ0xDLEVBQUFBLE1BakNLLGtCQWlDRUMsRUFqQ0YsRUFpQ00sQ0FDUDtBQUNBO0FBRUE7QUFDSCxHQXRDSTtBQXdDTEMsRUFBQUEsZUF4Q0ssMkJBd0NXQyxHQXhDWCxFQXdDZ0I7QUFDakIsUUFBSUMsS0FBSyxHQUFHLEtBQUtQLFlBQUwsQ0FBa0JRLFlBQWxCLENBQStCWixFQUFFLENBQUNhLEtBQWxDLENBQVo7QUFDQUYsSUFBQUEsS0FBSyxDQUFDRyxNQUFOLEdBQWVKLEdBQWY7QUFDSDtBQTNDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogY3pxY3pxenp6enp6KGN6cSlcbiAqIEBFbWFpbDogdGVuY2hlbnpoZW5ncWluZ0BxcS5jb21cbiAqIEBEYXRlOiAyMDIzLTA1LTI5IDIyOjMwOjM2XG4gKiBATGFzdEVkaXRvcnM6IOmZiOato+a4hU1hY1Byb1xuICogQExhc3RFZGl0VGltZTogMjAyMy0wNi0wNCAyMjo0NToyNlxuICogQEZpbGVQYXRoOiAvZ29sZG1pbmVyLWRlbW8vYXNzZXRzL1NjcmlwdC9HYW1lT3Zlci5qc1xuICogQERlc2NyaXB0aW9uOiDmuLjmiI/nu5PmnZ9cbiAqIFxuICogQ29weXJpZ2h0IChjKSBieSBjenFjenF6enp6enooY3pxKSwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gXG4gKi9cblxuLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgR2FtZU92ZXJUZXh0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy8gaWYodGhpcy5hY3RpdmUpe1xuICAgICAgICAvLyAgICAgY2MuZ2FtZS5wYXVzZSgpXG5cbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICBzZXRHYW1lT3ZlclRleHQoc3RyKSB7XG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMuR2FtZU92ZXJUZXh0LmdldENvbXBvbmVudChjYy5MYWJlbClcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gc3RyXG4gICAgfVxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Ore.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af2a6qOT95CpIhM7fo6t61g', 'Ore');
// Script/Ore.js

"use strict";

/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-06-03 12:35:14
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 22:48:46
 * @FilePath: /goldminer-demo/assets/Script/Ore.js
 * @Description: 矿石相关
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
    score: 0 // foo: {
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
    this.addCollider();
  },
  // update (dt) {},
  addCollider: function addCollider() {
    var collider = this.node.addComponent(cc.BoxCollider); // let collider=this.node.getComponent(cc.BoxCollider)

    collider.size.set(cc.size(this.node.width, this.node.height));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvT3JlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2NvcmUiLCJzdGFydCIsImFkZENvbGxpZGVyIiwiY29sbGlkZXIiLCJub2RlIiwiYWRkQ29tcG9uZW50IiwiQm94Q29sbGlkZXIiLCJzaXplIiwic2V0Iiwid2lkdGgiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFLENBREMsQ0FHUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBakJRLEdBSFA7QUF1Qkw7QUFFQTtBQUVBQyxFQUFBQSxLQTNCSyxtQkEyQkc7QUFDSixTQUFLQyxXQUFMO0FBQ0gsR0E3Qkk7QUErQkw7QUFDQUEsRUFBQUEsV0FoQ0sseUJBZ0NTO0FBQ1YsUUFBSUMsUUFBUSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QlQsRUFBRSxDQUFDVSxXQUExQixDQUFmLENBRFUsQ0FFVjs7QUFDQUgsSUFBQUEsUUFBUSxDQUFDSSxJQUFULENBQWNDLEdBQWQsQ0FBa0JaLEVBQUUsQ0FBQ1csSUFBSCxDQUFRLEtBQUtILElBQUwsQ0FBVUssS0FBbEIsRUFBeUIsS0FBS0wsSUFBTCxDQUFVTSxNQUFuQyxDQUFsQjtBQUVIO0FBckNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBjenFjenF6enp6enooY3pxKVxuICogQEVtYWlsOiB0ZW5jaGVuemhlbmdxaW5nQHFxLmNvbVxuICogQERhdGU6IDIwMjMtMDYtMDMgMTI6MzU6MTRcbiAqIEBMYXN0RWRpdG9yczog6ZmI5q2j5riFTWFjUHJvXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA2LTA0IDIyOjQ4OjQ2XG4gKiBARmlsZVBhdGg6IC9nb2xkbWluZXItZGVtby9hc3NldHMvU2NyaXB0L09yZS5qc1xuICogQERlc2NyaXB0aW9uOiDnn7/nn7Pnm7jlhbNcbiAqIFxuICogQ29weXJpZ2h0IChjKSBieSBjenFjenF6enp6enooY3pxKSwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gXG4gKi9cbi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNjb3JlOiAwLFxuXG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQ29sbGlkZXIoKVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbiAgICBhZGRDb2xsaWRlcigpIHtcbiAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcilcbiAgICAgICAgLy8gbGV0IGNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpXG4gICAgICAgIGNvbGxpZGVyLnNpemUuc2V0KGNjLnNpemUodGhpcy5ub2RlLndpZHRoLCB0aGlzLm5vZGUuaGVpZ2h0KSlcblxuICAgIH1cbn0pO1xuIl19
//------QC-SOURCE-SPLIT------
