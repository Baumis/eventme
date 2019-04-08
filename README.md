# Eventme

````
this.state = {
    label: "My event",
    settings: {
        background: "www.kuva.fi/kuva1",
        theme: "dark",
        slug: "www.eventme.fi/my_event"
    },
    components: [
        {
            type: "text",
            data: {
                text: "this is my event"
            }
        },
        {
            type: "text",
            data: {
                text: "this will be great!"
            }
        },
        {
            type: "picture",
            data: {
                url: "www.kuva.fi/kuva3"
            }
        },
        {
            type: "map",
            data: {
                latitude: 60.169857,
                longitude: 24.938379
            }
        },
    ]
}