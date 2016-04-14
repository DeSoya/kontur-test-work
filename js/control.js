var ControlPane;

(function () {
    var buttonMultiply = React.createClass({
        multiplyMatrix: function() {
            if (app.matrixA.sizeX !== app.matrixB.sizeY) {
            $('#control-pane').removeClass('control-background-input')
                .addClass('control-background-error');
            $('.control-error').removeClass('hidden');
            return;
        }
        $('#control-pane').removeClass('control-background-error');
        $('.control-error').addClass('hidden');

        app.matrixC = app.matrixA.multiplication(app.matrixB);
        // window.ee.emit('App.changeMatrix', {});

        app.update();
        },

        render: function() {
            return React.createElement(
                'div',
                {},
                React.createElement(
                    'button',
                    { 
                        className: 'button-multiplication',
                        onClick: this.multiplyMatrix },
                    'Умножить матрицы'
                ),
                React.createElement(
                    'div',
                    { className: 'angle'}
                )
            );
        }
    });
    var buttonClear = React.createClass({
        clearMatrix: function() {
            app.matrixA.clearMatrix();
            app.matrixB.clearMatrix();
            app.matrixC.clearMatrix();
            app.update();
        },
        render: function() {
            return React.createElement(
                'button',
                {
                    className: 'button-clear-matrix',
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
        changePosition: function() {
            var tempMatrix = app.matrixA.clone();

            app.matrixA = app.matrixB.clone();
            app.matrixB = tempMatrix;
            app.matrixC.changeSize(app.matrixB.sizeX, app.matrixA.sizeY);
            app.update();
        },
        render: function() {
            return React.createElement(
                'button',
                {
                    className: 'button-change-position',
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
        selectMatrixA: function () {
            app.isCheckedA = true;
            changeButtonState(app.matrixA);
            this.setState({});
        },
        selectMatrixB: function () {
            app.isCheckedA = false;
            changeButtonState(app.matrixB);
            this.setState({});
        },
        render: function() {
            return React.createElement(
                'div',
                { className: 'radio-menu' },
                React.createElement(
                    'input',
                    {
                        type: 'radio',
                        name: 'matrix',
                        id: 'matrix-input-a',
                        defaultChecked: app.isCheckedA,
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
                        defaultChecked: !app.isCheckedA,
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
        addLine: function() {
            if ($('#matrix-input-a').prop('checked')) {
                if (app.matrixA.sizeY === 10) {
                    return;
                }
                $('.button-remove-line').attr('disabled', false);
                app.matrixA.changeSize(app.matrixA.sizeX, app.matrixA.sizeY + 1);
                app.matrixC.changeSize(app.matrixC.sizeX, app.matrixC.sizeY + 1);
                if (app.matrixA.sizeY === 10) {
                    $('.button-add-line').attr('disabled', true);
                }
            } else {
                $('.button-remove-line').attr('disabled', false);
                if (app.matrixB.sizeY === 10) {
                    return;
                }
                app.matrixB.changeSize(app.matrixB.sizeX, app.matrixB.sizeY + 1);
                if (app.matrixB.sizeY === 10) {
                    $('.button-add-line').attr('disabled', true);
                }
            }
            app.update();
        },
        render: function() {
            return React.createElement(
                'button',
                {
                    className: 'button-add-line',
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
        removeLine: function() {
            if ($('#matrix-input-a').prop('checked')) {
                if (app.matrixA.sizeY === 2) {
                    return;
                }
                    $('.button-add-line').attr('disabled', false);
                app.matrixA.changeSize(app.matrixA.sizeX, app.matrixA.sizeY - 1);
                app.matrixC.changeSize(app.matrixC.sizeX, app.matrixC.sizeY - 1);

                if (app.matrixA.sizeY === 2) {
                    $('.button-remove-line').attr('disabled', true);
                }
            } else {
                if (app.matrixB.sizeY === 2) {
                    return;
                }
               $('.button-add-line').attr('disabled', false);
               app.matrixB.changeSize(app.matrixB.sizeX, app.matrixB.sizeY - 1);
               if (app.matrixB.sizeY === 2) {
                   $('.button-remove-line').attr('disabled', true);
               }
            }
            app.update();
        },
        render: function() {
            return React.createElement(
                'button',
                {
                    className: 'button-remove-line',
                    disabled: true,
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
        addColumn: function() {
            if ($('#matrix-input-a').prop('checked')) {
                if (app.matrixA.sizeX === 10) {
                    return;
                }
                $('.button-remove-column').attr('disabled', false);
                app.matrixA.changeSize(app.matrixA.sizeX + 1, app.matrixA.sizeY);
                 if (app.matrixA.sizeX === 10) {
                    $('.button-add-column').attr('disabled', true);
                }
            } else {
                if (app.matrixB.sizeX === 10) {
                    return;
                }
                $('.button-remove-column').attr('disabled', false);
                app.matrixB.changeSize(app.matrixB.sizeX + 1, app.matrixB.sizeY);
                app.matrixC.changeSize(app.matrixC.sizeX + 1, app.matrixC.sizeY);
                if (app.matrixB.sizeX === 10) {
                    $('.button-add-column').attr('disabled', true);
                }
            }
            app.update();
        },
        render: function() {
            return React.createElement(
                'button',
                {
                    className: 'button-add-line',
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
        removeColumn: function() {
            if ($('#matrix-input-a').prop('checked')) {
                if (app.matrixA.sizeX === 2) {
                    return;
                }
                $('.button-add-column').attr('disabled', false);
                app.matrixA.changeSize(app.matrixA.sizeX - 1, app.matrixA.sizeY);
                if (app.matrixA.sizeX === 2) {
                    $('.button-remove-column').attr('disabled', true);
                }
            } else {
                if (app.matrixB.sizeX === 2) {
                    return;
                }
                $('.button-add-column').attr('disabled', false);
                app.matrixB.changeSize(app.matrixB.sizeX - 1, app.matrixB.sizeY);
                app.matrixC.changeSize(app.matrixC.sizeX - 1, app.matrixC.sizeY);
                if (app.matrixB.sizeX === 2) {
                    $('.button-remove-column').attr('disabled', true);
                }
            }
            app.update();
        },
        render: function() {
            return React.createElement(
                'button',
                {
                    className: 'button-remove-column',
                    disabled: true,
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
        render: function() {
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
                React.createElement('br', { }),
                React.createElement(buttonAddColumn, { }),
                React.createElement(buttonRemoveColumn, { }),
                React.createElement('div', { className: 'separator-50' }),
                React.createElement(
                    'div',
                    { className: 'control-error hidden' },
                    'Такие матрицы нельзя перемножить, так как количество столбцов матрицы А, не равно количевству строк матрицы В.'
                )
            );
        }
    });

    function changeButtonState(matrix) { 
        switch (matrix.sizeX) {
            case 10: 
                $('.button-add-column').attr('disabled', true);
                $('.button-remove-column').attr('disabled', false);
                break;
            case 2:
                $('.button-add-column').attr('disabled', false);
                $('.button-remove-column').attr('disabled', true);
                break;
            default:
                $('.button-add-column').attr('disabled', false);
                $('.button-remove-column').attr('disabled', false);
        }
        switch (matrix.sizeY) {
            case 10:
                $('.button-add-line').attr('disabled', true);
                $('.button-remove-line').attr('disabled', false);
                break;
            case 2:
                $('.button-add-line').attr('disabled', false);
                $('.button-remove-line').attr('disabled', true);
                break;
            default:
                $('.button-add-line').attr('disabled', false);
                $('.button-remove-line').attr('disabled', false);
            }
    };
}());
