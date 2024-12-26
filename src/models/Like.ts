import { User } from "./User"
import { Tweet } from "./Tweet"

export class Like {
  constructor(private readonly _user: User, private readonly _tweet: Tweet) {}

  public get user(): User {
    return this._user;
  }

  public get tweet(): Tweet {
    return this._tweet;
  }

  public toJson() {
    return {
      user: this._user.toJson(),
      tweet: this._tweet.toJson(),
    };
  }
}