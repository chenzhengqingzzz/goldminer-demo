
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