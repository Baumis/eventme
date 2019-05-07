const events = [
    {
        id: 0,
        label: 'My event',
        creator: {
            name: 'Jesus'
        },
        settings: {
            background: 'https://images.ctfassets.net/kt8yvydomzor/Fk5CbZQwQoKa2GgMiWMqE/fc0c52be85a370a71671906cef37c35d/rapujuhlien_kattaus_header.jpg?w=1440&h=550&fit=fill&f=top',
            theme: 'dark',
            slug: 'my_event',
        },
        infoPanel: {
            phone: '020202',
            email: 'mikko@valimaa.fi',
            contact: 'Mikko "Xarte" Välimaa',
            address: 'Kylänlahdentie 26',
            date: '04.06.2020'
        },
        guests: [
            {
                name: 'Allu',
                status: 'going'
            },
            {
                name: 'Aleksi',
                status: 'pending'
            },
            {
                name: 'Aerial',
                status: 'mabye'
            },
            {
                name: 'Sergei',
                status: 'declined'
            }
            ,
            {
                name: 'Xseven',
                status: 'declined'
            }
        ],
        components: [
            {
                order: 1,
                type: 'Text',
                data: {
                    title: 'This is event info',
                    content: 'Kahvittelu, kahvitarjoilu tai kahvinjuonti (ruots. fika) on erityisesti Suomessa ja Ruotsissa yleinen sosiaalinen instituutio, jossa kokoonnutaan juomaan kahvia sekä syömään makeita ja suolaisia leivonnaisia ja samalla keskustelemaan. Kahvittelu voi olla työnteon tai kotiaskareet keskeyttävä tauko, kotiin kutsutuille vieraille laadittava, ruokailua kevyempi tarjoilu, työpaikan tai järjestöelämän kokoustarjoilu tai pistäytyminen kahvilassa joko yksin tai isommassa seurueessa. Perinteiset tavat tarjoilla kahvia ja leivonnaisia ovat valmiiksi katettu istumapöytä pienemmälle seurueelle tai noutopöytäperiaatteeseen perustuva seisomapöytä isommalle seurueelle esimerkiksi juhlissa.[1] Kahvittelu on enemmänkin yhdessäoloa korostava sosiaalinen tapahtuma ja virkistäytymiseen tarkoitettu tauko kuin varsinainen ruokailuhetki.[2] Pohjoismaisessa kahvikulttuurissa pelkän kahvin juonti ei kuitenkaan yleensä riitä, vaan perinteisesti kahvin kanssa tarjotaan kahvileipää (ruots. fikabröd) eli pullaa, viinereitä, kakkuja, keksejä tai pikkuleipiä. Ruokaisampi kahvitarjoilu syntyy suolaisista leivonnaisista, kuten karjalanpiirakoista, pasteijoista, voileivistä tai voileipäkakusta. '
                }
            },
            {
                order: 2,
                type: 'Guests',
                data: {
                    title: 'Guests'
                }
            }
        ]
    }
]

const getAll = () => {
    return events
}

const getOne = (id) => {
    return events.find((event) => event.id === id)
}

const create = (label) => {
    events.push({
        id: events.length + 1,
        label,
        creator: {
            id: '1',
            name: 'Sami'
        },
        settings: {
            background: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Hurricane_Lester_22_aug_1992_2246Z.jpg',
            theme: 'light',
            slug: label.replace(/\s/g, '_')
        },
        guests: [],
        components: []
    })
}

const removeComponent = (eventId, order) => {
    const newComponents = events[eventId].components.filter(component => component.order !== order)
    const orderedComponents = newComponents.map((component, i) => {
        component.order = i+1
        return(component)
    })
    events[eventId].components = orderedComponents
    return events[eventId]
}

const addComponent = (eventId, type, data) => {
    events[eventId].components.push({
        order: events[eventId].components.length + 1,
        type,
        data
    })

    return events[eventId]
}

const addGuest = (eventId, name) => {
    events[eventId].guests.push({
        name,
        status: 'pending'
    })

    return events[eventId]
}

export default { getAll, getOne, create, addComponent, addGuest, removeComponent }