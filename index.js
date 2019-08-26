const botconfig = require("./botconfig.json");
const Discord = require("discord.js");


const bot = new Discord.Client({disableEveryone: true});
 bot.on('ready', () => {
   console.log(`${bot.user.username} is online!`);
  bot.user.setGame(`${bot.guilds.size} servers | >עזרה`);
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
   bot.user.setGame(`${bot.guilds.size} servers | >עזרה`);
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
    bot.user.setGame(`${bot.guilds.size} servers | >עזרה`);
});




bot.on("message", async message => {
    const logsCommands = bot.channels.get(botconfig.logsChannelID);

  if(message.channel.type == "dm") {
    console.log(`${message.author.tag} שלח לי הודעה פרטית!`);
    return logsCommands.send(`${message.author.tag} שלח לי הודעה פרטית!`);
}

  let prefix = process.env.BOT_PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
//---------------------------------------------------------------------------------------------
 
 
 //help
  if(cmd === `${prefix}עזרה` || cmd === `${prefix}help`){
    let icon = bot.user.displayAvatarURL;
    let embed =  new Discord.RichEmbed()
    .setDescription("עזרה")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("prefix", `>`)
    .addField("Commands", `https://github.com/9oS01frMn4k/9oS01Fre/blob/master/README.md`)
    .setFooter("יוצרי הבוט: avishaiDV & NiceGames")
    .setColor('RANDOM')
    .setThumbnail(icon)
    .addField("הזמן אותי", "תכתוב בצאט >הזמן");
    message.channel.send(embed)
    console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש עזרה מהבוט!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש עזרה מהבוט!`);
}
 
 
 //invite
if(cmd === `${prefix}הזמן` || cmd === `${prefix}invite`){
  let icon = bot.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()
    .setDescription("הזמן אותי")
    .addField("קישור הזמנה", `https://discordapp.com/api/oauth2/authorize?client_id=466348486800048149&permissions=8&scope=bot`)
    .setThumbnail(icon)
      .setColor('RANDOM')
    .setFooter("יוצרי הבוט: avishaiDV & NiceGames");
  message.channel.send(embed)

  console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש להזמין אותי!`);
  return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש להזמין אותי!`);
}
 
 
  //profile image command
if(cmd === `${prefix}פרופיל` || cmd === `${prefix}profile`){
  let user = message.mentions.users.first() || message.author;
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.username}`)
  .setImage(user.displayAvatarURL)
  .setColor('RANDOM')
  .setFooter(`יוצרי הבוט: avishaiDV & NiceGames`);
  message.channel.send(embed)

          console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודה פרופיל!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודה פרופיל!`);
}





//kick command - NEED FIX

 //say command
  if (cmd === `${prefix}תגיד` || cmd === `${prefix}say`){
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    if(!sayMessage) return message.channel.send(`${message.author} אתה צריך להגיד משהו!`)
    message.channel.send(sayMessage);
            console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודת חזור אחרי`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודה חזור אחרי`);
  }
 

//voldba

    if(cmd=== `${prefix}וולדבע` || cmd === `${prefix}voldba`){
      let embed = new Discord.RichEmbed()
    .setDescription("איסטראג וולדבעי במיוחד!")
    .addField("וולדבע נודר!", message.createdAt)
    .setColor('RANDOM')
   .setFooter("נוצר על ידי: avishaidv & NiceGames");
    message.channel.send(embed);
    console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בוולדבע!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בוולדבע!!`);

    }


//server info
    if(cmd === `${prefix}שרת` || cmd === `${prefix}server`){
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("מידע השרת")
      .setColor("#75aaff")
      .setThumbnail(sicon)
      .addField("שם השרת", message.guild.name)
      .addField("תאריך הקמת השרת", message.guild.createdAt)
      .addField("תאריך כניסתך לשרת", message.member.joinedAt)
      .addField("מספר אנשים בשרת", message.guild.memberCount)
      .addField("ID", message.guild.id)
      .setFooter("נוצר על ידי: avishaidv & NiceGames");
      return message.channel.send(serverembed);
         console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודה מידע על השרת!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודה מידע על השרת!`);
    }
//simple test command
    if(cmd === `${prefix}שלום` ){
      message.delete().catch(O_o=>{});
      return message.channel.send("שלום לך!");
         console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודה שלום!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | שלח לי הודעה פרטית!`);
          }
//bot info
if(cmd === `${prefix}מיאני` || cmd === `${prefix}botinfo`){
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("מידע על הבוט")
  .setColor("#2e34dd")
  .setThumbnail(bicon)
  .addField("שם הבוט", bot.user.username)
  .addField("תאריך יצור", bot.user.createdAt)
  .addField("ID", bot.user.id)
  .setFooter("נוצר על ידי: avishaidv & NiceGames");
  return message.channel.send(botembed);
          console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודת מי אני!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | השתמש בפקודת מי אני!`); 
}

 
 //8Ball
if(cmd === `${prefix}8ball` || cmd === `${prefix}בדולח`){
if(!args[1]) return message.reply("זאת לא שאלה! :angry:");
let Replies = ["כן", "לא", "בטח!", "ברוררררר", "לא חושב", "אני עסוק, שאל אותי אחר כך", "לא אחי", "בארור אחיי", "אממ", "אולי", "התשובה היא 3", "נע", "שטוכ", "שאלה מעניינת :)"];

let result = Math.floor((Math.random() * Replies.length));
let question = args.slice(0).join(" ");
let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#a15eff")
.addField("שאלה :thinking: ", question)
.addField("תשובה :fire: ", Replies[result]);
message.channel.send(embed)
     console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | שאל את הבדולח שאלה!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | שאל את הבדולח שאלה!`);
}

//randon number
if(cmd === `${prefix}number` || cmd === `${prefix}מספר`){
  let result = Math.floor(Math.random() * 100) + 1;
  let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#a15eff")
.addField("המספר :game_die: ", [result]);
message.channel.send(embed)
      console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | יצר מספר רנדומלי!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | יצר מספר רנדומלי!`);
}
 
  //challenge
if(cmd === `${prefix}אתגר` || cmd === `${prefix}challenge`){
let challenge = ["תתקשר לחבר בדיסקורד ותדבר על מיקמק חמש דקות :joy:  ", "לשלוח לחבר רנדומלי בפרטי יש לי קקי :poop: ", "תדבר רק באימוג'ים במשך 2 דקות :stuck_out_tongue: ", "לעשות אירייפ למישהו רנדומלי בדיסקורד :open_mouth: ", "תשיר שבת בבוקר לילד רנדומלי בדיסקורד :joy: ", "למתוח חבר שאתה לא רוצה לדבר איתו יותר ;)", " :joy: להגיד אמאשך בסוף כל הודעה במשך חמש דקות", 
                 "לעבוד על חבר שלך שאתה יודע משהו שהוא לא :thinking: ", "נגמרו לי הרעיונות לאתגרים, בקש אחר :joy: "];
let result = Math.floor((Math.random() * challenge.length));
let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#84ff8e")
.addField("your challenge is :scream: :", challenge[result]);
message.channel.send(embed)
     console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש אתגר!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש אתגר!`);
}
 
   //vegetables
if(cmd === `${prefix}ירק` || cmd === `${prefix}vegetable`){
let vegetable = [" 🥒 מלפפון", " 🍅 עגבניה", "ברוקולי 🥦", "סלרי 🌱 " , "פלפל 🌶", "עגבניות שרי🍅🍅 ", "חציל 🍆 ", "אבוקדו 🥑 ", "תירס 🌽 ", "תפוח אדמה 🥔 ", "גזר 🥕"];
let result = Math.floor((Math.random() * vegetable.length));
let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#f4e542")
.addField("your vegtable is :scream: :", vegetable[result]);
message.channel.send(embed)
     console.log(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש ירק!`);
    return logsCommands.send(`**the user:** ${message.author.tag} **with ID:** ${message.author.id} **in server:** ${message.guild} **server id:** ${message.guild.id} | ביקש ירק!`);
}
  
});
bot.login(process.env.BOT_TOKEN);
