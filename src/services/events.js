const events = [
    {
        id: 0,
        label: 'My event',
        settings: {
            background: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Hurricane_Lester_22_aug_1992_2246Z.jpg',
            theme: 'dark',
            slug: 'my_event'
        },
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
        settings: {
            background: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Hurricane_Lester_22_aug_1992_2246Z.jpg',
            theme: 'light',
            slug: label.replace(/\s/g, '_')
        },
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

export default { getAll, getOne, create, addComponent }