"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
class Like {
    constructor(_user, _tweet) {
        this._user = _user;
        this._tweet = _tweet;
    }
    get user() {
        return this._user;
    }
    get tweet() {
        return this._tweet;
    }
    toJson() {
        return {
            user: this._user.toJson(),
            tweet: this._tweet.toJson(),
        };
    }
}
exports.Like = Like;
