import angular from 'angular';
import ContentEditable from '../../dist/angular-contenteditable-component';

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
