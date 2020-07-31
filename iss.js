const request = require('request');

  
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coord,(error, times) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};


const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', function(error, response, body) {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(IP, callback) {
  request('https://ipvigilante.com/' + IP, function(error, response, body) {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).data;
    const coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    return callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const LAT = coords.latitude;
  const LON = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`, function(error, response, body) {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyovertine for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).response;
    return callback(null, data);
  });
};

module.exports = {nextISSTimesForMyLocation};


// let ip = "173.183.117.182";
/*
const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', function(error, response, body) {
    if (error)  {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    
    callback(null, ip);
  });
};*/
/*
const fetchCoordsByIP = function(IP, callback) {
  // ip = "173.183.117.182"
  request('https://ipvigilante.com/' + IP, function(error, response, body) {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      return callback(error, null);
    }
    const data = JSON.parse(body).data;
    // console.log(data)
    // const longitude = JSON.parse(body)["data"].longitude;
    const coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    return callback(null, coords);
  });
};*/
/*
const fetchISSFlyOverTimes = function(coords, callback) {
  const LAT = coords.latitude;
  const LON = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`, function(error, response, body) {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyovertine for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (error) {
      return callback(error, null);
    }
    const data = JSON.parse(body).response;
    
    // const [{risetime, duration}] = data;
    return callback(null, data);
  });
};*/


