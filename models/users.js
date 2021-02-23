'use strict'

const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword;
}

class User {
    constructor(db) {
        this.db = db;
        this.ref = db.ref('/');
        this.collection = this.ref.child('users');
    }

    async create(data) {
        const password = await encryptPassword(data.password);
        const newUser = this.collection.push();
        newUser.set({ ...data, password });

        return newUser.key;
    }

    async validateUser({ email, password }) {
        const userQuery = await this.collection
            .orderByChild('email')
            .equalTo(email)
            .once('value')
        const userFound = userQuery.val();

        if (userFound === undefined) {
            throw new Error(`Error validating user`)
        }

        const userId = Object.keys(userFound)[0]
        const isPasswordRight = await bcrypt.compare(password, userFound[userId].password);
        
        if (!isPasswordRight) {
            return false;
        }

        return userFound[userId];
    }
}

module.exports = User;
