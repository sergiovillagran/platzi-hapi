'use strict'

const bcrypt = require('bcrypt');

class Question {
    constructor(db) {
        this.db = db;
        this.ref = db.ref('/');
        this.collection = this.ref.child('questions');
    }

    async create(data, user) {
        const question = this.collection.push();
        question.set({ ...data, owner: user });

        return question.key;
    }

    async getLast(amount) {
        const query = await this.collection.limitToLast(amount).once('value');
        const questions = query.val()
        return questions
    }

    async getOne(id) {
        const query = await this.collection.child(id).once('value');
        const data = query.val();
        console.log(data)
        return data;
    }

    async answer(data, user) {
        const answers = await this.collection.child(data.id).child('answers').push()
        answers.set({ text: data.answer, user})
        return answers;
    }

    async setAnswerRight(id, answerId, user) {
        const query = await this.collection.child(id).once('value');
        const question = query.val();
        const answers = question.answers

        if (!user.email === question.owner.email) {
            return false
        }

        for (let key in answers) {
            answers[key].correct = (key === answerId)
        }

        const update = await this.collection.child(id).child('answers').update(answers);

        return update;
    }
}

module.exports = Question;
