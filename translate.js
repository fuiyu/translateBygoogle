const cheerio = require('cheerio')
const request = require('request-promise-native');
const gettk = require('./gettk.js');
const getkk = require('./getkk.js');






exports.translator =  (text, url = 'https://translate.google.cn/translate_a/single?client=t&sl=zh-CN&tl=en&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=') =>{
    getkk().then(tkkexpress => {
        const tkk = tkkexpress;
        let res = gettk.tk(text, tkk);
        console.log(res)
        const testenc = encodeURI(text);

        url = url + res + '&q=' + testenc;
        const options = {
            uri: url
        };
        request(options).then(
            res => {
                console.log(res)

            }).catch(err => {
            console.log(err)
        });
        // console.log(res)

    }).catch(err => {
        console.log(err)
    })
}