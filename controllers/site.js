'use strict'

function register (req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }

    return h.view('register',
        {
            title: 'Register',
            user: req.state.user,
        },
    )
}


function home(req, h) {
    return h.view('index',
        {
            title: 'Home',
            user: req.state.user
        },
    )
}

function login(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    
    return h.view('login', 
        {
            title: 'Login',
            user: req.state.user
        }
    )
}

function logout(req, h) {
    return h.redirect('login').unstate('user');
}

module.exports = {
    home,
    register,
    login,
    logout,
};