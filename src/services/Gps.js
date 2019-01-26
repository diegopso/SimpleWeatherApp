export const $gps = {
  get: () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (__DEV__)
            console.log(position);
          resolve(position);
        },
        error => {
          if (__DEV__)
            console.error(position);
          reject(error);
        }
      );
    });
  },
}