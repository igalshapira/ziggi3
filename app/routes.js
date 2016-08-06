module.exports = function(app) {
  require('./api/api')(app);

  app.get("/", function(request, response) {
  	response.render("pages/main", {
  		assets: app.get('assets')
  	});
  });

  app.get("/map", function(request, response) {
    response.render("pages/map", {
      assets: app.get('assets')
    });
  });

  app.get("/calendar", function(request, response) {
    response.render("pages/calendar", {
      assets: app.get('assets')
    });
  });

  app.use(function(request, response, next){
    response.status(404);
    response.end("404");
  });
};