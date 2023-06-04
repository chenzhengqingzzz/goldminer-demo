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
    extends: cc.Component,

    properties: {
        score: 0,

        // foo: {
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

    start() {
        this.addCollider()
    },

    // update (dt) {},
    addCollider() {
        let collider = this.node.addComponent(cc.BoxCollider)
        // let collider=this.node.getComponent(cc.BoxCollider)
        collider.size.set(cc.size(this.node.width, this.node.height))

    }
});