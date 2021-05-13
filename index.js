require('dotenv').config()
const { Client, MessageEmbed, Collection } = require('discord.js')
const bot = new Client()
const fs = require('fs')
const prefix = process.env.PREFIX

// bot.commands as a collection(Map) of commands from ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
bot.commands = new Collection()
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  bot.commands.set(command.name, command)
}

// --------------------------------------
//
//       EVENT ON LOGIN
//
// --------------------------------------
bot.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${bot.user.username}`)

  bot.user.setActivity(`${prefix}links`, { type: 'PLAYING' })
})

// --------------------------------------
//
//      EVENT ON MESSAGE
//
// --------------------------------------
bot.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(prefix) || message.content === prefix)
    return

  // If it's a DM
  if (message.channel.type === 'dm') {
    message.channel.send(`I do not support DM commands.\nYou can go into any server I'm in and do \`${prefix}help\` for all my commands.`)
      .then().catch(console.error)
  }

  // Handling
  const textStr = message.content.slice(prefix.length)
  const commandName = textStr.split(/ +/).shift().toLowerCase()
  const argsStr = textStr.slice(commandName.length + 1)

  // Map all the commands
  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  // Return if the command doesn't exist
  if (!command)
    return

  // Instantiate the embed that's sent to every command execution
  const embed = new MessageEmbed().setColor('#ff0066')

  // delete delays
  const generalDelete = { timeout: 5000 }

  // Warning when channel name includes general and delete both messages
  if (message.channel.name.includes('general'))
    return message.channel.send(`Come on! Not in #**${message.channel.name}**`)
      .then(x => {
        x.delete(generalDelete).then().catch(console.error)
        message.delete(generalDelete).then().catch(console.error)
      }).catch(console.error).catch(console.error)

  // Check if command is allowed in that channel
  if (command.channelsAllowed) { // Certain commands can only be triggered in specific channels
    if (!(command.channelsAllowed && command.channelsAllowed.some(x => x === message.channel.id)))
      return
  }

  // Check if the user has the permissions necessary to execute the command
  if (!(command.permsAllowed.some(x => message.member.hasPermission(x)) || command.usersAllowed.some(x => x === message.author.id)))
    return message.channel.send('Only an admin can use this command, sorry!')

  try {
    // EXECUTE COMMAND
    const reply = await command.execute(message, argsStr, embed)

    // if there's a reply, send it
    if (reply)
      message.channel.send(reply)
        .then().catch(console.error)
    return
  } catch (error) {
    // If error, log it and reply it
    console.log('error:', error)
    return message.channel.send(`${error}`)
      .then().catch(console.error)
  }
})

bot.login(process.env.TOKEN)