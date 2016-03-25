var view = {};

(function () {
    view.mA = new Matrix(2, 2);
    view.nameA = 'a';

    view.mB = new Matrix(2, 2);
    view.nameB = 'b';

    view.mC = new Matrix(2, 2);
    view.nameC = 'c';

    window.ee = new EventEmitter();

    var MatrixView = React.createClass({
        render: function () {
            var matrix = this.props.matrix;
            var name = this.props.name;

            return React.createElement(
                'div',
                { className: 'matrix__values' },
                    matrix.column.map(function (col, i) {
                    return React.createElement(
                        'div',
                        { className: 'column', key: 'column' + name + i},
                        col.map(function (row, k) {
                            return React.createElement('input', {
                                className: 
                                    'cell-matrix cell-' + name + k + '-' + i +
                                    ' matrix-cell-name-' + name,
                                key: name + (k + 1) + ',' + (i + 1),
                                placeholder: name + (k + 1) + ',' + (i + 1),
                                pattern: '\\d+([.,]\\d+)?',
                                disabled: name === view.nameC, 
                                defaultValue: row });
                        })
                    );
                })
            );
        }
    });

    var App = React.createClass({
        getInitialState: function () {
            return {
                matrixA: view.mA,
                matrixB: view.mB,
                matrixC: view.mC
            };
        },
        componentDidMount: function () {
            var self = this;
            window.ee.addListener('App.changeMatrix', function (item) {
                self.setState({
                    matrixA: item.matrixA,
                    matrixB: item.matrixB,
                    matrixC: item.matrixC
                });
            });
        },
        componentWillUnmount: function () {
            window.ee.removeListener('App.changeMatrix');
        },
        render: function () {
            var nameA = this.props.nameA;
            var nameB = this.props.nameB;
            var nameC = this.props.nameC;
            var matrixA = this.state.matrixA;
            var matrixB = this.state.matrixB;
            var matrixC = this.state.matrixC;
            return React.createElement(
                'div',
                { className: 'main-form' },
                React.createElement(
                    'div',
                    { className: 'matrix' },
                    React.createElement('div', { className: 'border-left' }),
                    React.createElement(MatrixView, { matrix: matrixC, name: nameC }),
                    React.createElement('div', { className: 'border-right', id: 'border-matrix-c' })
                ),
                React.createElement(
                    'div',
                    { className: 'matrix' },
                    React.createElement('div', { className: 'border-left' }),
                    React.createElement(MatrixView, { matrix: matrixA, name: nameA }),
                    React.createElement('div', { className: 'border-right', id: 'border-matrix-c' })
                ),
                React.createElement(
                    'p',
                    { className: 'name-matrix' },
                    'A'
                ),
                React.createElement('div', { className: 'separator-10' }),
                React.createElement(
                    'div',
                    { className: 'matrix matrix-c', id: 'matrix-c' },
                    React.createElement('div', { className: 'border-left' }),
                    React.createElement(MatrixView, { matrix: matrixB, name: nameB }),
                    React.createElement('div', {
                        className: 'border-right', id: 'border-matrix-c' }),
                    React.createElement('div', { className: 'separator' }),
                    React.createElement(
                        'p',
                        { className: 'name-matrix' },
                        'B'
                    )
                )
            );
        }
    });

    view.update = function () {
        $('.main-form').remove();

        ReactDOM.render(React.createElement(App, {
            matrixA: view.mA, nameA: view.nameA,
            matrixB: view.mB, nameB: view.nameB,
            matrixC: view.mC, nameC: view.nameC }), document.getElementById('main-form'));
    };
    view.update();
}());
