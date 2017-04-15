describe('Component:ContentEditable', function() {

  beforeEach(angular.mock.module('ContentEditable'));

  let scope, controller;
  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    element = angular.element('<content-editable>Some random text here</content-editable>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  let vm;
  let actual, expected;
  describe('initialization', () => {
    beforeEach(() => {
        vm = element.controller('contentEditable');
    });

    it('constructor', () => {
      expect(vm.$element).toBeDefined();
      expect(vm.$timeout).toBeDefined();
    });

    it('should set the bindings', () => {
      expect(vm.active).toBeUndefined();
      expect(vm.onApply).toBeUndefined();
      expect(vm.onChange).toBeUndefined();
      expect(vm.maxLength).toBeUndefined();
    });
  });
});
