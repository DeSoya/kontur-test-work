'use strict';
var ContentPane;

(function () {
    var InputCell = React.createClass({
        onChangeInput: function (event) {
            var valueInt = parseInt(event.target.value);
            if (
                event.target.value <= 10 ||
                event.target.value === '' ||
                event.target.value === '-'
                ) {
                this.props.matrix.setValue(this.props.x, this.props.y, event.target.value);
                this.setState({});
            }
        },

        render: function () {
            var matrix = this.props.matrix;
            var name = this.props.matrixName;
            var x = this.props.x;
            var y = this.props.y;
            return React.createElement('input', {
                className: 'cell-matrix',
                key: name + (x + 1) + ',' + (y + 1),
                placeholder: name + (y + 1) + ',' + (x + 1),
                pattern: '-?\\d+([.]\\d+)?',
                disabled: name === 'c',
                onChange: this.onChangeInput,
                value: matrix.getValue(x, y)
            });
        }
    });

    var MatrixView = React.createClass({
        onFocusInput: function () {
            app.setFocus();
        },
        onBlurInput: function () {
            app.setBlur();
        },

        render: function () {
            var matrix = this.props.matrix;
            var name = this.props.name;
            var curentObject = this;

            return React.createElement(
                'div',
                {
                    className: 'matrix-values',
                    onFocus: this.onFocusInput,
                    onBlur: this.onBlurInput
                },
                Array(matrix.sizeX).fill('').map(function (col, i) {
                    return React.createElement(
                        'div',
                        { className: 'column', key: 'column' + name + i},
                        Array(matrix.sizeY).fill('').map(function (row, k) {
                            return React.createElement(InputCell, {
                                key: name + (i + 1) + ',' + (k + 1),
                                matrixName: name,
                                matrix: matrix,
                                x: i,
                                y: k
                            });
                        })
                    );
                })
            );
        }
    });

    var MatrixA = React.createClass({
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.changeMatrixA', function (item) {
                self.setState({});
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.changeMatrixA');
        },
        render: function () {
            return React.createElement(MatrixView, { matrix: app.matrixA, name: 'a' });
        }
    });

    var MatrixB = React.createClass({
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.changeMatrixB', function (item) {
                self.setState({});
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.changeMatrixB');
        },
        render: function () {
            return React.createElement(MatrixView, { matrix: app.matrixB, name: 'b' });
        }
    });

    var MatrixC = React.createClass({
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.changeMatrixC', function (item) {
                self.setState({});
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.changeMatrixC');
        },
        render: function () {
            return React.createElement(MatrixView, { matrix: app.matrixC, name: 'c' });
        }
    });

    ContentPane = React.createClass({
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.changeMatrix', function (item) {
                self.setState({});
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.changeMatrix');
        },
        render: function () {
            return React.createElement(
                'div',
                { className: 'main-form', id: 'contentPane' },
                React.createElement(
                    'div',
                    { className: 'top-matrix'},
                    React.createElement(
                        'div',
                        { className: 'matrix' },
                        React.createElement('div', { className: 'border-left' }),
                        React.createElement(MatrixC, {}),
                        React.createElement('div', { className: 'border-right' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'matrix' },
                        React.createElement('div', { className: 'border-left' }),
                        React.createElement(MatrixA, {}),
                        React.createElement('div', { className: 'border-right' })
                    ),
                    React.createElement(
                        'p',
                        { className: 'name-matrix' },
                        'A'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'bottom-matrix'},
                    React.createElement(
                        'div',
                        { className: 'matrix matrix-c', id: 'matrix-c' },
                        React.createElement('div', { className: 'border-left' }),
                        React.createElement(MatrixB, {}),
                        React.createElement('div', { className: 'border-right' }),
                        React.createElement('div', { className: 'separator' }),
                        React.createElement(
                            'p',
                            { className: 'name-matrix' },
                            'B'
                        )
                    )
                )
            );
        }
    });
}());
