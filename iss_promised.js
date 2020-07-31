const request = require('request-promise-native');

const nextISSTimesForMyLocation = (() => {
  return fetchMyIP()
		.then(fetchCoordsByIP)
		.then(fetchISSFlyOverTimes)
		.then((data) => {
			const response = JSON.parse(data).response;
			return response;
		});
});	


const fetchMyIP = () => {
	return request('https://api.ipify.org/?format=json');
};
const fetchCoordsByIP = (body) => {
	const ip = JSON.parse(body).ip
	return request(`https://ipvigilante.com/${ip}`)
};
 const fetchISSFlyOverTimes = (body) => {
	const coords = JSON.parse(body).data
	const LAT = coords.latitude;
  const LON = coords.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`);
 }

 

module.exports = {nextISSTimesForMyLocation}