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

async function notFound(req, h) {
    return h.view('404', {}, { layout: 'errorLayout' }).code(404)
}

async function fileNotFound(req, h) {
    const response = req.response

    if (response.isBoom && response.output.statusCode === 404) {
        return h.view('404', {}, { layout: 'errorLayout' }).code(404)
    }
    
    return h.continue
}

module.exports = {
    home,
    register,
    login,
    logout,
    notFound,
    fileNotFound,
};