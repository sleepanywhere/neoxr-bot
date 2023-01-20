
const {extract} = require('zs-extract')
const {lookup}  = require('mime-types')
exports.run = {
   usage: ['zippyshare'],
   hidden: ['zps'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
    try {
        if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file'), m)
        if (!args[0].includes('zippyshare.com/v')) return client.reply(m.chat, global.status.invalid, m)
        client.sendReact(m.chat, '🕒', m.key)
        for (let i = 0; i < args.length; i++) {
            if (!args[i].includes('zippyshare.com/v')) continue
            let res = await extract(args[i])
            let mimetype = await lookup(res.download)
            let text = `乂  *Z I P P Y S H A R E*\n\n`
            text += '	◦  *Name* : ' + res.filename + '\n\n'
            text += global.footer
            client.sendMessageModify(m.chat, text, m, {
                largeThumb: true,
                thumbnail: await Func.fetchBuffer('https://telegra.ph/file/a24c0d5d1247521a91eb3.png')
             })
            client.sendMessage('m.chat', { document: { url: res.download }, fileName: res.filename, mimetype }, { quoted: m })
          }       
     } catch {
        return client.reply(m.chat, global.status.error, m)
     }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}