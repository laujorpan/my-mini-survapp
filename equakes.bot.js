const Telegraf = require('telegraf')
const tokens =  require('./config')
const {getEarthquakes} = require("./module.js")
const telegram_token = tokens["telegram"]
 
function sendEarthquakes(data, ctx){
   
       const eq=  data.map( item =>`${item.properties.place}`).join('\n');
       ctx.reply(eq);
}


const bot = new Telegraf(telegram_token)
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('earthquakes', ctx => {
    getEarthquakes("all", "hour")
        .then(data => sendEarthquakes(data, ctx))
        .catch(ctx.reply);
});
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
