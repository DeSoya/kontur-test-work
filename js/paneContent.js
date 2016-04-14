var ContentPane;

(function () {
    window.ee = new EventEmitter();

    var InputCell = React.createClass({
        onChangeInput: function(event) {
            this.props.matrix.setValue(this.props.x, this.props.y, event.target.value);
            this.setState({});
        },

        render: function() {
            var matrix = this.props.matrix;
            var name = this.props.matrixName;
            var x = this.props.x;
            var y = this.props.y;
            return React.createElement('input', {
                className: 
                    'cell-matrix cell-' + name + x + '-' + y +
                    ' matrix-cell-name-' + name,
                key: name + (x + 1) + ',' + (y + 1),
                placeholder: name + (x + 1) + ',' + (y + 1),
                pattern: '\\d+([.,]\\d+)?',
                disabled: name === 'c',
                onChange: this.onChangeInput,
                value: matrix.getValue(x, y),
            });
        }
    });

    var MatrixView = React.createClass({
        onFocusInput: function() {
            $('#control-pane').removeClass('control-background-error')
                .addClass('control-background-input');
            $('.control-error').addClass('hidden');
        },
        onBlurInput: function() {
             $('#control-pane').removeClass('control-background-input');
        },

        render: function () {
            var matrix = this.props.matrix;
            var name = this.props.name;
            var curentObject = this;

            return React.createElement(
                'div',
                {
                    className: 'matrix__values',
                    onFocus: this.onFocusInput,
                    onBlur: this.onBlurInput
                },
                    Array(matrix.sizeX).fill('').map(function (col, i) {
                    return React.createElement(
                        'div',
                        { className: 'column', key: 'column' + name + i},
                        Array(matrix.sizeY).fill('').map(function (row, k) {
                            return React.createElement(InputCell, {
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

    ContentPane = React.createClass({
        componentDidMount: function () {
            var self = this;
            window.ee.addListener('App.changeMatrix', function (item) {
                self.setState({});
            });
        },
        componentWillUnmount: function () {
            window.ee.removeListener('App.changeMatrix');
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
                        React.createElement(MatrixView, { matrix: app.matrixC, name: 'c' }),
                        React.createElement('div', { className: 'border-right', id: 'border-matrix-c' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'matrix' },
                        React.createElement('div', { className: 'border-left' }),
                        React.createElement(MatrixView, { matrix: app.matrixA, name: 'a' }),
                        React.createElement('div', { className: 'border-right', id: 'border-matrix-c' })
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
                        React.createElement(MatrixView, { matrix: app.matrixB, name: 'b' }),
                        React.createElement('div', {
                            className: 'border-right', id: 'border-matrix-c' }),
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
