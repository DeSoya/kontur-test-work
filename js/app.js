var app = {};
(function () {
    app.matrixA = new Matrix(2, 2);
    app.matrixB = new Matrix(2, 2);
    app.matrixC = new Matrix(2, 2);
    app.isCheckedA = true;

    var Application = React.createClass({
        render: function() {
            return React.createElement(
                'article',
                { className: 'wrapper', id: 'app' },
                React.createElement(ControlPane, {}),
                React.createElement(ContentPane, {})
            );
        }
    });

    ReactDOM.render(React.createElement(Application, {}),
        document.getElementById('root'));
    app.update = function () {
        window.ee.emit('App.changeMatrix', {});
    };
    app.updateMatrixA = function () {
        window.ee.emit('App.redrawMatrixA', {});
    }
    app.updateMatrixB = function () {
        window.ee.emit('App.redrawMatrixB', {});
    }
    app.updateMatrixC = function () {
        window.ee.emit('App.redrawMatrixC', {});
    }
}());
