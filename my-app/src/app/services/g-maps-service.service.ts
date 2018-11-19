import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GMapsServiceService {

  constructor() { }

  loadScript(url, id, c): void {
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = id;
      script.addEventListener('load', function(e) {
        c(null, e);
      }, false);
      document.head.appendChild(script);
      console.log(url, id);
    }
  }

}
