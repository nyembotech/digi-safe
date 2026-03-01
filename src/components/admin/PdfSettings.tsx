import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { getPDFSettings, updatePDFSettings } from '../../firebase/settings';
import type { PDFSettings } from '../../types/settings';

export function PDFSettings() {
  const [settings, setSettings] = useState<PDFSettings>({
    company: {
      name: 'DigiSafe Europe GmbH',
      address: {
        street: 'Innovationsstraße 123',
        city: 'Frankfurt am Main',
        postalCode: '60313',
        country: 'Germany'
      },
      vat: 'DE123456789',
      email: 'support@digisafe-europe.eu',
      phone: '+49 (0) 69 1234567'
    },
    invoice: {
      prefix: 'INV',
      footer: 'Thank you for choosing DigiSafe Europe. For any questions, please contact us.',
      terms: [
        'Payment is due within 30 days',
        'Late payments may incur additional fees',
        'All prices include VAT'
      ],
      colors: {
        primary: '#003399',
        secondary: '#FFD700',
        accent: '#059669'
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getPDFSettings();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading PDF settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await updatePDFSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving PDF settings:', error);
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
        <h2 className="text-2xl font-bold">PDF & Company Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={settings.company.name}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, name: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={settings.company.address.street}
                  onChange={(e) => setSettings({
                    ...settings,
                    company: {
                      ...settings.company,
                      address: { ...settings.company.address, street: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={settings.company.address.city}
                  onChange={(e) => setSettings({
                    ...settings,
                    company: {
                      ...settings.company,
                      address: { ...settings.company.address, city: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={settings.company.address.postalCode}
                  onChange={(e) => setSettings({
                    ...settings,
                    company: {
                      ...settings.company,
                      address: { ...settings.company.address, postalCode: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={settings.company.address.country}
                  onChange={(e) => setSettings({
                    ...settings,
                    company: {
                      ...settings.company,
                      address: { ...settings.company.address, country: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VAT Number
                </label>
                <input
                  type="text"
                  value={settings.company.vat}
                  onChange={(e) => setSettings({
                    ...settings,
                    company: { ...settings.company, vat: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={settings.company.phone}
                  onChange={(e) => setSettings({
                    ...settings,
                    company: { ...settings.company, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={settings.company.email}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, email: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Invoice Settings</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number Prefix
              </label>
              <input
                type="text"
                value={settings.invoice.prefix}
                onChange={(e) => setSettings({
                  ...settings,
                  invoice: { ...settings.invoice, prefix: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Footer Text
              </label>
              <textarea
                value={settings.invoice.footer}
                onChange={(e) => setSettings({
                  ...settings,
                  invoice: { ...settings.invoice, footer: e.target.value }
                })}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Terms & Conditions
              </label>
              <div className="space-y-2">
                {settings.invoice.terms.map((term, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(e) => {
                        const newTerms = [...settings.invoice.terms];
                        newTerms[index] = e.target.value;
                        setSettings({
                          ...settings,
                          invoice: { ...settings.invoice, terms: newTerms }
                        });
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newTerms = settings.invoice.terms.filter((_, i) => i !== index);
                        setSettings({
                          ...settings,
                          invoice: { ...settings.invoice, terms: newTerms }
                        });
                      }}
                      className="px-3 py-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setSettings({
                    ...settings,
                    invoice: {
                      ...settings.invoice,
                      terms: [...settings.invoice.terms, '']
                    }
                  })}
                  className="text-blue-500 hover:text-blue-700"
                >
                  + Add Term
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={settings.invoice.colors.primary}
                  onChange={(e) => setSettings({
                    ...settings,
                    invoice: {
                      ...settings.invoice,
                      colors: { ...settings.invoice.colors, primary: e.target.value }
                    }
                  })}
                  className="w-full h-10 p-1 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Color
                </label>
                <input
                  type="color"
                  value={settings.invoice.colors.secondary}
                  onChange={(e) => setSettings({
                    ...settings,
                    invoice: {
                      ...settings.invoice,
                      colors: { ...settings.invoice.colors, secondary: e.target.value }
                    }
                  })}
                  className="w-full h-10 p-1 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accent Color
                </label>
                <input
                  type="color"
                  value={settings.invoice.colors.accent}
                  onChange={(e) => setSettings({
                    ...settings,
                    invoice: {
                      ...settings.invoice,
                      colors: { ...settings.invoice.colors, accent: e.target.value }
                    }
                  })}
                  className="w-full h-10 p-1 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="flex items-center gap-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : success ? (
              <>
                <Save className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}