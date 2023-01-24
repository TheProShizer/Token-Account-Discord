const prompt = require("prompt-sync")();
const chalk = require('chalk');
const alts = require(`./alts`).tokens;
const { Client } = require('discord.js-selfbot-v13');

let code = prompt(chalk.blue(`$ Podaj kod zaproszenia na serwer: `));

alts.forEach(async (account) => {
    const client = new Client({
        checkUpdate: false
    })
    await client.login(account).then(() => {
        console.log(chalk.blue(`$ Zalogowano jako`), chalk.red(client.user.username))
    })

    await client.fetchInvite(code).then(async invite => {
        await invite.acceptInvite(true); 


        let guild = await client.guilds.fetch(invite.guild.id)
        console.log(chalk.blue(`$ Trwa fetchowanie użytkowników serwera...`))
        let members = await guild.members.fetch()


        let message = prompt(chalk.blue(`$ Podaj wiadomość którą ma wysłać do każdego użytkownika: `));

        members.forEach((member) => {
            member.send(message).then(() => {
                console.log(chalk.blue(`Wysłano wiadomość do`), chalk.red(member.displayName))
            }).catch(err => {
                console.log(chalk.red(`$ Nie można było wysłać wiadomości do`), chalk.blue(member.displayName))
            })
        })
    });
})

process.on("unhandledRejection", (reason, p) => {
    console.error(reason, p)
});
process.on("uncaughtException", (err, origin) => {
    console.error(err, origin)
});

