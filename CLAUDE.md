---
name: International Phone Input
description: A professional international phone input component with country selection, auto-formatting, and validation. Supports 50+ countries with proper phone number formatting.
keywords: phone, international, telephone, country, input, validation, formatting, dial-code
---

# International Phone Input

## Purpose

A comprehensive phone input component that handles international phone numbers with automatic formatting, country selection, and real-time validation. Perfect for forms requiring phone number collection from users worldwide.

## Features

### Core Features
- **50+ Countries Supported** - Comprehensive list of countries with proper formatting
- **Auto-formatting** - Formats phone numbers as user types according to country standards
- **Country Selector** - Beautiful dropdown with flags, country names, and dial codes
- **Search Functionality** - Quick search countries by name or dial code
- **Real-time Validation** - Validates phone numbers based on country-specific rules
- **Visual Feedback** - Green/red border indicators for valid/invalid numbers
- **Dual Value Storage** - Stores both formatted display value and raw digits
- **International Format** - Automatically builds complete international number with country code

### UX Features
- **Smart Cursor Positioning** - Maintains cursor position during auto-formatting
- **Placeholder Examples** - Shows country-specific format examples
- **Keyboard Support** - Arrow keys, escape, and search in country dropdown
- **Click Outside to Close** - Intuitive dropdown behavior
- **Auto-detect Country** - Optional browser locale detection for default country
- **Disabled/Readonly States** - Full support for form state management
- **Required Field Support** - Native HTML5 required attribute support

### Customization
- **Fully Styleable** - 30+ style properties for complete visual control
- **Responsive** - All key properties support responsive values
- **Optional Elements** - Toggle phone icon, dial code display, label, etc.
- **Validation Modes** - Validate on blur or in real-time
- **Custom Error Messages** - Configurable error text

## Properties

### Value & State

**value** (string, bindable)
- The phone number value (formatted or raw)
- Can be set externally via binding
- Example: `"(11) 99999-9999"` or `"11999999999"`

**defaultCountry** (string, bindable)
- ISO 3166-1 alpha-2 country code
- Default: `"BR"`
- Example: `"US"`, `"GB"`, `"PT"`

**placeholder** (string, bindable)
- Custom placeholder text
- If empty, uses country-specific format example
- Example: `"Enter your phone number"`

### Behavior

**required** (boolean, bindable)
- Whether the field is required
- Default: `false`

**disabled** (boolean, bindable)
- Whether the input is disabled
- Default: `false`

**readonly** (boolean, bindable)
- Whether the input is read-only
- Default: `false`

**autoFormat** (boolean, bindable)
- Automatically format phone number as user types
- Default: `true`

**showValidation** (boolean, bindable)
- Show visual validation feedback (green/red borders)
- Default: `true`

**validateOnBlur** (boolean, bindable)
- Only show validation after user leaves field
- Default: `false`
- When `false`: validates in real-time as user types

**autoDetectCountry** (boolean, bindable)
- Try to detect user's country from browser locale on load
- Default: `false`

**enableSearch** (boolean, bindable)
- Enable search functionality in country dropdown
- Default: `true`

### UI Elements

**showLabel** (boolean, bindable)
- Display the label above input
- Default: `true`

**label** (string, bindable)
- Label text
- Default: `"Phone Number"`

**showPhoneIcon** (boolean, bindable)
- Display phone icon inside input
- Default: `true`

**showDialCode** (boolean, bindable)
- Display country dial code (+55) inside input as prefix
- Default: `true`

**errorMessage** (string, bindable)
- Custom error message for validation
- Default: `"Please enter a valid phone number"`

### Style Properties

All style properties are fully customizable:

#### Container
- `containerWidth` - Width of entire component (responsive, default: `"100%"`)
- `containerGap` - Gap between label and input (responsive, default: `"8px"`)

#### Label
- `labelFontSize` - Label text size (responsive, default: `"14px"`)
- `labelFontWeight` - Label weight (default: `"500"`)
- `labelColor` - Label text color (default: `"#374151"`)

#### Input Field
- `inputHeight` - Input field height (responsive, default: `"44px"`)
- `inputPadding` - Internal padding (default: `"8px 12px"`)
- `inputFontSize` - Input text size (responsive, default: `"16px"`)
- `inputBorderRadius` - Border radius (default: `"6px"`)
- `inputBorderWidth` - Border thickness (default: `"1px"`)

#### Colors
- `inputBackgroundColor` - Input background (default: `"#ffffff"`)
- `inputTextColor` - Input text color (default: `"#1f2937"`)
- `inputBorderColor` - Default border color (default: `"#d1d5db"`)
- `inputFocusBorderColor` - Border when focused (default: `"#3b82f6"`)
- `inputValidBorderColor` - Border when valid (default: `"#10b981"`)
- `inputInvalidBorderColor` - Border when invalid (default: `"#ef4444"`)
- `inputDisabledBackgroundColor` - Background when disabled (default: `"#f3f4f6"`)
- `placeholderColor` - Placeholder text color (default: `"#9ca3af"`)

#### Country Selector
- `selectorWidth` - Width of country button (default: `"90px"`)
- `selectorBackgroundColor` - Button background (default: `"#f9fafb"`)
- `selectorHoverBackgroundColor` - Button hover background (default: `"#f3f4f6"`)
- `dropdownMaxHeight` - Max height of country list (default: `"300px"`)

#### Error Message
- `errorMessageColor` - Error text color (default: `"#ef4444"`)
- `errorMessageFontSize` - Error text size (responsive, default: `"12px"`)

#### Icons
- `iconColor` - Phone icon color (default: `"#6b7280"`)
- `iconSize` - Icon size (default: `"20px"`)

## Events

### change
Triggered when phone number value changes

**Payload:**
```javascript
{
  value: "(11) 99999-9999",        // Formatted display value
  rawValue: "11999999999",         // Raw digits only
  countryCode: "BR",               // ISO country code
  isValid: true                    // Validation status
}
```

### countryChange
Triggered when user selects a different country

**Payload:**
```javascript
{
  countryCode: "BR",               // ISO country code
  dialCode: "+55",                 // Country dial code
  countryName: "Brazil"            // Country name
}
```

### focus
Triggered when input receives focus

**Payload:**
```javascript
{
  value: "(11) 99999-9999"         // Current formatted value
}
```

### blur
Triggered when input loses focus

**Payload:**
```javascript
{
  value: "(11) 99999-9999",        // Current formatted value
  isValid: true                    // Validation status
}
```

## Exposed Actions

### setValue
Set the phone number value programmatically

**Arguments:**
- `phoneNumber` (string) - Phone number to set (can be formatted or raw digits)

**Usage:**
```
Component Action: Set value
phoneNumber: "11999887766"
```

### setCountry
Change the selected country

**Arguments:**
- `countryCode` (string) - ISO 3166-1 alpha-2 country code (e.g., "US", "BR", "GB")

**Usage:**
```
Component Action: Set country
countryCode: "US"
```

### clearValue
Clear the phone number input

**No arguments**

**Usage:**
```
Component Action: Clear value
```

### focusInput
Focus the phone input field

**No arguments**

**Usage:**
```
Component Action: Focus input
```

### validate
Manually trigger validation

**Returns:** boolean (true if valid, false if invalid)

**Usage:**
```
Component Action: Validate
```

## Exposed Variables

Access these variables in your WeWeb workflows and bindings:

### value
**Path:** `variables['uid-value']`
**Type:** string
**Description:** Current formatted phone number

### rawValue
**Path:** `variables['uid-rawValue']`
**Type:** string
**Description:** Raw phone number (digits only)
**Example:** `"11999887766"`

### countryCode
**Path:** `variables['uid-countryCode']`
**Type:** string
**Description:** Currently selected country code
**Example:** `"BR"`

### isValid
**Path:** `variables['uid-isValid']`
**Type:** boolean
**Description:** Whether the current phone number is valid

### internationalNumber
**Path:** `variables['uid-internationalNumber']`
**Type:** string
**Description:** Complete international format with country code
**Example:** `"+5511999887766"`

## Supported Countries

The component includes 50 countries with proper formatting patterns:

### Americas
- 🇧🇷 Brazil (+55)
- 🇺🇸 United States (+1)
- 🇨🇦 Canada (+1)
- 🇦🇷 Argentina (+54)
- 🇲🇽 Mexico (+52)
- 🇨🇱 Chile (+56)
- 🇨🇴 Colombia (+57)
- 🇵🇪 Peru (+51)
- 🇻🇪 Venezuela (+58)

### Europe
- 🇬🇧 United Kingdom (+44)
- 🇵🇹 Portugal (+351)
- 🇪🇸 Spain (+34)
- 🇫🇷 France (+33)
- 🇩🇪 Germany (+49)
- 🇮🇹 Italy (+39)
- 🇳🇱 Netherlands (+31)
- 🇧🇪 Belgium (+32)
- 🇨🇭 Switzerland (+41)
- 🇦🇹 Austria (+43)
- 🇸🇪 Sweden (+46)
- 🇳🇴 Norway (+47)
- 🇩🇰 Denmark (+45)
- 🇫🇮 Finland (+358)
- 🇵🇱 Poland (+48)
- 🇬🇷 Greece (+30)
- 🇮🇪 Ireland (+353)
- 🇨🇿 Czech Republic (+420)
- 🇷🇴 Romania (+40)
- 🇭🇺 Hungary (+36)
- 🇺🇦 Ukraine (+380)
- 🇷🇺 Russia (+7)

### Asia & Pacific
- 🇦🇺 Australia (+61)
- 🇳🇿 New Zealand (+64)
- 🇯🇵 Japan (+81)
- 🇨🇳 China (+86)
- 🇮🇳 India (+91)
- 🇰🇷 South Korea (+82)
- 🇵🇭 Philippines (+63)
- 🇹🇭 Thailand (+66)
- 🇻🇳 Vietnam (+84)
- 🇮🇩 Indonesia (+62)
- 🇲🇾 Malaysia (+60)
- 🇸🇬 Singapore (+65)

### Middle East & Africa
- 🇹🇷 Turkey (+90)
- 🇸🇦 Saudi Arabia (+966)
- 🇦🇪 UAE (+971)
- 🇮🇱 Israel (+972)
- 🇪🇬 Egypt (+20)
- 🇳🇬 Nigeria (+234)
- 🇰🇪 Kenya (+254)
- 🇿🇦 South Africa (+27)

## Usage Examples

### Basic Setup

1. **Add component to page**
2. **Configure default country**
   - Set `defaultCountry` to your target market (e.g., "BR" for Brazil)
3. **Bind to form variable**
   - Create a variable: `formData.phone`
   - Bind to the component's `value` property

### Validation Example

**Scenario:** Only allow form submission if phone is valid

1. Add International Phone Input component
2. In submit button workflow:
   ```
   Condition: variables['phone-input-uid-isValid'] === true
   If true: Submit form
   If false: Show error message
   ```

### Multi-country Form

**Scenario:** Auto-detect user's country but allow manual change

1. Set `autoDetectCountry` to `true`
2. Enable `enableSearch` for easy country finding
3. Use `countryChange` event to track selected country:
   ```
   On country change:
   - Set variable: selectedCountry = event.countryCode
   - Update form data
   ```

### Phone Verification Flow

**Scenario:** Send SMS verification to entered number

1. User enters phone number
2. On blur event, check if valid:
   ```
   On blur:
   If event.isValid === true:
     - Enable "Send Code" button
     - Use variables['uid-internationalNumber'] for API call
   ```
3. API receives complete international format: `"+5511999887766"`

### Custom Styling Example

**Scenario:** Match your brand colors

```
Input Border Color: #e0e0e0
Focus Border Color: #your-brand-color
Valid Border Color: #00c851
Invalid Border Color: #ff4444
Input Height: 48px (larger for better touch targets)
Border Radius: 12px (more rounded)
```

### Readonly Display

**Scenario:** Show phone number without editing

```
value: "+55 (11) 99999-9999"
readonly: true
showLabel: true
label: "Your Phone Number"
```

## Best Practices

### 1. Always Use Raw Value for Storage
Store `rawValue` in your database, not the formatted value. This ensures:
- Consistent format regardless of country
- Easy to reformat later
- Better for API integrations

```javascript
// Good
saveToDatabase({
  phone: variables['phone-uid-rawValue'],
  country: variables['phone-uid-countryCode']
})

// Bad
saveToDatabase({
  phone: variables['phone-uid-value'] // Formatted, varies by country
})
```

### 2. Use International Number for API Calls
For SMS services (Twilio, etc.), use `internationalNumber`:

```javascript
sendSMS({
  to: variables['phone-uid-internationalNumber'], // "+5511999887766"
  message: "Your code is 1234"
})
```

### 3. Enable Validation Feedback
For better UX, show validation:

```
showValidation: true
validateOnBlur: true (for less aggressive feedback)
```

### 4. Provide Clear Error Messages
Customize error messages to be helpful:

```
errorMessage: "Please enter a complete phone number with area code"
```

### 5. Consider Mobile Users
Use larger touch targets:

```
inputHeight: 48px (responsive)
selectorWidth: 100px
```

### 6. Set Appropriate Default Country
Set default to your primary market:

```
defaultCountry: "BR" (for Brazilian users)
autoDetectCountry: true (as fallback)
```

## Technical Details

### Architecture

```
ww-international-phone/
├── src/
│   ├── wwElement.vue (main component)
│   ├── components/
│   │   └── CountrySelector.vue (dropdown component)
│   └── utils/
│       ├── countries.js (50+ country data)
│       └── phoneUtils.js (formatting utilities)
├── ww-config.js (WeWeb configuration)
└── package.json
```

### Key Technologies

- **Vue 3 Composition API** - Modern reactive framework
- **WeWeb Component Variables** - Exposed state management
- **Custom Formatting Engine** - No external dependencies
- **Emoji Flags** - Universal, no SVG files needed

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

### Performance

- **Lightweight** - No external libraries for phone formatting
- **Fast Rendering** - Optimized country list
- **Smart Formatting** - Only formats on input, maintains cursor position
- **Lazy Dropdown** - Country list only rendered when opened

## Troubleshooting

### Phone number not validating

**Check:**
1. Is the number complete for the country?
2. Is `showValidation` enabled?
3. Check `variables['uid-isValid']` in browser console

### Country not changing

**Check:**
1. Is component `disabled` or `readonly`?
2. Check browser console for errors
3. Verify `defaultCountry` is valid ISO code

### Formatting not working

**Check:**
1. Is `autoFormat` enabled?
2. Try clearing and re-entering number
3. Verify country has format pattern in countries.js

### Cursor jumping during typing

**Solution:** This is handled automatically by `getNewCursorPosition` utility. If it persists, disable `autoFormat` temporarily.

## Notes

- The component stores **multiple values** for different use cases:
  - `value`: Formatted for display
  - `rawValue`: Digits only for storage
  - `internationalNumber`: Complete with country code for APIs

- **Country codes** use ISO 3166-1 alpha-2 standard (2 letters)

- **Dial codes** are stored with `+` prefix (e.g., "+55", not "55")

- **Format patterns** use `#` for digits and literal characters for separators

- Component prevents navigation in **edit mode** to allow proper editing

- All **events emit** even in edit mode for testing, but **actions are blocked**

- **Search is case-insensitive** and matches country name, code, or dial code

- Component uses **native HTML5 validation** via required attribute

## Future Enhancements

Potential additions for future versions:

- 📋 Copy formatted number button
- 🌍 Detect country from IP address (via API)
- 📱 Mobile number vs landline detection
- 🔄 Number portability validation
- 🗺️ Regional format variations
- 📞 Click-to-call functionality
- 🎨 Dark mode support
- ♿ Enhanced ARIA labels
- 🌐 RTL language support

---

**Component Version:** 1.0.0
**WeWeb Compatibility:** Vue 3
**Last Updated:** 2026-01-07
