import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripe';
import { CreditCard, Wallet } from 'lucide-react';
import { Button } from './Button';
import { createPaymentIntent, savePaymentDetails } from '../firebase/functions/payment';

interface PaymentFormProps {
  registrationId: string;
  amount: number;
  onSuccess: (paymentMethod: string, transactionId: string) => void;
  onError: (error: Error) => void;
}

export function PaymentForm({ registrationId, amount, onSuccess, onError }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create payment intent using Firebase Function
      const { data: { clientSecret } } = await createPaymentIntent({ amount });
      
      const { paymentIntent, error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
      });

      if (error) {
        throw error;
      }

      if (paymentIntent.status === 'succeeded') {
        // Save payment details to Firestore
        await savePaymentDetails({
          registrationId,
          paymentMethod: 'stripe',
          amount,
          status: 'completed',
          transactionId: paymentIntent.id
        });

        onSuccess('stripe', paymentIntent.id);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      onError(error instanceof Error ? error : new Error('Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod('stripe')}
          className={`p-6 rounded-xl border-2 transition-all ${
            paymentMethod === 'stripe'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-gray-500">Pay with Stripe</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod('paypal')}
          className={`p-6 rounded-xl border-2 transition-all ${
            paymentMethod === 'paypal'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Wallet className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="font-medium">PayPal</p>
              <p className="text-sm text-gray-500">Pay with PayPal</p>
            </div>
          </div>
        </motion.button>
      </div>

      {paymentMethod === 'stripe' && (
        <Elements stripe={stripePromise}>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <Button
              onClick={handleStripePayment}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Pay with Card'}
            </Button>
          </div>
        </Elements>
      )}

      {paymentMethod === 'paypal' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: (amount / 100).toFixed(2),
                      currency_code: 'EUR'
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              if (!actions.order) return;
              const order = await actions.order.capture();
              
              // Save payment details to Firestore
              await savePaymentDetails({
                registrationId,
                paymentMethod: 'paypal',
                amount,
                status: 'completed',
                transactionId: order.id
              });

              onSuccess('paypal', order.id);
            }}
            onError={(err) => {
              console.error('PayPal error:', err);
              onError(new Error('PayPal payment failed'));
            }}
          />
        </div>
      )}
    </div>
  );
}