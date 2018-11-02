module.exports={
    getPixal:(req,res)=>{
        console.log(req.params.id)
        req.app.get('db').get_pixals(req.params.id).then(pixals=>{
            res.status(200).json(pixals)
        }).catch(error=>{
            console.log('error in GET pixals', error)
        })
    },
    postPixal:(req,res)=>{
        req.app.get('db').create_pixal([
            req.body.id,
            req.body.year,
            req.body.number_date,
            req.body.mood
        ]).then(()=>{
            res.status(200).send('Yata');
        }).catch(error=>{
            console.log('error in post pixal', error)
        })
    }
}