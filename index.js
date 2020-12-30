    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const connection =require("./database/database"); 
    const Cliente = require("./database/cliente");
    const Sequelize = require("sequelize");
    const operadoresSql = Sequelize.Op;






    //database
    connection
            .authenticate()
            .then(()=>{
    console.log("conexão feita com sucesso");
            })
            .catch((msgerro)=>{
    console.log(msgerro);
            });

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.set('view engine','ejs');



    app.get('/',(req,res)=>{


    Cliente.findAll({
        raw:true,
        order:[
            ['id','DESC']
        ]
    }).then((clientes=>{
        res.render("index",{
            clientes:clientes

        });
        
        
    }));



    });


    app.post('/pesquisar',(req,res)=>{
            
            var nome = req.body.nome;
        
            
            Cliente.findAll({
                where:{
                    nome:{
                        [operadoresSql.like]:nome
                    }
                }
                    
            
            
            }).then((clientes)=>{

            
                res.render("index",{
                    clientes:clientes
                })
            })
        
            });



    



    app.post('/salvarCliente',(req,res)=>{
    var nome = req.body.nome;
    var tel = req.body.telefone;

        Cliente.create({
    
            nome:nome,
            telefone:tel
        }).then(()=>{
            res.redirect("./");
        }).catch({
        
        });


    });



    app.listen(8080,()=>{console.log("...");});