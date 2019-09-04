module.exports = function(sequelize, DataTypes) {
    let Burgers = sequelize.define("burgers", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return Burgers;
}