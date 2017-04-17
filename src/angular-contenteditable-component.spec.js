describe('Component:ContentEditable', function() {

  beforeEach(angular.mock.module('ContentEditable'));

  describe('without bindings', () => {

    let scope, element;
    beforeEach(inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      element = angular.element('<content-editable>Some random text here</content-editable>');
      element = $compile(element)(scope);
      scope.$apply();
    }));

    let $ctrl;
    let actual, expected;
    describe('initialization', () => {
      beforeEach(() => {
        $ctrl = element.controller('contentEditable');
      });

      it('constructor', () => {
        expect($ctrl.$element).toBeDefined();
        expect($ctrl.$timeout).toBeDefined();
      });

      it('should set the bindings', () => {
        expect($ctrl.active).toBeUndefined();
        expect($ctrl.onApply).toBeUndefined();
        expect($ctrl.onChange).toBeUndefined();
        expect($ctrl.maxLength).toBeUndefined();
      });

      it('should initialize values', () => {
        expect($ctrl.isEditable).toBeDefined();
        expect($ctrl.isEditable).toBe(true);
        expect($ctrl.$elem).toBeDefined();
      })

      it('should render correct text', () => {
        let actual = element[0].innerText.trim();
        let expected = 'Some random text here';
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('with bindings', () => {

    let scope, element;
    beforeEach(inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.active = false;
      scope.updateText = jasmine.createSpy('updateText');
      scope.editApply = jasmine.createSpy('editApply');
      scope.text = 'Random Text Here!!';
      element = angular.element(`
        <content-editable
          active="active"
          on-change="updateText(text)"
          on-apply="editApply(text)"
          max-length="90">
          <section>{{text}}</section>
        </content-editable>
      `);
      element = $compile(element)(scope);
      scope.$apply();
    }));

    let $ctrl;
    let actual, expected;
    describe('initialization', () => {

      beforeEach(() => {
        $ctrl = element.controller('contentEditable');
      });

      it('constructor', () => {
        expect($ctrl.$element).toBeDefined();
        expect($ctrl.$timeout).toBeDefined();
      });

      it('should set the bindings', () => {
        expect($ctrl.active).toBeDefined();
        expect($ctrl.active).toBe(false);
        expect($ctrl.onApply).toBeDefined();
        expect($ctrl.onChange).toBeDefined();
        expect($ctrl.maxLength).toBeDefined();
        expect($ctrl.maxLength).toBe(90);
      });

      it('should initialize values', () => {
        expect($ctrl.isEditable).toBeDefined();
        expect($ctrl.isEditable).toBe(false);
        expect($ctrl.$elem).toBeDefined();
      });

      it('should render correct text', () => {
        let actual = element[0].innerText.trim();
        let expected = 'Random Text Here!!';
        expect(actual).toEqual(expected);
      });

      it('should change active and isEditable', () => {
        $ctrl._focus = jasmine.createSpy('_focus');

        scope.active = true;
        scope.$apply();
        expect($ctrl.active).toBe(true);
        expect($ctrl.isEditable).toBe(true);
        expect($ctrl._focus).toHaveBeenCalled();

        $ctrl._focus = jasmine.createSpy('_focus');
        scope.active = false;
        scope.$apply();
        expect($ctrl.active).toBe(false);
        expect($ctrl.isEditable).toBe(false);
        expect($ctrl._focus).not.toHaveBeenCalled();
      });

      it('should trigger _focus on active change to true', inject($timeout => {
        spyOn($ctrl,'_getText').and.callThrough();

        scope.active = true;
        scope.$apply();

        expect($ctrl._getText).toHaveBeenCalled();

        let expected = 'Random Text Here!!';
        expect($ctrl.text).toEqual(expected);
        expect($ctrl.initialText).toEqual(expected);

        spyOn($ctrl.$elem[0],'focus');
        $timeout.flush();
        expect($ctrl.$elem[0].focus).toHaveBeenCalled();
      }));
    });
  });
});
