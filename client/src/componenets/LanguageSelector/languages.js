const languages = [
    { name: 'English (English)', code: 'en' },
    { name: 'Hindi (हिन्दी)', code: 'hi' },
    { name: 'Tamil (தமிழ்)', code: 'ta' },
    { name: 'Telugu (తెలుగు)', code: 'te' },
    { name: 'Bengali (বাংলা)', code: 'bn' },
    { name: 'Malayalam (മലയാളം)', code: 'ml' },
    { name: 'Punjabi (ਪੰਜਾਬੀ)', code: 'pa' },
    { name: 'Gujarati (ગુજરાતી)', code: 'gu' },
    { name: 'Marathi (मराठी)', code: 'mr' },
    { name: 'Spanish (Español)', code: 'es' },
    { name: 'French (Français)', code: 'fr' },
    { name: 'German (Deutsch)', code: 'de' },
    { name: 'Italian (Italiano)', code: 'it' },
    { name: 'Japanese (日本語)', code: 'ja' },
    { name: 'Korean (한국어)', code: 'ko' },
    { name: 'Russian (Русский)', code: 'ru' },
    { name: 'Chinese (中文)', code: 'zh' }
];

languages.sort((a, b) => a.name.localeCompare(b.name));

export default languages;