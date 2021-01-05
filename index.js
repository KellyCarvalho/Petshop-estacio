            const express = require("express");
            const app = express();
            const bodyParser = require("body-parser");
            const connection =require("./database/database"); 
            const Cliente = require("./database/cliente");
            const Sequelize = require("sequelize");
            const operadoresSql = Sequelize.Op;
            const jsdom = require("jsdom");
            const { JSDOM } = jsdom;


        






        





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
                var telefone=req.body.telefone;
            

                Cliente.create({
            
                    nome:nome,
                    telefone:telefone
                }).then(()=>{
                    res.redirect("./");
                }).catch({
                
                }).then((clientes)=>{
                    res.render("index",{
                        clientes:clientes
                    });
                });


            });


            app.get('/alterar/:id',(req,res)=>{

              
                var id = req.params.id;
        Cliente.findByPk(id).then((cliente)=>{
            res.render("alterar", {
                cliente:cliente
            })


    
        });
         
        var nome = req.body.nome;
        var telefone = req.body.telefone;
        console.log(nome, telefone);
        

        Cliente.update({nome:nome,telefone:telefone},{
            where:{id:id}
            }).then(()=>{
                console.log("Alteração feita com sucesso");

            });

    

   
        });

        

            app.get('/deletarCliente/:id',(req,res)=>{
                var id = req.params.id;
                Cliente.destroy({
                    where:{
                    id:id
                    }
                }).then((cliente)=>{
                  console.log("deletado");
                  res.redirect("./");
                })

            });



            app.listen(8080,()=>{console.log("...");});