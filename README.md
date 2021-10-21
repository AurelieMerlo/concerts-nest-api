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

## Step 2

For the previous step, we had 1400 bands across 376 venues, and around 20,000 events. For this step, we ask that you document in your `README.md` how you would architecture your solution if you now had 2 million bands, 10,000 venues, and 200 million events.

Describe in detail : 

### How you would store and query the data?

* usage of Elastic Search and data indexation
* database partitioning: all data in single table and we need to add in query the partition criteria (location, datetime...)
* pagination with cursor approarch (not offset!)
* usage of include with API to embed related objects and reduce number of calls

### What kind of mechanism you would leverage to consistently deliver short response times and guarantee the highest uptime possible?
* GraphQL to get only the most important informations according to a need 
* http caching: ETag caching, last modified, expire header, cache control...

Please then answer the two following questions : 

### What do you identify as possible risks in the architecture that you described in the long run, and how would you mitigate those?
* ES performance optimization only increases as infrastructure grows, log volume grows, reducing the effectiveness of your Elasticsearch clusters => Monitoring (kub) and auto-scaling 
* Poor Performance of GraphQL => query caching (whole query for a period of time)
* slowest queries if database partititioning is not well designed

### What are the key elements of your architecture that would need to be monitored, and what would you use to monitor those?
* Service: uptime (with uptimeRobot)
* Infra: Memory & CPU Usage on server (with Grafana, kubernetes)
* Database: Requests Per Minute (RPM), Latency (with NewRelic)
* Api: Failure Rate, Monitoring of 4** and 5**
* Security (rate-limiting strategy): number of transactions per second, per IP address to prevent DDoS-like slowdowns

## TODO

- Tests (Contract Tests)
- Fix sql error on searchByLocation
- Usage of class-validator instead of throws