function Matrix(x, y) {
	var column = [[null]];
	var sizeX = 1;
	var sizeY = 1;
	this.setValue = setValue;
	this.getValue = getValue;
	this.changeSize = changeSize;

	Object.defineProperty(this, 'sizeX', {
		get: function () {
			return sizeX;
		}
	});
	Object.defineProperty(this, 'sizeY', {
		get: function () {
			return sizeY;
		}
	});

	Object.defineProperty(this, 'column', {
		get: function () {
			return column;
		}
	});

	this.changeSize(x, y);



	function getValue(x, y) {
		return column[x][y];
	};

	function setValue(x, y, value) {
		if (x > sizeX - 1 || x < 0 || y > sizeY - 1 || y < 0) {
			return;
		}
		if (!Array.isArray(column[x])) {
			column[x] = [];
		}
		column[x][y] = value;
	};
	function changeSize(x, y) {
		if (x < 1 || y < 1) {
			return;
		}
		if (x > sizeX) {
			var emptyRow = Array(sizeY).fill(null);
			var emptyColumns = Array(x - sizeX).fill(emptyRow);

			column = column.concat(emptyColumns);
		}
		if (y > sizeY) {
			var emptyCol = Array(y - sizeY).fill(null);
			column = column.map(function (col) {
				return col.concat(emptyCol);
			});
		}
		if (x < sizeX) {
			column.length = x;
		}
		if (y < sizeY) {
			column = column.map(function (col) {
				col.length = y;
				return col;
			});
		}
		sizeX = x;
		sizeY = y;
	};

	this.clearMatrix = function () {
		column = column.map(function (rows) {
			return Array(sizeY).fill(null);
		});
	};

	this.multiplication = function (matrixB) {
		if (sizeX !== matrixB.sizeY) {
			return false;
		}

		var resultMatrix = new Matrix(matrixB.sizeX, sizeY);
		for (var cx = 0; cx < matrixB.sizeX; cx++) {
			for (var cy = 0; cy < sizeY; cy ++) {
				for (var ax = 0; ax < sizeX; ax ++) {
					resultMatrix.setValue(cx, cy, Number(resultMatrix.getValue(cx, cy)) +
						this.getValue(ax, cy) * matrixB.getValue(cx, ax));
				}
			}
		}
		return resultMatrix;
	};

	this.copy = function () {
		var res = new Matrix(this.sizeX, this.sizeY);
		for (var x = 0; x < this.sizeX; x++) {
			for (var y = 0; y < this.sizeY; y ++) {
				res.setValue(x, y, this.getValue(x, y));
			}
		}
		return res;
	};
}

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
