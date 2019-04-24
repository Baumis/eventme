# Eventme

## Mockup
![Mockup](https://drive.google.com/uc?export=view&id=1YEtA9I5UnYoyMS0ZCKzxmD08vL8OgLCJ)

## Development

````
npm install
npm start
````

## Code style

- Rules can be found in .eslintrc.js

- To make automatic style check
````
npm run lint
````
- To make continuous style check add ESLint extension to VSCode


## App state structure

````
this.state = {
    loading: true,
    event: {
        ...
    }
}
````

## Event structure
````
event = {
    id: 1,
    label: "My event",
    settings: {
        background: "www.kuva.fi/kuva1",
        theme: "dark",
        slug: "my_event"
    },
    infoPanel: {
        phone: '020202',
        email: 'mikko@valimaa.fi',
        contact: 'Mikko "Xarte" Välimaa',
        address: 'Kylänlahdentie 26',
        date: '04.06.2020'
    },
    components: [
        {
            order: 1,
            type: "text",
            data: {
                text: "this is my event"
            }
        },
        {
            order: 2,
            type: "text",
            data: {
                text: "this will be great!"
            }
        },
        {
            order: 3,
            type: "picture",
            data: {
                url: "www.kuva.fi/kuva3"
            }
        },
        {
            order: 4,
            type: "map",
            data: {
                latitude: 60.169857,
                longitude: 24.938379
            }
        }
    ]
}
````
