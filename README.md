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

## API ontract

### Objects

- `BAND` : `id` and `name`
- `VENUE` : places with `id`, `name`, and coordinates `latitude`/`longitude`
- `CONCERT` : concert with `venueId`, `bandId` and `date` (UNIX timestamp in miliseconds)

### Input

I use Postman to sending requests when server is started (`yarn start --watch`)

There is only one endpoint (`/concerts`) that can be accept several query parameters :

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
[
  {
    "band": "Radiohead",
    "location": "Point Ephémère, Paris, France",
    "date": 1569531810650,
    "latitude": 48.8814422,
    "longitude": 2.3684356
  }
]
```

### Error Message

**Wrong endpoint**
GET `concert?longitude=2.37939&latitude=43.6397&radius=10`

```json
{
    "statusCode": 404,
    "message": "Cannot GET /concert?longitude=2.37939&latitude=43.6397&radius=10",
    "error": "Not Found"
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

## TODO

- Tests (Contract Tests)
- Swagger
- Step 2