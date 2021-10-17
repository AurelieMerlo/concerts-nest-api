## Description

A single API Endpoint that returns the concerts matching the criterias given by the user.
Made with NestJS framework.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start --watch

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Contract

### Objects

- `BAND` : `id` and `name`
- `VENUE` : places with `id`, `name`, and coordinates `latitude`/`longitude`
- `CONCERT` : concert with `venueId`, `bandId` and `date` (UNIX timestamp in miliseconds)

### Input

I use Postman to sending requests when server is started (`yarn start --watch`)

**Search concerts by bands**
GET `/v1/concerts?bands={ids}`

ids = integers, comma separated list

**Search concert by latitude/longitude/radius**
GET `/v1/concerts?lat=x,lg=x,radius=z`

lat, lg = float
radius = integer

### Output

Result is sorted by descending date

```json
{
  "data": [
    {
        "band": "Radiohead",
        "location": "Point Ephémère, Paris, France",
        "date": 1569531810650,
        "latitude": 48.8814422,
        "longitude": 2.3684356
    }
  ]
}
```

### Error Message

**When band is unknown**
GET `/v1/concerts?bands=0`

```json
{
  "errors": [
    {
      "status": "404",
      "title":  "Not Found"
    }
  ]
}
```

**When query is malformed**
GET `/v1/concerts`

```json
{
  "errors": [
    {
      "status": "400",
      "title":  "Invalid Parameters",
      "detail":  "Missing `bands` query parameter."
    }
  ]
}
```

