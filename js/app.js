'use strict';
var app = {};

(function () {
    app.matrixA = new Matrix().setSize(2, 2);
    app.matrixB = new Matrix().setSize(2, 2);
    app.matrixC = new Matrix().setSize(2, 2);
    app.ee = new EventEmitter();


    var Application = React.createClass({
        render: function () {
            return React.createElement(
                'article',
                { className: 'wrapper', id: 'app' },
                React.createElement(ControlPane, {}),
                React.createElement(ContentPane, {className: 'main-form'})
            );
        }
    });

    ReactDOM.render(React.createElement(Application, {}),
        document.getElementById('root'));
    app.update = function () {
        app.ee.emit('App.changeMatrix', {});
    };
    app.updateMatrixA = function () {
        app.ee.emit('App.changeMatrixA', {});
    };
    app.updateMatrixB = function () {
        app.ee.emit('App.changeMatrixB', {});
    };
    app.updateMatrixC = function () {
        app.ee.emit('App.changeMatrixC', {});
    };
    app.setError = function () {
        $('#control-pane').removeClass('control-background-input')
                .addClass('control-background-error');
        $('.control-error').removeClass('hidden');
    };
    app.clearError = function () {
        $('#control-pane').removeClass('control-background-error');
        $('.control-error').addClass('hidden');
    };
    app.setFocus = function () {
        $('#control-pane').removeClass('control-background-error')
            .addClass('control-background-input');
        $('.control-error').addClass('hidden');
    };
    app.setBlur = function () {
        $('#control-pane').removeClass('control-background-input');
    };
}());
