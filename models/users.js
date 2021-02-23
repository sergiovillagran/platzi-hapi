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
}

module.exports = User;
