const nodemailer = require('nodemailer');

module.exports={
    getUserData:(req,res)=>{
        res.status(200).json(req.session.user)
    },
    sendEmail: (req,res) => {
        const {emailAddress} = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: (process.env.X),
                   pass: (process.env.Y)
               }
           })

           const mailOptions = {
            from: process.env.X, // sender address
            to: emailAddress, // list of receivers
            subject: 'Welcome', // Subject line
            html: '<p>email content</p>'// plain text body
          }

          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        
    }
};