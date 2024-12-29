import { randomUUID } from "crypto"
import { tweets } from '../database/tweets'
import { TweetType } from '../types/types'
import { User } from "./User"
import { Like } from "./Like"
import { likes } from "../database/likes"

abstract class message {
    constructor(public _content: string) {}

    abstract like(user: User): void
}

export class Tweet extends message {
    private readonly _id: string = randomUUID()
    private _replies: Tweet[] = []
    constructor(
        private _user: User,
        public _content: string,
        private _type: TweetType = TweetType.normal 
    ) {super(_content)} 

    get user(): User {
        return this._user
    }

    get id(): string {
        return this._id
    }

    get content(): string {
        return this._content
    }

    get type(): TweetType {
        return this._type
    }

    set type(type: TweetType) {
        this._type = type
    }

    set replies(replies: Tweet[]) {
        this._replies = replies

    }

    get replies(): Tweet[] {
        return this._replies;
    }


    reply(tweet: Tweet) {
        this._replies.push(tweet)  // funciona com o array de replies dentro de um tweet especifico
        // console.log(`${user.userName} respondeu: ${content}`)

        tweets.push(tweet)  // teste mudando o reply para dentro do array de tweets.ts
    }


    like(user: User) {
        const verifyTweet = tweets.some(tweet => this.id === tweet.id)
        // const verifyReply = tweets.some(tweet => tweet._replies.includes(this, 0))
        const newLike = new Like(user, this)
        const validateLike = likes.some(like => like.user.id === user.id && like.tweet.id === this.id)
        
        if (this._type === 'Normal') {
            if (verifyTweet) {
                if (validateLike) {
                    console.log(`${user.userName} já curtiu este tweet`)
                } else {
                    likes.push(newLike)
                }   
            } else {
                console.log('tweet não encontrado!')
            }
        } else {
            if (validateLike) {
                console.log(`${user.userName} já curtiu este tweet`)
            } else {
                likes.push(newLike)
            } 
        }   
    }


    show() {
        const TweetLikes = likes.filter(like => like.tweet.id === this.id)
        
        console.log('          ')
        console.log(`@${this.user.userName}: ${this.content}`)
    
        if (TweetLikes.length > 1) {
            console.log(`[@${TweetLikes[0].user.userName} and other ${TweetLikes.length - 1} user liked this]`)
        } else if (TweetLikes.length === 1) {
            console.log(`[@${TweetLikes[0].user.userName} liked this]`)
        }
    
        this.showReplies()

        console.log('-----------------------------------')
    }



    showReplies() {
        const TweetLikes = likes.filter(like => like.tweet.id === this.id)

        if (this.replies.length > 0) {
            this.replies.forEach(reply => {

            const tweetLike02 = likes.filter(like => like.tweet.id === reply._id)
            console.log(`    >@${reply.user.userName}: ${reply.content}`)

            if (tweetLike02.length > 1) {
                console.log(`    [@${tweetLike02[0].user.userName} and other ${tweetLike02.length - 1} user liked this]`)
            } else if (TweetLikes.length === 1) {
                console.log(`    [@${tweetLike02[0].user.userName} liked this]`)
            }

              if (reply.replies.length > 0) {
                reply.replies.forEach(reply2 => {
                    const tweetLike03 = likes.filter(like => like.tweet.id === reply._id)
                    console.log(`      >@${reply2.user.userName}: ${reply2.content}`)

                    if (tweetLike03.length > 1) {
                        console.log(`      [@${tweetLike03[0].user.userName} and other ${tweetLike03.length - 1} user liked this]`)
                    } else if (tweetLike03.length === 1) {
                        console.log(`      [@${tweetLike03[0].user.userName} liked this]`)
                    }
                })
              }
            })
        }
    }

    toJson() {
        return {
            id: this._id,
            user: this._user,
            content: this._content,
            type: this._type
        }
    }
}