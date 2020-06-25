/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */
const htmlToText=require('html-to-text')
const TOKEN = process.env.TELEGRAM_TOKEN || config.taoken;
const url = config.botHost;
const port = 27028;
import http from './db/http';
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
import config from './db/config';
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
app.get(`/webhook`, (req, res) => {
    console.log(req.body)
    res.send(req.body)
});
bot.onText(/\/hentai/, function onLoveText(msg) {
    bot.sendMessage(msg.chat.id, 'Are you a hetai?');
});
let defualtHtml=`<a>教程：</a>\n <a>/tv 电影、电视剧名字 获取电影电视剧</a>\n <a>/av av名称，av番号 获取av</a>\n`
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, defualtHtml, { parse_mode: 'HTML'});
});
bot.onText(/\/tv (.+)/, (msg, match) => {
    console.log(match)
    const chatId = msg.chat.id;
    const resp = match[1];
    http.get(`/article/suggest?keyword=${encodeURIComponent(resp)}`).then(relust =>{
        let html=''
        let arr=relust.docs
        relust.docs=relust.docs.slice(0,8)
        relust.docs.forEach(v =>{
            html+=`<a href="${config.host}/article/wd/${v._id}">${htmlToText.fromString(v.title)}</a>\n \n`
        })
        html+=`<a href='${config.host}/article/suggest?keyword=${encodeURIComponent(resp)}'>共${arr.length}结果，查看全部结果》》</a>`
        if(relust.docs.length){
            bot.sendPhoto(chatId,relust.docs[0].img, { caption:html,parse_mode: 'HTML'}).catch((err) => {
                console.log(err)
            })
        }
    })
});
bot.onText(/\/av (.+)/, (msg, match) => {
    console.log(match)
    const chatId = msg.chat.id;
    const resp = match[1];
    http.get(`/videos/search/1?keyword=${encodeURIComponent(resp)}&ajax=1`).then(relust =>{
        let html=''
        let arr=relust.docs
        relust.docs=relust.docs.slice(0,8)
        relust.docs.forEach(v =>{
            html+=`<a href="${config.host}/cat/porn-detail/${v._id}">${htmlToText.fromString(v.title)}</a>\n \n`
        })
        html+=`<a href='${config.host}/Videos/search/1?keyword=${encodeURIComponent(resp)}'>共${arr.length}结果，查看全部结果》》</a>`
        if(relust.docs.length){
            bot.sendPhoto(chatId,relust.docs[0].img, { caption:html,parse_mode: 'HTML'}).catch((err) => {
                console.log(err)
            })
        }
    })
});
//https://github.com/yagop/node-telegram-bot-api
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.new_chat_member)
    if(msg.new_chat_member){
        bot.sendMessage(chatId, defualtHtml, { parse_mode: 'HTML'});
        return
    }
  //  bot.sendMessage(chatId, 'Received your message');
});
bot.on('forwardMessage', (msg) => {
    console.log(msg)
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

// Just to ping!
// bot.on('message', msg => {
//   bot.sendMessage(msg.chat.id, 'I am alive!');
// });
