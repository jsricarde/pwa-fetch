/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */

(function () {
  'use strict';

  const heroAPIKey = '1723215147795599';

  const heroAPIUrlBase =
    `http://superheroapi.com/api/${heroAPIKey}`;

  const urlMainStructure = './main_structure.json'

  const rootElement = document.getElementById('root')

  var app = {
    isLoading: true,
    visibleCards: {},
    justiceLeaguIDList: [ 69, 644, 306, 720, 263 ],
    justiceLeagueObj: {}
    // spinner: document.querySelector('.loader'),
    // cardTemplate: document.querySelector('.cardTemplate'),
    // container: document.querySelector('.main'),
    // addDialog: document.querySelector('.dialog-container'),
    // daysOfWeek: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
  };

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  // if ('serviceWorker' in navigator &&
  //   (window.location.protocol === 'https:' || isLocalhost)) {
  //   navigator.serviceWorker.register('service-worker.js')
  //     .then(function(registration) {
  //       // updatefound is fired if service-worker.js changes.
  //       registration.onupdatefound = function() {
  //         // updatefound is also fired the very first time the SW is installed,
  //         // and there's no need to prompt for a reload at that point.
  //         // So check here to see if the page is already controlled,
  //         // i.e. whether there's an existing service worker.
  //         if (navigator.serviceWorker.controller) {
  //           // The updatefound event implies that registration.installing is set:
  //           // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
  //           var installingWorker = registration.installing;

  //           installingWorker.onstatechange = function() {
  //             switch (installingWorker.state) {
  //               case 'installed':
  //                 // At this point, the old content will have been purged and the
  //                 // fresh content will have been added to the cache.
  //                 // It's the perfect time to display a "New content is
  //                 // available; please refresh." message in the page's interface.
  //                 break;

  //               case 'redundant':
  //                 throw new Error('The installing ' +
  //                   'service worker became redundant.');

  //               default:
  //               // Ignore
  //             }
  //           };
  //         }
  //       };
  //     }).catch(function(e) {
  //       console.error('Error during service worker registration:', e);
  //     });
  // }

  // Your custom JavaScript goes here
  document.addEventListener('DOMContentLoaded', () => {

    app.getJSON(urlMainStructure).then(result => {
      console.log('final result', result);
      if (result) app.loadSuperHeroes(result)
    })
    // localforage.getItem('justiceLeague', (err, jlList) => {
    //   if (jlList && jlList.length > 0) {
    //     // console.log('jlList', jlList);
    //     // app.selectedCities = cityList;
    //     // app.selectedCities.forEach(city => {
    //     //   app.getForecast(city.key, city.label);
    //     // })
    //   } else {
    //     // app.updateForecastCard(injectedForecast);
    //     // app.selectedCities = [
    //     //   { key: injectedForecast.key, label: injectedForecast.label }
    //     // ];
    //     // app.storageCities();
    //   }
    // })
  })

  app.getJSON = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(JSON.stringify(result))
      return result;
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  };

  app.loadSuperHeroes = (data) => {
    if (data) {
      const objJLA = data
      objJLA.forEach(item => {
        console.log(item)
        app.printSuperHero(item)
      })
    }
  }

  app.printSuperHero = (data) => {
    if (data) {
      const heroElement = document.createElement('div');
      heroElement.insertAdjacentHTML('beforeend', `<h1>${data.name}</h1>`)
      rootElement.appendChild(heroElement)
      app.getImage(data.image.url).then(imgRes => {
        const imgElem = document.createElement('img');
        const imgUrl = URL.createObjectURL(imgRes);
        imgElem.src = imgUrl;
        heroElement.appendChild(imgElem);
      })


    }
  }

  app.getImage = async (url) => {
    const headers = new Headers({ 'Content-Type': 'image/jpeg', 'Access-Control-Allow-Origin': '*' });
    const options = {
      method: 'GET',
      headers,
      mode: 'cors',
    };
    const request = new Request(url, options);
    try {
      const response = await fetch(request);
      const result = await response.blob();
      return result;
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }


  app.getMainMembers = () => {

    app.justiceLeaguIDList.map
    app.justiceLeaguIDList.forEach(id => {
      const url = `${heroAPIUrlBase}/${id}`;
      app.getJSON(url).then(result => {
        console.log('final result', result);
        app.justiceLeagueObj[ id ] = result;
      })
    });

    // console.log('obj justice', JSON.stringify(app.justiceLeagueObj))
    // var div = document.getElementById('main');
    //    console.log(div);

    // div.innerHTML = app.justiceLeagueObj;
  };
  // app.getMainMembers();
})();
