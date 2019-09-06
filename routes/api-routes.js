const db = require("../models");
const manager = require("../utils/manager")

module.exports = function(app) {
    app.get("/api", function(request, response) {
        manager.findAllPosts(db).then(function (results) {
            response.json(results);
        }).catch(function (error) {
            response.status(503).end()
        })
    })

    app.post("/api/new", function(request, response) {
        let data = request.body;
        if (!data.burger_name) {
            response.status(400).end();
        }
        db.burgers.create({
            burger_name: data.burger_name
        }).then(function(results) {
            response.status(200).end();
        }).catch(function (error) {
            response.status(503).end()
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
            if (results.affectedRows === 0) {
                response.status(404).end()
            }
            response.status(200).end()
        }).catch(function(error) {
            response.status(503).end()
        })
    })

    return app;
}