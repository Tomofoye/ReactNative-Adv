const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  if (!req.body.phone) {
    //status 422 means inprocessable entity, they sent bad information
    return res.status(422).send({ error: 'You must provide a phone number!' });
  }

  //replace any characters that are not a digit with empty string
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));

      twilio.messages.create({
        //try using an ES6 template string here
        body: 'Your code is ' + code,
        to: phone,
        from: '+19196363026'
      }, (err) => {
        if (err) { return res.status(422).send(err) }

        //cannot save arbitrary data to user ex: userRecord.code = code
        //authentication and database in firebase is decoupled
        admin.database().ref('users/' + phone)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true});
          });
      })
      return null;
    })
    .catch((err) => {
      res.status(422).send({ err, error: 'User not found' });
      return null;
    });
}
