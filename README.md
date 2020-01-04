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

### /api/events/:id

- GET, returns event with given id
- PUT, updates event with given id and returns updated event
- DELETE, removes event with given id

### /api/events/:id/removeguest/:guestId
- POST, removes given guest from event and returns updated event

### /api/events/:id/addguest/:guestId
- POST, adds given guest to event and returns updated event

### /api/events/:id/setstatus/:userId
- POST, changes status of guest in event

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
    background: "www.kuva.fi/kuva1",
    startDate: "2019-07-25T19:02:52.178Z",
    endDate: "2019-07-25T19:02:52.178Z",
    creator: {
        _id: "5cd445507c2a502a18cba5ca",
        name: "John Doe"
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

ADD

Trycker på + för att lägga till en komponent
Det frågas vad för komponent vi vill lägga till med en liten förklaring vad komponenten gör (ingen data ges här ennu)
Välj komponent
Tryck på "add" elr dylikt
Komponenten visas med någon placeholder data elr inget alls

EDIT

tryck på edit som nu också
editeringen sker inline, dvs inne i själva componenten. Med t.ex. contenteditable="true" i TEXT komponenten
Edit mode går att stoppa med t.ex. nån knapp som dyker upp "OK"
Save för att ändringarna skall sparas

## Colors
Gray (#373B3F, #595F65, #B2BFCB, #7A838C)
Green (#2eb82e)
