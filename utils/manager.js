module.exports = {
    findAll: function(db) {
        return new Promise(function(resolve, reject) {
            db.burgers.findAll().then(function (results) {
                resolve(results);
            }).catch(function (error) {
                reject(error);
            })
        })
    }
}