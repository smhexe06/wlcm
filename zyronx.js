const { Client } = require("discord.js");
const { channels, yetkilirol, kayıtsızrol, hosgeldinses, yetkilises, tokens } = require("./ayarlar.json");

 tokens.forEach((token, i) => {
  const client = new Client();
  let connection;
  client.on("ready", async () => connection = await client.channels.cache.get(channels[i]).join());
    
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if ((oldState.channelID && !newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID === newState.channelID) || newState.member.user.bot || newState.channelID !== channels[i]) return;
    const hasStaff = newState.channel.members.some((x)=> yetkilirol.some((r) => x.roles.cache.has(r)));
    const staffSize = newState.channel.members.filter((x) => yetkilirol.some((r) => x.roles.cache.has(r))).size;
    const unregisterSize = newState.channel.members.filter((x) => kayıtsızrol.some((r) => x.roles.cache.has(r))).size;
    if (!hasStaff && unregisterSize === 1) await connection.play(hosgeldinses);
    else if (hasStaff && staffSize === 1 && unregisterSize === 1) await connection.play(yetkilises);
  });

  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Zyronx İş Başında" }, status: "idle" });
  })
  client.login(token).then(() => console.log(`${client.user.tag} Aktif!`)).catch(() => console.error(`${token} Tokeni aktif edilemedi!`));
});
