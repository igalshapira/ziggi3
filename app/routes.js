module.exports = function(app) {
  require('./api/api')(app);

  app.use(function(request, response, next){
    response.status(404);
    response.end(404);
  });
};