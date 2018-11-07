module.exports={
    read:(req,res)=>{
        req.app.get('db').get_messages(req.params.user_id).then(posts=>{
            res.status(200).json(posts)
        }).catch(error=>{
            console.error('error in get messages', error)
        })
    },
    create: (req,res)=>{
        const {user_id} = req.params;
        const {date, message, picture} = req.body;
        req.app.get('db').create_message([user_id, date, message, picture]).then(()=>{
            res.status(200).send('YASS')
        })
    },
    readone:(req,res)=>{
        req.app.get('db').get_message([req.params.user_id, res.params.user_id]).then((post)=>{
            res.status(200).json(post)
        }).catch(error=>{
            console.error('error in getting one', error)
        })
    }
}