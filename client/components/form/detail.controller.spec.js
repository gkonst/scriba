'use strict';

describe('Controller: ModalDetailCtrl', function () {
  beforeEach(module('scribaApp'));

  var sut, $controller, modalInstanceMock, modelFactoryMock, id, initial;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
    modalInstanceMock = {
      close: sinon.spy(),
      dismiss: sinon.spy()
    };
    modelFactoryMock = {
      get: sinon.stub(),
      save: sinon.stub().callsArg(1),
      update: sinon.stub().callsArg(2)
    };
    id = undefined;
    initial = {};
  }));

  function initCtrl() {
    sut = $controller('ModalDetailCtrl', {
      $modalInstance: modalInstanceMock,
      ModelFactory: modelFactoryMock,
      id: id,
      initial: initial
    });
  }

  it('should create initial model if id undefined', function () {
    // given
    id = undefined;

    // when
    initCtrl();

    // then
    sut.model.should.not.be.undefined;
  });

  it('should fetch model if id defined', function () {
    // given
    id = 'testId';
    var model = {name: 'test33', _id: 'testId33'};
    modelFactoryMock.get.returns(model);

    // when
    initCtrl();

    // then
    modelFactoryMock.get.should.have.been.calledWith({id: id});
    sut.model.name.should.equal(model.name);
    sut.model._id.should.equal(model._id);
  });

  it('should save new model and close modal if form valid and _id undefined', function () {
    // given
    initCtrl();
    sut.model = {name: 'test1'};

    // when
    sut.save({$valid: true});

    // then
    modalInstanceMock.close.should.have.been.calledOnce;
    modelFactoryMock.save.should.have.been.calledWith(sut.model);
  });

  it('should update bookcase and close modal if form valid and _id defined', function () {
    // given
    initCtrl();
    sut.model = {_id: 'testId', name: 'test2'};

    // when
    sut.save({$valid: true});

    // then
    modalInstanceMock.close.should.have.been.calledOnce;
    modelFactoryMock.update.should.have.been.calledWith({id: 'testId'}, sut.model);
  });

  it('should not save bookcase and close modal if form invalid', function () {
    // given
    initCtrl();
    sut.model = {name: 'test1'};

    // when
    sut.save({$valid: false});

    // then
    modalInstanceMock.close.should.not.have.been.called;
    modelFactoryMock.save.should.not.have.been.called;
    modelFactoryMock.update.should.not.have.been.called;
  });

  it('should call modal dismiss on cancel', function () {
    // given
    initCtrl();

    // when
    sut.cancel();

    // then
    modalInstanceMock.dismiss.should.have.been.calledWith('cancel');
  });
});
