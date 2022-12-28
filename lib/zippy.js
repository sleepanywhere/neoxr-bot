const _colors = require('colors'),
    _$ = require('cheerio'),
    _url = require('url'),
    _axios = require('axios'),
    _math = require('mathjs'),
    _https = require('https'),
    got = require('got');

const ZippDL = async (u) => {
    const response = await got(u)
    let $ = _$.load(response.body);
    if (!$('#dlbutton').length) {
        return { error: true, message: $('#lrbox>div').first().text().trim() }
    }
    const url = _url.parse($('.flagen').attr('href'), true)
    const urlori = _url.parse(u)
    const key = url.query['key']
    let temp = []
    let tamp = []
    let time;
    let dlurl;
    try {
        time = /var b = ([0-9]+);$/gm.exec($('#dlbutton').next().html())[1]
        dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (2 + 2 * 2 + parseInt(time)) + '3/DOWNLOAD'  
    } catch (error) {
        time = _math.evaluate(/ \+ \((.*)\) \+ /gm.exec($('#dlbutton').next().html())[1])
        dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
    }
    //////////////////////////////////
    $('.center').each((pos, res) => {
    	reg=/<.+?>/gi
    	res=$(res).html().split(reg)
		temp.push(res.filter(x=>!x.trim().length<1))

    })
    let filetype = $('title').text().match(/\.[0-9a-z]+$/i)[0]
  //////////////////////////////////
  $('.left').each((pos, res) => {
        reg=/<.+?>/gi
        res=$(res).html().split(reg)
        tamp.push(res.filter(x=>!x.trim().length<1))

    })
  //////////////////////////////////
    temp=temp[0]
    tamp=tamp[0]
    judul = temp[2] ? temp[2] : false ? tamp[2] : tamp[2]
    ukuran = temp[4] ? temp[4] : false ? tamp[4] : tamp[4]
    tanggal = temp[6] ? temp[6] : false ? tamp[6] : tamp[6]
    let result = {
        title:judul ,
        size:ukuran  ,
        upload:tanggal,
        filetype,
        url: dlurl
    }
    //return { temp , tamp }
    return { Create:"By Yuki",github:"https://github.com/yukisubagja",error: false, result }
}



module.exports = { ZippDL }