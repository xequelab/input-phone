// Country data with phone formatting patterns
// Format pattern: # = digit, ( ) - space = literal characters

export const countries = [
  {
    code: 'BR',
    name: 'Brazil',
    dialCode: '+55',
    flag: '🇧🇷',
    format: '(##) #####-####',
    placeholder: '(11) 99999-9999',
    maxLength: 11
  },
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    format: '(###) ###-####',
    placeholder: '(555) 123-4567',
    maxLength: 10
  },
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    format: '(###) ###-####',
    placeholder: '(416) 555-1234',
    maxLength: 10
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    format: '#### ### ####',
    placeholder: '7911 123456',
    maxLength: 10
  },
  {
    code: 'PT',
    name: 'Portugal',
    dialCode: '+351',
    flag: '🇵🇹',
    format: '### ### ###',
    placeholder: '912 345 678',
    maxLength: 9
  },
  {
    code: 'ES',
    name: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    format: '### ## ## ##',
    placeholder: '612 34 56 78',
    maxLength: 9
  },
  {
    code: 'FR',
    name: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    format: '# ## ## ## ##',
    placeholder: '6 12 34 56 78',
    maxLength: 9
  },
  {
    code: 'DE',
    name: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    format: '### ########',
    placeholder: '151 12345678',
    maxLength: 11
  },
  {
    code: 'IT',
    name: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    format: '### ### ####',
    placeholder: '312 345 6789',
    maxLength: 10
  },
  {
    code: 'AR',
    name: 'Argentina',
    dialCode: '+54',
    flag: '🇦🇷',
    format: '## ####-####',
    placeholder: '11 1234-5678',
    maxLength: 10
  },
  {
    code: 'MX',
    name: 'Mexico',
    dialCode: '+52',
    flag: '🇲🇽',
    format: '## #### ####',
    placeholder: '55 1234 5678',
    maxLength: 10
  },
  {
    code: 'CL',
    name: 'Chile',
    dialCode: '+56',
    flag: '🇨🇱',
    format: '# #### ####',
    placeholder: '9 1234 5678',
    maxLength: 9
  },
  {
    code: 'CO',
    name: 'Colombia',
    dialCode: '+57',
    flag: '🇨🇴',
    format: '### ### ####',
    placeholder: '321 123 4567',
    maxLength: 10
  },
  {
    code: 'PE',
    name: 'Peru',
    dialCode: '+51',
    flag: '🇵🇪',
    format: '### ### ###',
    placeholder: '912 345 678',
    maxLength: 9
  },
  {
    code: 'VE',
    name: 'Venezuela',
    dialCode: '+58',
    flag: '🇻🇪',
    format: '###-#######',
    placeholder: '412-1234567',
    maxLength: 10
  },
  {
    code: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flag: '🇦🇺',
    format: '### ### ###',
    placeholder: '412 345 678',
    maxLength: 9
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    dialCode: '+64',
    flag: '🇳🇿',
    format: '## ### ####',
    placeholder: '21 123 4567',
    maxLength: 9
  },
  {
    code: 'JP',
    name: 'Japan',
    dialCode: '+81',
    flag: '🇯🇵',
    format: '##-####-####',
    placeholder: '90-1234-5678',
    maxLength: 10
  },
  {
    code: 'CN',
    name: 'China',
    dialCode: '+86',
    flag: '🇨🇳',
    format: '### #### ####',
    placeholder: '138 0000 0000',
    maxLength: 11
  },
  {
    code: 'IN',
    name: 'India',
    dialCode: '+91',
    flag: '🇮🇳',
    format: '##### #####',
    placeholder: '98765 43210',
    maxLength: 10
  },
  {
    code: 'RU',
    name: 'Russia',
    dialCode: '+7',
    flag: '🇷🇺',
    format: '(###) ###-##-##',
    placeholder: '(912) 345-67-89',
    maxLength: 10
  },
  {
    code: 'ZA',
    name: 'South Africa',
    dialCode: '+27',
    flag: '🇿🇦',
    format: '## ### ####',
    placeholder: '71 123 4567',
    maxLength: 9
  },
  {
    code: 'KR',
    name: 'South Korea',
    dialCode: '+82',
    flag: '🇰🇷',
    format: '##-####-####',
    placeholder: '10-1234-5678',
    maxLength: 10
  },
  {
    code: 'TR',
    name: 'Turkey',
    dialCode: '+90',
    flag: '🇹🇷',
    format: '### ### ## ##',
    placeholder: '501 234 56 78',
    maxLength: 10
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    dialCode: '+966',
    flag: '🇸🇦',
    format: '## ### ####',
    placeholder: '50 123 4567',
    maxLength: 9
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    dialCode: '+971',
    flag: '🇦🇪',
    format: '## ### ####',
    placeholder: '50 123 4567',
    maxLength: 9
  },
  {
    code: 'IL',
    name: 'Israel',
    dialCode: '+972',
    flag: '🇮🇱',
    format: '##-###-####',
    placeholder: '50-123-4567',
    maxLength: 9
  },
  {
    code: 'EG',
    name: 'Egypt',
    dialCode: '+20',
    flag: '🇪🇬',
    format: '### ### ####',
    placeholder: '100 123 4567',
    maxLength: 10
  },
  {
    code: 'NG',
    name: 'Nigeria',
    dialCode: '+234',
    flag: '🇳🇬',
    format: '### ### ####',
    placeholder: '802 123 4567',
    maxLength: 10
  },
  {
    code: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    flag: '🇰🇪',
    format: '### ######',
    placeholder: '712 123456',
    maxLength: 9
  },
  {
    code: 'PH',
    name: 'Philippines',
    dialCode: '+63',
    flag: '🇵🇭',
    format: '### ### ####',
    placeholder: '917 123 4567',
    maxLength: 10
  },
  {
    code: 'TH',
    name: 'Thailand',
    dialCode: '+66',
    flag: '🇹🇭',
    format: '## ### ####',
    placeholder: '81 234 5678',
    maxLength: 9
  },
  {
    code: 'VN',
    name: 'Vietnam',
    dialCode: '+84',
    flag: '🇻🇳',
    format: '## ### ####',
    placeholder: '91 234 5678',
    maxLength: 9
  },
  {
    code: 'ID',
    name: 'Indonesia',
    dialCode: '+62',
    flag: '🇮🇩',
    format: '###-###-####',
    placeholder: '812-345-6789',
    maxLength: 11
  },
  {
    code: 'MY',
    name: 'Malaysia',
    dialCode: '+60',
    flag: '🇲🇾',
    format: '##-### ####',
    placeholder: '12-345 6789',
    maxLength: 9
  },
  {
    code: 'SG',
    name: 'Singapore',
    dialCode: '+65',
    flag: '🇸🇬',
    format: '#### ####',
    placeholder: '9123 4567',
    maxLength: 8
  },
  {
    code: 'PL',
    name: 'Poland',
    dialCode: '+48',
    flag: '🇵🇱',
    format: '### ### ###',
    placeholder: '512 345 678',
    maxLength: 9
  },
  {
    code: 'NL',
    name: 'Netherlands',
    dialCode: '+31',
    flag: '🇳🇱',
    format: '# ## ## ## ##',
    placeholder: '6 12 34 56 78',
    maxLength: 9
  },
  {
    code: 'BE',
    name: 'Belgium',
    dialCode: '+32',
    flag: '🇧🇪',
    format: '### ## ## ##',
    placeholder: '470 12 34 56',
    maxLength: 9
  },
  {
    code: 'SE',
    name: 'Sweden',
    dialCode: '+46',
    flag: '🇸🇪',
    format: '##-### ## ##',
    placeholder: '70-123 45 67',
    maxLength: 9
  },
  {
    code: 'NO',
    name: 'Norway',
    dialCode: '+47',
    flag: '🇳🇴',
    format: '### ## ###',
    placeholder: '412 34 567',
    maxLength: 8
  },
  {
    code: 'DK',
    name: 'Denmark',
    dialCode: '+45',
    flag: '🇩🇰',
    format: '## ## ## ##',
    placeholder: '20 12 34 56',
    maxLength: 8
  },
  {
    code: 'FI',
    name: 'Finland',
    dialCode: '+358',
    flag: '🇫🇮',
    format: '## ### ####',
    placeholder: '41 123 4567',
    maxLength: 9
  },
  {
    code: 'CH',
    name: 'Switzerland',
    dialCode: '+41',
    flag: '🇨🇭',
    format: '## ### ## ##',
    placeholder: '78 123 45 67',
    maxLength: 9
  },
  {
    code: 'AT',
    name: 'Austria',
    dialCode: '+43',
    flag: '🇦🇹',
    format: '### ########',
    placeholder: '664 12345678',
    maxLength: 11
  },
  {
    code: 'GR',
    name: 'Greece',
    dialCode: '+30',
    flag: '🇬🇷',
    format: '### ### ####',
    placeholder: '691 234 5678',
    maxLength: 10
  },
  {
    code: 'IE',
    name: 'Ireland',
    dialCode: '+353',
    flag: '🇮🇪',
    format: '## ### ####',
    placeholder: '85 123 4567',
    maxLength: 9
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    dialCode: '+420',
    flag: '🇨🇿',
    format: '### ### ###',
    placeholder: '601 234 567',
    maxLength: 9
  },
  {
    code: 'RO',
    name: 'Romania',
    dialCode: '+40',
    flag: '🇷🇴',
    format: '### ### ###',
    placeholder: '712 345 678',
    maxLength: 9
  },
  {
    code: 'HU',
    name: 'Hungary',
    dialCode: '+36',
    flag: '🇭🇺',
    format: '## ### ####',
    placeholder: '20 123 4567',
    maxLength: 9
  },
  {
    code: 'UA',
    name: 'Ukraine',
    dialCode: '+380',
    flag: '🇺🇦',
    format: '## ### ####',
    placeholder: '50 123 4567',
    maxLength: 9
  }
];

// Helper functions
export const getCountryByCode = (code) => {
  return countries.find(c => c.code.toLowerCase() === code.toLowerCase());
};

export const getCountryByDialCode = (dialCode) => {
  // Remove + if present
  const cleanDialCode = dialCode.replace('+', '');
  return countries.find(c => c.dialCode.replace('+', '') === cleanDialCode);
};

export const searchCountries = (query) => {
  const lowerQuery = query.toLowerCase();
  return countries.filter(country =>
    country.name.toLowerCase().includes(lowerQuery) ||
    country.dialCode.includes(query) ||
    country.code.toLowerCase().includes(lowerQuery)
  );
};

export const detectCountryFromLocale = () => {
  try {
    // Try to get country from browser locale
    const locale = navigator.language || navigator.userLanguage;
    const countryCode = locale.split('-')[1];

    if (countryCode) {
      const country = getCountryByCode(countryCode);
      if (country) return country.code;
    }
  } catch (e) {
    // Fallback to BR if detection fails
  }

  return 'BR'; // Default fallback
};
