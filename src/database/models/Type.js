module.exports = (sequelize, dataTypes) => {
    let alias = 'Type';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fondo : {
            type: dataTypes.STRING(45),
        },
        icono: {
            type: dataTypes.STRING(45),
        },
        class: {
            type: dataTypes.STRING(45),
        },
    };
    let config = {
        tableName: 'types',
        timestamps: false
    };
    const Type = sequelize.define(alias, cols, config)

    Type.associate = models => {
        Type.hasMany(models.Card,{
            as :'cards',
            foreignKey : 'typeId'
        })
    }
    return Type;
}