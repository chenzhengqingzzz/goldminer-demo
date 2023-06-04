
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