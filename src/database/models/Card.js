module.exports = (sequelize, dataTypes) => {
    let alias = 'Card';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(45),
        },
        typeId : {
            type: dataTypes.INTEGER,
        },
        level : {
            type: dataTypes.STRING(45),
        },
        image: {
            type: dataTypes.STRING(45),
        },
        defense: {
            type: dataTypes.INTEGER,
        },
        atack: {
            type: dataTypes.INTEGER,
        },
        tecnic: {
            type: dataTypes.STRING(45),
        },

    };
    let config = {
        tableName: 'cards',
        timestamps: false
    };
    const Card = sequelize.define(alias, cols, config)

    Card.associate = models => {
        Card.belongsTo(models.Type,{
            as :'type',
            foreignKey : 'typeId',
            onDelete : 'cascade'
        })
    }
    return Card;
}