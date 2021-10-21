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

There is only one endpoint (`/api/concerts`) that can be accept several query parameters:

**Search concerts by bands**
GET `/api/concerts?bands={ids}`

where ids are string separated by comma.

**Search concert by latitude/longitude/radius**
GET `/api/concerts?location={"longitude": {long}, "latitude": {lat}, "radius": {rad}}`

where long, lat and rad are strings

You can launch Swagger for testing API with this URL: `http://localhost:3000/api`

### Output

Results are sorted by descending date:

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

## TODO

- Tests (Contract Tests)
- Step 2