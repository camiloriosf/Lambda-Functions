'use strict';

const config = require('./config');
const mailgun = require('mailgun-js')({ apiKey: config.api_key, domain: config.domain });

function send(name, email, subject, text) {
  const data = {
    from: 'Bittersweet.io <contact@bittersweet.io>',
    to: email,
    bcc: 'camilo.rios@bittersweet.io',
    subject: subject,
    text: text
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

  const name = body.payload.changedUser.name;
  const username = body.payload.changedUser.username;
  const subject = 'Cuenta Creada';
  const text = `Hola ${name},\n\nHemos creado tu cuenta, puedes ingresar haciendo click en el siguiente enlace\n\nhttps://ac.bittersweet.io/admin`;

  send(name, username, subject, text);

  callback(null, response);
};

module.exports.sendContactConfirmationEmail = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: body,
    }),
  };

  const name = body.payload.changedContact.name;
  const email = body.payload.changedContact.email;
  const subject = 'Mensaje recibido';
  const text = `Hola ${name},\n\nHemos recibido tu mensaje, nos pondremos en contacto a la brevedad`;

  send(name, email, subject, text);

  callback(null, response);
};