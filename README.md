# Eventme

## Mockup
![Mockup](https://drive.google.com/uc?export=view&id=1YEtA9I5UnYoyMS0ZCKzxmD08vL8OgLCJ)

## Development

### Client

````
npm install
npm start
````
Running on localhost:3000

### Server

````
npm install
create .env file to root of server folder if not created
npm start
````
Running on localhost:3001

## Api routes

### /api/events

- GET, returns all events
- POST, creates an event

### /api/events/template

- GET, returns a event template without guests, creator and id

### /api/events/:id

- GET, returns event with given id
- PUT, updates event with given id
- DELETE, removes event with given id

### /api/users

- GET, returns all users
- POST, creates an user

### /api/users/:id

- GET, returns user with given id
- PUT, updates user with given id
- DELETE, removes user with given id

### /api/login

- POST, returns signed in user and token

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
    _id: "5cd467bf23c640324cf1ec00",
    label: "My event",
    settings: {
        background: "www.kuva.fi/kuva1"
    },
    infoPanel: {
        phone: '020202',
        email: 'mikko@valimaa.fi',
        contact: 'Mikko "Xarte" Välimaa',
        address: 'Kylänlahdentie 26',
        date: '2019-06-17T18:22:49.820+00:00'
    },
    creator: {
        _id: "5cd445507c2a502a18cba5ca",
        username: "admin",
        name: "John Doe",
        email: "admin@example.com"
    },
    guests: [
        {
            status: "GOING",
            user: {
                _id: "5cd445507c2a502a18cba5ca",
                name: "John Doe"
            }
        },
        {
            status: "PENDING",
            user: {
                _id: "nv83h48f3h4f87h34nfu",
                name: "Jane Doe"
            }
        }
    ],
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
## Ideas
- Samma linkki till alla. Invite sker med delande av länk: www.evemtme.com/28f7h348fh83f028
- När man anländer till sidan skall inloggning ske för att bli guest
- Tre olika user types (ADMIN, GUEST, GHOST)
- 3 sidor: search/login (create), event, profile

## Colors
Gray (#373B3F, #595F65, #B2BFCB, #7A838C)
Green (#2eb82e)
