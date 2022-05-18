const Distube = require('distube').default;
const Client = require('../index').Client
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { Formatters, Util, MessageEmbed, Message } = require('discord.js')
const ee = require("../settings/embed.json");
const config = require("../settings/config")
const { format, topic } = require("../function.js")
const key = require("../settings/key.json")


module.exports = (Client) => {

  let spotifyoptions = {
    parallel: true,
    emitEventsAfterFetching: true,
  }
  if (key.spotify_api.enabled) {
    spotifyoptions.api = {
      clientId: key.spotify_api.clientId,
      clientSecret: key.spotify_api.clientSecret,
    }
  }
  
  Client.distube = new Distube(Client, {
    searchSongs: 1,
    emitNewSongOnly: false,
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    emptyCooldown: 60,
    youtubeCookie: "HSID=AOkd8nkq-pJBatCC_; SSID=AxeLHLsJZIUW0Joc4; SID=6gfMwj8AwNCqLVZZOAc-13ngIrIFqZJWMhjCVdFNrcLg730hwjQQMjB3DfshoQwdWgh_TQ.",
    youtubeDL: true,
    updateYouTubeDL: true,
    ytdlOptions: {
      highWaterMark: 1024 * 1024 * 64,
      quality: 'highestaudio',
      format: "audioonly",
      liveBuffer: 60000,
      dlChunkSize: 1024 * 1024 * 4,
    },
    customFilters: {
      "clear": "dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }

  })


  const status = (queue) => `Volume: ${queue.volume}% | Filter: ${queue.filter || "Off"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"} | Autoplay: ${queue.autoplay ? "On" : "Off"}`;

  Client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({
      embeds: [new MessageEmbed()
        .setTitle(":notes: Playing")
        .setDescription(`[${song.name}](${song.url})`, true)
        .setColor(ee.color)
        .addField("Requested By", `${song.user}`, true)
        .addField("⏲️Duration", `\`${song.formattedDuration.toString()}\``, true)
        .setThumbnail(song.thumbnail)
        .setFooter(`${status(queue)}`, ee.footericon)]
    }))


    .on("addSong", (queue, song) => queue.textChannel.send({
      embeds: [new MessageEmbed()
        .setTitle(`:notes: Added to Queue `)
        .setDescription(`[${song.name}](${song.url})`, true)
        .setColor(ee.color)
        .addField("Requested By", `${song.user}`, true)
        .addField("⏲️Duration", `\`${song.formattedDuration.toString()}\``, true)
        .addField(`\`${queue.songs.length}\` Songs in the Queue`, `Duration: \`${format(queue.duration * 1000)}\``)
        .setThumbnail(song.thumbnail)
        .setFooter(`${status(queue)}`, ee.footericon)]
    }))


    .on("addList", (queue, playlist) => queue.textChannel.send({
      embeds: [new MessageEmbed()
        .setTitle(`:notes: Playlist Added to Queue `)
        .setDescription(`[${playlist.name}](${playlist.url})` + ` - \`[${playlist.songs.length} songs]\``)
        .setColor(ee.color)
        .addField("⏲️Duration", `\`${playlist.formattedDuration}\``, true)
        .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration * 1000)}\``, true)
        .setThumbnail(playlist.thumbnail.url)
        .setFooter(`${status(queue)}`, ee.footericon)]
    }))

    .on("searchResult", (message, result) =>
      message.channel.send({
        embeds: [new MessageEmbed()
          .setTitle("**Choose an option from below**")
          .setURL(song.url)
          .setColor(ee.color)
          .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
          .setFooter(ee.footertext, ee.footericon)]
      }))

    .on("searchInvalidAnswer", (message) => message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`\`❌ ERROR | You answered an invalid number!\``)]
    }))

    .on("searchNoResult", (message) => message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`\`❌ ERROR | No result Found!\``)]
    }))

    .on("searchCancel", (message) => message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`\`❌ ERROR | Search Cancelled\``)]
    }))

    .on("error", (textChannel, e) => {
      console.warn(e)
	    textChannel.send({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`An error encountered: ${e}`)
      ]});
      })

    .on("empty", queue => {
     queue.textChannel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setDescription(":x: | Channel is empty. Leaving the channel!")]
      }).then(msg => {
        setTimeout(() => msg.delete(), 15000)
      })
        .catch(e => {
          console.log(e)
        })
    })

    .on("finish", (queue) => {
      queue.textChannel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setDescription("***No more song in queue. Leaving the channel***")]
      }).then(msg => {
        setTimeout(() => msg.delete(), 15000)
      })
        .catch(e => {
          console.log(e)
        })
    })

    .on("noRelated", (queue) => {
      queue.textChannel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(`\`Can't find related video to play. Stop playing music.\``)
          .setTimestamp()]
      }).then(msg => {
        setTimeout(() => msg.delete(), 15000)
      })
        .catch(error => {
          console.log(error)
        })
    })

    
    .on("initQueue", queue => {
      queue.autoplay = false;
      queue.volume = 100;
      queue.filter = "clear";

    })
}

