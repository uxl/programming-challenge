/// <reference path="../typings/index.d.ts" />

import PIXI = require('pixi.js');
// const renderer:PIXI.WebGLRenderer = new PIXI.WebGLRenderer(1280, 720);
// document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
//const stage:PIXI.Container = new PIXI.Container();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircleContainer = function (_PIXI$Sprite):any {
  _inherits(CircleContainer, _PIXI$Sprite);

  function CircleContainer() {
    _classCallCheck(this, CircleContainer);

    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _PIXI$Sprite.call.apply(_PIXI$Sprite, [this].concat(arg)));

    _this.circles = new Array();
    return _this;
  }

  CircleContainer.prototype.render = function render() {
    for (var i = 0; i < 400; i++) {
      this.circles.push(new Circle());
      this.circles[i].count = this.stage.x * Math.random();
      this.circles[i].reg = Math.random() * 10 + 1;
      this.circles[i].friction = Math.random() * 2;
      this.addChild(this.circles[i]);
    }
  };

  CircleContainer.prototype.update = function update() {
    for (var _iterator = this.circles, _isArray = Array.isArray(_iterator), _i:any = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var circle = _ref;

      circle.x = Math.sin(circle.count) * (this.stage.x / circle.reg) + this.stage.x / 2 / circle.friction;
      circle.y = Math.cos(circle.count) * (this.stage.y / circle.reg) + this.stage.y / 2 / circle.friction;
      circle.count += 0.01;
    }
  };

  return CircleContainer;
}(PIXI.Sprite);

var Circle = function (_PIXI$Sprite2):any {
  _inherits(Circle, _PIXI$Sprite2);

  function Circle() {
    _classCallCheck(this, Circle);

    for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      arg[_key2] = arguments[_key2];
    }

    var _this2 = _possibleConstructorReturn(this, _PIXI$Sprite2.call.apply(_PIXI$Sprite2, [this].concat(arg)));

    _this2.deg = Math.floor(Math.random() * 20 + 1);
    _this2.alpha = Math.random();

    _this2.graphics = new PIXI.Graphics();
    _this2.graphics.beginFill(0xF00d0F, 1);
    _this2.graphics.drawCircle(0, 0, _this2.deg);
    _this2.addChild(_this2.graphics);
    return _this2;
  }

  return Circle;
}(PIXI.Sprite);

var Main = function () {
  function Main() {
    _classCallCheck(this, Main);

    this.renderer = PIXI.autoDetectRenderer(this.w, this.h, { backgroundColor: 0x000000 });
    document.body.appendChild(this.renderer.view);

    this.container = new CircleContainer();
    this.container.stage = new Object();
    this.container.stage.x = this.w;
    this.container.stage.y = this.h;

    this.stage = new PIXI.Container();
    this.stage.addChild(this.container);
  }

  Main.prototype.render = function render() {
    this.container.render();
    this.renderer.render(this.stage);
    this.animate();
  };

  Main.prototype.animate = function animate() {
    this.container.update();
    this.renderer.render(this.stage);
    window.requestAnimationFrame(this.animate.bind(this));
  };

  return Main;
}();

Main.prototype.w = window.innerWidth;
Main.prototype.h = window.innerHeight;

var main = new Main();
main.render();
