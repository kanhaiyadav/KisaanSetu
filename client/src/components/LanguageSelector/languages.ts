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
];

languages.sort((a, b) => a.name.localeCompare(b.name));

export default languages;