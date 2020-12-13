(function () {
    let toggle = document.querySelector('.example__toggle'),
        photo = document.querySelector('.example__before'),
        was = document.querySelector('.example__state--was'),
        now = document.querySelector('.example__state--now'),
        Limit = {
            desktop: {
                left: 19,
                right: 388
            },
            mobile: {
                left: 26,
                right: 66
            }
        },
        photoToggleGap = 140,
        startCoords,
        currentOffset;

    let changePhoto = () =>
        photo.style.width = currentOffset + photoToggleGap + "px";

    was.addEventListener('click', () => {
        if (screen.width <= 768) {
            toggle.style.left = Limit.mobile.left + 'px';
            photo.style.width = '100%';
        }
        else {
            toggle.style.left = Limit.desktop.left + 'px';
            currentOffset = Limit.desktop.left;
            changePhoto();
        }
    })
    now.addEventListener('click', () => {
        if (screen.width <= 768) {
            toggle.style.left = Limit.mobile.right + 'px';
            photo.style.width = '0%';
        }
        else {
            toggle.style.left = Limit.desktop.right + 'px';
            currentOffset = Limit.desktop.right;
            changePhoto();
        }
    })

    if (screen.width > 768) {
        toggle.addEventListener('mousedown', e => {
            e.preventDefault();

            startCoords = {
                x: e.clientX,
                y: e.clientY
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp)
        })

        function onMouseMove(ev) {

            ev.preventDefault();

            let moving = {
                x: startCoords.x - ev.clientX
            }

            startCoords = {
                x: ev.clientX
            }
            if (toggle.offsetLeft - moving.x <= Limit.desktop.left) {
                toggle.style.left = Limit.desktop.left + 'px';
                currentOffset = Limit.desktop.left;
            }
            else if (toggle.offsetLeft - moving.x >= Limit.desktop.right) {
                toggle.style.left = Limit.desktop.right + 'px';
                currentOffset = Limit.desktop.right;
            }
            else {
                toggle.style.left = toggle.offsetLeft - moving.x + "px";
                currentOffset = toggle.offsetLeft - moving.x;
            }

            changePhoto();
        }
        let onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
})();