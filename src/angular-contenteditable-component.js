(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        module.exports = factory(require('angular'));
    } else {
        return factory(root.angular);
    }
}(this, function(angular) {
    "use strict";

    const CONTENT_EDITABLE = 'ContentEditable';

    const ContentEditable = {
        controller: 'ContentEditableController',
        bindings: {
            active: '<?',
            onApply: '&?',
            onChange: '&?',
            maxLength: '<?'
        },
        transclude: true,
        template: `
            <div ng-transclude
                 contenteditable="{{$ctrl.isEditable}}"
                 ng-keydown="$ctrl.handleKeycode($event)"
                 ng-keyup="$ctrl.handleEdit($event)"
                 ng-blur="$ctrl.editApply()"
                 tabindex="-1"
            ></div>
        `
    };

    const KEYCODE = {
        BACKSPACE: 8,
        ENTER: 13,
        ESCAPE: 27
    };

    class ContentEditableController {
        constructor($element, $timeout){
            this.$element = $element;
            this.$timeout = $timeout;
        }
        $onInit() {
            this.isEditable = typeof this.active !== "undefined" ? this.active : true;
            this.$elem = angular.element(this.$element[0].querySelector('div[contenteditable]'));
        }
        $onChanges(changesObj) {
            if(changesObj.active && typeof changesObj.active.currentValue !== "undefined") {
                this.isEditable = changesObj.active.currentValue;
                if(this.isEditable) this._focus();
            }
        }
        _focus() {
            const text = this._getText();
            this.initialText = text;
            this.text = text;
            this.$timeout(() => this.$elem[0].focus());
        }
        _blur() {
            this.$timeout(() => this.$elem[0].blur());
        }
        _getText() {
            return this.$elem[0].innerText.trim();
        }
        editApply() {
            if(!this.isEditable) return;
            if(typeof this.text === "undefined") return;
            this.onApply({text: this.text});
        }
        handleKeycode(event) {
            if (event.keyCode === KEYCODE.ENTER) {
                event.preventDefault();
                this.text = this._getText();
                this._blur();
            } else if (event.keyCode === KEYCODE.ESCAPE) {
                this.text = this.initialText;
                this._blur();
            } else if (event.keyCode === KEYCODE.BACKSPACE) {
                this.onChange({text: this._getText()});
            } else {
                if(this.maxLength && this._getText().length >= this.maxLength) {
                    event.preventDefault();
                }
            }
        }
        handleEdit(event) {
            const keyCodeArr = Object.keys(KEYCODE).map(key => KEYCODE[key]);
            if (keyCodeArr.indexOf(event.keyCode) > -1) return;
            this.text = this._getText();
            this.onChange({text: this.text});
        }
    }

    ContentEditableController.$inject = ['$element', '$timeout'];

    angular
      .module(CONTENT_EDITABLE, [])
      .component('contentEditable', ContentEditable)
      .controller('ContentEditableController', ContentEditableController);

    return CONTENT_EDITABLE;
}));
