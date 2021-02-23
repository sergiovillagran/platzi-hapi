'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json');
const User = require('./users');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://platzioverflow-53356-default-rtdb.firebaseio.com/'
})

const db = firebase.database();

module.exports = {
    users: new User(db),
}