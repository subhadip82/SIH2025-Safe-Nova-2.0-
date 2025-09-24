'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.team': 'Emergency Teams',
    'nav.language': 'Language',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'Disaster Preparedness Education System',
    'hero.subtitle': 'Empowering schools and colleges with comprehensive disaster management training',
    'hero.teacher_login': 'Teacher Login',
    'hero.student_login': 'Student Login',
    'hero.admin_login': 'Admin Login',
    'hero.continue_dashboard': 'Continue to Dashboard',
    'features.emergency_contacts': 'Emergency Contacts',
    'features.image_caption': 'Image Caption',
    'features.safe_places': 'Safe Places',
    'features.image_recognition': 'AI Image Recognition',
    'features.chatbot': 'Emergency Chatbot',
    'features.share': 'Share & Discuss',
    'team.fire': 'Fire Department',
    'team.earthquake': 'Earthquake Response',
    'team.flood': 'Flood Control',
    'team.medical': 'Medical Emergency',
    'team.police': 'Police',
    'team.rescue': 'Rescue Team',
    'footer.about': 'About SafeNova',
    'footer.contact': 'Contact Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service'
  },
  hi: {
    'nav.home': 'होम',
    'nav.team': 'आपातकालीन टीम',
    'nav.language': 'भाषा',
    'nav.login': 'लॉगिन',
    'nav.register': 'रजिस्टर',
    'nav.logout': 'लॉगआउट',
    'nav.dashboard': 'डैशबोर्ड',
    'hero.title': 'आपदा तैयारी शिक्षा प्रणाली',
    'hero.subtitle': 'स्कूलों और कॉलेजों को व्यापक आपदा प्रबंधन प्रशिक्षण के साथ सशक्त बनाना',
    'hero.teacher_login': 'शिक्षक लॉगिन',
    'hero.student_login': 'छात्र लॉगिन',
    'hero.admin_login': 'एडमिन लॉगिन',
    'hero.continue_dashboard': 'डैशबोर्ड पर जारी रखें',
    'features.emergency_contacts': 'आपातकालीन संपर्क',
    'features.image_caption': 'छवि कैप्शन',
    'features.safe_places': 'सुरक्षित स्थान',
    'features.image_recognition': 'एआई छवि पहचान',
    'features.chatbot': 'आपातकालीन चैटबॉट',
    'features.share': 'साझा करें और चर्चा करें',
    'team.fire': 'अग्निशमन विभाग',
    'team.earthquake': 'भूकंप प्रतिक्रिया',
    'team.flood': 'बाढ़ नियंत्रण',
    'team.medical': 'चिकित्सा आपातकाल',
    'team.police': 'पुलिस',
    'team.rescue': 'बचाव दल',
    'footer.about': 'SafeNova के बारे में',
    'footer.contact': 'संपर्क करें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें'
  },
  bn: {
    'nav.home': 'হোম',
    'nav.team': 'জরুরি দল',
    'nav.language': 'ভাষা',
    'nav.login': 'লগইন',
    'nav.register': 'নিবন্ধন',
    'nav.logout': 'লগআউট',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'hero.title': 'দুর্যোগ প্রস্তুতি শিক্ষা ব্যবস্থা',
    'hero.subtitle': 'স্কুল ও কলেজগুলিকে ব্যাপক দুর্যোগ ব্যবস্থাপনা প্রশিক্ষণ দিয়ে সক্ষম করা',
    'hero.teacher_login': 'শিক্ষক লগইন',
    'hero.student_login': 'ছাত্র লগইন',
    'hero.admin_login': 'অ্যাডমিন লগইন',
    'hero.continue_dashboard': 'ড্যাশবোর্ডে চালিয়ে যান',
    'features.emergency_contacts': 'জরুরি যোগাযোগ',
    'features.image_caption': 'ছবি ক্যাপশন',
    'features.safe_places': 'নিরাপদ স্থান',
    'features.image_recognition': 'এআই ছবি স্বীকৃতি',
    'features.chatbot': 'জরুরি চ্যাটবট',
    'features.share': 'শেয়ার ও আলোচনা',
    'team.fire': 'অগ্নিনির্বাপণ বিভাগ',
    'team.earthquake': 'ভূমিকম্প প্রতিক্রিয়া',
    'team.flood': 'বন্যা নিয়ন্ত্রণ',
    'team.medical': 'চিকিৎসা জরুরি',
    'team.police': 'পুলিশ',
    'team.rescue': 'উদ্ধার দল',
    'footer.about': 'SafeNova সম্পর্কে',
    'footer.contact': 'যোগাযোগ করুন',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'সেবার শর্তাবলী'
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.team': 'அவசரகால குழுக்கள்',
    'nav.language': 'மொழி',
    'nav.login': 'உள்நுழைவு',
    'nav.register': 'பதிவு',
    'nav.logout': 'வெளியேறு',
    'nav.dashboard': 'டாஷ்போர்டு',
    'hero.title': 'பேரிடர் தயாரிப்பு கல்வி அமைப்பு',
    'hero.subtitle': 'பள்ளிகள் மற்றும் கல்லூரிகளை விரிவான பேரிடர் மேலாண்மை பயிற்சியுடன் அதிகாரம் வழங்குதல்',
    'hero.teacher_login': 'ஆசிரியர் உள்நுழைவு',
    'hero.student_login': 'மாணவர் உள்நுழைவு',
    'hero.admin_login': 'நிர்வாக உள்நுழைவு',
    'hero.continue_dashboard': 'டாஷ்போர்டில் தொடரவும்',
    'features.emergency_contacts': 'அவசரகால தொடர்புகள்',
    'features.image_caption': 'பட குறிப்பு',
    'features.safe_places': 'பாதுகாப்பான இடங்கள்',
    'features.image_recognition': 'ஏஐ பட அங்கீகாரம்',
    'features.chatbot': 'அவசரகால சாட்பாட்',
    'features.share': 'பகிர்ந்து கொள்ளுங்கள் மற்றும் விவாதிக்கவும்',
    'team.fire': 'தீயணைப்பு துறை',
    'team.earthquake': 'நிலநடுக்க பதிலளிப்பு',
    'team.flood': 'வெள்ள கட்டுப்பாடு',
    'team.medical': 'மருத்துவ அவசரகாலம்',
    'team.police': 'காவல்துறை',
    'team.rescue': 'மீட்பு குழு',
    'footer.about': 'SafeNova பற்றி',
    'footer.contact': 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    'footer.privacy': 'தனியுரிமை கொள்கை',
    'footer.terms': 'சேவை விதிமுறைகள்'
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.team': 'అత్యవసర బృందాలు',
    'nav.language': 'భాష',
    'nav.login': 'లాగిన్',
    'nav.register': 'నమోదు',
    'nav.logout': 'లాగౌట్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'hero.title': 'విపత్తు సిద్ధత విద్యా వ్యవస్థ',
    'hero.subtitle': 'పాఠశాలలు మరియు కళాశాలలను సమగ్ర విపత్తు నిర్వహణ శిక్షణతో శక్తివంతం చేయడం',
    'hero.teacher_login': 'ఉపాధ్యాయ లాగిన్',
    'hero.student_login': 'విద్యార్థి లాగిన్',
    'hero.admin_login': 'అడ్మిన్ లాగిన్',
    'hero.continue_dashboard': 'డాష్‌బోర్డ్‌లో కొనసాగించండి',
    'features.emergency_contacts': 'అత్యవసర పరిచయాలు',
    'features.image_caption': 'చిత్ర శీర్షిక',
    'features.safe_places': 'సురక్షిత ప్రదేశాలు',
    'features.image_recognition': 'ఏఐ చిత్ర గుర్తింపు',
    'features.chatbot': 'అత్యవసర చాట్‌బాట్',
    'features.share': 'భాగస్వామ్యం చేయండి మరియు చర్చించండి',
    'team.fire': 'అగ్నిమాపక విభాగం',
    'team.earthquake': 'భూకంప ప్రతిస్పందన',
    'team.flood': 'వరద నియంత్రణ',
    'team.medical': 'వైద్య అత్యవసరం',
    'team.police': 'పోలీసు',
    'team.rescue': 'కాపాడే బృందం',
    'footer.about': 'SafeNova గురించి',
    'footer.contact': 'మమ్మల్ని సంప్రదించండి',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'సేవా నిబంధనలు'
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.team': 'आपत्कालीन संघ',
    'nav.language': 'भाषा',
    'nav.login': 'लॉगिन',
    'nav.register': 'नोंदणी',
    'nav.logout': 'लॉगआउट',
    'nav.dashboard': 'डॅशबोर्ड',
    'hero.title': 'आपत्ती तयारी शिक्षण प्रणाली',
    'hero.subtitle': 'शाळा आणि महाविद्यालयांना व्यापक आपत्ती व्यवस्थापन प्रशिक्षणासह सक्षम करणे',
    'hero.teacher_login': 'शिक्षक लॉगिन',
    'hero.student_login': 'विद्यार्थी लॉगिन',
    'hero.admin_login': 'अॅडमिन लॉगिन',
    'hero.continue_dashboard': 'डॅशबोर्डवर सुरू ठेवा',
    'features.emergency_contacts': 'आपत्कालीन संपर्क',
    'features.image_caption': 'प्रतिमा मथळा',
    'features.safe_places': 'सुरक्षित ठिकाणे',
    'features.image_recognition': 'एआय प्रतिमा ओळख',
    'features.chatbot': 'आपत्कालीन चॅटबॉट',
    'features.share': 'सामायिक करा आणि चर्चा करा',
    'team.fire': 'अग्निशामक विभाग',
    'team.earthquake': 'भूकंप प्रतिक्रिया',
    'team.flood': 'पूर नियंत्रण',
    'team.medical': 'वैद्यकीय आपत्काल',
    'team.police': 'पोलिस',
    'team.rescue': 'बचाव संघ',
    'footer.about': 'SafeNova बद्दल',
    'footer.contact': 'आमच्याशी संपर्क साधा',
    'footer.privacy': 'गोपनीयता धोरण',
    'footer.terms': 'सेवा अटी'
  },
  gu: {
    'nav.home': 'હોમ',
    'nav.team': 'કટોકટી ટીમો',
    'nav.language': 'ભાષા',
    'nav.login': 'લોગિન',
    'nav.register': 'નોંધણી',
    'nav.logout': 'લોગઆઉટ',
    'nav.dashboard': 'ડેશબોર્ડ',
    'hero.title': 'આપત્તિ તૈયારી શિક્ષણ સિસ્ટમ',
    'hero.subtitle': 'શાળાઓ અને કોલેજોને વ્યાપક આપત્તિ વ્યવસ્થાપન તાલીમ સાથે સક્ષમ બનાવવું',
    'hero.teacher_login': 'શિક્ષક લોગિન',
    'hero.student_login': 'વિદ્યાર્થી લોગિન',
    'hero.admin_login': 'એડમિન લોગિન',
    'hero.continue_dashboard': 'ડેશબોર્ડ પર ચાલુ રાખો',
    'features.emergency_contacts': 'કટોકટી સંપર્કો',
    'features.image_caption': 'છબી કૅપ્શન',
    'features.safe_places': 'સુરક્ષિત સ્થાનો',
    'features.image_recognition': 'એઆઈ છબી ઓળખ',
    'features.chatbot': 'કટોકટી ચેટબોટ',
    'features.share': 'શેર કરો અને ચર્ચા કરો',
    'team.fire': 'અગ્નિશામક વિભાગ',
    'team.earthquake': 'ભૂકંપ પ્રતિભાવ',
    'team.flood': 'પૂર નિયંત્રણ',
    'team.medical': 'દવાખાનું કટોકટી',
    'team.police': 'પોલીસ',
    'team.rescue': 'બચાવ ટીમ',
    'footer.about': 'SafeNova વિશે',
    'footer.contact': 'અમારો સંપર્ક કરો',
    'footer.privacy': 'ગોપનીયતા નીતિ',
    'footer.terms': 'સેવાની શરતો'
  }
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('safenova_language') as Language
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem('safenova_language', lang)
  }

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key as keyof typeof translations[typeof currentLanguage]] || key
  }

  const value = {
    currentLanguage,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}