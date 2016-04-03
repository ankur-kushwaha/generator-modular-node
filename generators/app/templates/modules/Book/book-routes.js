var Router = require('restify-router').Router;
var routerInstance = new  Router();
var bookService=require('./book-service');

// add a route like you would on a restify server instance
routerInstance.get('/',function respond(req, res, next) {
  bookService.getName(function(name){
    res.json(name);
  })
});

module.exports=routerInstance;
