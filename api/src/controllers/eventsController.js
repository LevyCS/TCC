import db from "../db.js";

import path from 'path'
import multer from 'multer';

import Sequelize from 'sequelize';
const { Op, col, fn } = Sequelize;


import express from "express";

const app = express.Router();

app.get('/crud', async(req, resp) => {
    try {
        let {nome, categoria} = req.query;

        function filterChoose() {
            if(categoria != null && categoria != "" && categoria != undefined)
                return {ds_genero:{[Op.like]: `%${categoria}%`}, bt_ativo: true};
            else if (nome != null && nome != "")
                return {nm_evento: {[Op.like]: `%${nome}%`}, bt_ativo: true};
            else {
                return {bt_ativo: true}
            }
        }

        
        let events = await db.infoc_nws_tb_evento.findAll({
            where: filterChoose(), order: [['id_evento', 'desc']],
            attributes: camps(),
            include: [
                {
                    model: db.infoc_nws_tb_categoria,
                    as: 'id_categoria_infoc_nws_tb_categorium',
                    required: true
                },
                {
                    model: db.infoc_nws_tb_calendario,
                    as: 'infoc_nws_tb_calendarios',
                    required: true,
                    include: [
                        {
                            model: db.infoc_nws_tb_calendario_item,
                            as: 'infoc_nws_tb_calendario_items',
                            required: true
                        }
                    ]
                },
            ]
        })
    
        resp.send(events)

    } catch (e) {
        resp.send( {erro: e.toString()})
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/events')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
  
const upload = multer({ storage: storage })


app.post('/crud', upload.array('images', 3), async(req, resp) => {
    try {
        let { nmEvento, categoria, duracao, classificacao, valorIngresso, local, dtMin, dtMax, elenco, descEvento, genero} = req.body;
        let imgCapa = req.files[0].path
        let imgFundo = req.files[1].path
        let imgSec= req.files[2].path
 
        categoria = categoria.toLowerCase();
        let category = await db.infoc_nws_tb_categoria.findOne({ where: {ds_tema: categoria}})
        

        if (isNaN(valorIngresso) || valorIngresso <= 0)
            return resp.send( { erro: "O Valor do ingresso deve ser um número positivo"})

        let createEvent = await db.infoc_nws_tb_evento.create({
            nm_evento: nmEvento,
            id_categoria: category.id_categoria,
            ds_duracao: duracao,
            ds_classificacao: classificacao,
            vl_ingresso: valorIngresso,
            ds_local: local,
            dt_min: dtMin,
            dt_max: dtMax,
            ds_elenco: elenco,
            ds_evento: descEvento, 
            img_capa: imgCapa,
            img_fundo: imgFundo,
            img_sec: imgSec,
            ds_genero: genero,  
            bt_ativo: true,
            dt_inclusao: new Date()
        })

        let createCalendary = JSON.parse(req.body.datas).map(async item => {
            let dates = await db.infoc_nws_tb_calendario.create({
                id_evento: createEvent.id_evento,
                dt_evento: item.data
            })

            item.horarios.map(async i => {
                await db.infoc_nws_tb_calendario_item.create({
                    id_calendario: dates.id_calendario,
                    hr_evento: i
                })
            })
        }) 
    
        resp.sendStatus(200);
        
    } catch (e) {
        resp.send( { erro: e.toString()})
    }
})

app.get('/event/image', async (req, resp) => {
    let dirname = path.resolve();
    resp.sendFile(req.query.imagem, { root: path.join(dirname) });
})



app.put('/crud/teste', async (req, resp) => {
    try {
        let { nmEvento, categoria, duracao, classificacao, valorIngresso, local, dtMin, dtMax, elenco, descEvento, imgCapa, imgFundo, imgSec} = req.body;
        categoria = categoria.toLowerCase();
        
        let category = await db.infoc_nws_tb_categoria.findOne({ where: {ds_tema: categoria}})
    
        let validate = [nmEvento, categoria, duracao, classificacao, valorIngresso, local, dtMin, dtMax, elenco, descEvento, imgCapa, imgFundo, imgSec]
        if (validate.some(item => {
            item == "" || item == null
        }))
            return resp.send( {erro: "Todos os campos são obrigatórios"} )

        if (isNaN(valorIngresso) || valorIngresso <= 0)
            return resp.send( { erro: "O Valor do ingresso deve ser um número positivo"})

        let updateEvent = await db.infoc_nws_tb_evento.update({
            nm_evento: nmEvento,
            id_categoria: category.id_categoria,
            ds_duracao: duracao,
            ds_classificacao: classificacao,
            vl_ingresso: valorIngresso,
            ds_local: local,
            dt_min: dtMin,
            dt_max: dtMax,
            ds_elenco: elenco,
            ds_evento: descEvento, 
            img_capa: imgCapa,
            img_fundo: imgFundo,
            img_sec: imgSec },
            {where: {id_evento: req.query.id}}   
        )

        let r = await db.infoc_nws_tb_calendario.findAll({where: {id_evento: req.query.id}})
        
        r.map(async (item, i) => {
            let actualEvent = req.body.datas[i];
            let updateDates = await db.infoc_nws_tb_calendario.update({dt_evento: actualEvent.data}, 
            {where: {id_calendario: item.id_calendario}})

            let y = await db.infoc_nws_tb_calendario_item.findAll({where: {id_calendario: item.id_calendario} })

            y.map(async (item, i) => {
               let updateHour = await db.infoc_nws_tb_calendario_item.update({
                   hr_evento: actualEvent.horarios[i]}, {where: {id_calendario_item: item.id_calendario_item}})
            })
        })
    
        resp.sendStatus(200);

    } catch (e) {
        resp.send( {erro: e.toString()})
    }
})



app.delete('/crud', async(req, resp) => {
    try {
        let r = await db.infoc_nws_tb_evento.update({
            bt_ativo: false
        },
            {where: {id_evento: Number(req.query.id)}
        })
        resp.sendStatus(200);
    } catch (e) {
        resp.send( {erro: e.toString()})
    }
})



app.get('/crud/getall', async(req, resp) => {
    let r = await db.infoc_nws_tb_evento.findAll()
    resp.send(r);
})



app.get('/buscadireta', async (req,resp) => {
    try {
        let search = req.query.search;
        let r = await db.infoc_nws_tb_evento.findAll( 
            { where: {
                [Op.or]: [
                    { 'nm_evento': {[Op.like]: `%${search}%` }},
                    { 'ds_elenco': {[Op.like]: `%${search}%` }},
                    { 'ds_evento': {[Op.like]: `%${search}%` }},
                    { 'ds_classificacao': {[Op.like]: `%${search}%` }},
                    { 'ds_genero': {[Op.like]: `%${search}%` }}
                ],
                bt_ativo: true
            },
            attributes: camps(),
            include: [
                {
                    model: db.infoc_nws_tb_categoria,
                    as: 'id_categoria_infoc_nws_tb_categorium',
                    required: true
                }
            ]
         });
        resp.send(r);

    } catch(e) {
        resp.send({ erro: e.toString()})
    }
})



app.get('/buscadirecionada', async (req,resp) => {
    try {

        let categoria = req.query.id;

        let r = await db.infoc_nws_tb_evento.findAll( 
            { where: 
                { id_categoria: categoria, 
                    bt_ativo: true },

                attributes: camps(),
                include: [
                    {
                        model: db.infoc_nws_tb_categoria,
                        as: 'id_categoria_infoc_nws_tb_categorium',
                        required: true
                    }
                ]
            });


        resp.send(r);

    } catch (e) {
        resp.send ({ erro: e.toString() })
    }
})

app.get('/highlighted', async (req, resp) => {
    try {

        let r = await db.infoc_nws_tb_venda_item.findAll({
            group: [
                col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.id_evento')
            ],
            attributes: [
                [fn('count', 1), 'qtd'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.id_evento'), 'id_evento'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.nm_evento'), 'nomevento'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_elenco'), 'elenco'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_classificacao'), 'classificacao'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_duracao'), 'duracao'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_evento'), 'sinopse'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_genero'), 'gênero'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.img_capa'), 'imagemcapa'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.vl_ingresso'), 'preco'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_local'), 'local'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.dt_min'), 'dataminima'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.dt_max'), 'datamaxima'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.img_fundo'), 'imagemfundo'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.img_sec'), 'imagemsecundaria'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.id_categoria_infoc_nws_tb_categorium.ds_tema'), 'ds_tema']
            ],
            include: [
                {
                    model: db.infoc_nws_tb_calendario_item,
                    as: 'id_calendario_item_infoc_nws_tb_calendario_item',
                    required: true,
                    include: [
                        {
                            model: db.infoc_nws_tb_calendario,
                            as: 'id_calendario_infoc_nws_tb_calendario',
                            required: true,
                            include: [
                                {
                                    model: db.infoc_nws_tb_evento,
                                    as: 'id_evento_infoc_nws_tb_evento',
                                    required: true,
                                    include: [
                                        {
                                            model: db.infoc_nws_tb_categoria,
                                            as: 'id_categoria_infoc_nws_tb_categorium',
                                            required: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            })
            

            resp.send(r);


    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})

// app.get('/emdestaque', async (req,resp) => {
//     try {
//         let r = await db.infoc_nws_tb_evento.findAll({
//             group: [
//                 col('infoc_nws_tb_venda_items.id_evento')
//             ],
//             having: Sequelize.literal('count(1) > 8'),
//             attributes: [
//                 [fn('count', 1), 'qtd'],
//                 [col('infoc_nws_tb_venda_items.id_evento'), 'id_evento'],
//                 ['id_evento', 'id_evento'],
//                 ['nm_evento', 'nomevento'],
//                 ['ds_elenco', 'elenco'],
//                 ['ds_classificacao', 'classificacao'],
//                 ['ds_duracao', 'duracao'],
//                 ['ds_evento', 'sinopse'],
//                 ['ds_genero', 'gênero'],
//                 ['img_capa', 'imagemcapa'],
//                 ['vl_ingresso', 'preco'],
//                 ['ds_local', 'local'],
//                 ['dt_min', 'dataminima'],
//                 ['dt_max', 'datamaxima'],
//                 ['ds_elenco', 'elenco'],
//                 ['img_fundo', 'imagemfundo'],
//                 ['img_sec', 'imagemsecundaria']

//             ],
//             include: [
//             {
//                 model:  db.infoc_nws_tb_venda_item,
//                 as: 'infoc_nws_tb_venda_items',
//                 required: true,
//                 attributes: [],
//                 include: [{
//                     model: db.infoc_nws_tb_venda,
//                     as: 'id_venda_infoc_nws_tb_venda',
//                     required: true
//                 }]
//             },
//         ]
//         })

//         resp.send(r);

//     } catch(e) {
//         resp.send({ erro: e.toString() })
//     }
// })

function camps() {
    return [
        ['id_evento', 'id_evento'],
        ['nm_evento', 'nomevento'],
        ['ds_elenco', 'elenco'],
        ['ds_classificacao', 'classificacao'],
        ['ds_duracao', 'duracao'],
        ['ds_evento', 'sinopse'],
        ['ds_genero', 'gênero'],
        ['img_capa', 'imagemcapa'],
        ['vl_ingresso', 'preco'],
        ['ds_local', 'local'],
        ['dt_min', 'dataminima'],
        ['dt_max', 'datamaxima'],
        ['img_fundo', 'imagemfundo'],
        ['img_sec', 'imagemsecundaria'],
        [col('id_categoria_infoc_nws_tb_categorium.ds_tema'), 'ds_tema']
    ]
}


export default app;
