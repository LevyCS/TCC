import db from "../db.js";

import Sequelize from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from "express";
const app = express.Router();


app.get('/user/log', async(req, resp) => { 
    try { 

        let r = await db.infoc_nws_tb_usuario.findAll();
        resp.send(r);

    } catch (e) { 
        resp.send({ erro: e.toString() })
    }

})

function OrderManagement (order) { 
    switch ( order ) {
        case 'Listar em ordem crescente': return [ 'nm_usuario', 'asc'] 
        case 'Listar em ordem decrescente' : return [ 'nm_usuario', 'desc']
        default: return [ 'nm_usuario', 'asc']
    }
}

app.get('/user/management', async (req, resp) => {
    try { 
         let criteria = OrderManagement(req.query.ordenacao) 

         let filtrarAdm = req.query.ordenacao === 'Listar administradores';

         const management = await db.infoc_nws_tb_usuario.findAll({
            where: { 
                bt_adm: filtrarAdm 
            },
            attributes: [
                ['nm_usuario', 'usuario'], 
                ['ds_email', 'email']
           ],
            order: [
                 criteria
             ]
         })

         resp.send(management)

    } catch (e) { 
        resp.send({ erro: e.toString() })
    }
})

app.get('/confirmTicket', async (req,resp) => { 
    const vendas = await db.infoc_nws_tb_venda.findAll({
        where: {
            'ds_situacao': 'Aguardando'
        },
        include: [
            {
                model: db.infoc_nws_tb_usuario,
                as: 'id_usuario_infoc_nws_tb_usuario',
                attributes: [],
                required: true
            },
            {
                model: db.infoc_nws_tb_venda_item,
                as: 'infoc_nws_tb_venda_items',
                attributes: [],
                required: true,
                include: [
                    {
                        model: db.infoc_nws_tb_evento,
                        as: 'id_evento_infoc_nws_tb_evento',
                        attributes: [],
                        required: true
                    }
                ]
            }
        ],
        attributes: [
            [col('infoc_nws_tb_venda.id_venda'), 'id'],
            [col('infoc_nws_tb_venda.ds_situacao'), 'situacao'],
            [col('tp_pagamento'), 'tipoPagamento'],
            [col('id_usuario_infoc_nws_tb_usuario.nm_usuario'), 'usuario'],
            [col('infoc_nws_tb_venda_items.id_evento_infoc_nws_tb_evento.nm_evento'), 'evento']
        ],
        group: [
            col('infoc_nws_tb_venda.id_venda'),
            col('infoc_nws_tb_venda.ds_situacao'),
            col('tp_pagamento'),
            col('id_usuario_infoc_nws_tb_usuario.nm_usuario'),
            col('infoc_nws_tb_venda_items.id_evento_infoc_nws_tb_evento.nm_evento')
        ]
    })

    resp.send(vendas);
});


app.put('/confirmTicket/:idVenda', async (req,resp) => { 
    const { aprovado } = req.body;
    const { idVenda  } = req.params;
     
    try { 
        const r = await db.infoc_nws_tb_venda.update({
            'ds_situacao': aprovado === true ? 'Aprovado' : 'Reprovado'
        }, {
            where: { id_venda: idVenda }
        })

        resp.sendStatus(200);
    } catch (e) { 
        resp.send({ erro: e.toString() })
    }
})


app.get('/relatorios', async (req,resp) => {
    try {



    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


export default app;