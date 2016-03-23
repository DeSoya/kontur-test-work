var Matrix = (function () {
    function createMatrix() {
        return {
            matrix: [['']],
            sizeX: 1,
            sizeY: 1,
            setValue: setValue,
            getValues: getValues,
            changeSize: changeSize,
            clearMatrix: clearMatrix
        };
    }

    function changeSize(x, y) {
        if (x < 1 || y < 1) {
            return;
        }
        if (x > this.sizeX) {
            while (x !== this.sizeX) {
                this.sizeX ++;
                for (var i = 0; i < this.sizeY; i++) {
                    this.setValue(this.sizeX - 1, i, '');
                }
            }
        }
        if (y > this.sizeY) {
            while (y !== this.sizeY) {
                this.sizeY ++;
                for (var i = 0; i < this.sizeX; i++) {
                    this.setValue(i, this.sizeY - 1, '');
                }
            }
        }
        if (x < this.sizeX) {
            while (x !== this.sizeX) {
                this.sizeX--;
                this.matrix.pop();
            }
        }
        if (y < this.sizeY) {
            while (y !== this.sizeY) {
                this.sizeY--;
                for (var i = 0; i < this.sizeX; i++) {
                    delete this.matrix[i].pop();
                }
            }
        }
    }
    function setValue(x, y, value) {
        if (x > this.sizeX - 1 || x < 0 || y > this.sizeY - 1 || y < 0) {
            return;
        }
        if (!Array.isArray(this.matrix[x])) {
            this.matrix[x] = [];
        }
        this.matrix[x][y] = value;
    }
    function getValues() {
        var matrix;
        for (var x = 0; x < this.sizeX; x++) {
            for (var y = 0; y < this.sizeY; y++) {
                matrix[x] = {[y]: this.matrix[x][y]};
            }
        }
        return matrix;
    }
    function clearMatrix() {
        for (var x = 0; x < this.sizeX; x++) {
            for (var y = 0; y < this.sizeY; y++) {
                this.setValue(x, y, '');
            }
        }
    }

    function multiplication(matrixA, matrixB) {
        if (matrixA.sizeX !== matrixB.sizeY) {
            return false;
        }

        var resultMatrix = createMatrix();
        resultMatrix.changeSize(matrixB.sizeX, matrixA.sizeY);

        for (var cx = 0; cx < matrixB.sizeX; cx++) {
            for (var cy = 0; cy < matrixA.sizeY; cy ++) {
                for (var ax = 0; ax < matrixA.sizeX; ax ++) {
                    resultMatrix.setValue(cx, cy, Number(resultMatrix.matrix[cx][cy]) +
                        matrixA.matrix[ax][cy] * matrixB.matrix[cx][ax]);
                }
            }
        }
        return resultMatrix;
    }

    return {
        createMatrix: createMatrix,
        multiplication: multiplication
    };
}());
