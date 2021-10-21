import { Bands } from './bands/bands.entity';
import { Concerts } from './concerts/concerts.entity';
import { Venues } from './venues/venues.entity';

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
};

export function serializedItem(concert: Concerts, band: Bands, venue: Venues) {
  const bandName = band.name;
  const venueName = venue.name;
  const venueLongitude = venue.longitude;
  const venueLatitude = venue.latitude;

  return {
    band: bandName,
    location: venueName,
    date: concert.date,
    latitude: venueLatitude,
    longitude: venueLongitude,
  }
}

export function allMandatoriesAttributes(locationParams): boolean {
  const keysParam = Object.keys(JSON.parse(locationParams));
  const coordinatesKeys = ['longitude', 'latitude', 'radius'];

  return keysParam.length === coordinatesKeys.length && keysParam.every((v, i) => v === coordinatesKeys[i]);
}