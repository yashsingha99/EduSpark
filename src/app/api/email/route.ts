// // pages/api/sendBulkEmail.js
// // import * as SibApiV3Sdk from 'sib-api-v3-typescript';
// import  SibApiV3Sdk from 'sib-api-v3-typescript';
// import { NextRequest, NextResponse } from 'next/server';

// // var apiInstance = new SibApiV3Sdk.SMTPApi()

// // Configure API key authorization: api-key
// // var partnerKey = apiInstance.authentications['partnerKey'];
// // partnerKey.
// const apiKey = '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';

// // var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// interface Email {
//     email: String
// }

// export async function POST(req: NextRequest) {
//   const { recipients, subject, body } = await req.json();
//   console.log(recipients);
//    const url = `https://api.brevo.com/v3/smtp/email`;
// //   const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
//    const data = {
//     to: recipients.map((email : [Email]) => ({ email })),
//     templateId : 10,
//   };
//   const sendSmtpEmail = {
//     sender: { email: 'singhaly914@gmail.com', name: 'yash singhal' },
//     to: recipients.map((email : [Email]) => ({ email })),
//     subject: subject,
//     htmlContent: body,
//     headers: {
// 		'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
// 	}
//   };

//    const options = {
//     headers: {
//       "Content-Type": "application/json",
//       "api-key": apiKey,
//     },
//   };

//   try {
//     // const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
//     const response = await axios.post(url, data, options);
//     return NextResponse.json({ success: true, message: 'Emails sent successfully!', data: response });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: 'Error sending emails', error });
//   }
// }
