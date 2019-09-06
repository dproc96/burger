const db = require("../models");
const manager = require("../utils/manager");

module.exports = function(app, PORT) {
    app.get("/", function(request, response) {
        manager.findAllPosts(db).then(function(results) {
            let data = {
                burgersUndevoured: results.filter((x) => { return !x.devoured; }),
                burgersDevoured: results.filter((x) => { return x.devoured; })
            }
            response.render("index", data);
        }).catch(function(error) {
            response.status(503).end()
        })
    })

    return app;
}