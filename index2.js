const {nextISSTimesForMyLocation} = require('./iss_promised');

const printTimes = (response) => {
  for (let time of response) {
    const datetime = new Date(0);

    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} (Pacific Daylight Time) for ${time.duration} seconds!`)
  };
}

nextISSTimesForMyLocation()
	.then((response) => {
		printTimes(response);
	})
	.catch(error => console.log('It\'s didn\'t work: ' + error));

