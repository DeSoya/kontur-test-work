$('.button-multiplication').on('click', function () {
    if (mA.sizeX !== mB.sizeY) {
        $('#control-pane').removeClass('control-background-input').addClass('control-background-error');
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
        for (var y = 0; y < matrix.sizeY; y++) {
            var value = $('.cell-' + name + y + '-' + x).val();
            matrix.setValue(x, y, value);
        }
    }
    return matrix;
}

function getValuesOutMatrix(matrix, name) {
    for (var x = 0; x < matrix.sizeX; x++) {
        for (var y = 0; y < matrix.sizeY; y++) {
            $('.cell-' + name + y + '-' + x).val(matrix.matrix[x][y]);
        }
    }
}

function updateMatrix() {
    window.ee.emit('App.changeMatrix', {
        matrixA: mA,
        matrixB: mB,
        matrixC: mC
    });
}
