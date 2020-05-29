const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


// detalhe da vaga
router.get('/view/:id', async (req, res) => {
        
    const job = await Job.findOne({
        where: {id: req.params.id}
    })
    res.render('view', {job})
})


// form da rota de envio
router.get('/add', (req, res)=>{
    res.render('add')
})

router.post('/add', async (req, res)=>{

    let {title, salary, company, description, email, new_job } = req.body
    
    await Job.create({
        title,
        salary,
        company,
        description,
        email,
        new_job,
    })
        res.redirect('/')
})

module.exports = router