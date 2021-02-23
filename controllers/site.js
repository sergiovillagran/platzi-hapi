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

function login(req, h) {
    return h.view('login', 
        {
            title: 'Login'
        }
    )
}

module.exports = {
    home,
    register,
    login,
};