
const botconfig = require("./botconfig");
const Discord = require("discord.js");
const got = require(`got`);
const api= 'dc6zaTOxFJmzC';

const bot = new Discord.Client({disableEveryone: true});
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`בתכנות :P`, {type: `listening`})
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch (console.error);
});



bot.on("message", async message => {
    const logsCommands = bot.channels.get(botconfig.logsChannelID);
  if(message.channel.type == "dm") {
    console.log(`${message.author.tag} שלח לי הודעה פרטית!`);
    return logsCommands.send(`${message.author.tag} שלח לי הודעה פרטית!`);
}

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


//dice command
if(cmd === `${prefix}dice` || cmd === `${prefix}קוביה`){
  let dice = ["🎲 1", "🎲 2", "🎲 3", "🎲 4", "🎲 5", "🎲 6"];
  let result = Math.floor((Math.random() * dice.length));
  message.channel.send(`${message.author} מספר הקוביה שלך הוא:` + dice[result]);
}

//join
if(cmd === `${prefix}join` || cmd === `${prefix}הצטרף`){
  let embed = new Discord.RichEmbed()
  .setColor("#4286f4")
  .addField("invite link", "https://discord.gg/zS3kDge")
  .setDescription("The server of the beta of the bot");
  message.channel.send(embed)
}


//bibi
if(cmd === `${prefix}message`){
  let msgid = args.join(" ").slice(17);
  if(!msgid) return message.channel.send("cannot find any message id!");
  message.channel.fetchMessage(msgid).send;

}


  //kill command
  if(cmd === `${prefix}kill` || cmd === `${prefix}להרוג`){
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(`${message.author} את מי תרצה להרוג :smiling_imp: ?`);
    if(message.mentions.users.first().id === message.author.id) return message.channel.send("אתה לא יכול להרוג את עצמך :joy:" + `${message.author}`);
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#f44e42")
    .addField("רוצח :gun: : ", `${message.author}`)
    .addField("קורבן :sheep: :", user);
    channel.msg.send(embed)
  }
 
 //someone
 if(cmd === `${prefix}someone` || cmd === `${prefix}מישהו`){
  let someone = message.guild.members.random();
  message.channel.send(`<@${message.author.id}> החבר החדש שלך: <@${someone.user.id}>`);
}


   //say command
   if (cmd === `${prefix}תגיד` || cmd === `${prefix}say`){
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    if(!sayMessage) return message.channel.send(`${message.author} אתה צריך להגיד משהו!`)
    message.channel.send(sayMessage);
            console.log(`${message.author.tag} השתמש בפקודת חזור אחרי`);
    return logsCommands.send(`${message.author.tag} השתמש בפקודה חזור אחרי`);
  }
 

//help
  if(cmd === `${prefix}עזרה`){
    let icon = bot.user.displayAvatarURL;
    let embed =  new Discord.RichEmbed()
    .setDescription("עזרה")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("prefix", `>`)
    .addField("Commands")
    .setFooter("יוצרי הבוט: avishaiDV & NiceGames")
    .setColor('RANDOM')
    .setThumbnail(icon)
    .addField("הזמן אותי", "תכתוב בצאט >הזמן");
    message.channel.send(embed)
}

//conatct

if(cmd === `${prefix}contact`){
  let embed = new Discord.RichEmbed()
   .addField("avishaiDV:", "avishaidv@gmail.com")
   .addField("NiceGames", "oridev1@gmail.com")
  .setFooter("יוצרי הבוט: avishaiDV & NiceGames")
  .setColor("Green");
  message.channel.send(embed)

}

//invite
if(cmd === `${prefix}הזמן`){
  let icon = bot.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()
    .setDescription("הזמן אותי")
    .addField("מיקמק", `https://discordapp.com/api/oauth2/authorize?client_id=466348486800048149&permissions=8&scope=bot`)
    .setThumbnail(icon)
    .setFooter("יוצרי הבוט: avishaiDV & NiceGames");
  message.channel.send(embed)

  console.log(`${message.author.tag} ביקש להזמין אותי!`);
  return logsCommands.send(`${message.author.tag} ביקש להזמין אותי!`);
}


  //gif
  if(cmd === `${prefix}גיף`){
    if(args.length < 1) return message.channel.send("בבקשה תכתוב איזה גיף אתה מחפש")
    const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(args.join(" "))}`, {json: true})
    if(!res || !res.body || !res.body.data) return message.channel.send("לא הצלחתי למצוא גיף שמתאים לחיפוש שלך!")

    let embed = new Discord.RichEmbed()
    .setImage(res.body.data.image_url)
    .setAuthor(message.author.tag)
    .setFooter("יוצרי הבוט: avishaidv & NiceGames");

    message.channel.send(embed)
  }


//profile image command
if(cmd === `${prefix}פרופיל`){
  let user = message.mentions.users.first() || message.author;
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.username}`)
  .setImage(user.displayAvatarURL)
  .setColor('RANDOM')
  .setFooter(`יוצר הבוט: avishaiDV#0069`);
  message.channel.send(embed)
}

//test
    if(cmd === `${prefix}test`){
      let embed = new Discord.RichEmbed()
      .setThumbnail()
      message.channel.send(embed)

    }



//ping
if(cmd === `${prefix}פינג` || cmd === `${prefix}ping` ){
 let embed = new Discord.RichEmbed()
 .addField("pong", "hi");
 message.channel.send(embed)
}

//kick command
  if(cmd === `${prefix}העף`){
     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) return message.channel.send("לא הצלחתי למצוא משתמש!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.reply("אין לך גישות!")
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.reply("אתה לא יכול להעיף אותו!");
    return;
  }

//report command
    if(cmd === `${prefix}דווח`){
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send(`${message.author}לא ניתן למצוא משתמשים.`);
      let reason = args.join(" ").slice(22);

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("דיווח")
      .setColor("#e82c1b")
      .setThumbnail(message.author.displayAvatarURL)
      .addField("משתמש מדווח", `${rUser} ID המשתמש המדווח: ${rUser.id}`)
      .addField("מדווח", `${message.author} ID המדווח ${message.author.id}`)
      .addField("חדר", message.channel)
      .addField("זמן הדיווח", message.createdAt)
      .addField("סיבה", reason);


      if(!reason) return message.channel.send("בבקשה ציין את סיבת הדיווח");
      let reportschannel = message.guild.channels.find(`name`, "reports");
      if(!reportschannel) return message.channel.send("בבקשה צור חדר reports");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);
      console.log(`${message.author.tag} דיווח על משתמש!`);
      return logsCommands.send(`${message.author.tag} דיווח על משתמש!`);
      return;

      message.channel.send(reportEmbed);
      return;
    }

//voldba

    if(cmd=== `${prefix}וולדבע`){
      let embed = new Discord.RichEmbed()

    .setDescription("איסטראג וולדבעי במיוחד!")
    .addField("וולדבע נודר!", message.createdAt)
    .setColor('RANDOM')
    .setFooter("יוצר הבוט: avishaiDV#0069");


    message.channel.send(embed);
    console.log(`${message.author.tag} השתמש בוולדבע!`);
    return logsCommands.send(`${message.author.tag} השתמש בוולדבע!!`);

    }


//server info
    if(cmd === `${prefix}שרת`){
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("מידע השרת")
      .setColor("#75aaff")
      .setThumbnail(sicon)
      .addField("שם השרת", message.guild.name)
      .addField("תאריך הקמת השרת", message.guild.createdAt)
      .addField("תאריך כניסתך לשרת", message.member.joinedAt)
      .addField("מספר אנשים ב", message.guild.memberCount)
      .addField("ID", message.guild.id)
      .setFooter("יוצר הבוט: avishaiDV#0069");


      return message.channel.send(serverembed);
    }
//simple test command
    if(cmd === `${prefix}שלום`){
      return message.channel.send("Hi there!");
          }
//bot info
if(cmd === (`${prefix}מיאני`)) {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("מידע על הבוט")
  .setColor("#2e34dd")
  .setThumbnail(bicon)
  .addField("שם הבוט", bot.user.username)
  .addField("תאריך יצור", bot.user.createdAt)
  .addField("ID", bot.user.id);
  return message.channel.send(botembed);
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
message.channel.send(embed);
}

//randon number
if(cmd === `${prefix}number`){
  let result = Math.floor(Math.random() * 100) + 1;
  let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#a15eff")
.addField("המספר :game_die: ", [result]);
message.channel.send(embed);
}

  });
bot.login(process.env.BOT_TOKEN);
