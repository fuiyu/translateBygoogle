const cheerio = require('cheerio')
const request = require('request-promise-native');

const domain = "https://translate.google.cn/"

const options = {
    uri: domain,
    transform: function (body) {
        return cheerio.load(body);
    }
};

function getPage(options) {
    return new Promise((resolve, reject) => {
        request(options).then(
            $ => {
                let html = '',
                TTK = '';
                $('script').each(function () {
                    var script = $(this).html()
                    if(script.indexOf(';TKK')>-1){
                        html = script.split(';TKK=')[1].split(')\');')[0]
                    }
                })
                if(!!html){
                    
                    resolve(html);
                }else{
                    reject(new Error('找不到TKK'));
                }
                
            }).catch(err => {
            reject(err)
        });
    })
}

async function getResult() {
    const html = await getPage(options);
    return html;
}
getResult()
module.exports = getResult;