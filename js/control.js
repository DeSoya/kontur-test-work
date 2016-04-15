'use strict';
var ControlPane;

(function () {
    var isMatrixAChecked = true;

    var buttonMultiply = React.createClass({
        multiplyMatrix: function () {
            if (app.matrixA.sizeX !== app.matrixB.sizeY) {
                app.setError();
                return;
            }
            app.clearError();

            app.matrixC = app.matrixA.multiply(app.matrixB);
            app.updateMatrixC();
        },

        render: function () {
            return React.createElement(
                'div',
                { className: 'container-button-multiply'},
                React.createElement(
                    'button',
                    {
                        className: 'button-multiply',
                        onClick: this.multiplyMatrix },
                    'Умножить матрицы'
                ),
                React.createElement(
                    'div',
                    { className: 'angle-multiply-button'}
                )
            );
        }
    });
    var buttonClear = React.createClass({
        clearMatrix: function () {
            app.matrixA.clear();
            app.matrixB.clear();
            app.matrixC.clear();
            app.updateMatrixC();
            app.updateMatrixA();
            app.updateMatrixB();
        },
        render: function () {
            return React.createElement(
                'button',
                {
                    className: 'button-clear-matrix countrol-button',
                    onClick: this.clearMatrix
                },
                React.createElement(
                    'span',
                    { className: 'logo-clear'},
                    'Очистить матрицы'
                )
            );
        }
    });
    var buttonChangePosition = React.createClass({
        changePosition: function () {
            var tempMatrix = app.matrixA.clone();

            app.matrixA = app.matrixB.clone();
            app.matrixB = tempMatrix;
            app.matrixC.setSize(app.matrixB.sizeX, app.matrixA.sizeY);
            app.updateMatrixC();
            app.updateMatrixA();
            app.updateMatrixB();
        },
        render: function () {
            return React.createElement(
                'button',
                {
                    className: 'button-change-position countrol-button',
                    onClick: this.changePosition
                },
                React.createElement(
                    'span',
                    { className: 'logo-replace'},
                    'Поменять матрицы местами'
                )
            );
        }
    });
    var buttonsSelectMatrix = React.createClass({
        getInitialState: function () {
            return {
                isCheckedA: true
            };
        },
        selectMatrixA: function () {
            if (this.state.isCheckedA === false) {
                isMatrixAChecked = true;
                changeButtonState(app.matrixA);
                this.setState({isCheckedA: true});
            }
        },
        selectMatrixB: function () {
            if (this.state.isCheckedA === true) {
                isMatrixAChecked = false;
                changeButtonState(app.matrixB);
                this.setState({isCheckedA: false});
            }
        },
        render: function () {
            return React.createElement(
                'div',
                { className: 'radio-menu' },
                React.createElement(
                    'input',
                    {
                        type: 'radio',
                        name: 'matrix',
                        id: 'matrix-input-a',
                        defaultChecked: isMatrixAChecked,
                        onClick: this.selectMatrixA
                    }
                ),
                React.createElement(
                    'label',
                    {
                        className: 'checkbox',
                        htmlFor: 'matrix-input-a'
                    }
                ),
                React.createElement(
                    'label',
                    {
                        className: 'name-matrix-radio',
                        htmlFor: 'matrix-input-a'
                    },
                    'Матрица А'
                ),
                React.createElement(
                    'input',
                    {
                        type: 'radio',
                        name: 'matrix',
                        id: 'matrix-input-b',
                        defaultChecked: !isMatrixAChecked,
                        onClick: this.selectMatrixB
                    }
                ),
                React.createElement(
                    'label',
                    {
                        className: 'checkbox',
                        htmlFor: 'matrix-input-b'
                    }
                ),
                React.createElement(
                    'label',
                    {
                        className: 'name-matrix-radio',
                        htmlFor: 'matrix-input-b'
                    },
                    'Матрица Б'
                )
            );
        }
    });
    var buttonAddLine = React.createClass({
        getInitialState: function () {
            return {
                disabled: false
            };
        },
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.buttonAddLine', function (isDisabled) {
                if (self.state.disabled !== isDisabled) {
                    self.setState({disabled: isDisabled});
                }
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.buttonAddLine');
        },
        addLine: function () {
            if (isMatrixAChecked) {
                if (app.matrixA.sizeY === 10) {
                    return;
                }
                if (app.matrixA.sizeY === 2) {
                    app.ee.emit('App.buttonRemoveLine', false);
                }

                app.matrixA.setSize(app.matrixA.sizeX, app.matrixA.sizeY + 1);
                app.matrixC.setSize(app.matrixC.sizeX, app.matrixC.sizeY + 1);
                if (app.matrixA.sizeY === 10) {
                    this.setState({disabled: true});
                }
                app.updateMatrixC();
                app.updateMatrixA();
            } else {
                if (app.matrixB.sizeY === 10) {
                    return;
                }
                if (app.matrixB.sizeY === 2) {
                    app.ee.emit('App.buttonRemoveLine', false);
                }
                app.matrixB.setSize(app.matrixB.sizeX, app.matrixB.sizeY + 1);
                app.updateMatrixB();

                if (app.matrixB.sizeY === 10) {
                    this.setState({disabled: true});
                }
            }
        },
        render: function () {
            return React.createElement(
                'button',
                {
                    className: 'button-add-line countrol-button',
                    disabled: this.state.disabled,
                    onClick: this.addLine
                },
                React.createElement(
                    'span',
                    { className: 'logo-plus'},
                    'Добавить'
                )
            );
        }
    });
    var buttonRemoveLine = React.createClass({
        getInitialState: function () {
            return {
                disabled: true
            };
        },
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.buttonRemoveLine', function (isDisabled) {
                if (self.state.disabled !== isDisabled) {
                    self.setState({disabled: isDisabled});
                }
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.buttonRemoveLine');
        },
        removeLine: function () {
            if (isMatrixAChecked) {
                if (app.matrixA.sizeY === 2) {
                    return;
                }
                if (app.matrixA.sizeY === 10) {
                    app.ee.emit('App.buttonAddLine', false);
                }
                app.matrixA.setSize(app.matrixA.sizeX, app.matrixA.sizeY - 1);
                app.matrixC.setSize(app.matrixC.sizeX, app.matrixC.sizeY - 1);
                app.updateMatrixC();
                app.updateMatrixA();

                if (app.matrixA.sizeY === 2) {
                    this.setState({disabled: true});
                }
            } else {
                if (app.matrixB.sizeY === 2) {
                    return;
                }
                if (app.matrixB.sizeY === 10) {
                    app.ee.emit('App.buttonAddLine', false);
                }
                app.matrixB.setSize(app.matrixB.sizeX, app.matrixB.sizeY - 1);
                app.updateMatrixB();

                if (app.matrixB.sizeY === 2) {
                    this.setState({disabled: true});
                }
            }
        },
        render: function () {
            return React.createElement(
                'button',
                {
                    className: 'button-remove-line countrol-button',
                    disabled: this.state.disabled,
                    onClick: this.removeLine
                },
                React.createElement(
                    'span',
                    { className: 'logo-minus'},
                    'Удалить'
                )
            );
        }
    });
    var buttonAddColumn = React.createClass({
        getInitialState: function () {
            return {
                disabled: false
            };
        },
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.buttonAddColumn', function (isDisabled) {
                if (self.state.disabled !== isDisabled) {
                    self.setState({disabled: isDisabled});
                }
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.buttonAddColumn');
        },
        addColumn: function () {
            if (isMatrixAChecked) {
                if (app.matrixA.sizeX === 10) {
                    return;
                }
                if (app.matrixA.sizeX === 2) {
                    app.ee.emit('App.buttonRemoveColumn', false);
                }

                app.matrixA.setSize(app.matrixA.sizeX + 1, app.matrixA.sizeY);
                app.updateMatrixA();

                if (app.matrixA.sizeX === 10) {
                    this.setState({disabled: true});
                }
            } else {
                if (app.matrixB.sizeX === 10) {
                    return;
                }
                if (app.matrixB.sizeX === 2) {
                    app.ee.emit('App.buttonRemoveColumn', false);
                }

                app.matrixB.setSize(app.matrixB.sizeX + 1, app.matrixB.sizeY);
                app.matrixC.setSize(app.matrixC.sizeX + 1, app.matrixC.sizeY);
                app.updateMatrixC();
                app.updateMatrixB();

                if (app.matrixB.sizeX === 10) {
                    this.setState({disabled: true});
                }
            }
        },
        render: function () {
            return React.createElement(
                'button',
                {
                    className: 'button-add-line countrol-button',
                    disabled: this.state.disabled,
                    onClick: this.addColumn
                },
                React.createElement(
                    'span',
                    { className: 'logo-plus'},
                    'Добавить'
                )
            );
        }
    });
    var buttonRemoveColumn = React.createClass({
        getInitialState: function () {
            return {
                disabled: true
            };
        },
        componentDidMount: function () {
            var self = this;
            app.ee.addListener('App.buttonRemoveColumn', function (isDisabled) {
                if (self.state.disabled !== isDisabled) {
                    self.setState({disabled: isDisabled});
                }
            });
        },
        componentWillUnmount: function () {
            app.ee.removeListener('App.buttonRemoveColumn');
        },
        removeColumn: function () {
            if (isMatrixAChecked) {
                if (app.matrixA.sizeX === 2) {
                    return;
                }
                if (app.matrixA.sizeX === 10) {
                    app.ee.emit('App.buttonAddColumn', false);
                }

                app.matrixA.setSize(app.matrixA.sizeX - 1, app.matrixA.sizeY);
                app.updateMatrixA();

                if (app.matrixA.sizeX === 2) {
                    this.setState({disabled: true});
                }
            } else {
                if (app.matrixB.sizeX === 2) {
                    return;
                }
                if (app.matrixB.sizeX === 10) {
                    app.ee.emit('App.buttonAddColumn', false);
                }

                app.matrixB.setSize(app.matrixB.sizeX - 1, app.matrixB.sizeY);
                app.matrixC.setSize(app.matrixC.sizeX - 1, app.matrixC.sizeY);
                app.updateMatrixC();
                app.updateMatrixB();

                if (app.matrixB.sizeX === 2) {
                    this.setState({disabled: true});
                }
            }
        },
        render: function () {
            return React.createElement(
                'button',
                {
                    className: 'button-remove-column countrol-button',
                    disabled: this.state.disabled,
                    onClick: this.removeColumn
                },
                React.createElement(
                    'span',
                    { className: 'logo-minus'},
                    'Удалить'
                )
            );
        }
    });

    ControlPane = React.createClass({
        render: function () {
            return React.createElement(
                'aside',
                { className: 'control background-gray', id: 'control-pane' },
                React.createElement(buttonMultiply, { }),
                React.createElement('div', { className: 'separator-50' }),
                React.createElement(buttonClear, { }),
                React.createElement('br', { }),
                React.createElement(buttonChangePosition, { }),
                React.createElement('div', { className: 'separator-50' }),
                React.createElement(buttonsSelectMatrix, { }),
                React.createElement(buttonAddLine, { }),
                React.createElement(buttonRemoveLine, { }),
                React.createElement('span', {}, 'строку'),
                React.createElement('br', { }),
                React.createElement(buttonAddColumn, { }),
                React.createElement(buttonRemoveColumn, { }),
                React.createElement('span', {}, 'столбец'),
                React.createElement('div', { className: 'separator-50' }),
                React.createElement(
                    'div',
                    { className: 'control-error hidden' },
                    'Такие матрицы нельзя перемножить, так как количество столбцов матрицы А, ' +
                    'не равно количевству строк матрицы В.'
                )
            );
        }
    });

    function changeButtonState(matrix) {
        switch (matrix.sizeX) {
            case 10:
                app.ee.emit('App.buttonAddColumn', true);
                app.ee.emit('App.buttonRemoveColumn', false);
                break;
            case 2:
                app.ee.emit('App.buttonAddColumn', false);
                app.ee.emit('App.buttonRemoveColumn', true);
                break;
            default:
                app.ee.emit('App.buttonAddColumn', false);
                app.ee.emit('App.buttonRemoveColumn', false);
        }
        switch (matrix.sizeY) {
            case 10:
                app.ee.emit('App.buttonAddLine', true);
                app.ee.emit('App.buttonRemoveLine', false);
                break;
            case 2:
                app.ee.emit('App.buttonAddLine', false);
                app.ee.emit('App.buttonRemoveLine', true);
                break;
            default:
                app.ee.emit('App.buttonAddLine', false);
                app.ee.emit('App.buttonRemoveLine', false);
        }
    }
}());
