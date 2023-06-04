"use strict";
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