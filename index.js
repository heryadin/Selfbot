/* Apa gak ada Thanks to?
Cek paling Bawah
Mau di Hapus?
Gak Berkah:v
*/
const {
  WAConnection,
  MessageType,
  Presence, 
  MessageOptions,
  Mimetype,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
  ReconnectMode,
  ProxyAgent,
  GroupSettingChange,
  ChatModification,
  waChatKey,
  WA_DEFAULT_EPHEMERAL,
  mentionedJid,
  processTime
} = require('@adiwajshing/baileys')
const fs = require('fs')
const Exif = require('./lib/exif')
const exif = new Exif()
const axios = require("axios")
const speed = require('performance-now')
const request = require('request')
const imgbb = require('imgbb-uploader')
const toMs = require('ms')
const ms = require('parse-ms')
const moment = require('moment-timezone')
const fetch = require('node-fetch')
const phoneNum = require('awesome-phonenumber')
const ffmpeg = require('fluent-ffmpeg')
const imageToBase64 = require('image-to-base64')
const lolis = require('lolis.life')
const loli = new lolis()
const { removeBackgroundFromImageFile } = require('remove.bg')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec } = require('child_process')
const { uploadimg } = require('./lib/uploadimg')

//********** DATABASE **********//
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/simi.json'))
const setting = JSON.parse(fs.readFileSync('./media/settings.json'))
const setiker = JSON.parse(fs.readFileSync('./temp/stik.json'))
const audionye = JSON.parse(fs.readFileSync('./temp/vn.json'))
const imagenye = JSON.parse(fs.readFileSync('./temp/image.json'))
const videonye = JSON.parse(fs.readFileSync('./temp/video.json'))

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//************SETTINGS****************//
prefix = '/'
blocked = []
fake = '𝙎𝙀𝙇𝙁 𝘽𝙊𝙏 '
thumb_help = fs.readFileSync(`./media/gambarnye.jpeg`)
numbernye = '6285841959635'
join = '${c}New Member${c} \n ${c}Nama :${c} \n ${c}Askot : ${c} \n ${c}Umur :${c} \n ${c}Status :${c} \n\n - [ 𝙎𝙀𝙇𝙁 𝘽𝙊𝙏 ] -'
leave = '${c}Sayonaraa👋${c}'
promote = '*Land ofc promote*'
demote = '*Kasihan di demote*'
public = false

//*********** VCARD  ***********//
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Land ofcシ︎\n'
            + 'ORG:Owner Selfbot;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6285841959635:+62 858-4195-9635\n'
            + 'END:VCARD'

//*********** 𝗔𝗣𝗜𝗞𝗘𝗬 ***********//

const ZeksApi = 'apivinz'
const LolKey = 'Apikey-Lu'
const c = '```'

function kyun(seconds){
  function pad(s){
  return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
function tanggal(){
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
			var tgl = new Date();
			var day = tgl.getDate()
			bulan = tgl.getMonth()
			var thisDay = tgl.getDay(),
			thisDay = myDays[thisDay];
			var yy = tgl.getYear()
			var year = (yy < 1000) ? yy + 1900 : yy;
			return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}
function monospace(string) {
return '```' + string + '```'
}
async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','yellow'), color(']','white'), color(' Scan the qr code above'))
	})
	fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
	client.on('connecting', () => {
	start('2', 'Starting...')
	})
	client.on('open', () => {
		success('2', 'Sukses Masuk ✔️')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
		    num = anu.participants[0]
				try {
			ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
		     ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*User : @${num.split('@')[0]}*
*Join Group : ${mdata.subject}*
 
 ${join}`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*User : @${num.split('@')[0]}*
${leave}	`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'promote') {
			const mdata = await client.groupMetadata(anu.jid)
			num = anu.participants[0]
			try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			let buff = await getBuffer(ppimg)
			teks = `𝙋𝙍𝙊𝙈𝙊𝙏𝙀 𝘿𝙀𝙏𝙀𝘾𝙏
			
${c}Nomor :${c} ${num.replace('@s.whatsapp.net', '')}

${c}User :${c} @${num.split('@')[0]}

${c}Date : NOW${c} 

${c}Group :${c} ${mdata.subject}

${promote}`
			client.sendMessage(mdata.id, buff, MessageType.image, {caption : teks, contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Kntl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `PROMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		} else if (anu.action == 'demote') {
			num = anu.participants[0]
			const mdata = await client.groupMetadata(anu.jid)
			try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			let buff = await getBuffer(ppimg)
			teks = `𝘿𝙀𝙈𝙊𝙏𝙀 𝘿𝙀𝙏𝙀𝘾𝙏
${c}Nomor :${c} ${num.replace('@s.whatsapp.net', '')}

${c}User :${c} @${num.split('@')[0]}

${c}Date : NOW${c}

${c}Group :${c} ${mdata.subject}

${demote}`
			client.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Ktl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `DEMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
})
	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		    global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey 
			const { text, extendedText, contact, caption, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const date = new Date().toLocaleDateString()
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
      const wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
      const wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
        
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const arg = chats.slice(command.length + 2, chats.length)
			mess = {
				wait: 'otwe...🙂',
				success: 'Succes..',
				error: {
				stick: 'Itu Sticker?',
				Iv: 'link Tidak Valid'
				},
			only: {
					group: 'Group Only',
					ownerG: 'Owner Group Only',
					ownerB: 'Lu siapa?',
					admin: 'Admin Group',
					Badmin: 'Jadikan admin'
				}
			}
    const totalchat = await client.chats.all()
	const botNumber = client.user.jid
	const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] 
	const isGroup = from.endsWith('@g.us')
	const sender = isGroup ? mek.participant : mek.key.remoteJid
	const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
	const groupName = isGroup ? groupMetadata.subject : ''
	const groupId = isGroup ? groupMetadata.jid : ''
	const groupMembers = isGroup ? groupMetadata.participants : ''
	const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
	const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
	const isGroupAdmins = groupAdmins.includes(sender) || false
	const itsMe = sender == botNumber ? true : false
	const isWelkom = isGroup ? welkom.includes(from) : false
	const isNsfw = isGroup ? nsfw.includes(from) : false
	const isSimi = isGroup ? samih.includes(from) : false
	const isOwner = ownerNumber.includes(sender)
			const q = args.join(' ')
			const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:freply})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

const fakegroup = (teks) => {
			client.sendMessage(from, teks, text, {
				quoted: {
					key: {
						fromMe: false,
						participant: `6285841959635@s.whatsapp.net`, ...(from ? { remoteJid: "6281226770537-1604595598@g.us" } : {})
					},
					message: {
						conversation: fake
					}
				}
			})
		}
const fdocu = { key: { fromMe: false, participant: `6285841959635@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "documentMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "title": fake, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('media/fake.jpeg')}}}

const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": fake, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync(`media/fake.jpeg`)} } }

const ftoko = {
key: {
			fromMe: false,
			participant: `6285841959635@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": fs.readFileSync(`./media/fake.jpeg`)
					},
					"title": fake,
					"description": "SELF BOT",
					"currencyCode": "USD",
					"priceAmount1000": "2000",
					"retailerId": "Self Bot",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
const uploadImages = (buffData, type) => {
  return new Promise(async (resolve, reject) => {
        const { ext } = await fromBuffer(buffData)
        const cmd = text.toLowerCase()
        const filePath = 'utils/tmp.' + ext
        const _buffData = type ? await resizeImage(buffData, false) : buffData
        fs.writeFile(filePath, _buffData, { encoding: 'base64' }, (err) => {
            if (err) return reject(err)
            console.log('Uploading image to telegra.ph server...')
            const fileData = fs.readFileSync(filePath)
            const form = new FormData()
            form.append('file', fileData, 'tmp.' + ext)
            fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            })
                .then(res => res.json())
                .then(res => {
                if (res.error) return reject(res.error)
                resolve('https://telegra.ph' + res[0].src)
                })
                .then(() => fs.unlinkSync(filePath))
                .catch(err => reject(err))
        })
    })
}
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage') 

   if (itsMe){
     if(chats.toLowerCase() == `${prefix}self`){
       public = false
       client.sendMessage(from, `Success`, `STATUS : SELF`)
     }
     if (chats.toLowerCase() == 'status'){
       client.sendMessage(from, `STATUS : ${public ? 'PUBLIC' : 'SELF'}`)
     }
   }
  if (!public){
  if (!mek.key.fromMe) return
  }
if (!isGroup && !isCmd) console.log(color(time, "white"), color("[ Private ]", "cerise"), color(budy, "white"), "from", color(sender.split('@')[0], "yellow"))
    if (isGroup && !isCmd) console.log(color(time, "white"), color("[ Group ]", "cerise"), color(budy, "white"), "from", color(sender.split('@')[0], "yellow"), "in", color(groupName, "yellow"))
    if (!isGroup && isCmd) console.log(color(time, "white"), color("[ CMD ]", "cerise"), color(budy, "white"), "from", color(sender.split('@')[0], "yellow"))
    if (isGroup && isCmd) console.log(color(time, "white"), color("[ CMD ]", "cerise"), color(budy, "white"), "from", color(sender.split('@')[0], "yellow"), "in", color(groupName, "yellow"))
    let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./lib/stickers/${name}.exif`)) return `./lib/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
				let len = JSON.stringify(json).length	
				let last	
				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	
				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	
				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./lib/stickers/${name}.exif`, buffer, (err) => {	
					return `./lib/stickers/${name}.exif`	
				})	
			}
			switch(command) {
			     case `${prefix}help`:
                case `${prefix}menu`:
      menu =` 
*+ ${prefix}self*
*+ ${prefix}public*
*+ ${prefix}mute*
*+ ${prefix}unmute*
*+ ${prefix}runtime*
*+ ${prefix}ping*
*+ ${prefix}term*
*+ ${prefix}blocklist*
*+ ${prefix}run*
*+ ${prefix}chatlist*
*+ ${prefix}owner*
*+ ${prefix}join linkgc*
*+ ${prefix}getpic*
*+ ${prefix}getbio*
*+ ${prefix}attp*
*+ ${prefix}ttp*
*+ ${prefix}take*
*+ ${prefix}exif*
*+ ${prefix}pin*
*+ ${prefix}unpin*
*+ ${prefix}archive*
*+ ${prefix}unarchiveall*
*+ ${prefix}readall*
*+ ${prefix}delthischat*
*+ ${prefix}shutdown*
*+ ${prefix}hidetag*
*+ ${prefix}stctag*
*+ ${prefix}imgtag*
*+ ${prefix}kontag*
*+ ${prefix}kontak*
*+ ${prefix}setthumb*
*+ ${prefix}setreply*
*+ ${prefix}setbodymenu*
*+ ${prefix}setwelcome*
*+ ${prefix}setleave*
*+ ${prefix}setpromote*
*+ ${prefix}setdemote*
*+ ${prefix}upsw*
*+ ${prefix}upswimg*
*+ ${prefix}upswvideo*
*+ ${prefix}welcome 1/0*
*+ ${prefix}linkgroup*
*+ ${prefix}group tutup/buka*
*+ ${prefix}add*
*+ ${prefix}kick*
*+ ${prefix}promote*
*+ ${prefix}demote*
*+ ${prefix}demoteall*
*+ ${prefix}edotensei*
*+ ${prefix}listadmin*
*+ ${prefix}online*
*+ ${prefix}infoall*
*+ ${prefix}notif*
*+ ${prefix}leave*
*+ ${prefix}addstik*
*+ ${prefix}adimg*
*+ ${prefix}addvid*
*+ ${prefix}addvn*
*+ ${prefix}getstik*
*+ ${prefix}getimg*
*+ ${prefix}getvid*
*+ ${prefix}getvn*
*+ ${prefix}liststick*
*+ ${prefix}listimg*
*+ ${prefix}listvid*
*+ ${prefix}listvn*
*+ ${prefix}play*
*+ ${prefix}play2*
*+ ${prefix}ig*
*+ ${prefix}fb*
*+ ${prefix}tiktok*
*+ ${prefix}ytmp3*
*+ ${prefix}ytmp4*
*+ ${prefix}sticker*
*+ ${prefix}rsticker*
*+ ${prefix}stickergif*
*+ ${prefix}stickerwa*
*+ ${prefix}stickerwm*
*+ ${prefix}nobg*
*+ ${prefix}textmaker*
*+ ${prefix}colong*
*+ ${prefix}fdeface*
*+ ${prefix}togif*
*+ ${prefix}tovideo*
*+ ${prefix}toimg*

*「 SELFBOT」*`
client.sendMessage(from , thumb_help, menu, text, {quoted : ftoko})
                   break
			  
			  //********** SELF&PUBLIC **********//
			  case `${prefix}self`:
			  if (!mek.key.fromMe) return reply('*Ente owner?_*')
			    public = false
			    client.sendMessage(from, `${c}Status : SELF${c}`, text, {quoted :freply})
			  break    
			  case `${prefix}public`:
			    if (!mek.key.fromMe) return reply('*Ente owner?_*')
			    public = true
			    client.sendMessage(from, `${c}Status : PUBLIC${c}`, text, {quoted :freply})
			    break
			    case `${prefix}mute`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                client.modifyChat(from, ChatModification.mute, 24*60*60*1000)
                reply('*Sukses Mute Chat🤐*')
                console.log('Sukses mute chat = ' + from)
                break
                case `${prefix}unmute`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                client.modifyChat(from, ChatModification.unmute)
                reply('*Sukses unmute Chat*')
                console.log('succes unmute chat = ' + from)
                break       
			    case `${prefix}unpin`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                client.modifyChat(from, ChatModification.unpin)
                reply('*Sukses unpin Chat*')
                console.log('unpin chat = ' + from)
                 break
                 case `${prefix}pin`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                client.modifyChat(from, ChatModification.pin)
                reply('*Sukses pin chat*')
                console.log('pinned chat = ' + from)
                 break
                case `${prefix}unreadall`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                var chats = await client.chats.all()
                chats.map( async ({ jid }) => {
                await client.chatRead(jid, 'unread')
                    })
		    var teks = `${c}Successfully unread ${chats.length} chats !${c}`
		    await client.sendMessage(from, teks, text, {quoted: freply})
		    console.log(chats.length)
	         break
            case `${prefix}readall`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                var chats = await client.chats.all()
                chats.map( async ({ jid }) => {
                await client.chatRead(jid)
                })
		var teks = `${c}Successfully read ${chats.length} chats !${c}`
	        await client.sendMessage(from, teks, text, {quoted: freply})
		console.log(chats.length)
		 break
         case `${prefix}unarchiveall`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                reply('*Sukses unarchive Chat*')
                console.log('succes unarchive chat = ' + from)
                anu = await client.chats.all()
                for (let _ of anu) {
                client.modifyChat(_.jid, ChatModification.unarchive)
                }
                 break
            case `${prefix}archive`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                reply('*Otewe...*')
                console.log('succes archive chat = ' + from)
                await sleep(3000)
                client.modifyChat(from, ChatModification.archive)
                 break
            case `${prefix}delthischat`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
                reply('*succes delete this chat*')
                console.log('succes delete chat = ' + from)
                await sleep(4000)
                client.modifyChat(from, ChatModification.delete)
                 break
                case `${prefix}shutdown`:
                if (!mek.key.fromMe) return reply('*Ente owner?_*')
	        await client.sendMessage(from, `Bye...\n_Land Ofc off dulu yaa.._`, text,{quoted : freply})
		await sleep(3000)
                client.close()
		 break
		 case `${prefix}demoteall`:
                members_id = []
		for (let mem of groupMembers) {
	   	members_id.push(mem.jid)
	  	}
                client.groupDemoteAdmin(from, members_id)
                 break
                           
			  //********** SETTING BOT **********//
			  case `${prefix}setleave`:
			    if (args.length < 1) return reply('*Teks nya mana gan?*')
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					leave = body.slice(10)
					client.sendMessage(from,`${c}Leave berhasil di ubah menjadi : ${body.slice(10)}${c}`, text,{quoted : freply})
				 break 
				 case `${prefix}setpromote`:
				  if (args.length < 1) return reply('*Teks nya mana gan?*')
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					promote = body.slice(11)
					client.sendMessage(from,`${c}Promote berhasil di ubah menjadi : ${body.slice(11)}${c}`, text,{quoted : freply})
				 break 
				 case `${prefix}setdemote`:
					  if (args.length < 1) return reply('*Teks nya mana gan?*')
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					demote = body.slice(11)
					client.sendMessage(from ,`${c}Demote berhasil di ubah menjadi : ${body.slice(11)}${c}`, text,{quoted : freply})
				 break 
		 case `${prefix}setwelcome`:
		if (args.length < 1) return reply('*Teks nya mana gan?*')
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					join = body.slice(11)
					client.sendMessage(from ,`${c}Welcome berhasil di ubah menjadi : ${body.slice(11)}${c}`, text,{quoted : freply})
				 break
			  case `${prefix}setreply`:
			    if (args.length < 1) return reply('*Teks nya mana gan?*')
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					fake = body.slice(10)
					client.sendMessage(from, `reply berhasil di ubah menjadi : ${fake}`,text,{quoted : freply})
				 break 
				case `${prefix}setreply`:
			    if (args.length < 1) return reply('*Teks nya mana gan?*')
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					prefix = body.slice(10)
					client.sendMessage(from, `Sukses Prefix Menjadi : ${prefix}`,text,{quoted : freply})
				 break 
				 case 'setthumb':
                 if (args.length < 1) return reply('*Teks nya mana gan?*')
				 if (!isQuotedImage)
		     	if	(!isQuotedSticker)return reply('Reply imagenya!')
				const messimagethumb = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				const downiamgethumb = await client.downloadMediaMessage(messimagethumb)
				fs.unlinkSync(`./media/fake.jpeg`)
				fs.writeFileSync(`./media/fake.jpeg`, downiamgethumb)
				client.sendMessage(from, `Sukses!`, text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": "Sukses", 'jpegThumbnail': fs.readFileSync('./media/fake.jpeg')}}}})
break
				 break
				 case `${prefix}getbio`:
                var yy = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                var p = await client.getStatus(`${yy}`, MessageType.text)
                reply(p.status)
                if (p.status == 401) {
                reply("Status Profile Not Found")
                }
                 break
				 case `${prefix}getpic`:
				if (mek.message.extendedTextMessage != undefined){
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					try {
						pic = await client.getProfilePicture(mentioned[0])
					} catch {
						pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
					}
					thumb = await getBuffer(pic)
					client.sendMessage(from, thumb, MessageType.image)
				{quoted : freply}}
				 break
				  case `${prefix}join`:
                           if (!q) return reply('Masukan link group')
                           var codeInvite = body.slice(6).split('https://chat.whatsapp.com/')[1]
                           if (!codeInvite) return fakegroup ('pastikan link sudah benar!')
                           var response = await client.acceptInvite(codeInvite);
                           console.log(response);
                            break
                           
        //********** SYSTEM **********//
        case `${prefix}return`:
        case `${prefix}run`:
        return fakegroup(JSON.stringify(eval(args.join(''))))
                  break
			     case `${prefix}>`:
                        let code = args.join(" ")
                    try {
                    if (!code) return client.reply(from, 'No JavaScript Code', id)
                    let evaled;
                    if (code.includes("--silent") && code.includes("--async")) {
                    code = code.replace("--async", "").replace("--silent", "");
                    return await eval(`(async () => { ${code} })()`)
                    } else if (code.includes("--async")) {
                    code = code.replace("--async", "");
                    evaled = await eval(`(async () => { ${code} })()`);
                    } else if (code.includes("--silent")) {
                    code = code.replace("--silent", "");
                    return await eval(code);
                    } else evaled = await eval(code);
                  if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, { depth: 0 });
                let output = clean(evaled);
                var options = {
                    contextInfo: {
                        participant: '0@s.whatsapp.net',
                        quotedMessage: {
                            extendedTextMessage: {
                                text: "𝐄𝐗𝐄𝐂𝐔𝐓𝐎𝐑"
                            }
                        }
                    }
                }
                client.sendMessage(from, `${output}`, text, options)
                } catch(err) {
                console.error(err)
                reply(err)
                }
                function clean(text) {
                if (typeof text === "string")
                  return text
                    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                    .replace(/@/g, `@${String.fromCharCode(8203)}`);
                // eslint-disable-line prefer-template
                else return text;
                }
                 break
				 case `${prefix}blocklist`:
				  case `${prefix}listblock`:
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `┣❥  @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					 break
					
					//********** CONVERT **********//
					 case `${prefix}exif`:
	        if (!mek.key.fromMe) return reply('*Ente owner?_*')
	        if (args.length < 1) return reply(`Penggunaan ${prefix}exif nama|autho`)
		if (!arg.split('|')) return reply(`Penggunaan ${prefix}exif nama|author`)
		    exif.create(arg.split('|')[0], arg.split('|')[1])
		    reply('sukses')
	         break 
	        case `${prefix}colong`:
		if (!isQuotedSticker) return reply(`Reply sticker dengan caption *${prefix}colong*`)
		const encmediia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
	        const meidia = await client.downloadAndSaveMediaMessage(encmediia, `./sticker/${sender}`)
		    exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
		    if (error) return reply('error')
		    client.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), MessageType.sticker, {quoted: freply})
					fs.unlinkSync(media)
					fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
				})
				 break
					 case `${prefix}take`:
					if (!isQuotedSticker) return reply(`Reply sticker dengan caption *${prefix}takestick nama|author*`)
					var pembawm = body.slice(6)
					var encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					var media = await client.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					var packname = pembawm.split('|')[0]
					var author = pembawm.split('|')[1]
					exif.create(packname, author, `takestick_${sender}`)
					exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return reply('Error')
					client.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), MessageType.sticker, {quoted: freply})
					fs.unlinkSync(media)
					fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
				})
				 break
				 case `${prefix}togif`:
                                        if (!isQuotedSticker) return reply('Reply stiker nya')
                                        reply(mess.wait)
                                        if (mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
                                        const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                                        const upload = await uploadimg(media, Date.now() + '.webp')
                                        const rume = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${upload.result.image}`)
                                        const buff = await getBuffer(rume.data.result)
                                        client.sendMessage(from, buff, video, { mimetype: Mimetype.gif, caption: 'Nih', quoted: freply})
                                }
                 break
				 case `${prefix}tovideo`:
                    if ((isMedia && !mek.message.videoMessage || isQuotedSticker)) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".gif")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `https://api.lolhuman.xyz/api/convert/togif?apikey=${LolKey}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            client.sendMessage(from, ini_buff, video, { quoted: freply, mimetype: "video/gif", filename: file_name }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                     break
					 case `${prefix}fdeface`:
					var nn = body.slice(9)
					var urlnye = nn.split("|")[0];
					var titlenye = nn.split("|")[1];
					var descnye = nn.split("|")[2];
					ddatae = await imageToBase64(JSON.stringify('./media/fake.jpeg').replace(/\"/gi, ''))

					client.sendMessage(from, {

						text: `${urlnye}`,

						matchedText: `${urlnye}`,

						canonicalUrl: `${urlnye}`,

						description: `${descnye}`,

						title: `${titlenye}`,

						jpegThumbnail: ddatae
					}, 'extendedTextMessage', { detectLinks: false })
					 break
					 case `${prefix}nobg`:
if ((isMedia && !mek.videoMessage || isQuotedImage)) {
    reply(mess.wait)
var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek
var media = await client.downloadAndSaveMediaMessage(encmedia)
anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", media)
getUrl = `${anu.display_url}`
buff = await getBuffer(`https://api.zeks.xyz/api/removebg?apikey=${ZekApi}&url=${getUrl}`)
client.sendMessage(from, buff, image, {quoted: freply})
}
 break
 case `${prefix}textmaker`:
if ((isMedia && !mek.videoMessage || isQuotedImage)) {
var tex1 = body.slice(11).split('|')[0]
var tex2 = body.slice(11).split('|')[1]
if (!tex2) return reply('Format salah!')
    reply(mess.wait)
var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek
var media = await client.downloadAndSaveMediaMessage(encmedia)
anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", media)
getUrl = `${anu.display_url}`
buff = await getBuffer(`http://lolhuman.herokuapp.com/api/memegen?apikey=${LolKey}&texttop=${tex1}&textbottom=${tex2}&img=${getUrl}`)
client.sendMessage(from, buff, image, {quoted: freply})
}
 break
 case `${prefix}attp`:
if (args.length < 1) return reply(`_Teksnya Mana Boss_\n*Contoh ${prefix}attp Land ofc*`)
				attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
				client.sendMessage(from, attp2, sticker, {quoted: freply})
		 break
		 case `${prefix}ttp`:
		if (args.length < 1) return reply(`_Teksnya Mana Boss_\n*Contoh ${prefix}ttp land ofc*`)
				ttp = await getBuffer(`http://lolhuman.herokuapp.com/api/ttp?apikey=${LolKey}&text=${body.slice(5)}`)
				client.sendMessage(from, ttp, sticker, {quoted: freply})
				 break
                case `${prefix}stickerwa`:
       if (args.length == 0) return reply(`Example: ${prefix + command} Koceng Imot`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/stickerwa?apikey=${LolKey}&query=${query}`)
                    get_result = get_result.result[0].stickers
                    for (var x of get_result) {
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/convert/towebp?apikey=${LolKey}&img=${x}`)
                    client.sendMessage(from, ini_buffer, sticker)
                    }
                     break               
                    case `${prefix}rs`:
                    case `${prefix}rsticker`:
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        filePath = await client.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                        url: `https://api.lolhuman.xyz/api/convert/towebpwround?apikey=${LolKey}`,
                            method: 'POST',
                            formData: {
                            "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            client.sendMessage(from, ini_buff, sticker, { quoted: freply}).then(() => {
                            fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break       
                    case `${prefix}swm`:
                    case `${prefix}stickerwm`:
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Bukan gitu Gini nih\n\n${prefix}stickerwm`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `https://api.lolhuman.xyz/api/convert/towebpauthor?apikey=${LolKey}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "package": ini_txt[0],
                                "author": ini_txt[1]
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            client.sendMessage(from, ini_buff, sticker, { quoted: freply }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
        break    
		case `${prefix}gifstiker`:
	    case `${prefix}s`:
	    case `${prefix}stickergif`:  
		case `${prefix}sticker`:
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: freply})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						client.sendMessage(from, mess.wait, text,{quoted : freply})
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Yah error dek`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
							client.sendMessage(from, buff, sticker, {quoted: freply})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						client.sendMessage(from, mess.wait, text,{quoted : freply})
						keyrmbg = 'C5ZeygbiedTZixDJJrm663Az'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Yah error dek')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								client.sendMessage(from, buff, sticker, {quoted: freply})
							})
						    })					
					} else {
						reply(`𝗸𝗶𝗿𝗶𝗺 𝗴𝗮𝗺𝗯𝗮𝗿 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗮𝗽𝘁𝗶𝗼𝗻 ${prefix}𝘀𝘁𝗶𝗰𝗸𝗲𝗿 𝗮𝘁𝗮𝘂 𝗿𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝗴𝗮𝗺𝗯𝗮𝗿`)
					}
					break
			 case `${prefix}toimg`:
					if (!isQuotedSticker) return reply(' reply stickernya gan')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(' Gagal, pada saat mengkonversi sticker ke gambar ')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: freply, caption: fake})
						fs.unlinkSync(ran)
					})
		break
		case `${prefix}ping`:
		   const chatsIds = await client.chats.all()
           const timestamp = speed();
           const latensi = speed() - timestamp 
                p0 =` ${c}Loaded Message${c}
             
${c} - [ ${totalchat.length} ]  Total Chat${c}
${c} - [ Vivo ] HANDPHONE${c}
${c} - [ ${client.user.phone.wa_version} ] WA Version${c}
${c} - [ Baileys ] Server${c}
${c} - [ SELF ] MODE${c}
${c} - [ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 4095 ] RAM${c}

${c}Speed : ${latensi.toFixed(4)} Second${c}`
                client.sendMessage(from, p0, text, { quoted: freply})
break                 
case `${prefix}runtime`:
 uptime = process.uptime()
 const timestampi = speed();
 const latensip = speed() - timestampi
			             anjink =`
◪ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲
${c}${kyun(uptime)}${c}
◪ *SPEED*
 *Speed :*
 ${c}${latensip.toFixed(4)} Second${c}`
			             client.sendMessage(from, anjink, text,{quoted : freply})
  break
  case `${prefix}term`: 
  case `${prefix}exec`:
const cmyd = body.slice(6)
var itsme = `0@s.whatsapp.net`
var split = `*EXECUTOR SELF BOT*`
const term = {
contextInfo: {
participant: itsme,
quotedMessage: {
extendedTextMessage: {
text: split,
}
}
}
}
exec(cmyd, (err, stdout) => {
if (err) return client.sendMessage(from, ` ${err}`, text, { quoted: mek })
if (stdout) {
client.sendMessage(from, stdout, text, term)
}
})
 break

 //********** Funny COMMAND **********//
					  
					  case `${prefix}kontak`:
                        entah = args[0]
                        disname = args[1]
            reply('Invalid phone number'.toUpperCase());
                        vcard = 'BEGIN:VCARD\n'
                                  + 'VERSION:3.0\n'
                                  + `FN:${disname}\n`
                                  + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
                                  + 'END:VCARD'.trim()
                            client.sendMessage(from, {displayName: disname, vcard: vcard}, contact)
                  break             
			     case `${prefix}kontag`:
					var bv = body.slice(8)
					var jl = `${bv}`
					if (args[0] === '') {
					var jl = `*contak tag*`
					}
					var group = await client.groupMetadata(from)
					   var member = group['participants']
					   var mem = []
					   member.map(async adm => {
					   mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					   })
					const vcardtag = 'BEGIN:VCARD\n'
					            + 'VERSION:3.0\n'
					            + `FN:${body.slice(8)}\n`
					            + 'ORG:Creator SELF BOT;\n'
					            + `TEL;type=CELL;type=VOICE;waid=${client.user.jid.split('@')[0]}:${client.user.jid.split('@')[0]}\n`
					            + 'END:VCARD'
            				client.sendMessage(from, {displayname: mem, vcard: vcardtag}, MessageType.contact, { quoted: mek, contextInfo: {mentionedJid: mem}, quoted: {
					key: {
						participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
					},
					message: {
						"imageMessage": {
							"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
							"mimetype": "image/jpeg",
							"caption": jl,
							"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
							"fileLength": "28777",
							"height": 1080,
							"width": 1079,
							"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
							"fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
							"directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
							"mediaKeyTimestamp": "1610993486",
							"jpegThumbnail": fs.readFileSync('./media/fake.jpeg'),
							"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
							}
							}
							}
							})
        break
        case `${prefix}hidetag`:
        case `${prefix}.`:
					if (!isGroup) return reply(mess.only.group)
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: freply
					}
					client.sendMessage(from, options, text,{quoted : freply})
					break
			        case `${prefix}stctag`:
                    if (!isQuotedSticker) return reply('Ini sticker?')
                     boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                     delb = await client.downloadMediaMessage(boij)
                    await fs.writeFileSync(`stctagg.webp`, delb)
                    var group = await client.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                                                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                                        })
					var itsme = `0@s.whatsapp.net`
					var split = `${body.slice(8)}`
					var selepbot = {
					  contextInfo: {
					  mentionedJid: mem,
                      participant: itsme,                                                                                                                          quotedMessage: {
                                                                extendedTextMessage: {
                      text: split,
							   }
					        }
					    }
					}
			result = fs.readFileSync(`stctagg.webp`)
            client.sendMessage(from, result, sticker, selepbot)
		     await fs.unlinkSync(`stctagg.webp`)
		 break
		 case `${prefix}imgtag`:
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                     const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                        var value = args.join(" ")
                        var group = await client.groupMetadata(from)
                        var member = group['participants']
                        var mem = []
                        member.map(async adm => {
                            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                        })
                        var options = {
                       contextInfo: { mentionedJid: mem },
                       quoted: freply
                        }
                        ini_buffer = fs.readFileSync(filePath)
                        client.sendMessage(from, ini_buffer, image, options)
                        fs.unlinkSync(filePath)
                    } else {
                        reply(`Tag image yang sudah dikirim`)
                    }
                    break                    
                    case `${prefix}owner`:
                 client.sendMessage(from, {displayname: "jeff", vcard: vcard}, MessageType.contact, { quoted: freply})
                 client.sendMessage(from, 'Save ya:)',text, { quoted: freply} )
                  break
    			  //********** ONLY GROUP **********//
                 case `${prefix}linkgroup`:
			     case `${prefix}linkgrup`:
			     case `${prefix}linkgc`:
				    if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n___________________________\n*${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: freply})
	    break        
        case `${prefix}grup`:
	    case `${prefix}gc`:
		case `${prefix}group`:
					if (!isGroup) return reply(mess.only.group)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`${c}✓Sukses Membuka Group${c} *${groupMetadata.subject}*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`${c}✓Sukses Menutup Group${c} *${groupMetadata.subject}*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
				break
			    case `${prefix}chatlist`:
				case `${prefix}cekchat`:
					client.updatePresence(from, Presence.composing)
					client.sendMessage(from, `Total : ${totalchat.length} Chat`, text, {quoted  : freply})
			    break
		    if (!isGroup) return reply(mess.only.group)
		    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
		    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
		    if (mentioned.length > 1) {
			teks = 'Perintah di terima, anda tidak menjadi admin :\n'
			for (let _ of mentioned) {
			    teks += `@${_.split('@')[0]}\n`
			}
			mentions(teks, mentioned, true)
			client.groupDemoteAdmin(from, mentioned)
		    } else {
			mentions(`Perintah di terima, Menurunkan : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
			client.groupDemoteAdmin(from, mentioned)
		    }
		    break
			 case `${prefix}listadmins`:
			 case `${prefix}listadmin`:
			 case `${prefix}adminlist`:
			 case `${prefix}adminslist`:
				if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
					no += 1
					teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
		     break
			 case `${prefix}promote`:
		     case `${prefix}pm`:
					if (!isGroup) return reply(mess.only.group)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
					teks = 'Perintah di terima, anda menjdi admin :\n'
					for (let _ of mentioned) {
						teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					 break
					 case `${prefix}welcome`:
					if (!isGroup) return reply(mess.only.group)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Sudah aktif Sebelumnya')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('Sukse Mengaktifkan Welcome')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('Sukses menonaktifkan welcome')
					} else {
					reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
                     break
					 case `${prefix}add`:
					if (!isGroup) return reply(mess.only.group)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add siapa??')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara Gan')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
			    break
			    case `${prefix}kick`:
					if (!isGroup) return reply(mess.only.group)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
				break 
				case `${prefix}online`:
				case `${prefix}listonline`:
                if (!isGroup) return reply(`Only group`)
                let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
                let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid]
                client.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, {
                    quoted: freply,
                    contextInfo: { mentionedJid: online }
                })
                break
                case `${prefix}infoall`:
					if (!isGroup) return reply(mess.only.group)
					var nom = mek.participant
					members_id = []
					teks = '\n'
					for (let mem of groupMembers) {
						teks += `┣❥   @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(`*From :* - [ 𝙎𝙀𝙇𝙁 𝘽𝙊𝙏 ] -\n*Info :*  ${body.slice(9)}\n*Total Member :* ${groupMembers.length} \n\n┏━━━⟪ *INFORMATION* ⟫━━━┓`+teks+'╚═ *「 SELFBOT 」* ', members_id, true)
					 break
					 case `${prefix}edotensei`:
					 case `${prefix}edotense`:
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di edotense!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, edotense :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, edotense : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
					case `${prefix}notif`:
if (!isGroup) return reply(mess.only.group)
teks = `*NOTIF*\n\nNotif dari @${sender.split("@")[0]}\n*Pesan : ${body.slice(7)}*\n\n*SELFBOT*`
group = await client.groupMetadata(from);
member = group['participants']
jids = [];
member.map(async adm => {
  jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
  text: teks,
  contextInfo: {
mentionedJid: jids
  },
  quoted: freply
}
await client.sendMessage(from, options, text)
 break
 case `${prefix}leave`: 
				    if (!isGroup) return reply(mess.only.group)
			    	anu = await client.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
break
	//********** STORAGE **********//
 case `${prefix}addstik`:
				if (!isQuotedSticker) return reply('Reply stiker nya')
				svst = body.slice(9)
				if (!svst) return reply('Nama sticker nya apa?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await client.downloadMediaMessage(boij)
				setiker.push(`${svst}`)
				fs.writeFileSync(`./temp/stick/${svst}.webp`, delb)
				fs.writeFileSync('./temp/stik.json', JSON.stringify(setiker))
				client.sendMessage(from, `Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststik`, MessageType.text, { quoted: freply })
break
 case `${prefix}getstik`:
				namastc = body.slice(9)
				try {
				result = fs.readFileSync(`./temp/stick/${namastc}.webp`)
				client.sendMessage(from, result, sticker,{quoted:freply})
				} catch {
				  reply('Nama Sticker Tidak Terdaftar ?🤔')
				}
				 break
			 case `${prefix}liststik`:
				teks = '*Sticker list :*\n\n'
				for (let awokwkwk of setiker) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${setiker.length}*`
				client.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": setiker } })
				 break
				 case `${prefix}addimg`:
				if (!isQuotedImage) return reply('Reply imagenya')
				svst = body.slice(8)
				if (!svst) return reply('Nama imagenya apa')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await client.downloadMediaMessage(boij)
				imagenye.push(`${svst}`)
				fs.writeFileSync(`./temp/foto/${svst}.jpeg`, delb)
				fs.writeFileSync('./temp/image.json', JSON.stringify(imagenye))
				client.sendMessage(from, `Sukses Menambahkan image\nCek dengan cara ${prefix}listimg`, MessageType.text, { quoted: freply })
		  break
		  case `${prefix}getimg`:
				namastc = body.slice(8)
				try {
				buffer = fs.readFileSync(`./temp/foto/${namastc}.jpeg`)
				client.sendMessage(from, buffer, image, { quoted: freply, caption: `Nih Image  : ${namastc}.jpeg` })
				} catch {
				  reply('Nama Image Tidak Terdaftar ?🤔')
				}
				 break
				 case `${prefix}listimg`:
				teks = '*Image list :*\n\n'
				for (let awokwkwk of imagenye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${imagenye.length}*`
				client.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": setiker } })
				break
				case `${prefix}addvid`:
				if (!isQuotedVideo) return reply('Reply vidionya')
				svst = body.slice(8)
				if (!svst) return reply('Nama vidionya apa')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await client.downloadMediaMessage(boij)
				imagenye.push(`${svst}`)
				fs.writeFileSync(`./temp/video/${svst}.mp4`, delb)
				fs.writeFileSync('./temp/video.json', JSON.stringify(imagenye))
				client.sendMessage(from, `Sukses Menambahkan video\nCek dengan cara ${prefix}listvideo`, MessageType.text, { quoted: freply })
 break
 case `${prefix}listvid`:
				teks = '*List Video :*\n\n'
				for (let awokwkwk of videonye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${videonye.length}* `
				client.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": imagenye } })
				 break
			 case `${prefix}getvid`:
				namastc = body.slice(8)
				try {
				buffer = fs.readFileSync(`./temp/video/${namastc}.mp4`)
				client.sendMessage(from, buffer, video, { quoted: freply, caption: `Nih Video : ${namastc}.mp4` })
				} catch {
				  reply('Nama Video Terdaftar ?🤔')
				}
				break
				case `${prefix}addvn`:
				if (!isQuotedAudio) return reply('Reply vnnya')
				svst = body.slice(7)
				if (!svst) return reply('Nama audionya apa')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await client.downloadMediaMessage(boij)
				audionye.push(`${svst}`)
				fs.writeFileSync(`./temp/audio/${svst}.mp3`, delb)
				fs.writeFileSync('./temp/vn.json', JSON.stringify(audionye))
				client.sendMessage(from, `Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`, MessageType.text, { quoted: freply })
				 break
 case `${prefix}getvn`:
				namastc = body.slice(7)
				try {
				buffer = fs.readFileSync(`./temp/audio/${namastc}.mp3`)
				client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: freply, ptt: true })
				} catch {
				  reply('Pack tidak terdaftar')
				}
			break
			case `${prefix}listvn`:
			case `${prefix}vnlist`:
				teks = '*List Vn:*\n\n'
				for (let awokwkwk of audionye) {
				teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${audionye.length}*`
				client.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": audionye } })
				 break
				//********** DOWNLOAD **********//
				 case 'play':
				reply(`Sedang Mencari Data...`)
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytplay2?apikey=${LolKey}&query=${query}`)
                    get_result = get_result.result
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, ini_buffer, image, { quoted: mek, caption: get_result.title })
                    get_audio = await getBuffer(get_result.audio)
              client.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, filename: `${get_result.title}.mp3`, quoted: ftoko})
              break
			  case `${prefix}play2`:   
				 if (args.length < 1) return reply('*Masukan judul nya?*')
                client.sendMessage(from, mess.wait, text,{quoted : freply})
				play = args.join(" ")
				anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp4?q=${play}&apikey=apivinz`)
				if (anu.error) return reply(anu.error)
				infomp3 = ` *Video Ditemukan!!!*
				
Judul : ${anu.result.title}
Source : ${anu.result.source}
				
*_Tunggu Sebentar.._*`
				buffer = await getBuffer(anu.result.thumbnail)
				buffer1 = await getBuffer(anu.result.url_video)
				client.sendMessage(from, buffer, image, {quoted: freply, caption: infomp3})
				client.sendMessage(from, buffer1, video, {mimetype: 'video/mp4', filename: `${anu.result.video}.mp4`, quoted:freply, caption: 'Nih Gan'})
	   break 
       case `${prefix}ig`:
          if (args.length < 1) return reply('*Masukan Url nya?*')
          query = args.join(" ")
					anu = await fetchJson(`https://api.zeks.xyz/api/ig?url=${query}&apikey=${ZeksApi}`, {method: 'get'})
					tods = ` Instagram DOWNLOADER

Username : ${anu.owner}
Caption : ${anu.caption}
`
					client.sendMessage(from, mess.wait, text,{quoted : freply})
					buffer = await getBuffer(anu.result[0].url)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.result[0].url}.mp4`, quoted: freply, caption : tods})
 break 
 case `${prefix}fb`:
  if (args.length < 1) return reply('*Masukan Url nya?*')
  query = args.join(" ")
					anu = await fetchJson(`https://videfikri.com/api/fbdl/?urlfb=${query}`, {method: 'get'})
					wing = ` *F A C E B O O K DOWNLOADER*
					
*Judul :* ${anu.result.judul}`
					client.sendMessage(from, mess.wait, text,{quoted : freply})
					buffer = await getBuffer(anu.result.url)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.result.url}.mp4`, quoted: freply, caption: wing})
					 break 
					
 case `${prefix}tiktok`:
  if (args.length < 1) return reply('*Masukan Url nya?*')
					query = args.join(" ")
					anu = await fetchJson(`https://api.zeks.xyz/api/tiktok?url=${query}&apikey=${ZeksApi}`, {method: 'get'})
					client.sendMessage(from, mess.wait, text,{quoted : freply})
					pyu = `*TIKTOK DOWNLOADER*
					
Author : ${anu.author}
Title : ${anu.title}	`
					buffer = await getBuffer(anu.no_watermark)
					buff = await getBuffer(anu.audio)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.no_watermark}.mp4`, quoted: freply, caption: pyu})
					client.sendMessage(from, buff, audio, {quoted : freply})
				 break
				 case 'ytmp4':
				reply(`Sedang Mencari Data...`)
                    if (args.length == 0) return reply(`link?`)
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytvideo?apikey=${LolKey}&url=${ini_link}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Uploader : ${get_result.uploader}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `View : ${get_result.view}\n`
                    ini_txt += `Like : ${get_result.like}\n`
                    ini_txt += `Dislike : ${get_result.dislike}\n`
                    ini_txt += `Description :\n ${get_result.description}`
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, ini_buffer, image, { quoted: ftoko, caption: ini_txt })
                    get_audio = await getBuffer(get_result.link[0].link)
                    client.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: ftoko})
                 break
				 case 'ytmp3':
				reply(`Sedang Mencari Data`)
                    if (args.length == 0) return reply(`Link? 🙂`)
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytaudio?apikey=${LolKey}&url=${ini_link}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Uploader : ${get_result.uploader}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `View : ${get_result.view}\n`
                    ini_txt += `Like : ${get_result.like}\n`
                    ini_txt += `Dislike : ${get_result.dislike}\n`
                    ini_txt += `Description :\n ${get_result.description}`
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, ini_buffer, image, { quoted: ftoko, caption: ini_txt })
                    get_audio = await getBuffer(get_result.link[3].link)
                    client.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3`, quoted: ftoko })
                    break
//********** UPLOAD **********
 case `${prefix}upswtext`:
					client.updatePresence(from, Presence.composing)
					client.sendMessage('status@broadcast', `${q}`, extendedText)
					client.sendMessage(from, `Sukses Up story wea teks ${q}`, text,{quoted : freply})
				 break
				 case `${prefix}upswimg`:
					client.updatePresence(from, Presence.composing)
					if (isQuotedImage) {
						const swsw = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						cihcih = await client.downloadMediaMessage(swsw)
						client.sendMessage('status@broadcast', cihcih, image, { caption: `${q}` })
					}
					bur = `Sukses Upload Story Image dengan Caption: ${q}`
					client.sendMessage(from, bur, text, { quoted: mek })
				 break
				 case `${prefix}upswvideo`:
					client.updatePresence(from, Presence.composing)
					if (isQuotedVideo) {
					const swsw = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					cihcih = await client.downloadMediaMessage(swsw)
					client.sendMessage('status@broadcast', cihcih, video, { caption: `${q}` })
					}
					bur = `Sukses Upload Story Video dengan Caption: ${q}`
					client.sendMessage(from, bur, text, { quoted: mek })
				 break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'yellow'))
		}
	})
}
starts()
/*

<=======THANKS TO : ========>
[1] Mhanbarbar <ScOri>
[2] Land Ofc <Recode>
[3] Zitsraa <Recode>

*/