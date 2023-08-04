const nodemailer=require("nodemailer");
const sendMail=async(email,message)=>{
    try{
        //Create a transporter
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ponduriprakash@gmail.com",
                pass:"prakash7078",
            },
        });
        const mailOptions={
            from:email,
            to:"ponduriprakash7078@gmail.com",
            subject:"Message from VVIT Clubs",
            text:message,
        };
        transporter.sendMail(mailOptions,(error)=>{
            if(error){
                console.log("Error occured while sending mail",error.message);
            }else{
                console.log("email sent");
                res.status(200).json({ message: "Email sent successfully from atoms" });
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
      }

};
module.exports={sendMail};