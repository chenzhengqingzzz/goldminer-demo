"use strict";
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