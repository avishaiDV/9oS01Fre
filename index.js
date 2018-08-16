const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
 client.on('ready', () => {
  client.user.setGame(`${client.guilds.size} servers | >עזרה`);
});

// Updates the bot's status if he joins a server
client.on("guildCreate", guild => {
   client.user.setGame(`${client.guilds.size} servers | >עזרה`);
});

/// Updates the bot's status if he leaves a servers
client.on("guildDelete", guild => {
    client.user.setGame(`${client.guilds.size} servers | >עזרה`);
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

  //profile image command
if(cmd === `${prefix}פרופיל`){
  let user = message.mentions.users.first() || message.author;
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.username}`)
  .setImage(user.displayAvatarURL)
  .setColor('RANDOM')
  .setFooter(`יוצר הבוט: avishaiDV#0069`);
  message.channel.send(embed)
  .catch(console.error)
}

//test
    if(cmd === `${prefix}test`){
      let embed = new Discord.RichEmbed()
      .setThumbnail()
      message.channel.send(embed)

    }



//ping
if(cmd === `${prefix}פינג`){
 let embed = new Discord.RichEmbed()
 .addField(message.author.ping);
 message.channel.send(embed)
}

//kick command
  if(cmd === `${prefix}העף`){
     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) return message.channel.send("לא הצלחתי למצוא משתמש!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("אין לך גישות!")
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("אתה לא יכול להעיף אותו!");
  let kickEmbed = new Discord.MessageEmbed()
  .setDescription("~הרחקה~")
  .setColor("#42f4e8")
  .addField("משתמש מורחק", `${kUser} ID ${kUser.id}`)
  .addField("מרחיק", `<@${message.author.id}> ID ${message.author.id}`)
  .addField("חדר מרחיק", message.channel)
  .addField("זמן הרחקה", message.createdAt)
  .addField("סיבה", kReason);

  console.log(`${message.author.tag} שלח לי הודעה פרטית!`);
  return logsCommands.send(`${message.author.tag} שלח לי הודעה פרטית!`);

  let kickChannel = message.guild.channels.find(`name`, "kicks-and-bans")
  if(!kickChannel) return message.channel.send("לא הצלחתי למצוא חדר kicks-and-bans!")

    message.guild.member(kUser).kick(kReason);
    KickChannel.send(kickEmbed);
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

//spotify command
      if(cmd === `${prefix}ספוטיפיי`){
          let user = message.mentions.users.first() || message.author;

          if (user.presence.activity !== null && user.presence.activity.type === 'LISTENING' && user.presence.activity.name === 'Spotify'
      && user.presence.activity.assets !== null) {
          let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`;
          let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`;
          let trackName = user.presence.activity.details;
          let trackAuthor = user.presence.activity.state;
          let trackAlbum = user.presence.activity.assets.largeText;

          const embed = new Discord.RichEmbed()
          .setAuthor('מידע על השיר בספוטיפיי', 'https://cdn.discordapp.com/emojis/408668371039682560')
          .setColor("#1abc48")
          .setThumbnail(trackIMG)
          .addField('שם השיר', trackName, true)
          .addField('אלבום', trackAlbum, true)
          .addField('יוצר', trackAuthor, false)
          .addField('קישור להאזנה בספוטיפיי:', `${trackURL}`, false)
          .setFooter("יוצר הבוט: avishaiDV#0069")
          message.channel.send(embed)
      } else {
          message.channel.send('המשתמש לא שומע מוזיקה כרגע או שספוטיפיי לא דלוק בפליינג!');
      }
      }
});
}
});
bot.login(process.env.BOT_TOKEN);
