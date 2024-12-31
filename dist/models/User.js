"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
const tweets_1 = require("../database/tweets");
const users_1 = require("../database/users");
class User {
    constructor(_nome, _email, _userName, _senha) {
        this._nome = _nome;
        this._email = _email;
        this._userName = _userName;
        this._senha = _senha;
        this._following = [];
        this._id = (0, crypto_1.randomUUID)(), this._following = [];
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get userName() {
        return this._userName;
    }
    get senha() {
        return this._senha;
    }
    get following() {
        return this._following;
    }
    validateUser() {
        const validateUserName = users_1.users.find(username => username.userName === this.userName);
        if (validateUserName) {
            console.log('Erro! user name já esta em uso, escolha um diferente!');
            return;
        }
        else {
            users_1.users.push(this);
            // console.log(`Usuário ${this.userName} adicionado com sucesso!`)
        }
    }
    sendTweet(tweet) {
        if (this.id !== tweet.user.id) {
            console.log('Você não pode enviar um tweet de outro usuário!');
        }
        else {
            tweets_1.tweets.push(tweet);
        }
    }
    follow(user) {
        const filter = users_1.users.some(u => this.userName === user.userName);
        if (this.id === user.id) {
            console.log('Usuário não pode seguir a sí mesmo!');
            return;
        }
        else if (filter) {
            console.log(`este usuário não existe!`);
            return;
        }
        else {
            this._following.push(user);
            // console.log(`${this.userName} está seguindo ${user.userName}`)
        }
    }
    showFeed() {
        const feed = tweets_1.tweets.filter((tweet) => this.id === tweet.user.id || this._following.some((following) => following.id === tweet.user.id));
        if (feed.length > 0) {
            feed.forEach((tweet) => {
                tweet.show();
            });
        }
    }
    showTweets() {
        const tweetsUser = tweets_1.tweets.filter(tweet => tweet.user.id === this.id);
        console.log(`Tweets de ${this.userName}:`);
        tweetsUser.forEach(tweet => {
            tweet.show();
        });
    }
    toJson() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            userName: this._userName,
            senha: this._senha
        };
    }
}
exports.User = User;
