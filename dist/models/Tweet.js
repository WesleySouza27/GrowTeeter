"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const crypto_1 = require("crypto");
const tweets_1 = require("../database/tweets");
const types_1 = require("../types/types");
const Like_1 = require("./Like");
const likes_1 = require("../database/likes");
class message {
    constructor(_content) {
        this._content = _content;
    }
}
class Tweet extends message {
    constructor(_user, _content, _type = types_1.TweetType.normal) {
        super(_content);
        this._user = _user;
        this._content = _content;
        this._type = _type;
        this._id = (0, crypto_1.randomUUID)();
        this._replies = [];
    }
    get user() {
        return this._user;
    }
    get id() {
        return this._id;
    }
    get content() {
        return this._content;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    set replies(replies) {
        this._replies = replies;
    }
    get replies() {
        return this._replies;
    }
    reply(tweet) {
        this._replies.push(tweet); // funciona com o array de replies dentro de um tweet especifico
        // console.log(`${user.userName} respondeu: ${content}`)
        // tweets.push(tweet)
    }
    like(user) {
        const verifyTweet = tweets_1.tweets.some(tweet => this.id === tweet.id);
        // const verifyReply = tweets.some(tweet => tweet._replies.includes(this, 0))
        const newLike = new Like_1.Like(user, this);
        const validateLike = likes_1.likes.some(like => like.user.id === user.id && like.tweet.id === this.id);
        if (this._type === 'Normal') {
            if (verifyTweet) {
                if (validateLike) {
                    console.log(`${user.userName} já curtiu este tweet`);
                }
                else {
                    likes_1.likes.push(newLike);
                }
            }
            else {
                console.log('tweet não encontrado!');
            }
        }
        else {
            if (validateLike) {
                console.log(`${user.userName} já curtiu este tweet`);
            }
            else {
                likes_1.likes.push(newLike);
            }
        }
    }
    show() {
        const TweetLikes = likes_1.likes.filter(like => like.tweet.id === this.id);
        console.log('          ');
        console.log(`@${this.user.userName}: ${this.content}`);
        if (TweetLikes.length > 1) {
            console.log(`[@${TweetLikes[0].user.userName} and other ${TweetLikes.length - 1} user liked this]`);
        }
        else if (TweetLikes.length === 1) {
            console.log(`[@${TweetLikes[0].user.userName} liked this]`);
        }
        this.showReplies();
        console.log('-----------------------------------');
    }
    showReplies() {
        const TweetLikes = likes_1.likes.filter(like => like.tweet.id === this.id);
        if (this.replies.length > 0) {
            this.replies.forEach(reply => {
                const tweetLike02 = likes_1.likes.filter(like => like.tweet.id === reply._id);
                console.log(`  >@${reply.user.userName}: ${reply.content}`);
                if (tweetLike02.length > 1) {
                    console.log(`  [@${tweetLike02[0].user.userName} and other ${tweetLike02.length - 1} user liked this]`);
                }
                else if (TweetLikes.length === 1) {
                    console.log(`  [@${tweetLike02[0].user.userName} liked this]`);
                }
                if (reply.replies.length > 0) {
                    reply.replies.forEach(reply2 => {
                        const tweetLike03 = likes_1.likes.filter(like => like.tweet.id === reply._id);
                        console.log(`    >@${reply2.user.userName}: ${reply2.content}`);
                        if (tweetLike03.length > 1) {
                            console.log(`    [@${tweetLike03[0].user.userName} and other ${tweetLike03.length - 1} user liked this]`);
                        }
                        else if (tweetLike03.length === 1) {
                            console.log(`    [@${tweetLike03[0].user.userName} liked this]`);
                        }
                    });
                }
            });
        }
    }
    toJson() {
        return {
            id: this._id,
            user: this._user,
            content: this._content,
            type: this._type
        };
    }
}
exports.Tweet = Tweet;
