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
