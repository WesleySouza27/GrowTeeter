import { randomUUID } from "crypto"
import { tweets } from '../database/tweets'
import { TweetType } from '../types/types'
import { User } from "./User"
import { Like } from "./Like"
import { likes, likesReply } from "../database/likes"



export class Tweet {
    private readonly _id: string
    private _replies: Tweet[] = []
    constructor(
        private _user: User,
        private _content: string,
        private _type: TweetType = TweetType.normal 
    ) {this._id = randomUUID(), this._replies = []} 

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
        this._replies.push(tweet)
        // console.log(`${user.userName} respondeu: ${content}`)
    }


    like(user: User) {
        const verifyTweet = tweets.some(tweet => this.id === tweet.id)
        const newLike = new Like(user, this)
        const validateLike = likes.some(like => like.user.id === user.id && like.tweet.id === this.id)
        
        if (verifyTweet) {
            if (validateLike) {
                console.log(`${user.userName} já curtiu este tweet`);
              } else {
                likes.push(newLike)
            }   
        } else {
            console.log('tweet não encontrado!')
        }    
    }

    liketweetReply(user: User) {
        const newLike = new Like(user, this)
        const validateLike = likes.some(like => like.user.id === user.id && like.tweet.id === this.id)
        
        if (validateLike) {
            console.log(`${user.userName} já curtiu este tweet`)
            return
          } else {
            likes.push(newLike)
            console.log(`${user.userName}: liked ${this._content}`)
        } 
    }


    show() {
        const TweetLikes = likes.filter(like => like.tweet.id === this.id)
        const firstLike = TweetLikes.length > 0 ? TweetLikes[0].user.nome : null
        
        console.log('          ')
        console.log(`@${this.user.userName}: ${this.content}`)
    
        if (TweetLikes.length > 1) {
            console.log(`[@${firstLike} and other ${TweetLikes.length - 1} user liked this]`)
        } else if (TweetLikes.length === 1) {
            console.log(`[@${firstLike} liked this]`)
        }
    
        this.showReplies()

        console.log('-----------------------------------')
    }



    showReplies() {
        
        if (this.replies.length > 0) {
            this.replies.forEach(reply => {
              console.log(`    >@${reply.user.userName}: ${reply.content}`)
              if (reply.replies.length > 0) {
                reply.replies.forEach(reply2 => {
                    console.log(`      >@${reply2.user.userName}: ${reply2.content}`)
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