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
        const {year, date, number_date, message} = req.body;
        req.app.get('db').create_message([user_id, year, date,number_date,message]).then(()=>{
            res.status(200).send('YASS')
        })
    }
}