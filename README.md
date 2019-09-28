# Pit Stop Map
Mapbox project for San Francisco Public Works, which operates Pit Stops in partnership with the nonprofit SF Clean City.

## Resources
* [Here's their 9/2019 data in a GSheet](https://docs.google.com/spreadsheets/d/1JCVRk_QrMEd8EsUJdAX4_P4I-Xhc-eCmUTknb0Z_VYY/edit#gid=0)
* [Here's their current webpage and map](https://sfpublicworks.wixsite.com/pitstop)
* [Here's our internal Mapbox ticket](https://github.com/mapbox/community-projects/issues/394)
* [Here's their API for this live data set](https://data.sfgov.org/Health-and-Social-Services/Pit-Stop-Locations/2gny-9qcr
)

## Get started

1. Clone the repo to your local:

```
git clone git@github.com:domlet/pit-stop-map.git
```
2. Install pre-requisites:

- [node](https://nodejs.org/en/download/)
with the `pit-stop-map` as your current working directory, run
- `npm install yarn -g`
- `yarn install`

3. Setup the access token

Export it as an environment variable
```
export PITSTOP_SF_ACCESS_TOKEN=your-access-token-here
```

4. Start developing
```
yarn run start
```
Then open `http://localhost:1337/` in your browser, and as you make edits to your code and save, the browser page will refresh automatically!

## Preview
* https://twitter.com/domlet/status/1176210664743792640
