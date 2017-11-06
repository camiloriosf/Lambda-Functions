'use strict';

const config = require('./config');
const mailgun = require('mailgun-js')({ apiKey: config.api_key, domain: config.domain });

function send(name, email) {
  const data = {
    from: 'Bittersweet.io <contact@bittersweet.io>',
    to: email,
    bcc: 'camilo.rios@bittersweet.io',
    subject: 'Cuenta Creada',
    text: `Hola ${name},\n\nHemos creado tu cuenta, puedes ingresar haciendo click en el siguiente enlace\n\nhttps://ac.bittersweet.io/admin`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports.sendConfirmationEmail = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: body,
    }),
  };

  send(body.payload.changedUser.name, body.payload.changedUser.username);

  callback(null, response);
};
