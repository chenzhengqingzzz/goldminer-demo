
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTWFpbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIk9yZU51bWJlciIsIk1heE9yZU51bWJlciIsIlRpbWUiLCJIb29rIiwidHlwZSIsIk9yZUFyZWEiLCJPcmVEYXRhIiwiSnNvbkFzc2V0IiwiT3JlIiwiUHJlZmFiIiwiR2FtZU92ZXJVSSIsIlNjb3JlQ29udHJvbGxlciIsIm9uTG9hZCIsIm1hbmFnZXIiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwic3RhcnQiLCJzY29yZXIiLCJnZXRDb21wb25lbnQiLCJsb2FkTGV2ZWwiLCJzdGFydFRpbWVyIiwidXBkYXRlIiwiZHQiLCJudW0iLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJqc29uIiwibGVuZ3RoIiwiZGF0YSIsImdlbmVyYXRlT3JlcyIsIm9yZSIsImluc3RhbnRpYXRlIiwicmVzb3VyY2VzIiwibG9hZCIsIlNwcml0ZUF0bGFzIiwiZXJyIiwiYXRsYXMiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwicmVzIiwic2NvcmUiLCJTcHJpdGUiLCJjb25zb2xlIiwibG9nIiwieSIsIm5vZGUiLCJoZWlnaHQiLCJ4Iiwid2lkdGgiLCJhZGRDaGlsZCIsIl9HYW1lUGF1c2VBbWluYXRpb25DYWxsQmFjayIsImdhbWUiLCJwYXVzZSIsInNob3dHYW1lT3ZlciIsImFjdGl2ZSIsIkdhbWVPdmVyIiwic3RvcFRpbWVyIiwiZmluaXNoZWQiLCJjYWxsRnVuYyIsImFjdGlvbiIsInNlcXVlbmNlIiwic2NhbGVUbyIsImdhbWVvdmVyIiwiTW9uZXkiLCJNYXhTY29yZSIsInNldE1heFNjb3JlIiwiY2FuTmV4dCIsInNldEdhbWVPdmVyVGV4dCIsIkxldmVsVXAiLCJzZXRMZXZlbCIsInNldE1lbU1vbmV5IiwicnVuQWN0aW9uIiwiTmV4dCIsInJlc3VtZSIsImxvYWRTY2VuZSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGVUaW1lIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUUsQ0FESDtBQUVSQyxJQUFBQSxZQUFZLEVBQUUsRUFGTjtBQUdSQyxJQUFBQSxJQUFJLEVBQUUsRUFIRTtBQUtSQyxJQUFBQSxJQUFJLEVBQUU7QUFDRixpQkFBUyxJQURQO0FBRUZDLE1BQUFBLElBQUksRUFBRVIsRUFBRSxDQUFDRTtBQUZQLEtBTEU7QUFTUk8sSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMRCxNQUFBQSxJQUFJLEVBQUVSLEVBQUUsQ0FBQ0U7QUFGSixLQVREO0FBYVJRLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLElBREo7QUFFTEYsTUFBQUEsSUFBSSxFQUFFUixFQUFFLENBQUNXO0FBRkosS0FiRDtBQWlCUkMsSUFBQUEsR0FBRyxFQUFFO0FBQ0QsaUJBQVMsSUFEUjtBQUVESixNQUFBQSxJQUFJLEVBQUVSLEVBQUUsQ0FBQ2E7QUFGUixLQWpCRztBQXNCUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSTixNQUFBQSxJQUFJLEVBQUVSLEVBQUUsQ0FBQ0U7QUFGRCxLQXRCSjtBQTBCUmEsSUFBQUEsZUFBZSxFQUFFO0FBQ2IsaUJBQVMsSUFESTtBQUViUCxNQUFBQSxJQUFJLEVBQUVSLEVBQUUsQ0FBQ0U7QUFGSSxLQTFCVCxDQWdDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBOUNRLEdBSFA7QUFvREw7QUFFQWMsRUFBQUEsTUF0REssb0JBc0RJO0FBQ0wsUUFBSUMsT0FBTyxHQUFHakIsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxtQkFBWixFQUFkLENBREssQ0FDMkM7O0FBQ2hERixJQUFBQSxPQUFPLENBQUNHLE9BQVIsR0FBa0IsSUFBbEIsQ0FGSyxDQUVrQjtBQUN2QjtBQUNILEdBMURJO0FBOERMQyxFQUFBQSxLQTlESyxtQkE4REc7QUFDSixTQUFLQyxNQUFMLEdBQWMsS0FBS1AsZUFBTCxDQUFxQlEsWUFBckIsQ0FBa0MsT0FBbEMsQ0FBZDtBQUNBLFNBQUtELE1BQUwsQ0FBWUUsU0FBWjtBQUNBLFNBQUtDLFVBQUw7QUFDSCxHQWxFSTtBQW9FTEMsRUFBQUEsTUFwRUssa0JBb0VFQyxFQXBFRixFQW9FTTtBQUNQLFFBQUksS0FBS3ZCLFNBQUwsR0FBaUIsS0FBS0MsWUFBMUIsRUFBd0M7QUFDcEMsVUFBSXVCLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQixLQUFLckIsT0FBTCxDQUFhc0IsSUFBYixDQUFrQkMsTUFBbEIsR0FBMkIsQ0FBNUMsQ0FBWCxDQUFWO0FBQ0EsVUFBSUMsSUFBSSxHQUFHLEtBQUt4QixPQUFMLENBQWFzQixJQUFiLENBQWtCSixHQUFsQixDQUFYO0FBQ0EsV0FBS08sWUFBTCxDQUFrQkQsSUFBbEI7QUFDSDtBQUNKLEdBMUVJO0FBNEVMQyxFQUFBQSxZQTVFSyx3QkE0RVFELElBNUVSLEVBNEVjO0FBQ2YsUUFBSUUsR0FBRyxHQUFHcEMsRUFBRSxDQUFDcUMsV0FBSCxDQUFlLEtBQUt6QixHQUFwQixDQUFWO0FBQ0FaLElBQUFBLEVBQUUsQ0FBQ3NDLFNBQUgsQ0FBYUMsSUFBYixDQUFrQixtQkFBbEIsRUFBdUN2QyxFQUFFLENBQUN3QyxXQUExQyxFQUF1RCxVQUFVQyxHQUFWLEVBQWVDLEtBQWYsRUFBc0I7QUFDekUsVUFBSSxDQUFDRCxHQUFMLEVBQVU7QUFDTixZQUFJRSxXQUFXLEdBQUdELEtBQUssQ0FBQ0UsY0FBTixDQUFxQlYsSUFBSSxDQUFDVyxHQUExQixDQUFsQjtBQUNBVCxRQUFBQSxHQUFHLENBQUNiLFlBQUosQ0FBaUIsS0FBakIsRUFBd0J1QixLQUF4QixHQUFnQ1osSUFBSSxDQUFDWSxLQUFyQztBQUNBVixRQUFBQSxHQUFHLENBQUNiLFlBQUosQ0FBaUJ2QixFQUFFLENBQUMrQyxNQUFwQixFQUE0QkosV0FBNUIsR0FBMENBLFdBQTFDO0FBQ0gsT0FKRCxNQUlPO0FBQ0hLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUixHQUFaO0FBQ0g7QUFDSixLQVJELEVBRmUsQ0FVWjs7QUFFSEwsSUFBQUEsR0FBRyxDQUFDYyxDQUFKLEdBQVFyQixJQUFJLENBQUNFLE1BQUwsS0FBZ0IsS0FBS3RCLE9BQUwsQ0FBYTBDLElBQWIsQ0FBa0JDLE1BQTFDO0FBQ0FoQixJQUFBQSxHQUFHLENBQUNpQixDQUFKLEdBQVF4QixJQUFJLENBQUNFLE1BQUwsS0FBZ0IsS0FBS3RCLE9BQUwsQ0FBYTBDLElBQWIsQ0FBa0JHLEtBQTFDO0FBRUEsU0FBSzdDLE9BQUwsQ0FBYTBDLElBQWIsQ0FBa0JJLFFBQWxCLENBQTJCbkIsR0FBM0I7QUFDQSxTQUFLaEMsU0FBTDtBQUNILEdBN0ZJO0FBK0ZMb0QsRUFBQUEsMkJBL0ZLLHlDQStGeUI7QUFDMUJ4RCxJQUFBQSxFQUFFLENBQUN5RCxJQUFILENBQVFDLEtBQVI7QUFDSCxHQWpHSTtBQW1HTEMsRUFBQUEsWUFuR0ssMEJBbUdVO0FBQ1gsU0FBSzdDLFVBQUwsQ0FBZ0JxQyxJQUFoQixDQUFxQlMsTUFBckIsR0FBOEIsSUFBOUI7QUFDSCxHQXJHSTtBQXVHTEMsRUFBQUEsUUF2R0ssc0JBdUdNO0FBQ1AsU0FBS0MsU0FBTCxHQURPLENBR1A7QUFDQTtBQUVBOztBQUNBLFFBQUlDLFFBQVEsR0FBRy9ELEVBQUUsQ0FBQ2dFLFFBQUgsQ0FBWSxLQUFLUiwyQkFBakIsRUFBOEMsSUFBOUMsQ0FBZjtBQUNBLFFBQUlTLE1BQU0sR0FBR2pFLEVBQUUsQ0FBQ2tFLFFBQUgsQ0FBWWxFLEVBQUUsQ0FBQ21FLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQVosRUFBbUNKLFFBQW5DLENBQWIsQ0FSTyxDQVVQOztBQUNBLFFBQUlLLFFBQVEsR0FBRyxLQUFLdEQsVUFBTCxDQUFnQlMsWUFBaEIsQ0FBNkIsVUFBN0IsQ0FBZjs7QUFDQSxRQUFJLEtBQUtELE1BQUwsQ0FBWStDLEtBQVosR0FBb0IsS0FBSy9DLE1BQUwsQ0FBWWdELFFBQXBDLEVBQThDO0FBQzFDLFdBQUtoRCxNQUFMLENBQVlpRCxXQUFaO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLakQsTUFBTCxDQUFZa0QsT0FBWixFQUFKLEVBQTJCO0FBQ3ZCSixNQUFBQSxRQUFRLENBQUNLLGVBQVQsNEZBQTRDLEtBQUtuRCxNQUFMLENBQVkrQyxLQUF4RCxvREFBeUUsS0FBSy9DLE1BQUwsQ0FBWWdELFFBQXJGO0FBQ0EsV0FBS2hELE1BQUwsQ0FBWW9ELE9BQVo7QUFFSCxLQUpELE1BSU87QUFDSE4sTUFBQUEsUUFBUSxDQUFDSyxlQUFULENBQXlCLFVBQXpCO0FBQ0EsV0FBS25ELE1BQUwsQ0FBWXFELFFBQVosQ0FBcUIsQ0FBckI7QUFDQSxXQUFLckQsTUFBTCxDQUFZc0QsV0FBWixDQUF3QixDQUF4QjtBQUNIOztBQUdELFNBQUs5RCxVQUFMLENBQWdCcUMsSUFBaEIsQ0FBcUIwQixTQUFyQixDQUErQlosTUFBL0I7QUFDSCxHQWxJSTtBQXNJTGEsRUFBQUEsSUF0SUssa0JBc0lFO0FBQ0g7QUFDQTtBQUNBOUUsSUFBQUEsRUFBRSxDQUFDeUQsSUFBSCxDQUFRc0IsTUFBUixHQUhHLENBSUg7O0FBRUEvRSxJQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVk4RCxTQUFaLENBQXNCLE1BQXRCO0FBRUgsR0E5SUk7QUFpSkx2RCxFQUFBQSxVQWpKSyx3QkFpSlE7QUFBQTs7QUFDVCxTQUFLd0QsS0FBTCxHQUFhQyxXQUFXLENBQUMsWUFBTTtBQUMzQixNQUFBLEtBQUksQ0FBQzVFLElBQUw7O0FBQ0EsTUFBQSxLQUFJLENBQUNnQixNQUFMLENBQVk2RCxVQUFaLENBQXVCLEtBQUksQ0FBQzdFLElBQTVCOztBQUVBLFVBQUksS0FBSSxDQUFDQSxJQUFMLEdBQVksQ0FBaEIsRUFBbUI7QUFDZixRQUFBLEtBQUksQ0FBQ3VELFFBQUw7QUFDSDtBQUVKLEtBUnVCLEVBUXJCLElBUnFCLENBQXhCO0FBU0gsR0EzSkk7QUE2SkxDLEVBQUFBLFNBN0pLLHVCQTZKTztBQUNSc0IsSUFBQUEsYUFBYSxDQUFDLEtBQUtILEtBQU4sQ0FBYjtBQUNIO0FBL0pJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBjenFjenF6enp6enooY3pxKVxuICogQEVtYWlsOiB0ZW5jaGVuemhlbmdxaW5nQHFxLmNvbVxuICogQERhdGU6IDIwMjMtMDUtMjkgMTY6MjU6MzZcbiAqIEBMYXN0RWRpdG9yczog6ZmI5q2j5riFTWFjUHJvXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA2LTA0IDIyOjQ2OjAyXG4gKiBARmlsZVBhdGg6IC9nb2xkbWluZXItZGVtby9hc3NldHMvU2NyaXB0L01haW4uanNcbiAqIEBEZXNjcmlwdGlvbjog5ri45oiP5Li76KaB5Luj56CBIOWMheaLrOWAkuiuoeaXtiDmuLjmiI/ov4flhbPjgIHnu5PmnZ/nrYnnm7jlhbPpgLvovpFcbiAqIFxuICogQ29weXJpZ2h0IChjKSBieSBjenFjenF6enp6enooY3pxKSwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gXG4gKi9cblxuLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgT3JlTnVtYmVyOiAwLFxuICAgICAgICBNYXhPcmVOdW1iZXI6IDIwLFxuICAgICAgICBUaW1lOiA2MCxcblxuICAgICAgICBIb29rOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBPcmVBcmVhOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50XG4gICAgICAgIH0sXG4gICAgICAgIE9yZURhdGE6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Kc29uQXNzZXRcbiAgICAgICAgfSxcbiAgICAgICAgT3JlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgR2FtZU92ZXJVSToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudFxuICAgICAgICB9LFxuICAgICAgICBTY29yZUNvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnRcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpOy8v6I635Y+W56Kw5pKe5qOA5rWL57O757ufXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7Ly/pu5jorqTnorDmkp7mo4DmtYvns7vnu5/mmK/npoHnlKjnmoTvvIzpnIDopoHmiYvliqjlvIDlkK/norDmkp7mo4DmtYvns7vnu59cbiAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTsvL+W8gOWQr+WQjuWPr+WcqGRlYnVn5Lit5pi+56S656Kw5pKe5Yy65Z+fICAgICAgICBcbiAgICB9LFxuXG5cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNjb3JlciA9IHRoaXMuU2NvcmVDb250cm9sbGVyLmdldENvbXBvbmVudCgnU2NvcmUnKVxuICAgICAgICB0aGlzLnNjb3Jlci5sb2FkTGV2ZWwoKVxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKVxuICAgIH0sXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuT3JlTnVtYmVyIDwgdGhpcy5NYXhPcmVOdW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBudW0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5PcmVEYXRhLmpzb24ubGVuZ3RoIC0gMSkpXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuT3JlRGF0YS5qc29uW251bV1cbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVPcmVzKGRhdGEpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVPcmVzKGRhdGEpIHtcbiAgICAgICAgbGV0IG9yZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT3JlKVxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnQXRsYXMvbGV2ZWwtc2hlZXQnLCBjYy5TcHJpdGVBdGxhcywgZnVuY3Rpb24gKGVyciwgYXRsYXMpIHtcbiAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoZGF0YS5yZXMpXG4gICAgICAgICAgICAgICAgb3JlLmdldENvbXBvbmVudCgnT3JlJykuc2NvcmUgPSBkYXRhLnNjb3JlXG4gICAgICAgICAgICAgICAgb3JlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7Ly/mm7TmjaLlm77niYflpJbop4JcblxuICAgICAgICBvcmUueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLk9yZUFyZWEubm9kZS5oZWlnaHRcbiAgICAgICAgb3JlLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5PcmVBcmVhLm5vZGUud2lkdGhcblxuICAgICAgICB0aGlzLk9yZUFyZWEubm9kZS5hZGRDaGlsZChvcmUpXG4gICAgICAgIHRoaXMuT3JlTnVtYmVyKytcbiAgICB9LFxuXG4gICAgX0dhbWVQYXVzZUFtaW5hdGlvbkNhbGxCYWNrKCkge1xuICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XG4gICAgfSxcblxuICAgIHNob3dHYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5HYW1lT3ZlclVJLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBHYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKVxuXG4gICAgICAgIC8vIHRoaXMuc2hvd0dhbWVPdmVyKClcbiAgICAgICAgLy8gY2MuZ2FtZS5wYXVzZSgpXG5cbiAgICAgICAgLy/mmL7npLrlvLnlh7rmoYZcbiAgICAgICAgbGV0IGZpbmlzaGVkID0gY2MuY2FsbEZ1bmModGhpcy5fR2FtZVBhdXNlQW1pbmF0aW9uQ2FsbEJhY2ssIHRoaXMpO1xuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEsIDEpLCBmaW5pc2hlZCk7XG5cbiAgICAgICAgLy8gYWN0aW9uLmVhc2luZyhjYy5lYXNlQm91bmNlT3V0KDAuMykpO1xuICAgICAgICB2YXIgZ2FtZW92ZXIgPSB0aGlzLkdhbWVPdmVyVUkuZ2V0Q29tcG9uZW50KCdHYW1lT3ZlcicpXG4gICAgICAgIGlmICh0aGlzLnNjb3Jlci5Nb25leSA+IHRoaXMuc2NvcmVyLk1heFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3Jlci5zZXRNYXhTY29yZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NvcmVyLmNhbk5leHQoKSkge1xuICAgICAgICAgICAgZ2FtZW92ZXIuc2V0R2FtZU92ZXJUZXh0KGDmga3llpzkvaDvvIzpgJrov4fmnKzlhbPvvIFcXG7kvaDnmoTlvpfliIbmmK8ke3RoaXMuc2NvcmVyLk1vbmV5fVxcbuW9k+WJjeacgOmrmOW+l+WIhuS4uiR7dGhpcy5zY29yZXIuTWF4U2NvcmV9YClcbiAgICAgICAgICAgIHRoaXMuc2NvcmVyLkxldmVsVXAoKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lb3Zlci5zZXRHYW1lT3ZlclRleHQoJ+aXtumXtOWIsO+8gea4uOaIj+e7k+adnycpXG4gICAgICAgICAgICB0aGlzLnNjb3Jlci5zZXRMZXZlbCgxKVxuICAgICAgICAgICAgdGhpcy5zY29yZXIuc2V0TWVtTW9uZXkoMClcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5HYW1lT3ZlclVJLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgfSxcblxuXG5cbiAgICBOZXh0KCkge1xuICAgICAgICAvLyBHYW1lT3ZlclVJLmFjdGl2ZT1mYWxzZVxuICAgICAgICAvLyB0aGlzLmluaXQoKVxuICAgICAgICBjYy5nYW1lLnJlc3VtZSgpXG4gICAgICAgIC8vIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcblxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWUnKVxuXG4gICAgfSxcblxuXG4gICAgc3RhcnRUaW1lcigpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuVGltZS0tXG4gICAgICAgICAgICB0aGlzLnNjb3Jlci51cGRhdGVUaW1lKHRoaXMuVGltZSlcblxuICAgICAgICAgICAgaWYgKHRoaXMuVGltZSA8IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVPdmVyKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCAxMDAwKVxuICAgIH0sXG5cbiAgICBzdG9wVGltZXIoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICB9XG5cblxufSk7XG4iXX0=