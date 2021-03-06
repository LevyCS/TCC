import db from "../db.js";

import Sequelize from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from "express";
const app = express.Router();

app.get('/confirmTicket', async (req,resp) => { 
    const vendas = await db.infoc_nws_tb_venda.findAll({
        where: {
            'ds_situacao': 'aguardando'
        },
        include: [
            {
                model: db.infoc_nws_tb_usuario,
                as: 'id_usuario_infoc_nws_tb_usuario',
                attributes: [],
                required: true
            },
            {
                model: db.infoc_nws_tb_evento,
                as: 'infoc_nws_tb_venda_evento',
                attributes: [],
                required: true
            }
        ],
        attributes: [
            [col('infoc_nws_tb_venda.id_venda'), 'id'],
            [col('infoc_nws_tb_venda.ds_situacao'), 'situacao'],
            [col('tp_pagamento'), 'tipoPagamento'],
            [col('id_usuario_infoc_nws_tb_usuario.nm_usuario'), 'usuario'],
            [col('infoc_nws_tb_venda_evento.nm_evento'), 'evento']
        ],
        group: [
            col('infoc_nws_tb_venda.id_venda'),
            col('infoc_nws_tb_venda.ds_situacao'),
            col('tp_pagamento'),
            col('id_usuario_infoc_nws_tb_usuario.nm_usuario'),
            col('infoc_nws_tb_venda_evento.nm_evento')
        ]
    })

    resp.send(vendas);
});


app.put('/confirmTicket', async (req,resp) => { 
    const aprovado = Number(req.query.number);
    const idVenda = Number(req.query.id);
     
    try { 

        if( aprovado === 1) {
            const r = await db.infoc_nws_tb_venda.update({
                'ds_situacao':  'Aprovado'
    
            }, {
                where: { id_venda: idVenda }
            })

            
        } else if ( aprovado === 0){
            const f = await db.infoc_nws_tb_venda.update({
                'ds_situacao': 'Reprovado'
    
            }, {
                where: { id_venda: idVenda }
            })
        }

        resp.sendStatus(200);

    } catch (e) { 
        resp.send({ erro: e.toString() })
    }

})

function diarydate (date) {
    var dt = new Date(date);
    dt.setDate(dt.getDate() -1);
    return dt;
}

function weeklydate (date) {
    var dt = new Date(date);
    dt.setDate(dt.getDate() -7);
    return dt;
}

function yearlydate (date) {
    var dt = new Date(date);
    dt.setDate(dt.getDate() - 365);
    return dt;
}
function semestrallydate (date) {
    var dt = new Date(date);
    dt.setDate(dt.getDate() - 182);
    return dt;
}

function monthlydate (date) {
    var dt = new Date(date);
    dt.setDate(dt.getDate() - 30);
    return dt;
}

app.get('/relatorios', async (req,resp) => {
    try {

        let tipo = req.query.type;
        let inicio = new Date();
        let final = new Date();


        let tipoRef = tipo.toString();
        let finalType = tipoRef.toLocaleLowerCase();
        

        if(finalType == 'di??rio') {
            inicio = diarydate(inicio);
        } else if (finalType == 'semanal') {
            inicio = weeklydate(inicio)
        } else if (finalType == 'mensal') {
            inicio = monthlydate(inicio);
        } else if (finalType == 'semestral') {
            inicio = semestrallydate(inicio);
        } else if (finalType == 'anual') {
            inicio = yearlydate(inicio);
        } else {
            resp.send ({ erro: 'N??o foi poss??vel gerar o relat??rio pois n??o segue os padr??es impostos.' })
        }
        
            
        
            
        
            

        console.log(inicio);
        console.log(final);


        let r = await db.infoc_nws_tb_categoria.findAll({
            where: {
                '$infoc_nws_tb_eventos.infoc_nws_tb_evento_venda.dt_inclusao$': {[Op.lt]: final},
                '$infoc_nws_tb_eventos.infoc_nws_tb_evento_venda.dt_inclusao$': {[Op.gt]: inicio}
            },
            group: [
                col('id_categoria')
            ],
            attributes: [
                [fn('count', 1), 'qtd'],
                ['ds_tema', 'categoria']
            ],
            include: [{
                model: db.infoc_nws_tb_evento,
                as: 'infoc_nws_tb_eventos',
                required: true,
                attributes: [],
                include: [{
                    model: db.infoc_nws_tb_venda,
                    as: 'infoc_nws_tb_evento_venda',
                    required: true,
                    attributes: []
                }]
            }]
        })

        resp.send(r);


    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/adm', async (req, resp) => {
    try {
        let confirm = await db.infoc_nws_tb_usuario.findOne({where: {ds_username: req.query.username}});
        if (confirm == null) 
            return resp.send( {erro: "Usu??rio n??o cadastrado"})
    
        if (confirm.ds_senha != req.query.password)
            return resp.send( {erro: "Senha incorreta"})

        if (confirm.bt_admin == false) 
            return resp.send( {erro: "Usu??rio n??o ?? um administrador"})
        
        let r = await db.infoc_nws_tb_usuario.findOne( {where: { id_usuario: confirm.id_usuario }} );
        resp.send(r);

    } catch (e) {resp.send( { erro: e.toString()})}
})

app.post('/adm', async (req, resp) => {
    try {
        let json = req.body;
        let r = await db.infoc_nws_tb_usuario.create({
            nm_usuario: json.nmUsu,
            ds_cpf: json.cpf,
            ds_email: json.email,
            ds_username: json.username,
            ds_senha: json.senha,
            dt_nascimento: json.nascimento,
            bt_adm: true
        })
    } catch (e) {resp.send( {erro: e.toString()})}
})




export default app;