const Patiente = require('../models/patiente.model');
const twilio = require('twilio');
const accountSid = 'AC18d59b9ac1675efe84d5e5f993cb9281';
const authToken = '868c091927d42293dfe11b0057d9fe9a';

//MSG TEL 
exports.rendezVous = async (req, res) => {
  const { nomP, prenomP, naissance } = req.body;
  if (!nomP || !prenomP || !naissance) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const patiente = await Patiente.findOne({
    nomP: nomP,
    prenomP: prenomP,
    naissance: naissance,
  });
  if (!patiente) {
    return res
      .status(409)
      .json({ message: 'Patiente name does not exist' });
  }

  const num = '+216' + patiente.tel;
  const twilioClient = twilio(accountSid, authToken);
  const messageBody = req.body.messageBody;
  const messageParams = {
    body: messageBody,
    from: '+12706122727',
    to: num,
  };

  twilioClient.messages
    .create(messageParams)
    .then(message => console.log(`SMS message sent with message ID ${message.sid}`))
    .catch(error => console.error(`Failed to send SMS message: ${error.message}`));
};
