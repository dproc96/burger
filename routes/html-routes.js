const axios = require("axios")

module.exports = function(app, PORT) {
    app.get("/", function(request, response) {
        axios.get(`http://localhost:${PORT}/api`).then(function(results) {
            let data = {
                burgersUndevoured: results.data.filter((x) => { return !x.devoured; }),
                burgersDevoured: results.data.filter((x) => { return x.devoured; })
            }
            response.render("index", data);
        }).catch(function(error) {
            response.status(503).end()
        })
    })

    return app;
}