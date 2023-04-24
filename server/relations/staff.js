module.exports = (sequelize, DataTypes) => {
    const Staffs = sequelize.define("Staffs", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        airline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Staffs
}