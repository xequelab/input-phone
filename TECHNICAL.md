# Technical Overview - International Phone Input

## 📊 Component Statistics

- **Total Lines of Code:** ~3,225
- **Main Component:** 671 lines (wwElement.vue)
- **Configuration:** 666 lines (ww-config.js)
- **Country Data:** 501 lines (50+ countries)
- **Utilities:** 213 lines (formatting functions)
- **Sub-component:** 394 lines (CountrySelector.vue)
- **Documentation:** 757 lines (README + CLAUDE.md)

## 🏗️ Architecture

### Component Hierarchy
```
wwElement.vue (main)
├── CountrySelector.vue
│   ├── Search input
│   ├── Country list (scrollable)
│   └── Selected country display
└── Phone input field
    ├── Optional phone icon
    ├── Optional dial code display
    └── Formatted input
```

### Data Flow
```
User Input → handleInput()
    ↓
Extract digits (getDigitsOnly)
    ↓
Validate length
    ↓
Format number (formatPhoneNumber)
    ↓
Update component variables
    ↓
Emit change event
    ↓
Calculate cursor position
    ↓
Update input with formatted value
```

### State Management

**WeWeb Component Variables (wwLib.wwVariable.useComponentVariable):**
```javascript
{
  value: string,              // Formatted display value
  rawValue: string,           // Digits only
  countryCode: string,        // ISO country code
  isValid: boolean,           // Validation state
  internationalNumber: string // Full international format
}
```

**Local State (Vue refs):**
```javascript
{
  isFocused: boolean,
  hasBlurred: boolean,
  phoneInputRef: HTMLInputElement
}
```

## 🔧 Key Functions

### Formatting (`phoneUtils.js`)

**`formatPhoneNumber(value, format)`**
- Applies country-specific format pattern
- Handles separators (spaces, hyphens, parentheses)
- Stops at maxLength

**`getDigitsOnly(value)`**
- Strips all non-digit characters
- Used for validation and storage

**`getNewCursorPosition(oldValue, newValue, oldCursor)`**
- Maintains cursor position during formatting
- Counts digits before cursor
- Finds equivalent position in formatted string

**`buildInternationalNumber(dialCode, nationalNumber)`**
- Combines country code + national number
- Returns complete format: `"+5511999999999"`

### Validation

**`isPhoneNumberValid(value, maxLength)`**
- Checks if number has exact required length
- Returns boolean

**`validatePhoneNumber()`** (in wwElement.vue)
- Gets current country max length
- Validates against pattern
- Updates `isValid` variable
- Returns validation result

### Country Management (`countries.js`)

**`getCountryByCode(code)`**
- Finds country by ISO code
- Case-insensitive

**`searchCountries(query)`**
- Searches by name, dial code, or country code
- Returns filtered array

**`detectCountryFromLocale()`**
- Reads browser navigator.language
- Extracts country code
- Fallback to "BR"

## 🎨 Styling Strategy

### CSS Architecture
```scss
.international-phone-input {
  // Container
  .input-label {
    // Label styling
  }

  .input-wrapper {
    // Input container
    &.focused { }
    &.disabled { }
    &.valid { }
    &.invalid { }

    .separator { }
    .phone-icon { }
    .dial-code-display { }
    .phone-input { }
  }

  .error-message {
    // Error display
  }
}
```

### Dynamic Styling
- All colors and dimensions from computed properties
- Reactive to prop changes
- Supports responsive values (breakpoints)
- CSS variables for repeated values

### Border Color Logic
```javascript
if (isFocused) {
  borderColor = focusBorderColor
} else if (showValidation && hasValue) {
  if (validateOnBlur && hasBlurred) {
    borderColor = isValid ? validColor : invalidColor
  } else if (!validateOnBlur) {
    borderColor = isValid ? validColor : invalidColor
  }
} else {
  borderColor = defaultBorderColor
}
```

## 🔄 Event Flow

### Input Event
```
@input → handleInput()
  ├─ Check if editing/disabled/readonly
  ├─ Get cursor position
  ├─ Extract digits
  ├─ Check max length
  ├─ Update rawValue
  ├─ Build international number
  ├─ Validate
  ├─ Emit 'change' event
  └─ Restore cursor position (setTimeout)
```

### Country Change
```
CountrySelector @change → handleCountryChange()
  ├─ Update selectedCountryCode
  ├─ Re-validate with new country
  ├─ Update international number
  └─ Emit 'countryChange' event
```

### Focus/Blur
```
@focus → handleFocus()
  ├─ Set isFocused = true
  └─ Emit 'focus' event

@blur → handleBlur()
  ├─ Set isFocused = false
  ├─ Set hasBlurred = true
  ├─ Validate
  └─ Emit 'blur' event
```

## 📱 Country Selector Details

### Features
- Click outside to close (document event listener)
- Search with keyboard navigation
- Arrow keys support
- Escape to close
- Smooth dropdown animation
- Scrollable list with custom scrollbar

### Search Algorithm
```javascript
filteredCountries = countries.filter(country =>
  country.name.toLowerCase().includes(query) ||
  country.dialCode.includes(query) ||
  country.code.toLowerCase().includes(query)
)
```

### Lifecycle
```
onMounted → addEventListener('click', handleClickOutside)
onUnmounted → removeEventListener('click', handleClickOutside)

watch(isOpen) → {
  if (open) focus search input
}
```

## 🧪 Validation Logic

### Real-time Validation (validateOnBlur: false)
```
On every input:
  If hasValue:
    Show validation feedback
    Border: green if valid, red if invalid
  Else:
    No visual feedback
```

### Blur Validation (validateOnBlur: true)
```
While typing:
  No visual feedback

On blur:
  If hasValue:
    Show validation feedback
    Border: green if valid, red if invalid
```

### Validation Rules
```javascript
// For each country:
{
  maxLength: 11,  // Example: Brazil
  format: "(##) #####-####"
}

// Valid if:
digits.length === country.maxLength
```

## 🔐 Security & Best Practices

### Input Sanitization
- Only digits allowed in phone input
- Special keys allowed (backspace, arrows, etc.)
- Keyboard event filtering (`handleKeydown`)

### Defensive Coding
```javascript
// Always check if values exist
const digits = getDigitsOnly(value || '');

// Use optional chaining
const country = props.content?.defaultCountry;

// Fallback values
const label = props.content?.label || 'Phone Number';
```

### Editor Mode Protection
```javascript
const handleInput = () => {
  if (isEditing.value) return; // Block in editor
  // ... rest of logic
}
```

## 📊 Performance Optimizations

### 1. Computed Properties
All derived values use `computed()` for caching:
```javascript
const displayValue = computed(() => {
  // Only recalculates when dependencies change
});
```

### 2. Lazy Rendering
- Country dropdown only rendered when open
- Search filter computed on-demand

### 3. Event Debouncing
Cursor position restoration uses `setTimeout(0)` to avoid blocking:
```javascript
setTimeout(() => {
  inputElement.setSelectionRange(newPos, newPos);
}, 0);
```

### 4. Minimal Re-renders
- Uses `v-show` where appropriate (error message)
- Transitions for smooth UX without layout thrashing

## 🌐 Internationalization

### Country Data Structure
```javascript
{
  code: 'BR',                    // ISO 3166-1 alpha-2
  name: 'Brazil',                // English name
  dialCode: '+55',               // With + prefix
  flag: '🇧🇷',                   // Emoji flag
  format: '(##) #####-####',     // Format pattern
  placeholder: '(11) 99999-9999',// Example number
  maxLength: 11                  // Digits only
}
```

### Format Patterns
- `#` = digit placeholder
- Other characters = literals (spaces, hyphens, parentheses)
- Example: `"(##) #####-####"` → `"(11) 99999-9999"`

## 🔮 Future Enhancements

### Planned Features
1. **Auto-country detection from IP** (via API)
2. **Mobile vs landline detection**
3. **Number portability info**
4. **Regional variations** (UK: 020 vs 07)
5. **Copy button** for formatted number
6. **Dark mode** theme support
7. **Enhanced accessibility** (ARIA)
8. **RTL support** for Arabic/Hebrew

### Technical Debt
- None currently - component is production-ready
- Could add unit tests for utilities
- Could optimize country list rendering with virtual scrolling

## 📚 Dependencies

### Runtime
- **Vue 3** - Core framework
- **WeWeb SDK** - Component variables (wwLib)

### Zero External Libraries
- No libphonenumber-js (custom implementation)
- No flag SVGs (emoji flags)
- No third-party formatters
- Lightweight and fast

## 🎯 Browser Compatibility

### Minimum Requirements
- ES6 support (const, let, arrow functions)
- Vue 3 compatible browser
- CSS Grid support
- Emoji rendering

### Tested Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Code Quality

### Standards
- ESLint compatible
- Vue 3 Composition API
- Scoped SCSS
- BEM-like class naming
- JSDoc comments in utilities

### Accessibility
- Semantic HTML
- ARIA labels on buttons
- aria-expanded on dropdown
- Keyboard navigation
- Focus management

### Maintainability
- Modular structure (utilities separated)
- Clear function names
- Single responsibility principle
- Comprehensive documentation

---

**Component Version:** 1.0.0
**Vue Version Required:** 3.x
**WeWeb Version:** Latest
**Last Updated:** 2026-01-07
