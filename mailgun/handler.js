'use strict';

const api_key = 'key-df38066499c441a642a427032910a571';
const domain = 'api.bittersweet.io';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

function send(name, email) {
  const data = {
    from: 'Bittersweet.io <contact@bittersweet.io>',
    to: email,
    bcc: 'camilo.rios@bittersweet.io',
    subject: 'Email Received',
    text: `Hi ${name},\n\nWe have received your email, we will get in touch shortly`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports.sendContactEmail = (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log(body);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Nombre: ${body.payload.changedContact.name}, Correo: ${body.payload.changedContact.email}, Comentarios: ${body.payload.changedContact.message}`,
    }),
  };

  send(body.payload.changedContact.name, body.payload.changedContact.email);

  callback(null, response);
};

module.exports.sendQuoteEmail = (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log(body);
  console.log(body.payload.changedEdge);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Nombre: ${body.payload.changedEdge.node.name}, Correo: ${body.payload.changedEdge.node.email}, Comentarios: ${body.payload.changedEdge.node.comments}`,
    }),
  };

  send(body.payload.changedEdge.node.name, body.payload.changedEdge.node.email);

  callback(null, response);
};