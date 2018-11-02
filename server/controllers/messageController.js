module.exports={
    read:(req,res)=>{
        req.app.get('db').get_messages(req.params.id).then(posts=>{
            res.status(200).json(posts)
        }).catch(error=>{
            console.error('error in get messages', error)
        })
    }
}