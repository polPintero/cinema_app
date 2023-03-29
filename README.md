# cinema_app_yellow_media

## [View Result](http://cinema-app.dobuy.com.ua/)
# The Task
Create a web application for cinema (Vue.js OR React.js OR Javascript).
Application should provide next functionality for users: get list of all movies, see all sessions at the cinema, get movie info, find movie by name or/and genres, book ticket on certain movie's session.
Feel free to implement your own UI design.

API

API domain: https://cinema-api-test.y-media.io/v1

Get all movies :

HTTP GET 
/movies 

Search for movie:

HTTP GET 
/movies?movie_id={id}&name={name}&genres={genres}

All search parameters are optional
Movie genres :
ACTION: 0
ADVENTURES: 1
COMEDY: 2
DRAMA: 3
HORROR: 4
WESTERNS: 5



Get movies sessions:

HTTP GET 
/movieShows 
OR
/movieShows?movie_id={id}







Book ticket:

	Check for free places:

HTTP GET 
	/showPlaces?movie_id={id}&daytime={daytime}&showdate={showdate}
	/showPlaces?movie_id=61&daytime=10:50&showdate=2021-06-27

Book place:

HTTP POST
/bookPlace
{
  "movie_id": {id},
  "row": {int},
  "seat": {int},
  "showdate": {string},
  "daytime": {string}
}



Request:
{
  "movie_id": 61,
  "row": 9,
  "seat": 8,
  "showdate": "2021-06-27",
  "daytime": "10:50"
}

Response:
{
    "error_code": 0,
    "error_message": "no errors",
    "data": {
        "movie_id": "61",
        "row": "9",
        "seat": "8",
        "showdate": "2021-06-27",
        "daytime": "10:50",
        "ticketkey": "2a8cfbd5a4945f52e92c6b969f440192"
    }
}


This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
