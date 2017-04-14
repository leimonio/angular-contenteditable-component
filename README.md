# **Angular Content Editable Component**

Simple Angular 1.5 component making wrapped text elements editable.

Features:
- Event handlers for text change and apply
- Toggle editable element programmatically
- Max length validation
- Keyboard support for `ENTER` & `ESC` by applying and dismissing changes respectively

## How to use it

1. **Installation**
```shell
$ npm install --save angular-contenteditable-component
```

2. **Module Load**

  **app.js**
```javascript
import angular from 'angular';
import ContentEditable from 'angular-contenteditable-component';
...
angular.module('app', [ContentEditable]);
```
  **index.html**
```html
...
<content-editable>
  Text Here is Editable!
</content-editable>
...
```

## Example
**app.js**
```javascript
import angular from 'angular';
import ContentEditable from 'angular-contenteditable-component';

class AppController {
  constructor(){}
  $onInit(){
    this.text = 'This is a random text';
  }
  toggleFocus() {
    this.active = !this.active;
  }
  updateText(text) {
    console.log('Text updated:', text);
    this.text = text;
  }
  editApply(text){
    console.log('Text applied:', text);
    this.text = text;
    this.active = false;
  }
}

angular.module('app', [ContentEditable]);
angular.module('app')
    .controller('AppController', AppController);
```
**index.html**
```html
...
<content-editable
  active="vm.active"
  on-change="vm.updateText(text)"
  on-apply="vm.editApply(text)"
  max-length="90">
  <section>{{vm.text}}</section>
</content-editable>
...
```
