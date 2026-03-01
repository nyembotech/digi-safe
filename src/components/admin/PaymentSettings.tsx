import React, { useState, useEffect } from 'react';
import { Bot, Loader2, Save, AlertCircle, CheckCircle, Beaker, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPaymentSettings, updatePaymentSettings, type PaymentSettings } from '../../firebase/payment-settings';
import { Button } from '../Button';

export function PaymentSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeEnvironment, setActiveEnvironment] = useState<'test' | 'production'>('test');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getPaymentSettings();
      setSettings(data || {
        stripe: {
          test: { publicKey: '', secretKey: '', webhookSecret: '' },
          production: { publicKey: '', secretKey: '', webhookSecret: '' },
          isTestMode: true
        },
        paypal: {
          test: { clientId: '', clientSecret: '', webhookId: '' },
          production: { clientId: '', clientSecret: '', webhookId: '' },
          isTestMode: true
        },
        lastUpdated: new Date().toISOString(),
        updatedBy: user?.uid || ''
      } as PaymentSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      setError('Failed to load payment settings');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !settings) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updatePaymentSettings(settings, user.uid);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError('Failed to save payment settings');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold">Payment Settings</h2>
        </div>
      </div>

      {/* Environment Toggle */}
      <div className="flex gap-4 p-1 bg-gray-100 rounded-lg w-fit">
        <button
          onClick={() => setActiveEnvironment('test')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeEnvironment === 'test'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Beaker className="w-4 h-4" />
          Test Environment
        </button>
        <button
          onClick={() => setActiveEnvironment('production')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeEnvironment === 'production'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          Production Environment
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Stripe Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Stripe Configuration</h3>
          {activeEnvironment === 'test' && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">Test Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.stripe.isTestMode}
                  onChange={(e) => setSettings(settings => ({
                    ...settings!,
                    stripe: {
                      ...settings!.stripe,
                      isTestMode: e.target.checked
                    }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Public Key
              </label>
              <input
                type="text"
                value={settings?.stripe[activeEnvironment].publicKey}
                onChange={(e) => setSettings(settings => ({
                  ...settings!,
                  stripe: {
                    ...settings!.stripe,
                    [activeEnvironment]: {
                      ...settings!.stripe[activeEnvironment],
                      publicKey: e.target.value
                    }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder={`Enter your ${activeEnvironment} public key (pk_${activeEnvironment}_...)`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <input
                type="password"
                value={settings?.stripe[activeEnvironment].secretKey}
                onChange={(e) => setSettings(settings => ({
                  ...settings!,
                  stripe: {
                    ...settings!.stripe,
                    [activeEnvironment]: {
                      ...settings!.stripe[activeEnvironment],
                      secretKey: e.target.value
                    }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder={`Enter your ${activeEnvironment} secret key (sk_${activeEnvironment}_...)`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook Secret
              </label>
              <input
                type="password"
                value={settings?.stripe[activeEnvironment].webhookSecret}
                onChange={(e) => setSettings(settings => ({
                  ...settings!,
                  stripe: {
                    ...settings!.stripe,
                    [activeEnvironment]: {
                      ...settings!.stripe[activeEnvironment],
                      webhookSecret: e.target.value
                    }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder={`Enter your ${activeEnvironment} webhook secret (whsec_...)`}
              />
            </div>
          </div>
        </div>

        {/* PayPal Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">PayPal Configuration</h3>
          {activeEnvironment === 'test' && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">Test Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.paypal.isTestMode}
                  onChange={(e) => setSettings(settings => ({
                    ...settings!,
                    paypal: {
                      ...settings!.paypal,
                      isTestMode: e.target.checked
                    }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client ID
              </label>
              <input
                type="text"
                value={settings?.paypal[activeEnvironment].clientId}
                onChange={(e) => setSettings(settings => ({
                  ...settings!,
                  paypal: {
                    ...settings!.paypal,
                    [activeEnvironment]: {
                      ...settings!.paypal[activeEnvironment],
                      clientId: e.target.value
                    }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Secret
              </label>
              <input
                type="password"
                value={settings?.paypal[activeEnvironment].clientSecret}
                onChange={(e) => setSettings(settings => ({
                  ...settings!,
                  paypal: {
                    ...settings!.paypal,
                    [activeEnvironment]: {
                      ...settings!.paypal[activeEnvironment],
                      clientSecret: e.target.value
                    }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook ID
              </label>
              <input
                type="text"
                value={settings?.paypal[activeEnvironment].webhookId}
                onChange={(e) => setSettings(settings => ({
                  ...settings!,
                  paypal: {
                    ...settings!.paypal,
                    [activeEnvironment]: {
                      ...settings!.paypal[activeEnvironment],
                      webhookId: e.target.value
                    }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 text-green-600 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            Settings saved successfully
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto flex items-center justify-center gap-2"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </Button>
      </form>
    </div>
  );
}