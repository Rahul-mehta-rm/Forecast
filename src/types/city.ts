export interface City {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface CityMatch {
  item: City;
  refIndex: number;
}