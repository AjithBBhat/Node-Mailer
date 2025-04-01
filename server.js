import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json)


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/send-email',(req,res)=>{
    console.log("hit");
    const { recipient ,subject , message } = req.body;
    console.log("hit");
    

    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'ajithbiphone@gmail.com',
            pass : 'Aszx@123'
        }
    })

    const mailOptions = {
        from :'sender mail',
        to : recipient,
        subject : subject,
        text : message
    }

    transport.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error",error)
            res.status(500).send('Error')
        }else {
            console.log('email Sent', info.response);
            res.status(200).send('sent')
        }
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))