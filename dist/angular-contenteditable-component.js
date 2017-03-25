'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module !== 'undefined' && _typeof(module.exports) === 'object') {
        module.exports = factory(require('angular'));
    } else {
        return factory(root.angular);
    }
})(undefined, function (angular) {
    "use strict";

    var CONTENT_EDITABLE = 'ContentEditable';

    var ContentEditable = {
        controller: 'ContentEditableController',
        bindings: {
            active: '<?',
            onApply: '&?',
            onChange: '&?',
            maxLength: '<?'
        },
        transclude: true,
        template: '\n            <div ng-transclude\n                 contenteditable="{{$ctrl.isEditable}}"\n                 ng-keydown="$ctrl.handleKeycode($event)"\n                 ng-keyup="$ctrl.handleEdit($event)"\n                 ng-blur="$ctrl.editApply()"\n                 tabindex="-1"\n            ></div>\n        '
    };

    var KEYCODE = {
        BACKSPACE: 8,
        ENTER: 13,
        ESCAPE: 27
    };

    var ContentEditableController = function () {
        function ContentEditableController($element, $timeout) {
            _classCallCheck(this, ContentEditableController);

            this.$element = $element;
            this.$timeout = $timeout;
        }

        _createClass(ContentEditableController, [{
            key: '$onInit',
            value: function $onInit() {
                this.isEditable = typeof this.active !== "undefined" ? this.active : true;
                this.$elem = angular.element(this.$element[0].querySelector('div[contenteditable]'));
            }
        }, {
            key: '$onChanges',
            value: function $onChanges(changesObj) {
                if (changesObj.active && typeof changesObj.active.currentValue !== "undefined") {
                    this.isEditable = changesObj.active.currentValue;
                    if (this.isEditable) this._focus();
                }
            }
        }, {
            key: '_focus',
            value: function _focus() {
                var _this = this;

                var text = this._getText();
                this.initialText = text;
                this.text = text;
                this.$timeout(function () {
                    return _this.$elem[0].focus();
                });
            }
        }, {
            key: '_blur',
            value: function _blur() {
                var _this2 = this;

                this.$timeout(function () {
                    return _this2.$elem[0].blur();
                });
            }
        }, {
            key: '_getText',
            value: function _getText() {
                return this.$elem[0].innerText.trim();
            }
        }, {
            key: 'editApply',
            value: function editApply() {
                if (!this.isEditable) return;
                if (typeof this.text === "undefined") return;
                this.onApply({ text: this.text });
            }
        }, {
            key: 'handleKeycode',
            value: function handleKeycode(event) {
                if (event.keyCode === KEYCODE.ENTER) {
                    event.preventDefault();
                    this.text = this._getText();
                    this._blur();
                } else if (event.keyCode === KEYCODE.ESCAPE) {
                    this.text = this.initialText;
                    this._blur();
                } else if (event.keyCode === KEYCODE.BACKSPACE) {
                    this.onChange({ text: this._getText() });
                } else {
                    if (this.maxLength && this._getText().length >= this.maxLength) {
                        event.preventDefault();
                    }
                }
            }
        }, {
            key: 'handleEdit',
            value: function handleEdit(event) {
                var keyCodeArr = Object.keys(KEYCODE).map(function (key) {
                    return KEYCODE[key];
                });
                if (keyCodeArr.indexOf(event.keyCode) > -1) return;
                this.text = this._getText();
                this.onChange({ text: this.text });
            }
        }]);

        return ContentEditableController;
    }();

    ContentEditableController.$inject = ['$element', '$timeout'];

    angular.module(CONTENT_EDITABLE, []).component('contentEditable', ContentEditable).controller('ContentEditableController', ContentEditableController);

    return CONTENT_EDITABLE;
});
