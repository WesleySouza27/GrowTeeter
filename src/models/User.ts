import { randomUUID } from "crypto"
import { tweets } from '../database/tweets'
import { users } from '../database/users'
import { Tweet } from "./Tweet"



export class User {
    private readonly _id: string
    private _following: User[] = []

    constructor(
        private _nome: string,
        private _email: string,
        private _userName: string,
        private _senha: string
    ) {this._id = randomUUID(), this._following = []}

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }

    get email() {
        return this._email
    }

    get userName() {
        return this._userName
    }

    get senha() {
        return this._senha
    }

    get following(): User[] { 
        return this._following
    }

    validateUser() {
        const validateUserName = users.find(username => username.userName === this.userName )
        if (validateUserName) {
            console.log('Erro! user name já esta em uso, escolha um diferente!')
            return
        } else {
            users.push(this)
            // console.log(`Usuário ${this.userName} adicionado com sucesso!`)
        }

       
    }


    sendTweet(tweet: Tweet) {
        if (this.id !== tweet.user.id) {
            console.log('Você não pode enviar um tweet de outro usuário!')
          } else {
            tweets.push(tweet)
          }
    }

    follow(user: User) {
        const filter = users.some(u => this.userName === user.userName)
        const verifyUser = this.id === user.id

        if (verifyUser) {
            console.log('Usuário não pode seguir a sí mesmo!')
        
        } else if (filter) {
            console.log(`este usuário não existe!`)
        } else {
            this._following.push(user)
            // console.log(`${this.userName} está seguindo ${user.userName}`)
        }

        
    }

    showFeed() {
        const feed = tweets.filter((tweet) => this.id === tweet.user.id || this._following.some((following) => following.id === tweet.user.id));
        if (feed.length > 0) {
          feed.forEach((tweet) => {
            tweet.show()
          });
        }
      }


    showTweets() {
        const tweetsUser = tweets.filter(tweet => tweet.user.id === this.id)
        console.log(`Tweets de ${this.userName}:`)
        tweetsUser.forEach(tweet => {
            tweet.show()
              
        })
    }


    toJson() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            userName: this._userName,
            senha: this._senha
        }
    }

}