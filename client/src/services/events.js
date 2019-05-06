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
                    content: 'syödään juodaan syödään juodaan'
                }
            },
            {
                order: 2,
                type: 'Text',
                data: {
                    title: 'Good to know',
                    content: 'pidetään hauskaa jee jee'
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