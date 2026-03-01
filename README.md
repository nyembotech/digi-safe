# DigiSafe Europe - Digital Safety Education Platform

<div align="center">
  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" alt="DigiSafe Europe Platform" width="800px" />

  <p align="center">
    A comprehensive digital safety education platform for children and families across Europe
  </p>
</div>

## 🌟 Overview

DigiSafe Europe is the leading digital safety education platform, providing comprehensive courses and certifications for children aged 8-16. Our platform focuses on:

- 🔒 Digital Safety Certification (EU Smartphone License)
- 🤖 AI Education for Children
- 🌐 Online Privacy & Security Training
- 👥 Parent-Child Collaborative Learning

## 📚 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

## ✨ Features

### 🔐 Authentication System

- Multi-role login (Admin/Student)
- Role-based access control
- Secure session management
- Parent account linking

### 👨‍🎓 Student Features

#### Dashboard
- Course progress tracking
- Interactive learning statistics
- Achievement badges
- Personal learning journal

#### Learning Tools
- Interactive assignments
- Progress visualization
- Real-time feedback
- Collaborative projects

### 👩‍💼 Admin Features

#### Content Management
- Course creation and editing
- Learning material management
- Student progress monitoring
- Performance analytics

#### Administrative Tools
- User management
- Payment processing
- Report generation
- System configuration

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **@hello-pangea/dnd** - Drag & drop
- **Lucide React** - Icons

### Backend Services
- **Firebase**
  - Authentication
  - Firestore Database
  - Cloud Storage
  - Hosting

### Payment Processing
- **Stripe** - Primary payment processor
- **PayPal** - Alternative payment method

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/digisafe-europe.git
cd digisafe-europe
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_USE_EMULATOR=false
```

4. Start development server:
```bash
npm run dev
```

## 📁 Project Structure

```
digisafe-europe/
├── src/
│   ├── components/           # React components
│   │   ├── admin/           # Admin dashboard components
│   │   ├── student/         # Student dashboard components
│   │   ├── ui/             # Shared UI components
│   │   └── public/         # Public facing components
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx
│   │   └── ...
│   ├── firebase/           # Firebase configuration & services
│   │   ├── auth.ts
│   │   ├── config.ts
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebounce.ts
│   │   └── ...
│   ├── lib/               # Utility functions
│   │   ├── utils.ts
│   │   └── ...
│   ├── services/          # External service integrations
│   │   ├── email.ts
│   │   └── ...
│   ├── styles/            # Global styles
│   │   └── index.css
│   └── types/             # TypeScript definitions
│       ├── auth.ts
│       └── ...
├── public/                # Static assets
├── tests/                 # Test files
└── firebase/             # Firebase configuration
```

## 💻 Development

### Code Style

We use ESLint, Stylelint, and TypeScript for code quality:

```bash
# Lint TypeScript/React
npm run lint

# Lint styles
npm run lint:css

# Type-check the project
npm run typecheck

# Run all lint/type checks
npm run lint:all
```

### Environment Setup

1. **Firebase Setup**
   - Create Firebase project
   - Enable Authentication
   - Set up Firestore
   - Configure Storage
   - Update security rules

2. **Payment Integration**
   - Configure Stripe account
   - Set up PayPal integration
   - Add API keys to `.env`

### Running Locally

```bash
# Start development server
npm run dev

# Launch Storybook component workbench
npm run storybook

# Start with Firebase emulators
npm run dev:emulator
```

Storybook static documentation can be generated with:

```bash
npm run storybook:build
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test src/components/admin/__tests__/Dashboard.test.tsx
```

## 📦 Deployment

### Production Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Firebase Deployment

```bash
# Deploy to Firebase
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

## 🆘 Support

- **Documentation:** [docs.digisafe-europe.eu](https://docs.digisafe-europe.eu)
- **Email:** support@digisafe-europe.eu
- **Issues:** GitHub Issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- European Union Digital Safety Initiative
- Contributing Educational Institutions
- Our Amazing Development Team

---

<div align="center">
  Made with ❤️ by the DigiSafe Europe Team
</div>
