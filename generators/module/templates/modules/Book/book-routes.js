var Router = require('restify-router').Router;
var routerInstance = new Router();
var <%= module %>Service = require('./<%= module %>-service');

module.exports = function(common) {
  // add a route like you would on a restify server instance
  routerInstance.get('/', function respond(req, res, next) {
    <%= module %>Service.getName(function(name) {
      res.json(name);
    });
  });

  return routerInstance;
}
