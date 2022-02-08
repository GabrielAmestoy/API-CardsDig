const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
    index: async (req,res) => {
        try{
            let cards = await db.Card.findAll({
            include : [
                {
                    association : 'type',
                }
            ]})
            let respuesta = {
                meta : {
                    status : 200,
                    cantidad :cards.length,
                    url : req.url
                },
                data : cards
            }
            res.json(respuesta)
        } catch (error) {
            res.json(error.toString())
           }
        // .then((cards) =>{
        // // return res.render('home.ejs',{
        // //     cards
        // //     })
        //     return res.send(cards);
        // }).catch(error => console.log(error));
        },
        detail : async (req,res) => {
            try{
                let card = await db.Card.findByPk(req.params.id, {
                include: [
                    {
                    association : 'type',
                    },
                ]})
                let respuesta = {
                meta : {
                    status : 200,
                    url : req.url,
                },
                data : card
            }
            res.json(respuesta)
            } catch (error) {
            res.json(error.toString())
            }
        },
        level : async (req,res) => {
            try{
                let resultado = await db.Card.findAll({
                    where: {
                        level : req.params.level
                    },
                    include : [
                    {
                        association : 'type',
                    },
                ]
            })
            // console.log(resultado);
            let respuesta = {
                meta : {
                    status : 200,
                    url : req.url,
                    total: resultado.length
                },
                data : resultado
            }
            res.json(respuesta)
            } catch (error) {
            res.json(error.toString())
            }
        },
        paginador: async (req,res)=>{
            // console.log(req.query.page)
            // console.log(req.query.limit)
            let page = parseInt(req.query.page);
            if(page > 1){
                page = (page - 1)* 12;
            }else{
                page = 0;
            }
            try{
                let cards = await db.Card.findAll();
                let resultado = await db.Card.findAll({
                    offset : parseInt(page),
                    limit : parseInt(req.query.limit),
                    include : [
                    {
                        association : 'type',
                    },
                ]
            })
            let respuesta = {
                meta : {
                    status : 200,
                    url : req.url,
                    total :cards.length,
                },
                data : resultado
            }
            res.json(respuesta)
            } catch (error) {
            res.json(error.toString())
            }
        },
        create: async (req,res) =>{
            let card = await db.Card.create(req.body);
            res.json(card);
        },
        remove: async (req,res) => {
            await db.Card.destroy({
                where : {id : req.params.id }
            });
            res.json("se ha eliminado");
        },
        search: async (req,res) =>{
            console.log(req.query.search)
            try {  
                let cards = await db.Card.findAll({
                    where : {
                    [Op.or] : [
                        {
                            name :  {[Op.substring] : req.query.search}
                        },
                    ]
                },
            include : [
                {association : 'type'}  
            ]
            })
            console.log(cards);
            let response = {
                status : 200,
                meta : {
                    total : cards.length,
                },
                data : cards
            }
            console.log(response);
            return res.json(response)
        } catch (error) {
            console.log(error);
        }
    },
}