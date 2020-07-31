const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  return printTimes(passTimes);
});

const printTimes = (passtimes) => {
  for (let time of passtimes) {
    const datetime = new Date(0);

    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} (Pacific Daylight Time) for ${time.duration} seconds!`)
  };
}
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP: ' , ip);
  
});*/
/*
fetchCoordsByIP('162.245.144.188', (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coords: ' , coords);
  
});*/
/*
fetchISSFlyOverTimes({ latitude: '49.26660', longitude: '-123.19760' }, (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coords: ' , coords);
  
});*/