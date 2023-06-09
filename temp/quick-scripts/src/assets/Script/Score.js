"use strict";
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