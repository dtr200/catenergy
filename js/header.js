(function () {
    let list = document.querySelector('.main-nav__list');
    document.querySelector('.main-nav__button').addEventListener('click', e => {
        e.target.className == 'main-nav__button' ?
            listToggle(e.target.childNodes[1]) :
            listToggle(e.target);
    })
    function listToggle(elem) {
        elem.classList.toggle('main-nav__burger--open');
        list.classList.toggle('main-nav__hide');
    }
})();