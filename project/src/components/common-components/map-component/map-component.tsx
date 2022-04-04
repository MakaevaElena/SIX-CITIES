import { useEffect, useRef } from 'react';
import { Icon } from 'leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../../hooks/use-map';

import defaultPin from './img/pin.svg';
import activePin from './img/pin-active.svg';

import { CityType, OfferType } from '../../../types/offer-type';

type MapProps = {
  currentCity: CityType;
  offers: OfferType[];
  selectedOffer: number | null;
}

const getIcon = (url: string) => new Icon({
  iconUrl: url,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const defaultIconPin = getIcon(defaultPin);
const activeIconPin = getIcon(activePin);

function MapComponent({ currentCity, offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const { location: { latitude: lat, longitude: lng, zoom } } = currentCity;

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === selectedOffer)
              ? activeIconPin
              : defaultIconPin,
          })
          .addTo(map);
      });
      map.flyTo([lat, lng], zoom);
    }
  }, [map, offers, selectedOffer, currentCity, lat, lng, zoom]);

  return <section style={{ height: '100%' }} ref={mapRef}></section>;
}

export default MapComponent;
