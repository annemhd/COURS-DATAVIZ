let requestMozart =
    'https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&maximumRecords=20&startRecord=1&query=dc.type%20any%20sonore%20and%20dc.creator%20any%20"mozart%2C%20wolfgang%20amadeus%20%281756-1791%29.%20compositeur"'

let requestBetho =
    'https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&maximumRecords=20&startRecord=1&query=dc.type%20any%20sonore%20and%20dc.creator%20any%20"ludwig%2C%20van%20beethoven%20%281756-1791%29.%20compositeur"'

let requestBach =
    'https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&maximumRecords=20&startRecord=1&query=dc.type%20any%20sonore%20and%20dc.creator%20any%20"jean%2C%20sebastien%20bach%20%281756-1791%29.%20compositeur"'

LoadData(requestMozart).then((data) => {
    let oaiData = data.getElementsByTagName('srw:recordData')
    let PlaylistMozart = []
    let TitlesMozart = []
    for (let i = 0; i < oaiData.length; i++) {
        let gallicadata = oaiData[i]
        let AudioDataMozart = gallicadata.getElementsByTagName('dc:identifier')[0].textContent
        let TitlesDataMozart = gallicadata.getElementsByTagName('dc:title')[0].textContent

        PlaylistMozart.push(AudioDataMozart)
        TitlesMozart.push(TitlesDataMozart)

        document.querySelector('audio').src = PlaylistMozart[0] + '.audio'
        document.querySelector('#playlistMozart').innerHTML +=
            '<li id=' + [i] + ' class="truncate">' + TitlesMozart[i] + '</li>'
    }

    // function playSong(value) {
    //     let a = value.id
    //     el = document.querySelector('#playerMozart')
    //     el.src = PlaylisMozart[a]
    // }

    //console.log(PlaylistMozart)
    //console.log(TitlesMozart)
})

LoadData(requestBetho).then((data) => {
    let oaiData = data.getElementsByTagName('srw:recordData')
    let PlaylistBetho = []
    let TitlesBetho = []
    for (let i = 0; i < oaiData.length; i++) {
        let gallicadata = oaiData[i]
        let AudioDataBetho = gallicadata.getElementsByTagName('dc:identifier')[0].textContent
        let TitlesDataBetho = gallicadata.getElementsByTagName('dc:title')[0].textContent

        PlaylistBetho.push(AudioDataBetho)
        TitlesBetho.push(TitlesDataBetho)

        document.querySelector('audio').src = PlaylistBetho[0] + '.audio'
        document.querySelector('#playlistBetho').innerHTML +=
            '<li id=' + [i] + ' class="truncate">' + TitlesBetho[i] + '</li>'
    }
})

LoadData(requestBach).then((data) => {
    let oaiData = data.getElementsByTagName('srw:recordData')
    let PlaylistBach = []
    let TitlesBach = []
    for (let i = 0; i < oaiData.length; i++) {
        let gallicadata = oaiData[i]
        let AudioDataBach = gallicadata.getElementsByTagName('dc:identifier')[0].textContent
        let TitlesDataBach = gallicadata.getElementsByTagName('dc:title')[0].textContent

        PlaylistBach.push(AudioDataBach)
        TitlesBach.push(TitlesDataBach)

        document.querySelector('audio').src = PlaylistBach[0] + '.audio'
        document.querySelector('#playlistBach').innerHTML +=
            '<li id=' + [i] + ' class="truncate">' + TitlesBach[i] + '</li>'
    }
})

async function LoadData(request) {
    const response = await fetch(request)
    const rawdata = await response.text()
    const xml = await new window.DOMParser().parseFromString(rawdata, 'text/xml')
    return xml
}
