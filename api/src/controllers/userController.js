import db from "../db.js";
import nodemailer from 'nodemailer'

import path from 'path'
import multer from "multer";

import express from "express";
const app = express.Router();

import Sequelize from 'sequelize';
import { validateEmptyValues } from "./validation.js";

const { Op, col, fn } = Sequelize;

app.get('/TicketPerson', async (req,resp) => { 
    try { 

            let id  = req.query.id; 
            
            const ticket = await db.infoc_nws_tb_venda_item.findAll({   
                 where: {
                     id_venda : id
                 },
                include: [
                    {   
                        model: db.infoc_nws_tb_evento,
                        as: 'id_evento_infoc_nws_tb_evento',
                        attributes: [],
                         include: { 
                             model: db.infoc_nws_tb_categoria, 
                             as: 'id_categoria_infoc_nws_tb_categorium',
                             attributes: []
                         }
                    }, 
                    { 
                        model: db.infoc_nws_tb_venda,
                        as: 'id_venda_infoc_nws_tb_venda',
                        attributes: [], 
                        include: { 
                            model: db.infoc_nws_tb_usuario,
                            as: 'id_usuario_infoc_nws_tb_usuario',
                            attributes: [] 
                        }  
                    } 
                ], 
                attributes: [
                    [col('id_venda_infoc_nws_tb_venda.ds_situacao'), 'situacao do evento'],   
                    [col('id_evento_infoc_nws_tb_evento.ds_local'), 'local'],    
                    [col('id_evento_infoc_nws_tb_evento.nm_evento'), 'evento'],
                    [col('id_evento_infoc_nws_tb_evento.id_categoria_infoc_nws_tb_categorium.ds_tema'), 'categoria']
                ]
            })

            resp.send(ticket); 

    } catch (e) { 
        resp.send({ erro: e.toString() })
    }

})

app.get('/getall/test', async (req, resp) => {
    let r = await db.infoc_nws_tb_usuario.findAll()
    return r;
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
  
const upload = multer({ storage: storage })


app.put('/update/:id', upload.single('imagem'), async (req, resp) => {
    try {
        let json = req.body;
        delete json.imagem;  

        if(!validateEmptyValues(json))
            return resp.send({erro: "Todos os campos são obrigatórios"})

        if(json.nmUsu.lenght <= 3)
            return resp.send({erro: "Nome precisa conter mais de 3 caracteres"})

        if(isNaN(Number(json.cpf))) 
            return resp.send({erro: "O cpf deve estar no formato só números"})

        if(json.cpf.lenght != 11)
            return resp.send({erro: "Cpf deve contem 11 número"})

        if(!json.email.includes('@') || json.email.substr(json.email.indexOf('@'), json.email.length).length <= 3 )
            return resp.send({erro: "Email inválido, precisa conter um dominio"})

        let validacaoCpf = await db.infoc_nws_tb_usuario.findOne({where: {ds_cpf: json.cpf}})
        if (validacaoCpf != null && validacaoCpf.id_usuario != req.params.id)
            return resp.send( {erro: "Cpf já cadastrado"})

        let validacaoEmail = await db.infoc_nws_tb_usuario.findOne({where: {ds_email: json.email}})
        if (validacaoEmail != null && validacaoEmail.id_usuario != req.params.id) 
            return resp.send( { erro: "Email já cadastrado"})
        
        let validacaoUsername = await db.infoc_nws_tb_usuario.findOne({where: {ds_username: json.username}})
        if (validacaoUsername != null && validacaoUsername.id_usuario != req.params.id)
            return resp.send({ erro: "Username já cadastrado"})
            
        if (!req.file) {
            let update = await db.infoc_nws_tb_usuario.update({
                nm_usuario: json.nmUsu,
                ds_cpf: json.cpf,
                ds_email: json.email,
                ds_username: json.username,
                ds_senha: json.senha,
                dt_nascimento: json.nascimento
            }, {where: {id_usuario: req.params.id}})
        } else {
            let update = await db.infoc_nws_tb_usuario.update({
                nm_usuario: json.nmUsu,
                ds_cpf: json.cpf,
                ds_email: json.email,
                ds_username: json.username,
                ds_senha: json.senha,
                dt_nascimento: json.nascimento,
                img_perfil: req.file.path
            }, {where: {id_usuario: req.params.id}})
        }


        resp.sendStatus(200);
    } catch (e) { resp.send( {erro: e.toString()})}
})

app.post('/create', upload.single('imagem'), async(req, resp) => {
    try {
        let json = req.body;
        delete json.imagem;  

        if(!validateEmptyValues(json))
            return resp.send({erro: "Todos os campos são obrigatórios"})

        if(json.nmUsu.lenght <= 3)
            return resp.send({erro: "Nome precisa conter mais de 3 caracteres"})

        if(isNaN(Number(json.cpf))) 
            return resp.send({erro: "O cpf deve estar no formato só números"})

        if(json.cpf.lenght != 11)
            return resp.send({erro: "Cpf deve contem 11 número"})

        if(!json.email.includes('@') || json.email.substr(json.email.indexOf('@'), json.email.length).length <= 3 )
            return resp.send({erro: "Email inválido, precisa conter um dominio"})

        let validacaoCpf = await db.infoc_nws_tb_usuario.findOne({where: {ds_cpf: json.cpf}})
        if (validacaoCpf)
            return resp.send( {erro: "Cpf já cadastrado"})

        let validacaoEmail = await db.infoc_nws_tb_usuario.findOne({where: {ds_email: json.email}})
        if (validacaoEmail != null) 
            return resp.send( { erro: "Email já cadastrado"})
        
        let validacaoUsername = await db.infoc_nws_tb_usuario.findOne({where: {ds_username: json.username}})
        if (validacaoUsername != null)
            return resp.send({ erro: "Username já cadastrado"})

        if (!req.file)
            return resp.send({erro: "É necessário uma imagem"})
        
        let r = await db.infoc_nws_tb_usuario.create({
            nm_usuario: json.nmUsu,
            ds_cpf: json.cpf,
            ds_email: json.email,
            ds_username: json.username,
            ds_senha: json.senha,
            dt_nascimento: json.nascimento,
            img_perfil: req.file.path,
            bt_adm: false
        })

        resp.sendStatus(200);

    } catch (e) {
        resp.send( {erro: e.toString()})
    }
});

app.get('/image', async (req, resp) => {
    let dirname = path.resolve();
    resp.sendFile(req.query.imagem, { root: path.join(dirname) });
})

app.get('/login', async(req, resp) => {
    try {
        
        if(!validateEmptyValues(req.query)) 
            return resp.send({erro: "Todos os campos são obrigatórios"})

        let confirm = await db.infoc_nws_tb_usuario.findOne({where: {ds_email: req.query.mail}});
        if (confirm == null) 
            return resp.send( {erro: "Usuário não cadastrado"})
    
        if (confirm.ds_senha != req.query.senha)
            return resp.send( {erro: "Senha incorreta "})
        
        let r = await db.infoc_nws_tb_usuario.findOne( {where: { id_usuario: confirm.id_usuario }});
        resp.send(r);
    }
    catch (e) { 
        resp.send({erro: e.toString()})
    }
})

app.post('/forgotpassword', async(req,resp) => {
    try {
        let json = req.body;
        let code = Math.floor(Math.random() * (9999 - 1000) ) + 1000;
    
        if (json.email == null || json.email == '') 
            return resp.send( {erro: "Email obrigatório"})

        let r = await db.infoc_nws_tb_usuario.findOne({where: {ds_email: json.email}})
        if (r == null)  
            return resp.send( {erro: "Email não cadastrado"})
    
        const sender = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: 'nws.tccinfoc@gmail.com',
                pass: 'nwsinfoc',
            },
        });
    
        const sendEmail = async() => await sender.sendMail({
            from: '"New Side" <nws.tccinfoc@gmail.com>', // sender address
            to: json.email, // list of receivers
            subject: "Código de verificação", // Subject line
            html:   `<h1> Código de validação: </h1> 
                    <h4> ${code} </h4> ` 
        })
        sendEmail();
    
        const changeCode = async() => {
            await db.infoc_nws_tb_usuario.update({
                ds_codigo: code }, {where: {id_usuario: r.id_usuario}
        })}
        changeCode();
    
        resp.sendStatus(200);
    } catch (e) { resp.send( { erro: e.toString()})}
})

app.put('/changepassword', async(req, resp) => {
    try {
        let { codigo, email, senha } = req.body;
        
        let r = await db.infoc_nws_tb_usuario.findOne({where: {ds_email: email}})

        if (codigo != r.ds_codigo || codigo == '' || codigo == null) 
        return resp.send( {erro: "Código incorreto"})
    
        let updatePasswordNCod = await db.infoc_nws_tb_usuario.update({ds_senha: senha, ds_codigo: null}, {where: {id_usuario: r.id_usuario}})
        resp.sendStatus(200)
    } catch (e) { resp.send( { erro: e.toString()})}
})

app.get('/log', async(req, resp) => { 
    try { 

        let r = await db.infoc_nws_tb_usuario.findAll({ 
            // attributes: [
            //     ['id_usuario', 'id'], 
            //     ['nm_usuario', 'nomeUsuario'], 
            //     ['dt_nascimento', 'nascimento'], 
            //     ['ds_email', 'email'], 
            //     ['ds_cpf', 'cpf']
            // ]
        });
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

app.get('/management', async (req, resp) => {
    try { 
         let criteria = OrderManagement(req.query.ordenacao) 

         let filtrarAdm = req.query.ordenacao === 'Listar administradores';

         const management = await db.infoc_nws_tb_usuario.findAll({
            where: { 
                bt_adm: filtrarAdm 
            },
            order: [
                 criteria
             ], 
         })

         resp.send(management)

    } catch (e) { 
        resp.send({ erro: e.toString() })
    }
})

app.get('/userTickets', async (req, resp) => {
    try {
        let r = await db.infoc_nws_tb_venda_item.findAll({
            where: {'$id_venda_infoc_nws_tb_venda.id_usuario$': req.query.id},
            attributes: [
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
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.ds_genero'), 'genero'],
                [col('id_calendario_item_infoc_nws_tb_calendario_item.id_calendario_infoc_nws_tb_calendario.id_evento_infoc_nws_tb_evento.id_categoria_infoc_nws_tb_categorium.ds_tema'), 'ds_tema'],
                [col('id_venda_infoc_nws_tb_venda.ds_situacao'), 'situacao']
            ],
            include: [
                {
                    model: db.infoc_nws_tb_venda,
                    as: 'id_venda_infoc_nws_tb_venda',
                    required: true
                },
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
            ]
        })

        resp.send(r);
    } catch (e) { resp.send({erro: e.toString()})}
})

export default app;