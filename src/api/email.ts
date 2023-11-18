import instance from "./config";

type SendMailType = {
    email_to: string;
    subject: string;
    content: string;
    html: string;
};
export const sendMail = (infoMail: SendMailType) => {
    return instance.post("/email", infoMail);
};
