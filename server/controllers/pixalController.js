module.exports={
    getPixal:(req,res)=>{
        req.app.get('db').get_pixals(req.params.user_id).then(pixals=>{
            res.status(200).json(pixals)
        }).catch(error=>{
            console.log('error in GET pixals', error)
        })
    },
    postPixal:(req,res)=>{
        req.app.get('db').create_pixal([
            req.body.user_id,
            req.body.year,
            req.body.number_date,
            req.body.mood
        ]).then(()=>{
            res.status(200).send('Yata');
        }).catch(error=>{
            console.log('error in post pixal', error)
        })
    },
    checkPixal:(req,res)=>{
        req.app.get('db').check_pixal([req.params.user_id, req.params.number_date]).then((pixal)=>{
            res.status(200).json(pixal)
        }).catch(error=>{
            console.log('error in get numberdate pixal', error)
        })
    }
}