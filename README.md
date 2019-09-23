# Pit Stop Map
Mapbox project for San Francisco Public Works, which operates Pit Stops in partnership with the nonprofit SF Clean City.

## Resources
* [Here's their 9/2019 data in a GSheet](https://docs.google.com/spreadsheets/d/1JCVRk_QrMEd8EsUJdAX4_P4I-Xhc-eCmUTknb0Z_VYY/edit#gid=0).
* [Here's their current webpage and map](https://sfpublicworks.wixsite.com/pitstop)
* [Here's our internal Mapbox ticket](https://github.com/mapbox/community-projects/issues/394)
* [Here's their API for this live data set](https://data.sfgov.org/Health-and-Social-Services/Pit-Stop-Locations/2gny-9qcr
).

## Get started

1. Clone the repo to your local:

```
git clone git@github.com:domlet/pit-stop-map.git
```
2. Add your token safely:
```
touch .gitignore
open .gitignore
touch config.js
open config.js
```
Type this into `.gitignore` then save and close.
```
config.js
```
Type this into `config.js`:
```
var config = {
  MAPBOX_SECRET_TOKEN : 'pk.eyJ1IjoiZG9tYm94IiwiYSI6ImNqeXo0aHJxYjA3dnozY3BxbGw2a2dsNWQifQ.p9uWoaFSE6qSIY415Q8cSQ',
}
```
Then replace `pk.eyJ1IjoiZG9tYm94IiwiYSI6ImNqeXo0amwxcjAxMmQzY3J0d3F6b2JkOTgifQ.ef_wY4EWLDKLbvxmB75BHg` (that is a restricted token belonging to Mapbox user `dombox` and it won't work for you) with your own token from https://accounts.mapbox.com

3. Open `index.html` in your browser and the page (with a working map) should load.

## Preview
* https://twitter.com/domlet/status/1176210664743792640
