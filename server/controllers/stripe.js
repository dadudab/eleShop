const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.payment = async (req, res) => {
  try {
    console.log(req.body);
    const chargeResponse = await stripe.charges.create(
      {
        amount: req.body.amount * 100,
        currency: 'usd',
        source: req.body.tokenId,
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          return res.json(stripeErr);
        }
        return res.json(stripeRes);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
