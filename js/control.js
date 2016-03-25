
(function () {
    updateFocusCell();
    updateInput();

    $('.button-multiplication').on('click', function () {
        if (view.mA.sizeX !== view.mB.sizeY) {
            $('#control-pane').removeClass('control-background-input')
                .addClass('control-background-error');
            $('.control-error').removeClass('hidden');
            return;
        }
        $('#control-pane').removeClass('control-background-error');
        $('.control-error').addClass('hidden');

        view.mC = view.mA.multiplication(view.mB);
        view.update();
        updateInput();
    });

    $('.button-change-position').on('click', function () {
        var tempMatrix = view.mA.copy();

        view.mA = view.mB.copy();
        view.mB = tempMatrix;
        view.mC.changeSize(view.mB.sizeX, view.mA.sizeY);

        view.update();
        updateInput();
        updateFocusCell();
    });

    $('.button-clear-matrix').on('click', function () {
        view.mA.clearMatrix();
        view.mB.clearMatrix();
        view.mC.clearMatrix();
        view.update();
    });

    $('.button-add-line').on('click', function () {
        if ($('#matrix-input-a').prop('checked')) {
            if (view.mA.sizeY === 10) {
                return;
            }
            $('.button-remove-line').attr('disabled', false);
            view.mA.changeSize(view.mA.sizeX, view.mA.sizeY + 1);
            view.mC.changeSize(view.mC.sizeX, view.mC.sizeY + 1);
            if (view.mA.sizeY === 10) {
                $('.button-add-line').attr('disabled', true);
            }
        } else {
            $('.button-remove-line').attr('disabled', false);
            if (view.mB.sizeY === 10) {
                return;
            }
            view.mB.changeSize(view.mB.sizeX, view.mB.sizeY + 1);
            if (view.mB.sizeY === 10) {
                $('.button-add-line').attr('disabled', true);
            }
        }
        view.update();
        updateInput();
        updateFocusCell();
    });

    $('.button-remove-line').on('click', function () {
        if ($('#matrix-input-a').prop('checked')) {
            if (view.mA.sizeY === 2) {
                return;
            }
            $('.button-add-line').attr('disabled', false);
            view.mA.changeSize(view.mA.sizeX, view.mA.sizeY - 1);
            view.mC.changeSize(view.mC.sizeX, view.mC.sizeY - 1);

            if (view.mA.sizeY === 2) {
                $('.button-remove-line').attr('disabled', true);
            }
        } else {
            if (view.mB.sizeY === 2) {
                return;
            }
            $('.button-add-line').attr('disabled', false);
            view.mB.changeSize(view.mB.sizeX, view.mB.sizeY - 1);
            if (view.mB.sizeY === 2) {
                $('.button-remove-line').attr('disabled', true);
            }
        }
        view.update();
        updateInput();
        updateFocusCell();
    });

    $('.button-add-column').on('click', function () {
        if ($('#matrix-input-a').prop('checked')) {
            if (view.mA.sizeX === 10) {
                return;
            }
            $('.button-remove-column').attr('disabled', false);
            view.mA.changeSize(view.mA.sizeX + 1, view.mA.sizeY);
             if (view.mA.sizeX === 10) {
                $('.button-add-column').attr('disabled', true);
            }
        } else {
            if (view.mB.sizeX === 10) {
                return;
            }
            $('.button-remove-column').attr('disabled', false);
            view.mB.changeSize(view.mB.sizeX + 1, view.mB.sizeY);
            view.mC.changeSize(view.mC.sizeX + 1, view.mC.sizeY);
            if (view.mB.sizeX === 10) {
                $('.button-add-column').attr('disabled', true);
            }
        }
        view.update();
        updateInput();
        updateFocusCell();
    });

    $('.button-remove-column').on('click', function () {
        if ($('#matrix-input-a').prop('checked')) {
            if (view.mA.sizeX === 2) {
                return;
            }
            $('.button-add-column').attr('disabled', false);
            view.mA.changeSize(view.mA.sizeX - 1, view.mA.sizeY);
            if (view.mA.sizeX === 2) {
                $('.button-remove-column').attr('disabled', true);
            }
        } else {
            if (view.mB.sizeX === 2) {
                return;
            }
            $('.button-add-column').attr('disabled', false);
            view.mB.changeSize(view.mB.sizeX - 1, view.mB.sizeY);
            view.mC.changeSize(view.mC.sizeX - 1, view.mC.sizeY);
            if (view.mB.sizeX === 2) {
                $('.button-remove-column').attr('disabled', true);
            }
        }
        view.update();
        updateInput();
        updateFocusCell();
    });
    
    $('#matrix-input-a').on('click', function () {
        changeButtonState(view.mA);
    });
    $('#matrix-input-b').on('click', function () {
        changeButtonState(view.mB);
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
    function updateInput() {
        $('.cell-matrix').on('change', function () {
            var classList = this.className.split(/\s+/);
            var re = /cell-(\w+)(\d+)-(\d+)/;

            for (var i = 0; i < classList.length; i++) {
                if ((matrixName = re.exec(classList[i])) !== null) {
                    var name = matrixName[1];
                    var x = Number(matrixName[3]);
                    var y = Number(matrixName[2]);

                    if (name === view.nameA) {
                        view.mA.setValue(x, y, this.value);
                    }
                    if (name === view.nameB) {
                        view.mB.setValue(x, y, this.value);
                    }
                    if (name === view.nameC) {
                        view.mC.setValue(x, y, this.value);
                    }
                }
            }
        });
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
}());
