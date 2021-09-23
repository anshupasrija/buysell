const nodemailer = require('nodemailer');

const smtpServerURL = "smtp.gmail.com";
const authUser = "public.mipqim@gmail.com";
const authPass = "hiDter-hivmaf-qojce9";
const fromEmail = 'public.mipqim@gmail.com';

function sendEmail(toEmail, title, txt) {
    let transporter = nodemailer.createTransport({
        host: smtpServerURL,    //SMTP 서버 주소
        secure: true,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
        auth: {
            user: authUser,     //메일서버 계정
            pass: authPass      //메일서버 비번
        }
    });

    let mailOptions = {
        from: fromEmail,        //보내는 사람 주소
        to: toEmail ,           //받는 사람 주소
        subject: title,         //제목
        text: txt               //본문
    };

    //전송 시작!
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            //에러
            console.log(error);
        }
        //전송 완료
        console.log("Finish sending email : " + info.response);
        transporter.close();
    })
}


sendEmail("mibdim.mipqim@gmail.com", "hello", "hello world");
