if (typeof it == 'undefined') {
    it = function (title, fn) {
        console.log(title);
        fn();
    }
}