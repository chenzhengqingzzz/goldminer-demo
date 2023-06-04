"use strict";
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