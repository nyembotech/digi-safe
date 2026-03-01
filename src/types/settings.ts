export interface PDFSettings {
  company: {
    name: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    vat: string;
    email: string;
    phone: string;
  };
  invoice: {
    prefix: string;
    footer: string;
    terms: string[];
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}