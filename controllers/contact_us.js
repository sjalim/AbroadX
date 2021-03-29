const nodemailer = require("nodemailer");

exports.contactForm = async (req, res) => {
    var message = ``;

    if(req.method === "POST") {
        const name = req.body.txtName;
        const email = req.body.txtEmail;
        const phone = req.body.txtPhone;
        const text = req.body.txtMsg;

        console.log(req.body);
        if(!name || !email || !phone || !text) {
            console.log("Values null");
            return  res.render('contact_us', {
                message: 'Fill all the fields',
                user: req.user
            })
        } else {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'farmersapp20@gmail.com', //  user
                    pass: '001004008' // password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: email, // sender address
                to: "farmersapp20@gmail.com", // list of receivers
                subject: "AbroadX Contact", // Subject line
                text: "Sender's Name: "+name+"\nSender's Email: "+email+"\n"+text, // plain text body
                // html: output, // html body
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.render('contact_us', {
                message: 'Email Sent',
                user: req.user
            })
        }
    }
    else {
        res.render('contact_us', {
            message: message,
            user: req.user
        });
    }

}