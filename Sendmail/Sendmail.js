const nodemailer = require("nodemailer");
 const credential=require("../credential")
const senddata=require("./Senddata")
// async..await is not allowed in global scope, must use a wrapper
module .exports=async function main(data,email,subject,filename) {
    const nodemailer = require('nodemailer');
    //console.log(credential())
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: credential().username,
            pass: credential().password
        }
    });
    if(subject=="Forget Password"){
      const htmldata=' <body><form method="get" action="http://localhost:8899/changepassword"><input type="hidden" name="token" value='+data+' /><input type="submit" value="Forget Password" /></form><p>Ignore if you not sending the request!</p><p>link expire in 5 minute!</p></body>'
      let mailDetails = {
        from: credential().username,
        to: email,
        subject: subject,
        html:htmldata}    
    
    
    await mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            if(err.code=='EAUTH'){
            console.log("Invalid login credentials .");}
            else{
                console.log(err)
               }
        } else {
            console.log('Email sent successfully');
        }
    });
    
}
else{

    let mailDetails = {
        from: credential().username,
        to: email,
        subject: subject,
        attachments: [{
            filename: 'Logo.png',
            path: __dirname +'/../uploads/logo.png',
            cid: 'logo'  
        },
        {
            filename: `${filename}.pdf`,
            path: __dirname +`/../uploads/Orderspdf/${filename}.pdf`  
        }
    ],
        html:senddata(data)
        
    };
      
    await mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err)
            console.log("error occurs")
        } else {
            console.log('Email sent successfully');
        }
    });
}
}

