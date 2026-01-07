# International Phone Input - WeWeb Component

A professional, feature-rich international phone input component for WeWeb with automatic formatting, country selection, and validation.

## 📱 Features

- ✅ **50+ Countries** with proper formatting
- ✅ **Auto-formatting** as user types
- ✅ **Country selector** with flags and search
- ✅ **Real-time validation**
- ✅ **Visual feedback** (green/red borders)
- ✅ **Dual value storage** (formatted + raw)
- ✅ **International format** builder
- ✅ **Fully customizable** styling
- ✅ **Responsive** design
- ✅ **Accessibility** ready

## 🚀 Quick Start

1. Add component to your WeWeb page
2. Set `defaultCountry` to your target market
3. Bind `value` to your form variable
4. Use `rawValue` for database storage
5. Use `internationalNumber` for API calls (SMS, etc.)

## 📊 Exposed Variables

```javascript
variables['uid-value']                 // Formatted: "(11) 99999-9999"
variables['uid-rawValue']              // Raw: "11999999999"
variables['uid-countryCode']           // Country: "BR"
variables['uid-isValid']               // Boolean: true/false
variables['uid-internationalNumber']   // Full: "+5511999999999"
```

## 🎯 Common Use Cases

### Form Validation
```
Submit Button Condition:
variables['phone-uid-isValid'] === true
```

### SMS Integration
```
Send SMS to:
variables['phone-uid-internationalNumber']
```

### Database Storage
```javascript
{
  phone: variables['phone-uid-rawValue'],
  country: variables['phone-uid-countryCode']
}
```

## 🌍 Supported Countries

Includes 50 countries across Americas, Europe, Asia, Middle East, and Africa with proper formatting for each region.

Popular countries:
- 🇧🇷 Brazil, 🇺🇸 USA, 🇬🇧 UK, 🇵🇹 Portugal
- 🇪🇸 Spain, 🇫🇷 France, 🇩🇪 Germany, 🇮🇹 Italy
- 🇦🇷 Argentina, 🇲🇽 Mexico, 🇨🇱 Chile, 🇨🇴 Colombia
- 🇦🇺 Australia, 🇯🇵 Japan, 🇨🇳 China, 🇮🇳 India

[See full list in CLAUDE.md](CLAUDE.md#supported-countries)

## 📖 Documentation

See [CLAUDE.md](CLAUDE.md) for complete documentation including:
- All properties and their options
- Events and their payloads
- Exposed actions
- Usage examples
- Best practices
- Troubleshooting guide

## 🏗️ Architecture

```
ww-international-phone/
├── src/
│   ├── wwElement.vue              # Main component
│   ├── components/
│   │   └── CountrySelector.vue    # Dropdown with search
│   └── utils/
│       ├── countries.js           # Country data (50+)
│       └── phoneUtils.js          # Formatting utilities
├── ww-config.js                   # WeWeb configuration
├── package.json
├── CLAUDE.md                      # Full documentation
└── README.md                      # This file
```

## 🎨 Customization

Over 30 style properties available:

- Container width and spacing
- Label styling (font, color, weight)
- Input dimensions and colors
- Border colors (default, focus, valid, invalid)
- Country selector styling
- Error message styling
- Icon colors and sizes

## 🔧 Actions

- `setValue(phoneNumber)` - Set value programmatically
- `setCountry(countryCode)` - Change selected country
- `clearValue()` - Clear the input
- `focusInput()` - Focus the field
- `validate()` - Trigger validation

## 📡 Events

- `change` - Value changed
- `countryChange` - Country selected
- `focus` - Input focused
- `blur` - Input blurred

## 💡 Best Practices

1. **Store `rawValue`** in database, not formatted value
2. **Use `internationalNumber`** for SMS APIs
3. **Enable validation** for better UX
4. **Set appropriate default country** for your market
5. **Use larger touch targets** (48px height) for mobile

## 🐛 Troubleshooting

**Validation not working?**
- Check if number is complete for selected country
- Verify `showValidation` is enabled
- Inspect `isValid` variable value

**Formatting issues?**
- Ensure `autoFormat` is enabled
- Try clearing and re-entering
- Check country has format pattern

See [Troubleshooting section](CLAUDE.md#troubleshooting) in CLAUDE.md for more.

## 📄 License

MIT

## 🤝 Support

For issues or questions, please refer to the [CLAUDE.md](CLAUDE.md) documentation.

---

**Version:** 1.0.0
**WeWeb Compatibility:** Vue 3
**Created:** 2026-01-07
