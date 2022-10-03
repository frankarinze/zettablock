const { v4: uuid } = require("uuid")
const cheerio = require('cheerio');
const request = require('request');

exports.Mutation = {
    async records(parent, { message }, context) {
        const { content } = message

        // regex pattern
        const mentionPattern = /\B@[a-z0-9_-]+/gi;
        const emoticonPattern = /(?:\()[^\(\)]*?(?:\))/g;
        const urlPattern = /(https?:\/\/[^\s]+)/g;

        // check match
        const checkMentionMatch = content.match(mentionPattern);
        const checkEmoticonMatch = content.match(emoticonPattern);
        const checkUrlMatch = content.match(urlPattern);

        // Remove character and parenthesis
        const mentions = checkMentionMatch && checkMentionMatch.map(s => s.slice(1)) || [];
        const emoticon =checkEmoticonMatch && checkEmoticonMatch.map(s => s.replace(/\(|\)/g, "")).filter(count => count.length <= 15) || [];
        let links = {} 
        links.url = checkUrlMatch && checkUrlMatch.toString() || "";

        let urlTitle = "";
        let newMessage = {};
        // Web scraping using cheerio
        request(links.url,
            function (err, res, body) {
                let pageTitle;
                let pageUrl;
                if (!err && res.statusCode == 200) {

                    let $ = cheerio.load(body);
                    pageTitle = $("meta[property='og:title']").attr("content");
                    pageUrl = $("meta[property='og:url']").attr("content");
                    let title = $('head');
                    urlTitle = title.text();
                }
                const result = {
                    title: pageTitle,
                    url: pageUrl
                }
                console.log(result)
                return result
            });

        newMessage = {
            id: uuid(),
            content,
            mentions: mentions ,
            emoticons: emoticon ,
            links: [
                {
                    title: urlTitle,
                    url: links.url
                }
            ] 
        }
        console.log('all content::::::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>')

        return newMessage
    }

}