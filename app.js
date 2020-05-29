const express    = require('express')
const exhds      = require('express-handlebars')
const app        = express()
const db         = require('./db/connection');
const bodyParser = require('body-parser')
const path       = require('path')
const port       = 3333
const Job        = require('./models/Job');
const Sequelize  = require('sequelize')
const Op         = Sequelize.Op

app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`)
    console.log(`Acessar: http://localhost:${port}`)
})

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

// handle bars 
app.set('views', path.join(__dirname, 'views')); // Diretorio das views, onde ficam os templates
app.engine('handlebars', exhds({ defaultLayout: 'main' })); // Nosso arquivo principal de layout
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db.authenticate()
    .then(()=>{
        console.log('conectou ao banco com sucesso')
    })
    .catch(err => console.log('Ocorreu um erro', err))


app.get('/', async (req, res)=>{

    let search = req.query.job;
    let query = '%'+search+'%'; // PH -> PHP, P -> PHP, Word -> Wordpres, press -> Wordpress

    if(!search){
        const jobs = await Job.findAll({ order: [
            ['createdAt', 'DESC']
        ]})
    
        res.render('index', { jobs })
    }else{
        const jobs = await Job.findAll({ 
            where: {title: {[Op.like]: query}},
            order: [
                ['createdAt', 'DESC']
            ]
    })
        res.render('index', { jobs, search })
    }

   
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))

