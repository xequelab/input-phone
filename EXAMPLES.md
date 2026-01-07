# Usage Examples - International Phone Input

This document provides real-world examples of how to use the International Phone Input component in various scenarios.

## 📋 Table of Contents

1. [Basic Setup](#basic-setup)
2. [Form Integration](#form-integration)
3. [Validation Scenarios](#validation-scenarios)
4. [API Integration](#api-integration)
5. [Custom Styling](#custom-styling)
6. [Workflow Examples](#workflow-examples)

---

## Basic Setup

### Minimal Configuration

**Use Case:** Simple phone input for Brazilian users

**Configuration:**
```
Component: International Phone Input

Properties:
├─ defaultCountry: "BR"
├─ label: "Telefone"
├─ placeholder: "" (uses country default)
└─ required: true
```

**Result:**
- Displays Brazil flag and +55
- Auto-formats as: (11) 99999-9999
- Shows validation on blur

---

## Form Integration

### User Registration Form

**Scenario:** Multi-step registration with phone verification

#### Step 1: Setup Component

```
Component Properties:
├─ label: "Número de Telefone"
├─ defaultCountry: "BR"
├─ required: true
├─ showValidation: true
├─ validateOnBlur: true
├─ errorMessage: "Por favor, insira um número válido"
```

#### Step 2: Create Form Variable

```javascript
Variable: registrationForm
Type: Object
Default Value: {
  name: "",
  email: "",
  phone: "",
  phoneCountry: ""
}
```

#### Step 3: Bind Component

```
Binding - value:
→ registrationForm.phone

On change event:
→ Set Variable: registrationForm.phone = event.rawValue
→ Set Variable: registrationForm.phoneCountry = event.countryCode
```

#### Step 4: Validation in Submit Button

```
Submit Button - Workflow:

If variables['phone-uid-isValid'] === false:
  → Show notification: "Telefone inválido"
  → Stop workflow

Else:
  → Call API: POST /api/register
  → Body: {
      name: registrationForm.name,
      email: registrationForm.email,
      phone: variables['phone-uid-internationalNumber'],
      country: variables['phone-uid-countryCode']
    }
```

---

## Validation Scenarios

### Example 1: Conditional Required

**Scenario:** Phone is required only if user selects "Contact by phone"

```
Component Properties:
├─ required: contactMethod === "phone"
├─ disabled: contactMethod !== "phone"
```

**Workflow on Form Submit:**
```
If contactMethod === "phone":
  If variables['phone-uid-isValid'] === false:
    → Show error
    → Stop
  Else:
    → Continue
Else:
  → Continue (phone not required)
```

### Example 2: Business Hours Validation

**Scenario:** Only allow Brazilian mobile numbers (9 digits + area code)

```
Custom Validation Workflow:

On blur event:
  If event.countryCode === "BR":
    If event.rawValue.length === 11:
      If event.rawValue[2] === "9":
        → Set customValid = true
      Else:
        → Set customValid = false
        → Show: "Apenas números de celular são aceitos"
    Else:
      → Set customValid = false
  Else:
    → Set customValid = event.isValid
```

---

## API Integration

### Example 1: SMS Verification (Twilio)

**Scenario:** Send verification code via SMS

#### Component Setup
```
Properties:
├─ label: "Phone Number"
├─ defaultCountry: "US"
├─ showValidation: true
```

#### Send Code Button Workflow
```
Button: "Send Verification Code"

Condition:
variables['phone-uid-isValid'] === true

Workflow:
1. Set Loading: true

2. Call API: POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json
   Headers:
   └─ Authorization: Basic {credentials}

   Body (form-data):
   ├─ To: variables['phone-uid-internationalNumber']
   ├─ From: {YOUR_TWILIO_NUMBER}
   └─ Body: "Your verification code is: " + verificationCode

3. On Success:
   → Show notification: "Code sent!"
   → Navigate to: verification-page

4. On Error:
   → Show notification: "Failed to send code"
   → Set Loading: false
```

### Example 2: WhatsApp Integration

**Scenario:** Click to open WhatsApp chat

```
Button: "WhatsApp"

Workflow:
If variables['phone-uid-isValid'] === true:
  → Open URL: "https://wa.me/" + variables['phone-uid-rawValue'].replace(/^0+/, '')
  → Note: Remove leading zeros for WhatsApp format
Else:
  → Show notification: "Please enter a valid phone number"
```

---

## Custom Styling

### Example 1: Brand Color Theme

```
Properties - Style:
├─ inputBorderRadius: "12px"
├─ inputHeight: "52px"
├─ inputBorderColor: "#e2e8f0"
├─ inputFocusBorderColor: "#6366f1" (your brand color)
├─ inputValidBorderColor: "#10b981"
├─ inputInvalidBorderColor: "#ef4444"
├─ labelFontWeight: "600"
├─ labelColor: "#1e293b"
├─ selectorBackgroundColor: "#f8fafc"
└─ selectorHoverBackgroundColor: "#f1f5f9"
```

### Example 2: Minimal Design

```
Properties - Style:
├─ inputBorderWidth: "0px"
├─ inputBackgroundColor: "#f9fafb"
├─ inputBorderRadius: "8px"
├─ inputHeight: "48px"
├─ showPhoneIcon: false
├─ showDialCode: true
└─ selectorBackgroundColor: "#f9fafb"
```

### Example 3: Mobile-First (Responsive)

```
Properties - Style (Desktop):
├─ inputHeight: "44px"
├─ inputFontSize: "16px"
├─ containerWidth: "400px"

Properties - Style (Mobile):
├─ inputHeight: "52px" (larger for touch)
├─ inputFontSize: "16px" (prevent zoom on iOS)
├─ containerWidth: "100%"
```

---

## Workflow Examples

### Example 1: Auto-fill from User Profile

**Scenario:** Edit profile page - pre-fill phone from database

```
Page Load Workflow:

1. Fetch User Data:
   → Call API: GET /api/user/profile
   → Response: {
       phone: "11999887766",
       phoneCountry: "BR"
     }

2. Set Phone Value:
   → Component Action: setValue
   → phoneNumber: response.phone

3. Set Country:
   → Component Action: setCountry
   → countryCode: response.phoneCountry
```

### Example 2: International Form with Auto-detect

**Scenario:** Multi-country form that detects user location

```
Component Properties:
├─ autoDetectCountry: true
├─ defaultCountry: "BR" (fallback)

On Component Mount:
  → Detected country from browser
  → Set to detected country or fallback

User can still change:
  → Click country selector
  → Search and select different country
```

### Example 3: Contact Form with Multiple Phones

**Scenario:** Business contact form with home and mobile phone

#### Component 1: Home Phone
```
Properties:
├─ label: "Home Phone (Optional)"
├─ required: false
├─ showValidation: true
├─ validateOnBlur: true
```

#### Component 2: Mobile Phone
```
Properties:
├─ label: "Mobile Phone"
├─ required: true
├─ showValidation: true
├─ validateOnBlur: true
```

#### Submit Workflow
```
If variables['mobile-phone-uid-isValid'] === false:
  → Show error: "Mobile phone is required"
  → Stop

If contactForm.homePhone !== "":
  If variables['home-phone-uid-isValid'] === false:
    → Show error: "Home phone is invalid"
    → Stop

→ Submit form with both phones
```

### Example 4: Real-time Phone Number Lookup

**Scenario:** Check if phone is already registered

```
On blur event:

Workflow:
1. Check if valid:
   If event.isValid === false:
     → Stop

2. Show loading:
   → Set checkingPhone = true

3. Call API:
   → POST /api/check-phone
   → Body: { phone: variables['phone-uid-rawValue'] }

4. On Response:
   If response.exists === true:
     → Show warning: "Este número já está cadastrado"
     → Set phoneAvailable = false
   Else:
     → Set phoneAvailable = true

5. Hide loading:
   → Set checkingPhone = false
```

### Example 5: Multi-step Form Progress

**Scenario:** Phone is required in step 2, show progress

```
Step 2 - Next Button:

Condition to Enable:
variables['phone-uid-isValid'] === true

Workflow:
If variables['phone-uid-isValid'] === false:
  → Component Action: focusInput
  → Show notification: "Please complete phone number"
Else:
  → Save to session:
    sessionData.phone = variables['phone-uid-internationalNumber']
  → Navigate to: step-3
```

---

## Advanced Patterns

### Pattern 1: Debounced API Validation

**Scenario:** Check with backend if phone is valid for service area

```javascript
// Use WeWeb's built-in debounce or custom timer

let validationTimer = null;

On change event:
  → Clear timeout: validationTimer
  → Set validationTimer = setTimeout(() => {
      Call API: /api/validate-service-area
      Body: {
        phone: event.internationalNumber,
        country: event.countryCode
      }

      On Success:
        If response.serviceAvailable:
          → Show: "Service available in your area"
        Else:
          → Show: "Sorry, service not available"
    }, 800) // 800ms debounce
```

### Pattern 2: Conditional Formatting

**Scenario:** Different validation rules for different user types

```
If userType === "business":
  → Allow any country
  → Require international format
  → Show dial code: true

If userType === "individual":
  → Default to user's country
  → Optional international
  → Show dial code: false
```

### Pattern 3: Phone Masking for Privacy

**Scenario:** Show masked phone after submission

```
After Submit:

1. Store original:
   → securePhone = variables['phone-uid-internationalNumber']

2. Create masked version:
   → displayPhone = securePhone.slice(0, -4) + "****"

3. Show to user:
   → Text element: displayPhone
   → "Confirmation sent to +55 11 9999-****"
```

---

## Testing Scenarios

### Valid Test Numbers

**Brazil (BR):**
```
(11) 99999-9999 ✓ Valid
(21) 98888-7777 ✓ Valid
(85) 91234-5678 ✓ Valid
```

**USA (US):**
```
(555) 123-4567 ✓ Valid
(212) 555-1234 ✓ Valid
```

**UK (GB):**
```
7911 123456 ✓ Valid
7700 900123 ✓ Valid
```

### Invalid Test Numbers

**Too Short:**
```
(11) 9999 ✗ Invalid
555-123 ✗ Invalid
```

**Too Long:**
```
(11) 99999-99999 ✗ Invalid (auto-blocked)
```

**Wrong Format:**
```
(Input is auto-formatted, so format errors don't occur)
```

---

## Tips & Tricks

### Tip 1: Copy to Clipboard
```
Button: "Copy Phone"

Workflow:
→ Copy to clipboard: variables['phone-uid-internationalNumber']
→ Show notification: "Phone number copied!"
```

### Tip 2: Format for Display
```
Text Element:
Content: variables['phone-uid-value']
→ Shows formatted: (11) 99999-9999
```

### Tip 3: Store Minimal Data
```
Database:
{
  phoneRaw: variables['phone-uid-rawValue'],     // "11999999999"
  phoneCountry: variables['phone-uid-countryCode'] // "BR"
}

Then reconstruct:
→ Display: formatPhone(phoneRaw, phoneCountry)
→ API: "+" + getDialCode(phoneCountry) + phoneRaw
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Storing Formatted Value
```javascript
// BAD
database.phone = variables['phone-uid-value'] // "(11) 99999-9999"

// GOOD
database.phone = variables['phone-uid-rawValue'] // "11999999999"
```

### ❌ Mistake 2: Not Checking Validation
```javascript
// BAD
submitForm() // without checking isValid

// GOOD
if (variables['phone-uid-isValid']) {
  submitForm()
}
```

### ❌ Mistake 3: Wrong Format for API
```javascript
// BAD
sendSMS(variables['phone-uid-rawValue']) // Missing country code

// GOOD
sendSMS(variables['phone-uid-internationalNumber']) // "+5511999999999"
```

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-07
