/**
 * Phone number formatting and validation utilities
 */

/**
 * Extract only digits from a string
 * @param {string} value - Input string
 * @returns {string} - Only numeric characters
 */
export const getDigitsOnly = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

/**
 * Format phone number according to country format pattern
 * @param {string} value - Raw phone number (digits only)
 * @param {string} format - Format pattern (e.g., "(##) #####-####")
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (value, format) => {
  if (!value || !format) return value || '';

  const digits = getDigitsOnly(value);
  let formatted = '';
  let digitIndex = 0;

  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    const formatChar = format[i];

    if (formatChar === '#') {
      formatted += digits[digitIndex];
      digitIndex++;
    } else {
      // Only add separator if we have more digits to add
      if (digitIndex < digits.length) {
        formatted += formatChar;
      }
    }
  }

  return formatted;
};

/**
 * Validate if phone number is complete for the given country
 * @param {string} value - Raw phone number (digits only)
 * @param {number} maxLength - Maximum length for the country
 * @returns {boolean} - True if valid and complete
 */
export const isPhoneNumberValid = (value, maxLength) => {
  if (!value) return false;
  const digits = getDigitsOnly(value);
  return digits.length === maxLength;
};

/**
 * Get cursor position after formatting
 * @param {string} oldValue - Previous value
 * @param {string} newValue - New formatted value
 * @param {number} oldCursor - Previous cursor position
 * @returns {number} - New cursor position
 */
export const getNewCursorPosition = (oldValue, newValue, oldCursor) => {
  // Count non-digit characters before cursor in old value
  const beforeCursor = oldValue.slice(0, oldCursor);
  const digitsBeforeCursor = getDigitsOnly(beforeCursor).length;

  // Find position in new value where we have same number of digits
  let newCursor = 0;
  let digitCount = 0;

  for (let i = 0; i < newValue.length; i++) {
    if (/\d/.test(newValue[i])) {
      digitCount++;
      if (digitCount === digitsBeforeCursor) {
        newCursor = i + 1;
        break;
      }
    }
  }

  // If we didn't find the position, put cursor at end
  if (digitCount < digitsBeforeCursor) {
    newCursor = newValue.length;
  }

  return newCursor;
};

/**
 * Parse phone number with country code
 * Handles formats like:
 * - +5511999887766
 * - 5511999887766
 * - 11999887766
 * @param {string} value - Phone number with or without country code
 * @param {string} defaultDialCode - Default country dial code (e.g., "+55")
 * @returns {object} - { dialCode, nationalNumber, isInternational }
 */
export const parsePhoneNumber = (value, defaultDialCode = '+55') => {
  if (!value) {
    return {
      dialCode: defaultDialCode,
      nationalNumber: '',
      isInternational: false
    };
  }

  const digits = getDigitsOnly(value);

  // Check if starts with country code
  const hasPlus = value.trim().startsWith('+');

  if (hasPlus || digits.length > 11) {
    // Likely international format
    // Try to extract dial code (1-4 digits after +)
    for (let len = 4; len >= 1; len--) {
      const possibleDialCode = '+' + digits.slice(0, len);
      // You could validate against known dial codes here
      const nationalNumber = digits.slice(len);

      if (nationalNumber.length >= 6) {
        return {
          dialCode: possibleDialCode,
          nationalNumber,
          isInternational: true
        };
      }
    }
  }

  // National format
  return {
    dialCode: defaultDialCode,
    nationalNumber: digits,
    isInternational: false
  };
};

/**
 * Build full international phone number
 * @param {string} dialCode - Country dial code (e.g., "+55")
 * @param {string} nationalNumber - National number (digits only)
 * @returns {string} - Full international number (e.g., "+5511999887766")
 */
export const buildInternationalNumber = (dialCode, nationalNumber) => {
  if (!dialCode || !nationalNumber) return '';
  const cleanDialCode = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  const digits = getDigitsOnly(nationalNumber);
  return `${cleanDialCode}${digits}`;
};

/**
 * Sanitize input to allow only valid phone characters
 * @param {string} value - Input value
 * @returns {string} - Sanitized value (only digits, spaces, hyphens, parentheses, plus)
 */
export const sanitizePhoneInput = (value) => {
  if (!value) return '';
  // Allow digits, spaces, hyphens, parentheses, and plus sign
  return value.replace(/[^\d\s\-()+ ]/g, '');
};

/**
 * Check if phone number length is valid (not necessarily complete)
 * @param {string} value - Raw phone number
 * @param {number} maxLength - Maximum length for the country
 * @returns {boolean} - True if within valid range
 */
export const isPhoneNumberLengthValid = (value, maxLength) => {
  const digits = getDigitsOnly(value);
  return digits.length > 0 && digits.length <= maxLength;
};

/**
 * Get phone number with dial code prefix
 * @param {string} dialCode - Country dial code
 * @param {string} nationalNumber - National number
 * @param {boolean} formatted - Whether to include dial code in result
 * @returns {string} - Phone with or without dial code
 */
export const getDisplayValue = (dialCode, nationalNumber, showDialCode = true) => {
  if (!nationalNumber) return '';
  if (!showDialCode) return nationalNumber;
  return `${dialCode} ${nationalNumber}`;
};

/**
 * Detect country from partial phone number input
 * Useful for auto-switching country when user types international format
 * @param {string} value - Partial phone input
 * @param {Array} countries - Array of country objects
 * @returns {object|null} - Detected country or null
 */
export const detectCountryFromInput = (value, countries) => {
  if (!value) return null;

  const digits = getDigitsOnly(value);

  // Check if starts with + or has enough digits to be international
  if (value.trim().startsWith('+') || digits.length > 11) {
    // Try to match dial code
    for (const country of countries) {
      const dialDigits = country.dialCode.replace('+', '');
      if (digits.startsWith(dialDigits)) {
        return country;
      }
    }
  }

  return null;
};
