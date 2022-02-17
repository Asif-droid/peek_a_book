const morgan=require("morgan");
const express=require("express");
//const oracle=require("oracledb");


const fs=require('fs');

const router=require("express-promise-router")();
var bodyParser = require('body-parser');

const cors=require('cors');     //for cross referencing


const logger=require('./funtions');
const { json } = require("express");

//oracle.outFormat = oracle.OBJECT;
 

///for hbs




router.get("/employee/all", async function(req,res,next){
    console.log("started");
    var query="select * from employees ";
    var params=[];
    let result=await logger.log(query,params);
    //console.log(result);

    //res.sendFile(__dirname+'/front/home.html',json(result));

    res.status(200).json(result);
    //logger.log("hello")
});
router.get('/employee',async function(req,res,next){
    //console.log(__dirname)



    console.log("started");
    var query=' SELECT  FIRST_NAME  from EMPLOYEES ';
    var params=[];
    let result=await logger.log(query,params);
    //console.log(result);

    //res.sendFile(__dirname+'/front/home.html',json(result));
    //var jr=json(result);
    //console.log(result);

    //res.status(200).json(result);

    
    res.render('emp',{d:result,w:[{a:"s"},{a:"sm"},{a:"sa"},{a:"se"}]});
    
    

});
router.get('/test',async(req,res,next)=>{
    
    //console.log(q);
    /*var q=req.query.uname;
    var o=req.query.name;
    var query="DECLARE  BEGIN insrt('"+q+"','"+o+"');end;";
    var params=[];
    let result=await logger.log(query,params);
    console.log(o+" "+q);*/
    var q="SELECT * from ADDRESS_DETAIL";
    var p=[];
    let r=await logger.log(q,p);
    console.log(r[0]);
  res.render('t1');
})



router.get('/last_name/highst_sal',async function(req,res,next){
    console.log("started");
    var query="  select e.last_name, d.department_name,e.salary from EMPLOYEES e join (select department_id,max(salary) mxs from EMPLOYEES group by department_id) d1 on(e.department_id=d1.department_id) join DEPARTMENTS d on(e.department_id=d.department_id) where e.salary=d1.mxs order by d1.mxs";
    var params=[];
    let result=await logger.log(query,params);
    //console.log(result);

    res.status(200).json(result);
})
router.get('/',function(req,res,next){
    //console.log(__dirname)



    res.sendFile(__dirname+'/front/index.html')
    

});
router.get('/peekabook',function(req,res,next){
    //console.log(__dirname)



    res.render('home');
    

});


router.get('/books',async function(req,res,next){
    //console.log(__dirname)
    //console.log("started");
    var sid=req.query.sid;
    var s=parseInt(sid);
    var query="SELECT b1.BOOK_ID,b1.BOOK_NAME FROM BOOK b1,(SELECT DISTINCT BOOK_ID FROM BOOK_COPY WHERE SHOP_ID="+s+") b2 WHERE b1.BOOK_ID=b2.BOOK_ID";
    var params=[];
    let result=await logger.log(query,params);
    console.log(result);

    //res.sendFile(__dirname+'/front/home.html',json(result));

    res.status(200).json(result);

    //console.log(req);
    //res.sendFile(__dirname+'/front/home.html')
    

});
router.get('/shops',async function(req,res,next){
    //console.log(__dirname)
    //console.log("started");
    var query="SELECT SHOP_ID,SHOP_NAME from SHOP";
    var params=[];
    let result=await logger.log(query,params);
    //console.log(result);

    //res.sendFile(__dirname+'/front/home.html',json(result));

    res.status(200).json(result);

    //console.log(req);
    //res.sendFile(__dirname+'/front/home.html')
    

});

router.get('/authors',async function(req,res,next){
    //console.log(__dirname)
    //console.log("started");
    var query='SELECT "name" from "Author"';
    var params=[];
    let result=await logger.log(query,params);
    //console.log(result);

    //res.sendFile(__dirname+'/front/home.html',json(result));

    res.status(200).json(result);

    //console.log(req);
    //res.sendFile(__dirname+'/front/home.html')
    

});


router.get('/login',function(req,res,next){
    res.render('login',{d:{user:'12'}});
})



router.get('/selected',function(req,res,next){
    
    //res.render('t1',{d:req.params});
    var q=(req.query);

    //res.status(200).json(q.shop);
    res.render('shop',{s:q});

})

router.get('/selectedbook',function(req,res,next){
    
    //res.render('t1',{d:req.params});
    var q=(req.query);
    console.log(q);

    //res.status(200).json(q.shop);
    res.render('prdet',{i:q});


})
router.post('/buybook',async function(req,res,next){
    var info=req.body;
    //console.log(info.price);
    //console.log(__dirname)
    //console.log("started");
    /*var id=req.query.bookid;
    //console.log(id);*/
    var uid=info.u_id;
    if (uid==""){
        uid=null;
    }
    var query="INSERT into ORDERS (address,price,c_id,b_id,s_id)values('"+info.add+"',"+info.price+","+uid+","+info.bookid+","+info.sid+")";
    var params=[];
    let result=await logger.log(query,params);


    var query2="select * from ordeers";
    
    let result2=await logger.log(query2,params);

    console.log(result2);

    //res.sendFile(__dirname+'/front/home.html',json(result));*/

    //res.status(200).json(result);

    //console.log(req);
    //res.sendFile(__dirname+'/front/home.html')*/
    res.render('t1');
    

});


router.get('/bookdetail',async function(req,res,next){
    //console.log(__dirname)
    //console.log("started");
    var id=req.query.bookid;
    //console.log(id);
    var query='SELECT "id","name","genre","price" FROM "books" where "id"='+id;
    var params=[];
    let result=await logger.log(query,params);
    //console.log(result);

    //res.sendFile(__dirname+'/front/home.html',json(result));

    res.status(200).json(result);

    //console.log(req);
    //res.sendFile(__dirname+'/front/home.html')*/
    

});


router.get('/csignup',(req,res,next)=>{
    res.render('c_signup');
})
router.get('/ssignup',(req,res,next)=>{
    res.render('s_signup');
})
router.post('/cregister', async(req,res,next)=>{
    var info=req.body;
    //console.log(info);
    //console.log(info.username);
    var pass=info.password[0];
  
    if(pass!=info.password[1]){
        res.render('c_signup',{m:'pass and confirm pass does not match '});
    }
    else{
        
        var t_q="SELECT * from CUSTOMER WHERE PASS='"+pass+"'";

        var params=[];
        let result1=await logger.log(t_q,params);
        //console.log(result1);
        if(result1[0]==null){
            console.log('insert');
            //console.log(info);
            var query;
            
            query="DECLARE BEGIN add_customer('"+info.fname+"', '"+info.lname+"', '"+info.mail+"', '"+info.street+"', '"+info.thana+"', '"+info.pcode+"', '"+info.dist+"','"+info.username+"','"+pass+"'); END;";
            
       
            let result=await logger.log(query,params);


            res.render('login');
        }
        else{
            res.render('c_signup',{m:'username or pass already exists'});
        }

    }
    
})

router.post('/sregister', async(req,res,next)=>{
    var info=req.body;
    //console.log(info);
    //console.log(info.username);
    var pass=info.password[0];
  
    if(pass!=info.password[1]){
        res.render('s_signup',{m:'pass and confirm pass does not match '});
    }
    else{
        
        var t_q="SELECT SHOP_ID from SHOP WHERE PASS='"+pass+"'";

        var params=[];
        let result1=await logger.log(t_q,params);
        //console.log(result1);
        if(result1[0]==null){
            console.log('insert');
            //console.log(info);
            var query;
            
            query="DECLARE BEGIN add_shop('"+info.name +"','"+info.mail +"','"+info.street+"','"+info.thana+"','"+info.pcode +"','"+info.dist+"','"+info.username+"','"+pass+"','"+info.contact+"','"+info.des+"'); END;";
            
       
            let result=await logger.log(query,params);


            res.render('login');
        }
        else{
            res.render('s_signup',{m:'username or pass already exists'});
        }

    }
    
})



router.post('/loginId',async(req,res,next)=>{
   
    //console.log(rq.u);
    
    var user=req.body;
    
    var role =user.role;
    var query;
    if(role=='customer'){
        query="SELECT CUSTOMER_ID,FIRST_NAME,USERNAME FROM CUSTOMER WHERE PASS='"+user.pass+"'";
        console.log(user.pass);
    }
    else{
        query="SELECT SHOP_ID,SHOP_NAME,USERNAME FROM SHOP WHERE PASS='"+user.pass+"'"
    }
    
    var params=[];
    let result=await logger.log(query,params);
    //var jr=await result.json()
    var v;
    var r;
    
    if(result == undefined){
        v=false
    }
    
    else{
         r=result[0];
         console.log(r);
    }
    //console.log(r.USERNAME);
    if(r === undefined){
        v=false;
    }
    else if(user.user==r.USERNAME){
        v=true;
    }
    else{
        v =false;
    }

    if(v){
        if(role=='customer'){ ///customer page
            res.render('home2',{d:r});
        }
        else{///shop page
            res.render('t1');
        }
       
    }
    else{
        res.render('fail');
    }
    //res.status(200).json(req.body.user);
})

router.get('/books/:cat',async function(req,res,next){
    //console.log(__dirname)
    var cat=req.params.cat;

    res.status(200).json(cat);
   // console.log(__dirname);

});

const verify=async(user)=>{
    var query=' SELECT FIRST_NAME, LAST_NAME FROM EMPLOYEES WHERE EMPLOYEE_ID ='+user.pass;
    var params=[];
    let result=await logger.log(query,params);
    //var jr=await result.json()

    console.log(result[0].FIRST_NAME);
    if(user.user==result[0].FIRST_NAME){
        return true;
    }
    else{
        return false;
    }



}









const app=express();
app.use(cors());            //cross reference
app.options('*',cors());    //cross reference

//static
app.use(express.static('front'));
app.use('./css',express.static(__dirname+'front/css'));
app.use('./js',express.static(__dirname+'front/js'));
//app.use('./css',express.static(__dirname+''))F:\databaseProject\node_project\front\css


//for hbs

app.set('view engine','hbs');

app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.listen(8080,()=>{
    console.log("listening");
});