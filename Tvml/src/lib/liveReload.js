import io from 'socket.io-client';

/*
import * as router from 'lib/router';
*/

function resume({lastLocation}) {
  if (!lastLocation) { return; }

  //router.goTo(lastLocation);
}

export function connect(launchOptions = {}) {
  const socket = io('http://localhost:8001');

  socket.on('connect', () => console.debug('Live reload: connected') );
  socket.on('compile', () => console.debug('Live reload: compiling, prepare for reload') );

  socket.on('live-reload', () => {
    App.reload({when: 'now'}, {
      //lastLocation: router.getLocation()
    });
  });


  if (launchOptions.reloadData) {
    resume(launchOptions.reloadData || {});
  }
}
