# Stripe Integration Setup Guide

## Overview
This guide will help you set up Stripe payments for DigiSafe Europe. We'll configure both test and production environments.

## Prerequisites
- Stripe account (create one at [stripe.com](https://stripe.com) if you don't have one)
- Admin access to the DigiSafe Europe platform
- Access to both test and production API keys

## Step 1: Get Your Stripe API Keys

### Test Mode Keys
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Ensure you're in **Test Mode** (toggle in the left sidebar)
3. Find or create your API keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)

### Production Mode Keys (when ready to go live)
1. Switch to **Live Mode** in your Stripe Dashboard
2. Get your production API keys:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)

## Step 2: Set Up Webhooks

### Test Environment
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add Endpoint"
3. Enter your webhook URL: `https://your-app-url.com/api/webhooks/stripe`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.failed`
5. Save and copy the Webhook Secret (starts with `whsec_`)

### Production Environment
Repeat the same steps in Live Mode when ready for production.

## Step 3: Configure in Admin Dashboard

1. Navigate to Admin Dashboard
2. Go to "Payment Settings"
3. Configure Test Mode:
   - Enable "Test Mode" toggle
   - Enter Test Public Key (`pk_test_...`)
   - Enter Test Secret Key (`sk_test_...`)
   - Enter Test Webhook Secret (`whsec_...`)
4. Configure Production Mode:
   - Switch to "Production" tab
   - Enter Live Public Key (`pk_live_...`)
   - Enter Live Secret Key (`sk_live_...`)
   - Enter Live Webhook Secret (`whsec_...`)
5. Click "Save Settings"

## Step 4: Test the Integration

1. Enable Test Mode in Payment Settings
2. Use Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Test expiry date: Any future date
4. Test CVC: Any 3 digits

### Test Card Details
| Card Number | Description |
|------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Declined payment |
| 4000 0000 0000 3220 | 3D Secure required |
| 4000 0000 0000 9995 | Insufficient funds |

## Step 5: Go Live Checklist

Before switching to production:

1. ✓ Test all payment flows in test mode
2. ✓ Verify webhook handling
3. ✓ Set up proper error handling
4. ✓ Configure production API keys
5. ✓ Update webhook endpoints
6. ✓ Test with real cards (small amounts)
7. ✓ Set up monitoring and alerts

## Security Best Practices

1. Never expose secret keys in client-side code
2. Always use HTTPS
3. Implement proper error handling
4. Store sensitive data securely
5. Regular security audits
6. Monitor for suspicious activity

## Troubleshooting

### Common Issues

1. **Payment Failed**
   - Check API keys
   - Verify card details
   - Check webhook configuration

2. **Webhook Errors**
   - Verify webhook secret
   - Check endpoint URL
   - Ensure proper event handling

3. **Integration Issues**
   - Confirm API version
   - Check error logs
   - Verify configuration

### Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [API Reference](https://stripe.com/docs/api)
- [Testing Guide](https://stripe.com/docs/testing)
- Contact support@digisafe-europe.eu for platform-specific issues

## Maintenance

### Regular Tasks
1. Monitor transaction logs
2. Check webhook health
3. Update API versions when needed
4. Review security settings
5. Update test cases

### Monitoring
- Set up alerts for failed payments
- Monitor webhook delivery
- Track error rates
- Review transaction logs

## Additional Resources

- [Stripe Testing Documentation](https://stripe.com/docs/testing)
- [Security Best Practices](https://stripe.com/docs/security)
- [API Changelog](https://stripe.com/docs/upgrades)
- [Dashboard Guide](https://stripe.com/docs/dashboard)