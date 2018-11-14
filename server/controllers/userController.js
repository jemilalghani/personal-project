const nodemailer = require('nodemailer');

module.exports={
    getUserData:(req,res)=>{
        res.status(200).json(req.session.user)
    },
    sendEmail: (req,res) => {
        const {email} = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: (process.env.X),
                   pass: (process.env.Y)
               }
           })
           const mailOptions = {
            from: process.env.X, // sender address
            to: email, // list of receivers
            subject: 'Welcome to Yearly', // Subject line
            html: '<img style="width:600px;" src="cid:yearly@pixelate.top" />',
            attachments: [{
                filename:'Group1.png',
                path: 'server/controllers/Group 1.png',
                cid:'yearly@pixelate.top'
            }]
          }
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        
    },
    updateUsername:(req,res)=>{
        const {name} = req.body;
        const {id} = req.params;
        req.session.user.name = name;
        req.app.get('db').update_name([name, id]).then(()=>{
            res.status(200).send('Yata');
        })
    }
};