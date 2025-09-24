# SafeNova - Disaster Preparedness Education System

A comprehensive disaster preparedness and response education system for schools and colleges, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Role-Based Authentication**: Student, Teacher, and Admin dashboards
- **Multi-Language Support**: English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati
- **Emergency Response System**: Quick access to emergency contacts and services
- **AI-Powered Image Recognition**: Analyze disaster scenarios with AI
- **Real-time Chatbot**: 24/7 emergency assistance
- **Interactive Learning Modules**: Video tutorials and simulations
- **Gamification**: Points, badges, leaderboards, and achievements
- **Google Maps Integration**: Find nearest safe places and emergency services

### Emergency Features
- 📞 **Emergency Contacts**: Direct access to police, fire, medical, and disaster management
- 📷 **Image Caption**: Capture and analyze emergency situations
- 🗺️ **Safe Places**: Locate nearest hospitals, shelters, and emergency services
- 🤖 **AI Image Recognition**: Upload images for AI-powered disaster analysis
- 💬 **Emergency Chatbot**: Get instant help and guidance
- 📤 **Image Sharing**: Share disaster information and get community support

### Dashboard Features
- **Student Dashboard**: Learning modules, quizzes, gamification, leaderboard
- **Teacher Dashboard**: Student management, quiz creation, meeting scheduling
- **Admin Dashboard**: System analytics, school management, emergency alerts

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Internationalization**: React i18next

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd SafeNova
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 🏗️ Project Structure

```
SafeNova/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── EmergencyFeatures.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   └── Navigation.tsx
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication context
│   └── LanguageContext.tsx # Language context
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## 🎯 User Roles

### Student
- Access learning modules and quizzes
- Track progress and earn points
- Participate in leaderboards
- Use emergency features

### Teacher
- Create and manage quizzes
- Monitor student progress
- Schedule meetings
- Access analytics

### Admin
- Manage schools and users
- Send emergency alerts
- Monitor system health
- Access comprehensive analytics

## 🌐 Multi-Language Support

The system supports 7 languages:
- English (en)
- Hindi (hi)
- Bengali (bn)
- Tamil (ta)
- Telugu (te)
- Marathi (mr)
- Gujarati (gu)

## 🚨 Emergency Features

### Emergency Contacts
- Police: 100
- Fire Department: 101
- Medical Emergency: 102
- Disaster Management: 108
- Women Helpline: 1091
- Child Helpline: 1098

### AI Image Recognition
Upload images of disaster scenarios to get AI-powered analysis and recommendations.

### Safe Places
Find nearest:
- Hospitals
- Emergency shelters
- Police stations
- Fire stations

## 🎮 Gamification

- **Points System**: Earn points for completing modules and quizzes
- **Badges**: Unlock achievements and badges
- **Leaderboards**: Compete with other students
- **Streaks**: Maintain learning streaks
- **Progress Tracking**: Visual progress indicators

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: support@safenova.com
- Phone: +1 (555) 123-4567

## 🙏 Acknowledgments

- Emergency services and first responders
- Educational institutions
- Disaster management organizations
- Open source community

---

**SafeNova** - Empowering educational institutions with comprehensive disaster preparedness and response training systems.
