'use strict';

var matrixSize = {
    a: {x: 2, y: 2},
    b: {x: 2, y: 2},
    c: {x: 2, y: 2}
};

function addColumn() {
    var matrixName = getNameMatrix();
    if (matrixSize[matrixName].x === 10) {
        return;
    }
    addColumnToMatrix(matrixName);
    if (matrixSize['b'].x !== matrixSize['c'].x) {
        addColumnToMatrix('c');
    }
}
function addLine() {
    var matrixName = getNameMatrix();
    if (matrixSize[matrixName].y === 10) {
        return;
    }
    addLineToMatrix(matrixName);
    if (matrixSize['a'].y !== matrixSize['c'].y) {
        addLineToMatrix('c');
    }
}
function removeColumn() {
    var matrixName = getNameMatrix();
    if (matrixSize[matrixName].x === 2) {
        return;
    }
    removeColumnMatrix(matrixName);
    if (matrixSize['b'].x !== matrixSize['c'].x) {
        removeColumnMatrix('c');
    }
}
function removeLine() {
    var matrixName = getNameMatrix();
    if (matrixSize[matrixName].y === 2) {
        return;
    }
    removeLineMatrix(matrixName);
    if (matrixSize['a'].y !== matrixSize['c'].y) {
        removeLineMatrix('c');
    }
}

function addColumnToMatrix(matrixName) {
    var matrix = document.getElementById('matrix-' + matrixName);
    matrixSize[matrixName].x ++;

    var border = document.getElementById('border-matrix-' + matrixName);

    var column = document.createElement('div');
    column.className = 'column';
    column.id = 'column-' + matrixName + matrixSize[matrixName].x;

    for (var i = 1; i <= matrixSize[matrixName].y; i++) {
        var cell = document.createElement('input');

        cell.className = 'cell-matrix';
        cell.id = 'cell-' + matrixName + i + ',' + matrixSize[matrixName].x;
        cell.placeholder = matrixName + i + ',' + matrixSize[matrixName].x;
        cell.pattern = '\\d+([.,]\\d+)?';
        cell.onfocus = focusInCell;
        cell.onblur = blurCell;
        column.appendChild(cell);
    }

    matrix.insertBefore(column, border);
}

function addLineToMatrix(matrixName) {
    matrixSize[matrixName].y++;
    for (var i = 1; i <= matrixSize[matrixName].x; i++) {
        var column = document.getElementById('column-' + matrixName + i);
        var cell = document.createElement('input');

        cell.className = 'cell-matrix';
        cell.id = 'cell-' + matrixName + matrixSize[matrixName].y + ',' + i;
        cell.placeholder = matrixName + matrixSize[matrixName].y + ',' + i;
        cell.pattern = '\\d+([.,]\\d+)?';
        cell.onfocus = focusInCell;
        cell.onblur = blurCell;
        column.appendChild(cell);
    };
}

function removeColumnMatrix(matrixName) {
    var matrix = document.getElementById('matrix-' + matrixName);
    var column = document.getElementById('column-' + matrixName + matrixSize[matrixName].x);

    matrix.removeChild(column);
    matrixSize[matrixName].x --;
}

function removeLineMatrix(matrixName) {
    for (var i = 1; i <= matrixSize[matrixName].x; i++) {
        var column = document.getElementById('column-' + matrixName + i);
        var cell = document.getElementById('cell-' + matrixName + matrixSize[matrixName].y + ',' + i);
        column.removeChild(cell);
    };
    matrixSize[matrixName].y--;
}
function clearAllMatrix() {
    clearMatrix('a');
    clearMatrix('b');
    clearMatrix('c');
}
function clearMatrix(name) {
    for (var i = 1; i <= matrixSize[name].x; i++) {
        for (var k = 1; k <= matrixSize[name].y; k++) {
            var cell = document.getElementById('cell-' + name + k + ',' + i);
            cell.value = '';
        }
    }
}

function multiplicationMatrix() {
    var controlPane = document.getElementById('control-pane');
    var error = document.getElementById('error-multiply');

    if (matrixSize['a'].x !== matrixSize['b'].y) {
        controlPane.classList.remove('control-background-input');
        controlPane.classList.add('control-background-error');
        error.classList.remove('hidden');
        return;
    }
    controlPane.classList.remove('control-background-error');
    error.classList.add('hidden');

    var valuesA = getValuesMatrix('a');
    var valuesB = getValuesMatrix('b');

    var valuesC = {};

    for (var cx = 1; cx <= matrixSize['c'].x; cx++) {
        for (var cy = 1; cy <= matrixSize['c'].y; cy ++) {
            valuesC[cx + ',' + cy] = 0;
            for (var ax = 1; ax <= matrixSize['a'].x; ax ++) {
                valuesC[cx + ',' + cy] += valuesA[ax + ',' + cy] * valuesB[cx + ',' + ax];
            }
        }
    }

    setValuesInMatrix('c', valuesC);
}

function changePositionMatrix() {
    var valuesA = getValuesMatrix('a');
    var valuesB = getValuesMatrix('b');
    var oldSizeAX = matrixSize['a'].x;
    var oldSizeAY = matrixSize['a'].y;
    var oldSizeBX = matrixSize['b'].x;
    var oldSizeBY = matrixSize['b'].y;
    clearAllMatrix();

    setMatrixSize('a', oldSizeBX, oldSizeBY);
    setMatrixSize('b', oldSizeAX, oldSizeAY);
    setMatrixSize('c', oldSizeAX, oldSizeBY);
    setValuesInMatrix('a', valuesB);
    setValuesInMatrix('b', valuesA);
}
function getValuesMatrix(name) {
    var values = {};
    for (var i = 1; i <= matrixSize[name].x; i++) {
        for (var k = 1; k <= matrixSize[name].y; k++) {
            var cell = document.getElementById('cell-' + name + k + ',' + i);
            values[i + ',' + k] = cell.value;
        }
    }
    return values;
}
function setValuesInMatrix(name, values) {
    for (var i = 1; i <= matrixSize[name].x; i++) {
        for (var k = 1; k <= matrixSize[name].y; k++) {
            var cell = document.getElementById('cell-' + name + k + ',' + i);
            cell.value = values[i + ',' + k];
        }
    }
}
function setMatrixSize(name, sizeX, sizeY) {
    while (matrixSize[name].x !== sizeX) {
        matrixSize[name].x < sizeX ? addColumnToMatrix(name) : removeColumnMatrix(name);
    }
    while (matrixSize[name].y !== sizeY) {
        matrixSize[name].y < sizeY ? addLineToMatrix(name) : removeLineMatrix(name);
    }
}

function getNameMatrix() {
    if (document.getElementById('matrix-input-a').checked) {
        return 'a';
    } else {
        return 'b';
    }
}

function init() {
    var matrixCells = document.getElementsByClassName('cell-matrix');
    for (var i = 0; i < matrixCells.length; i++) {
        matrixCells[i].onfocus = focusInCell;
        matrixCells[i].onblur = blurCell;
    }
}

function focusInCell() {
    var controlPane = document.getElementById('control-pane');
    controlPane.classList.remove('control-background-error');
    controlPane.classList.add('control-background-input');

    var error = document.getElementById('error-multiply');
    error.classList.add('hidden');
}
function blurCell() {
    var controlPane = document.getElementById('control-pane');
    controlPane.classList.remove('control-background-input');
}
