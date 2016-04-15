'use strict';
var Matrix = Object.create(null);

(function () {
    Matrix = function () {
        this.column = [[null]];
        this.sizeX = 1;
        this.sizeY = 1;
    };

    var proto = Matrix.prototype;
    proto.getValue = function (x, y) {
        return this.column[x][y];
    };

    proto.setValue = function (x, y, value) {
        if (x > this.sizeX - 1 || x < 0 || y > this.sizeY - 1 || y < 0) {
            return;
        }
        if (!Array.isArray(this.column[x])) {
            this.column[x] = [];
        }
        this.column[x][y] = value;
    };
    proto.setSize = function (x, y) {
        if (x < 1 || y < 1) {
            return;
        }
        if (x > this.sizeX) {
            var emptyRow = Array(this.sizeY).fill(null);
            var emptyColumns = Array(x - this.sizeX).fill(emptyRow);
            this.column = this.column.concat(emptyColumns);
        }
        if (y > this.sizeY) {
            var emptyCol = Array(y - this.sizeY).fill(null);
            this.column = this.column.map(function (col) {
                return col.concat(emptyCol);
            });
        }
        if (x < this.sizeX) {
            this.column.length = x;
        }
        if (y < this.sizeY) {
            this.column = this.column.map(function (col) {
                col.length = y;
                return col;
            });
        }
        this.sizeX = x;
        this.sizeY = y;
        return this;
    };

    proto.clear = function () {
        var self = this;
        this.column = this.column.map(function (rows) {
            return Array(self.sizeY).fill(null);
        });
    };

    proto.multiply = function (matrix) {
        if (this.sizeX !== matrix.sizeY) {
            return;
        }

        var resultMatrix = new Matrix().setSize(matrix.sizeX, this.sizeY);
        for (var cx = 0; cx < matrix.sizeX; cx++) {
            for (var cy = 0; cy < this.sizeY; cy++) {
                for (var ax = 0; ax < this.sizeX; ax++) {
                    resultMatrix.setValue(cx, cy, Number(resultMatrix.getValue(cx, cy)) +
                        this.getValue(ax, cy) * matrix.getValue(cx, ax));
                }
            }
        }
        return resultMatrix;
    };

    proto.clone = function () {
        var res = new Matrix().setSize(this.sizeX, this.sizeY);

        for (var x = 0; x < this.sizeX; x++) {
            res.column[x] = this.column[x].slice();
        }
        return res;
    };
}());


if (!Array.prototype.fill) {
    Array.prototype.fill = function (value) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        var O = Object(this);
        var len = O.length >>> 0;

        var start = arguments[1];
        var relativeStart = start >> 0;

        var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

        var end = arguments[2];
        var relativeEnd = end === undefined ?
        len : end >> 0;

        var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

        while (k < final) {
            O[k] = value;
            k++;
        }

        return O;
    };
}
