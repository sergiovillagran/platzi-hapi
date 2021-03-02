'use strict'

const { questions: question, questions } = require('../models/index');

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


async function home(req, h) {
    let questions; 
    try {
        questions = await question.getLast(10)
    } catch (error) {
        console.error(error);
    }
    console.log(questions)
    return h.view('index',
        {
            title: 'Home',
            user: req.state.user,
            questions: questions
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

function ask(req, h) {
    if(!req.state.user) {
        return h.redirect('/login');
    }

    return h.view('ask', {
        title: 'Crear Pregunta',
        user: req.state.user
    })
}

async function viewQuestion(req, h) {
    let data
    try {
        data = await questions.getOne(req.params.id);
        if (!data) {
            return notFound(req, h);
        }
    } catch(error) {
        console.error(error);
    }

    return h.view(
        'question', 
        {
            title: 'Detalles de la pregunta',
            user: req.state.user,
            question: data,
            key: req.params.id 
        }
    );
}

module.exports = {
    home,
    register,
    login,
    logout,
    notFound,
    fileNotFound,
    ask,
    viewQuestion,
};