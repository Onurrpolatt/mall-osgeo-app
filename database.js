const fs = require("fs");
var promise = require("bluebird");
var CONFIG = require("./appConfig");
var pgp = require("pg-promise")(options);
var DATABASE_PGB = pgp(CONFIG.database.postgres);

module.exports = {
  getAllLocations: getAllLocations,
};

var options = {
  promiseLib: promise,
};

function getAllLocations(cb) {
  console.log(cb);
  DATABASE_PGB.any(
    "SELECT mall_name,total_area,total_floor,shop_number,number_elevator,free_wifi,number_parking,prayer_room,baby_room,infirmary,atm,vale,cinema,fitness_center,car_charge,  ST_X(mall_coords) as longitude, ST_Y(mall_coords) as latitude, photo_url_node FROM public.mall_services"
  )
    .then(function (data) {
      cb(null, data);
    })
    .catch(function (err) {
      cb(err);
    });
}
