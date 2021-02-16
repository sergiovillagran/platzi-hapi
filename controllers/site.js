'use strict'

function register (req, h) {
    return h.view('register',
        {
            title: 'Register'
        },
    )
}


function home(req, h) {
    return h.view('index',
        {
            title: 'Home'
        },
    )
}

module.exports = {
    home,
    register
};