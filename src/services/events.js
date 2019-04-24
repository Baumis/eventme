const events = [
    {
        id: 0,
        label: 'My event',
        creator: {
            name: 'Jesus'
        },
        settings: {
            background: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/10_mile_panorama_of_NYC%2C_Feb.%2C_2018.jpg',
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
                    text: 'this is my event'
                }
            },
            {
                order: 2,
                type: 'Text',
                data: {
                    text: 'this will be great!'
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

export default { getAll, getOne, create, addComponent, addGuest }