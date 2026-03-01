import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2023-10-16'
});

export const createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const { amount } = data;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new functions.https.HttpsError('internal', 'Failed to create payment intent');
  }
});

export const handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = functions.config().stripe.webhook_secret;

  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Handle successful payment
        await handleSuccessfulPayment(paymentIntent);
        break;
      // Add other webhook events as needed
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  // Update registration status
  const registrationId = paymentIntent.metadata.registrationId;
  if (registrationId) {
    await admin.firestore()
      .collection('registrations')
      .doc(registrationId)
      .update({
        'payment.status': 'completed',
        'payment.transactionId': paymentIntent.id,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
  }
}