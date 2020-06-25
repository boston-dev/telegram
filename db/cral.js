let cral={
    async jodList(url){
        let index=[] // {title,list}
        console.log(url)
        await http.get(decodeURIComponent(url)).then(res =>{
            let $ = cheerio.load(res.data,{ decodeEntities: false });
            $('.col-video').each(function (k,v) {
                index.push({
                    _id:$(this).find('a').attr('href').split('/')[2],
                    title:$(this).find('img').attr('alt'),
                    vod:2,
                    img:$(this).find('img').attr('data-original') || $(this).find('img').attr('src')
                })
            })

        }).catch(e => console.log(1))
        return  index
    },
}
