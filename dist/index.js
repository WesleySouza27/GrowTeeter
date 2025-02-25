"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tweet_1 = require("./models/Tweet");
const User_1 = require("./models/User");
const types_1 = require("./types/types");
// criando usuários
const user01 = new User_1.User('Theo', 'theo@gmail.com', 'Theo lucca', 'theo123');
const user10 = new User_1.User('Theo duplicado', 'theo@gmail.com', 'Theo lucca', 'theo123'); // usuário cujo userName ja existe (duplicado)
const user02 = new User_1.User('Wesley', 'Wesley@gmail.com', 'Wesley souza', 'wesley123');
const user03 = new User_1.User('Fulano', 'fulano@hotmail.com', 'Fulano silva', '123fulano');
const user04 = new User_1.User('Ciclano', 'ciclano@hotmail.com', 'Ciclano pereira', '123ciclano');
const user05 = new User_1.User('Beltrano', 'beltrano@hotmail.com', 'Beltrano barreto', '123beltrano');
const user06 = new User_1.User('tailine', 'tailine@hotmail.com', 'tailine ribeiro', '123maria');
// incluindo usuários no array users[] e verifica se username é único 
user01.validateUser();
user01.validateUser(); // erro por username
user02.validateUser();
user04.validateUser();
user05.validateUser();
user06.validateUser();
user10.validateUser(); // erro por username
user03.validateUser();
// criando tweets
const tweet01 = new Tweet_1.Tweet(user01, `Hello world!`);
const tweet02 = new Tweet_1.Tweet(user01, `gosto de comer churrasco`);
const tweet03 = new Tweet_1.Tweet(user01, `hoje está um lindo dia`);
const tweet04 = new Tweet_1.Tweet(user01, `partiu praia!`);
const tweet05 = new Tweet_1.Tweet(user02, `hey galera :D`);
const tweet06 = new Tweet_1.Tweet(user02, `me gusta la siestas!`);
const tweet07 = new Tweet_1.Tweet(user02, `bora billll`);
const tweet08 = new Tweet_1.Tweet(user03, `A vida é bella`);
const tweet09 = new Tweet_1.Tweet(user03, `brasil é muito bom`);
const tweet10 = new Tweet_1.Tweet(user04, `vamos aprender programação`);
const tweet11 = new Tweet_1.Tweet(user04, `eu sou bom no que faço!`);
const tweet12 = new Tweet_1.Tweet(user05, `procurando nemo...`);
const tweet13 = new Tweet_1.Tweet(user05, `boa noite`);
const tweet14 = new Tweet_1.Tweet(user06, `ola pessoas`);
const tweet15 = new Tweet_1.Tweet(user06, `comendo sushi`);
const tweet16 = new Tweet_1.Tweet(user06, `amo animais!`);
const tweet17 = new Tweet_1.Tweet(user02, `Feliz natal e feliz ano novo!!!`);
// criando tweet replies 
const reply01 = new Tweet_1.Tweet(user01, 'hey oi', types_1.TweetType.reply);
const reply02 = new Tweet_1.Tweet(user02, 'eu tambem amo!', types_1.TweetType.reply);
const reply03 = new Tweet_1.Tweet(user03, 'olá como estas?', types_1.TweetType.reply);
const reply04 = new Tweet_1.Tweet(user02, 'boraaa fí do billl', types_1.TweetType.reply);
const reply05 = new Tweet_1.Tweet(user04, 'gosto de typescript!', types_1.TweetType.reply);
const reply06 = new Tweet_1.Tweet(user05, 'parabéns, você é muito bom mesmo!', types_1.TweetType.reply);
const reply07 = new Tweet_1.Tweet(user06, 'eu sei falar baleiês...', types_1.TweetType.reply);
const reply08 = new Tweet_1.Tweet(user03, 'cheguei agora.', types_1.TweetType.reply);
const reply09 = new Tweet_1.Tweet(user06, 'gosto de dormir ZzZzZz', types_1.TweetType.reply);
const reply10 = new Tweet_1.Tweet(user04, 'buenos dias', types_1.TweetType.reply);
const reply11 = new Tweet_1.Tweet(user04, 'fogete tem ré uai', types_1.TweetType.reply);
const reply12 = new Tweet_1.Tweet(user01, 'para o alto e avante!', types_1.TweetType.reply);
const reply13 = new Tweet_1.Tweet(user05, 'amo sorvete!', types_1.TweetType.reply);
const reply14 = new Tweet_1.Tweet(user05, 'amo carros!', types_1.TweetType.reply);
// metodo 01 user sendTweet()   ***********
user01.sendTweet(tweet01);
user01.sendTweet(tweet02);
user01.sendTweet(tweet03);
user01.sendTweet(tweet04);
user02.sendTweet(tweet05);
user02.sendTweet(tweet06);
user02.sendTweet(tweet07);
user03.sendTweet(tweet08);
user03.sendTweet(tweet09);
user04.sendTweet(tweet10);
user04.sendTweet(tweet11);
user05.sendTweet(tweet12);
user05.sendTweet(tweet13);
user06.sendTweet(tweet14);
user06.sendTweet(tweet15);
user06.sendTweet(tweet16);
user02.sendTweet(tweet17);
user02.sendTweet(tweet01); // erro tweet de outro user
// metodo 02 user follow()   ***********
user01.follow(user02);
user01.follow(user03);
user02.follow(user01);
user02.follow(user03);
user01.follow(user04);
user01.follow(user05);
user01.follow(user06);
user02.follow(user04);
user03.follow(user02);
user05.follow(user02);
user02.follow(user05);
user03.follow(user06);
user06.follow(user01);
user02.follow(user06);
user01.follow(user10); // erro não pode seguir quem não pertence ao array de users
user01.follow(user01); // erro usuário não pode seguir a si mesmo
// --------------------------------------------
// metodo 01 tweet reply()   ***********
tweet01.reply(reply03);
reply01.reply(reply02);
tweet02.reply(reply02);
tweet07.reply(reply04);
tweet10.reply(reply05);
tweet11.reply(reply06);
tweet12.reply(reply07);
tweet13.reply(reply08);
reply02.reply(reply04);
reply01.reply(reply09);
reply04.reply(reply10);
tweet12.reply(reply11);
tweet15.reply(reply12);
reply08.reply(reply13);
reply13.reply(reply14);
//metodo 02 tweet like()   ***********
tweet01.like(user02);
tweet01.like(user01);
tweet01.like(user03);
tweet03.like(user03);
tweet04.like(user02);
tweet05.like(user06);
tweet09.like(user03);
tweet17.like(user01);
tweet13.like(user04);
tweet12.like(user05);
tweet15.like(user03);
tweet08.like(user03);
tweet04.like(user06);
tweet02.like(user04);
tweet02.like(user06);
tweet11.like(user05);
// like no reply  ******************
reply01.like(user06);
reply02.like(user03);
reply03.like(user02);
reply04.like(user03);
reply05.like(user06);
reply06.like(user05);
reply07.like(user01);
reply08.like(user02);
reply09.like(user03);
reply10.like(user02);
reply11.like(user05);
reply12.like(user06);
reply13.like(user01);
reply14.like(user02);
// metodo 03 tweet show()   ***********
// tweet01.show()
// tweet02.show()
// tweet04.show()
// tweet03.show()
// tweet05.show()
// tweet06.show()
// tweet07.show()
// tweet08.show()
// tweet09.show()
// tweet10.show()
// tweet11.show()
// tweet12.show()
// tweet13.show()
// tweet15.show()
// tweet16.show()
// tweet17.show()
// metodo 04 tweet showReplies()   ***********
// tweet01.showReplies()
// tweet02.showReplies()
// tweet03.showReplies()
// tweet04.showReplies()
// tweet05.showReplies()
// tweet06.showReplies()
// tweet07.showReplies()
// tweet08.showReplies()
// tweet09.showReplies()
// tweet10.showReplies()
// tweet11.showReplies()
// tweet12.showReplies()
// tweet13.showReplies()
// tweet14.showReplies()
// tweet15.showReplies()
// tweet16.showReplies()
// tweet17.showReplies()
// metodo 04 user showTweets()   ***********
// user01.showTweets()
user02.showTweets();
// user03.showTweets()
// user04.showTweets()
// user05.showTweets()
// user06.showTweets()
// metodo 03 user showfeed()   ***********
// user01.showFeed()
// user02.showFeed()
// user03.showFeed()
// user04.showFeed()
user05.showFeed();
// user06.showFeed()
