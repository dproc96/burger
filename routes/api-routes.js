const db = require("../models")

module.exports = function(app) {
    app.get("/api", function(request, response) {
        db.burgers.findAll().then(function(results) {
            response.json(results);
        })
    })

    app.post("/api/new", function(request, response) {
        let data = request.body;
        db.burgers.create({
            burger_name: data.burger_name
        }).then(function(results) {
            response.status(200).end();
        })
    })

    app.put("/api/:id", function(request, response) {
        let id = request.params.id;
        let data = request.body;
        db.burgers.update({
            burger_name: data.burger_name,
            devoured: data.devoured
        }, {
            where: {
                id: id
            }
        }).then(function(results) {
            response.status(200).end()
        }).catch(function(error) {
            response.status(503).end()
        })
    })

    return app;
}