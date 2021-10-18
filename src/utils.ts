import { Concerts } from './concerts/concerts.entity';

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
};

export function serializedItem(concert: Concerts) {
  const bandName = concert.band.name;
  const venueName = concert.venue.name;
  const venueLongitude = concert.venue.longitude;
  const venueLatitude = concert.venue.latitude;

  return {
    band: bandName,
    location: venueName,
    date: concert.date,
    latitude: venueLatitude,
    longitude: venueLongitude,
  }
}
