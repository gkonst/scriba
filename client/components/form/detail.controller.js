'use strict';

angular.module('scribaApp')
  .controller('ModalDetailCtrl', function ($log, $modalInstance, id, ModelFactory, initial) {
    var vm = this;

    if (angular.isDefined(id)) {
      $log.debug('Editing', id);
      vm.model = ModelFactory.get({id: id});
    } else {
      $log.debug('Creating new');
      vm.model = initial;
    }

    vm.save = function (form) {
      if (form.$valid) {
        if (angular.isDefined(vm.model._id)) {
          ModelFactory.update({id: vm.model._id}, vm.model, $modalInstance.close);
        } else {
          ModelFactory.save(vm.model, $modalInstance.close);
        }
      }
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

