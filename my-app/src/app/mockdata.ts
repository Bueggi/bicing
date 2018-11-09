import { Station } from './station';

export const STATIONS: Station[] = [
  {
    id: 1,
    type: 'BIKE',
    latitude: 41.397952,
    longitude: 2.180042,
    streetName: 'Gran Via Corts Catalanes',
    streetNumber: '760',
    altitude: '21',
    slots: 6,
    bikes: 23,
    nearbyStations: '24, 369, 387, 426',
    status: 'OPN'
  },
  {
    id: 2,
    type: 'BIKE',
    latitude: 41.39553,
    longitude: 2.17706,
    streetName: 'Roger de Flor/ Gran Vía',
    streetNumber: '126',
    altitude: '21',
    slots: 12,
    bikes: 14,
    nearbyStations: '360, 368, 387, 414',
    status: 'OPN'
  },
  {
    id: 3,
    type: 'BIKE',
    latitude: 41.394055,
    longitude: 2.181299,
    streetName: 'Nàpols',
    streetNumber: '82',
    altitude: '22',
    slots: 18,
    bikes: 9,
    nearbyStations: '4, 6, 119, 419',
    status: 'OPN'
  }
];
