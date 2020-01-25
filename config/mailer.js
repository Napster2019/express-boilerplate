const  SENDER = 'Qfirst  <support@qfirst.io>';

const TRANSPORTER_OPTIONS = {
  host: 'smtp.zoho.com',
      port: 465,
      secure: true,

  // host: 'smtp.mail.yahoo.com',
  //      port: 465,
  //      secure: true,
  //     auth: {
  //       user: 'napstercorbis@yahoo.com',
  //       pass: '^^123MB456^'
  //     }
  auth: {
    user: 'support@qfirst.io',
    pass: 'Admin@@1'
  }
};

module.exports = {
  TRANSPORTER_OPTIONS,
  SENDER
};
