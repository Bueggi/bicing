This project was originally started by @rusomarques - with his concideration I forked the project and together with @momentmuse we added and improved parts of the project


<p align="center">
  <img src="./assets/logo.png" width="50%">
</p> 

---

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Parkbicing is a web app that help you keep track of free spaces in your [Bicing](https://www.bicing.cat/) destination station.  Bicing service is Barcelona urban transport based on sharing bicycles. 

1. Select destination and keep track of free slots
2. Keep track of free slots in closest stations to destination
3. Get notified when amount of slots are below a customizable minimum 
4. No more slots in destination? Get notified of the nearest stations with free slots
5. Be aware of out of service station

  <p align="center">
    <img src="./assets/bicis_bicing_new.jpg" width="80%">
  </p> 

## Table of contents

* [Screenshots](#screenshots)
* [Getting started](#getting-started)
* [Installation](#installation)
* [Tech Stack](#tech-stack)
* [APIs](#apis) 
* [Author](#author)
* [License](#license)

## Screenshots

<div>
  <img src="./assets/parkbicing_1.jpeg" alt="home" width="32%"> &nbsp;&nbsp;
  <img src="./assets/parkbicing_2.jpeg" alt="route" width="32%"> &nbsp;&nbsp;
  <img src="./assets/parkbicing_3.jpeg" alt="favorite stations" width="32%">
</div>

## Getting started

Apart from the regular aspects: Git, Node, Npm, you need to install Angular CLI and request a google maps api key to work on ParkBicing. Follow these instructions before you continue with *Installation*.

* [Install Angular CLI](https://angular.io/cli)
* Request [Google API Key](https://cloud.google.com/maps-platform/products/?hl=es): make sure your key has enabled [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) and [Directions API](https://developers.google.com/maps/documentation/directions/start) 

## Installation

1. Clone this repo and enter

    ```bash
      git clone https://github.com/rusomarques/parkBicing
      cd parkBicing
    ```

2. Install dependencies (server & Angular app)

   ```bash
   cd server
   npm install
   cd ../my-app
   npm install
   ```

3. Run server

   ```bash
   cd server
   node index.js
   ```

4. Create an environment.ts file in /my-app/src/environments to save Google API key

```typescript
export const environment = {
  production: false,
  GMAPS_API_KEY: 'paste-your-key'
};
```

5. Run angular app

   ```bash
   cd my-app
   ng serve --open
   ```

6. Enjoy the app and provide us with feedback! 

## Tech stack

**Front-end**: [Angular](https://angular.io/) 

**Back-end**: [Koa](https://koajs.com/) proxy server


## APIs

- Data source is [Barcelona Bicing Stations](http://wservice.viabicing.cat/v2/stations) from [Open Data BCN](http://opendata-ajuntament.barcelona.cat/es/) 
- Angular app makes use of [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key) 


## Author

Leandro Marques - [GitHub](https://github.com/rusomarques) - [LinkedIn](https://www.linkedin.com/in/leandro-marques-32b480112/)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/cherlin/trash-walk-backend/blob/develop/LICENSE) file for detail
