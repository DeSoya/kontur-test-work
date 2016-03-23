
window.ee = new EventEmitter();

var mA = Matrix.createMatrix();
var nameA = 'a';
mA.changeSize(2, 2);
var mB = Matrix.createMatrix();
var nameB = 'b';
mB.changeSize(2, 2);

var mC = Matrix.createMatrix();
var nameC = 'c';
mC.changeSize(2, 2);

var MatrixView = React.createClass({
    render: function () {
        var matrix = this.props.matrix;
        var name = this.props.name;

        return (
            <div className='matrix__values'>{
                matrix.matrix.map(function (col, i) {
                    return (
                    <div className='column' key={'column' + name + i}>
                        {col.map(function (row, k) {
                            return (
                                <input className={'cell-matrix cell-' + name + k + '-' + i}
                                    key={name + (k + 1) + ',' + (i + 1)}
                                    placeholder={name + (k + 1) + ',' + (i + 1)}
                                    pattern='\d+([.,]\d+)?'
                                    defaultValue={row} />
                            );
                        })}
                        </div>
                    );
                })}
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            matrixA: mA,
            matrixB: mB,
            matrixC: mC
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
        return (
            <div className = 'main-form'>
            <div className='matrix'>
                <div className='border-left'></div>
                <MatrixView matrix = {matrixC} name = {nameC} />
                <div className='border-right' id='border-matrix-c'></div>
            </div>
            <div className='matrix'>
                <div className='border-left'></div>
                <MatrixView matrix = {matrixA} name = {nameA} />
                <div className='border-right' id='border-matrix-c'></div>
            </div>
            <p className='name-matrix'>A</p>
            <div className='separator-10'></div>
            <div className='matrix matrix-c' id='matrix-c'>
                <div className='border-left'></div>
                <MatrixView matrix = {matrixB} name = {nameB} />
                <div className='border-right' id='border-matrix-c'></div>
                <div className='separator'></div>
                <p className='name-matrix'>B</p>
            </div>
            </div>
        );
    }
});

ReactDOM.render(
    <App
        matrixA = {mA} nameA = {nameA}
        matrixB = {mA} nameB = {nameB}
        matrixC = {mA} nameC = {nameC} />,
    document.getElementById('main-form')
);
updateFocusCell();

$('.button-multiplication').on('click', function () {
    if (mA.sizeX !== mB.sizeY) {
        $('#control-pane').removeClass('control-background-input')
            .addClass('control-background-error');
        $('.control-error').removeClass('hidden');
        return;
    }
    $('#control-pane').removeClass('control-background-error');
    $('.control-error').addClass('hidden');

    setValuesInMatrix(mA, nameA);
    setValuesInMatrix(mB, nameB);
    mC = Matrix.multiplication(mA, mB);
    getValuesOutMatrix(mC, nameC);
});

$('.button-change-position').on('click', function () {
    setValuesInMatrix(mA, nameA);
    setValuesInMatrix(mB, nameB);
    var tempMatrix = mA;
    mA = mB;
    mB = tempMatrix;
    mC.changeSize(mB.sizeX, mA.sizeY);
    getValuesOutMatrix(mA, nameA);
    getValuesOutMatrix(mB, nameB);

    updateMatrix();
    updateFocusCell();
});

$('.button-clear-matrix').on('click', function () {
    mA.clearMatrix();
    mB.clearMatrix();
    mC.clearMatrix();
    getValuesOutMatrix(mA, nameA);
    getValuesOutMatrix(mB, nameB);
    getValuesOutMatrix(mC, nameC);
});

$('.button-add-line').on('click', function () {
    if ($('#matrix-input-a').prop('checked')) {
        if (mA.sizeY === 10) {
            return;
        }
        mA.changeSize(mA.sizeX, mA.sizeY + 1);
        mC.changeSize(mC.sizeX, mC.sizeY + 1);
    } else {
        if (mB.sizeY === 10) {
            return;
        }
        mB.changeSize(mB.sizeX, mB.sizeY + 1);
    }
    updateMatrix();
    updateFocusCell();
});

$('.button-remove-line').on('click', function () {
    if ($('#matrix-input-a').prop('checked')) {
        if (mA.sizeY === 2) {
            return;
        }
        mA.changeSize(mA.sizeX, mA.sizeY - 1);
        mC.changeSize(mC.sizeX, mC.sizeY - 1);
    } else {
        if (mB.sizeY === 2) {
            return;
        }
        mB.changeSize(mB.sizeX, mB.sizeY - 1);
    }
    updateMatrix();
    updateFocusCell();
});

$('.button-add-column').on('click', function () {
    if ($('#matrix-input-a').prop('checked')) {
        if (mA.sizeX === 10) {
            return;
        }
        mA.changeSize(mA.sizeX + 1, mA.sizeY);
    } else {
        if (mB.sizeX === 10) {
            return;
        }
        mB.changeSize(mB.sizeX + 1, mB.sizeY);
        mC.changeSize(mC.sizeX + 1, mC.sizeY);
    }
    updateMatrix();
    updateFocusCell();
});

$('.button-remove-column').on('click', function () {
    if ($('#matrix-input-a').prop('checked')) {
        if (mA.sizeX === 2) {
            return;
        }
        mA.changeSize(mA.sizeX - 1, mA.sizeY);
    } else {
        if (mB.sizeX === 2) {
            return;
        }
        mB.changeSize(mB.sizeX - 1, mB.sizeY);
        mC.changeSize(mC.sizeX - 1, mC.sizeY);
    }
    updateMatrix();
    updateFocusCell();
});

function setValuesInMatrix(matrix, name) {
    for (var x = 0; x < matrix.sizeX; x++) {
        for (var y = 0; y < matrix.sizeY; y ++) {
            var value = $('.cell-' + name + y + '-' + x).val();
            matrix.setValue(x, y, value);
        }
    }
    return matrix;
}

function getValuesOutMatrix(matrix, name) {
    for (var x = 0; x < matrix.sizeX; x++) {
        for (var y = 0; y < matrix.sizeY; y ++) {
            $('.cell-' + name + y + '-' + x).val(matrix.matrix[x][y]);
        }
    }
}

function updateFocusCell() {
    $('.cell-matrix').on('blur', function () {
        $('#control-pane').removeClass('control-background-input');
    });

    $('.cell-matrix').on('focus', function () {
        $('#control-pane').removeClass('control-background-error')
            .addClass('control-background-input');
        $('.control-error').addClass('hidden');
    });
}

function updateMatrix() {
    window.ee.emit('App.changeMatrix', {
        matrixA: mA,
        matrixB: mB,
        matrixC: mC
    });
}
