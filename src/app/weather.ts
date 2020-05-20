export class Weather{
    constructor(
        public cityName: string,
        public countryName: string,
        public weather: string,
        public temp: string,
        public humidity: number,
        public windspeed: number,
        public icon: string
    ){}
}