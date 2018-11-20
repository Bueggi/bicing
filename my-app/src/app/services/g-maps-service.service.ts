import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  })
export class GMapsServiceService {
  constructor () {}

  loadScript (url, id, callback): void {
    if (!document.getElementById(id)) {
      console.log('loading script wowww');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = id;
      script.addEventListener(
        'load',
        function (e) {
          callback(null, e);
        },
        false
      );
      document.head.appendChild(script);
    } else {
      callback();
    }
  }
}
