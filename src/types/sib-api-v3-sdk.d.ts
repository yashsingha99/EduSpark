declare module 'sib-api-v3-sdk' {
  export class ApiClient {
    static instance: {
      authentications: {
        'api-key': {
          apiKey: string;
        };
      };
    };
  }

  export class TransactionalEmailsApi {
    sendTransacEmail(data: {
      sender: { email: string; name: string };
      to: { email: string }[];
      subject: string;
      htmlContent: string;
    }): Promise<any>;
  }
} 