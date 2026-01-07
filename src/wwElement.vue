<template>
  <div class="international-phone-input" :style="containerStyle">
    <!-- Label -->
    <label
      v-if="showLabel"
      class="input-label"
      :style="labelStyle"
      :for="`phone-input-${uid}`"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <!-- Input Container -->
    <div
      class="input-wrapper"
      :class="{
        focused: isFocused,
        disabled: disabled,
        readonly: readonly,
        valid: showValidation && !validateOnBlur && isValid && hasValue && !isFocused,
        invalid: showValidation && !validateOnBlur && !isValid && hasValue && !isFocused,
        'valid-blur': showValidation && validateOnBlur && isValid && hasValue && hasBlurred,
        'invalid-blur': showValidation && validateOnBlur && !isValid && hasValue && hasBlurred
      }"
      :style="inputWrapperStyle"
    >
      <!-- Country Selector -->
      <CountrySelector
        v-model="selectedCountryCode"
        :disabled="disabled || readonly"
        :enable-search="enableSearch"
        :width="selectorWidth"
        :background-color="selectorBackgroundColor"
        :hover-background-color="selectorHoverBackgroundColor"
        :max-height="dropdownMaxHeight"
        @change="handleCountryChange"
      />

      <!-- Separator -->
      <div class="separator"></div>

      <!-- Phone Icon (optional) -->
      <div v-if="showPhoneIcon" class="phone-icon" :style="iconStyle">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>

      <!-- Dial Code Display (optional) -->
      <span v-if="showDialCode" class="dial-code-display" :style="dialCodeStyle">
        {{ currentCountry?.dialCode }}
      </span>

      <!-- Phone Input -->
      <input
        ref="phoneInputRef"
        :id="`phone-input-${uid}`"
        type="tel"
        class="phone-input"
        :value="displayValue"
        :placeholder="effectivePlaceholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :style="inputStyle"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        autocomplete="tel"
      />
    </div>

    <!-- Error Message -->
    <transition name="error-fade">
      <div
        v-if="showError"
        class="error-message"
        :style="errorMessageStyle"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import CountrySelector from './components/CountrySelector.vue';
import { getCountryByCode, detectCountryFromLocale } from './utils/countries.js';
import {
  getDigitsOnly,
  formatPhoneNumber,
  isPhoneNumberValid,
  getNewCursorPosition,
  buildInternationalNumber
} from './utils/phoneUtils.js';

export default {
  name: 'InternationalPhoneInput',
  components: {
    CountrySelector
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      required: true
    }
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    const phoneInputRef = ref(null);
    const isFocused = ref(false);
    const hasBlurred = ref(false);

    // Detect if in editor mode
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Component variables exposed to WeWeb
    const { value: internalValue, setValue: setInternalValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'value',
      type: 'string',
      defaultValue: ''
    });

    const { value: rawValue, setValue: setRawValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'rawValue',
      type: 'string',
      defaultValue: ''
    });

    const { value: selectedCountryCode, setValue: setSelectedCountryCode } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'countryCode',
      type: 'string',
      defaultValue: props.content?.defaultCountry || 'BR'
    });

    const { value: isValid, setValue: setIsValid } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isValid',
      type: 'boolean',
      defaultValue: false
    });

    const { value: internationalNumber, setValue: setInternationalNumber } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'internationalNumber',
      type: 'string',
      defaultValue: ''
    });

    // Computed properties
    const currentCountry = computed(() => {
      return getCountryByCode(selectedCountryCode.value);
    });

    const showLabel = computed(() => props.content?.showLabel !== false);
    const label = computed(() => props.content?.label || 'Phone Number');
    const required = computed(() => props.content?.required === true);
    const disabled = computed(() => props.content?.disabled === true);
    const readonly = computed(() => props.content?.readonly === true);
    const autoFormat = computed(() => props.content?.autoFormat !== false);
    const showValidation = computed(() => props.content?.showValidation !== false);
    const validateOnBlur = computed(() => props.content?.validateOnBlur === true);
    const showPhoneIcon = computed(() => props.content?.showPhoneIcon !== false);
    const showDialCode = computed(() => props.content?.showDialCode !== false);
    const enableSearch = computed(() => props.content?.enableSearch !== false);
    const errorMessage = computed(() => props.content?.errorMessage || 'Please enter a valid phone number');

    const effectivePlaceholder = computed(() => {
      if (props.content?.placeholder) {
        return props.content.placeholder;
      }
      return currentCountry.value?.placeholder || '';
    });

    const hasValue = computed(() => {
      return rawValue.value && rawValue.value.length > 0;
    });

    const displayValue = computed(() => {
      if (!rawValue.value) return '';
      if (!autoFormat.value) return rawValue.value;
      if (!currentCountry.value) return rawValue.value;

      return formatPhoneNumber(rawValue.value, currentCountry.value.format);
    });

    const showError = computed(() => {
      if (!showValidation.value) return false;
      if (!hasValue.value) return false;
      if (validateOnBlur.value && !hasBlurred.value) return false;
      if (validateOnBlur.value) return !isValid.value;
      if (isFocused.value) return false;
      return !isValid.value;
    });

    // Styles
    const containerStyle = computed(() => ({
      width: props.content?.containerWidth || '100%',
      gap: props.content?.containerGap || '8px'
    }));

    const labelStyle = computed(() => ({
      fontSize: props.content?.labelFontSize || '14px',
      fontWeight: props.content?.labelFontWeight || '500',
      color: props.content?.labelColor || '#374151'
    }));

    const inputWrapperStyle = computed(() => {
      const baseStyle = {
        height: props.content?.inputHeight || '44px',
        borderRadius: props.content?.inputBorderRadius || '6px',
        borderWidth: props.content?.inputBorderWidth || '1px',
        backgroundColor: disabled.value
          ? props.content?.inputDisabledBackgroundColor || '#f3f4f6'
          : props.content?.inputBackgroundColor || '#ffffff'
      };

      // Border color logic
      let borderColor = props.content?.inputBorderColor || '#d1d5db';

      if (isFocused.value) {
        borderColor = props.content?.inputFocusBorderColor || '#3b82f6';
      } else if (showValidation.value && hasValue.value) {
        if (validateOnBlur.value && hasBlurred.value) {
          borderColor = isValid.value
            ? props.content?.inputValidBorderColor || '#10b981'
            : props.content?.inputInvalidBorderColor || '#ef4444';
        } else if (!validateOnBlur.value) {
          borderColor = isValid.value
            ? props.content?.inputValidBorderColor || '#10b981'
            : props.content?.inputInvalidBorderColor || '#ef4444';
        }
      }

      baseStyle.borderColor = borderColor;
      return baseStyle;
    });

    const inputStyle = computed(() => ({
      fontSize: props.content?.inputFontSize || '16px',
      color: props.content?.inputTextColor || '#1f2937',
      padding: props.content?.inputPadding || '8px 12px',
      '--placeholder-color': props.content?.placeholderColor || '#9ca3af'
    }));

    const iconStyle = computed(() => ({
      color: props.content?.iconColor || '#6b7280',
      width: props.content?.iconSize || '20px',
      height: props.content?.iconSize || '20px'
    }));

    const dialCodeStyle = computed(() => ({
      color: props.content?.inputTextColor || '#1f2937',
      fontSize: props.content?.inputFontSize || '16px',
      fontWeight: '500'
    }));

    const errorMessageStyle = computed(() => ({
      color: props.content?.errorMessageColor || '#ef4444',
      fontSize: props.content?.errorMessageFontSize || '12px'
    }));

    const selectorWidth = computed(() => props.content?.selectorWidth || '90px');
    const selectorBackgroundColor = computed(() => props.content?.selectorBackgroundColor || '#f9fafb');
    const selectorHoverBackgroundColor = computed(() => props.content?.selectorHoverBackgroundColor || '#f3f4f6');
    const dropdownMaxHeight = computed(() => props.content?.dropdownMaxHeight || '300px');

    // Validation
    const validatePhoneNumber = () => {
      if (!currentCountry.value) {
        setIsValid(false);
        return false;
      }

      const digits = getDigitsOnly(rawValue.value);
      const valid = isPhoneNumberValid(digits, currentCountry.value.maxLength);
      setIsValid(valid);
      return valid;
    };

    // Event handlers
    const handleInput = (event) => {
      if (disabled.value || readonly.value) return;

      const inputElement = event.target;
      const newValue = inputElement.value;
      const oldValue = displayValue.value;
      const oldCursorPosition = inputElement.selectionStart;

      // Extract only digits
      const digits = getDigitsOnly(newValue);

      // Check max length
      if (currentCountry.value && digits.length > currentCountry.value.maxLength) {
        return; // Don't allow more digits than max
      }

      // Update raw value
      setRawValue(digits);

      // Update international number
      const intlNumber = buildInternationalNumber(
        currentCountry.value?.dialCode || '+55',
        digits
      );
      setInternationalNumber(intlNumber);

      // Validate
      const valid = validatePhoneNumber();

      // Emit change event (only in preview/published)
      if (!isEditing.value) {
        emit('trigger-event', {
          name: 'change',
          event: {
            value: displayValue.value,
            rawValue: digits,
            countryCode: selectedCountryCode.value,
            isValid: valid
          }
        });
      }

      // Restore cursor position after formatting
      if (autoFormat.value) {
        setTimeout(() => {
          const formatted = formatPhoneNumber(digits, currentCountry.value?.format || '');
          const newCursorPosition = getNewCursorPosition(oldValue, formatted, oldCursorPosition);
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
      }
    };

    const handleFocus = () => {
      if (isEditing.value) return;
      isFocused.value = true;

      emit('trigger-event', {
        name: 'focus',
        event: {
          value: displayValue.value
        }
      });
    };

    const handleBlur = () => {
      if (isEditing.value) return;
      isFocused.value = false;
      hasBlurred.value = true;

      const valid = validatePhoneNumber();

      emit('trigger-event', {
        name: 'blur',
        event: {
          value: displayValue.value,
          isValid: valid
        }
      });
    };

    const handleKeydown = (event) => {
      // Allow: backspace, delete, tab, escape, enter
      if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
          // Allow: Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+X
          (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
          (event.keyCode === 67 && (event.ctrlKey === true || event.metaKey === true)) ||
          (event.keyCode === 86 && (event.ctrlKey === true || event.metaKey === true)) ||
          (event.keyCode === 88 && (event.ctrlKey === true || event.metaKey === true)) ||
          // Allow: home, end, left, right
          (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
    };

    const handleCountryChange = (country) => {
      if (isEditing.value) return;

      setSelectedCountryCode(country.code);

      // Re-validate with new country
      validatePhoneNumber();

      // Update international number
      const intlNumber = buildInternationalNumber(
        country.dialCode,
        rawValue.value
      );
      setInternationalNumber(intlNumber);

      emit('trigger-event', {
        name: 'countryChange',
        event: {
          countryCode: country.code,
          dialCode: country.dialCode,
          countryName: country.name
        }
      });
    };

    // Actions exposed to WeWeb workflows
    const setValue = (phoneNumber) => {
      if (isEditing.value) return;

      const digits = getDigitsOnly(phoneNumber);
      setRawValue(digits);

      // Update international number
      const intlNumber = buildInternationalNumber(
        currentCountry.value?.dialCode || '+55',
        digits
      );
      setInternationalNumber(intlNumber);

      validatePhoneNumber();
    };

    const setCountry = (countryCode) => {
      if (isEditing.value) return;

      const country = getCountryByCode(countryCode);
      if (country) {
        setSelectedCountryCode(country.code);
        validatePhoneNumber();

        // Update international number
        const intlNumber = buildInternationalNumber(
          country.dialCode,
          rawValue.value
        );
        setInternationalNumber(intlNumber);
      }
    };

    const clearValue = () => {
      if (isEditing.value) return;

      setRawValue('');
      setInternalValue('');
      setInternationalNumber('');
      setIsValid(false);
      hasBlurred.value = false;
    };

    const focusInput = () => {
      if (isEditing.value) return;
      phoneInputRef.value?.focus();
    };

    const validate = () => {
      return validatePhoneNumber();
    };

    // Initialize
    onMounted(() => {
      // Auto-detect country if enabled
      if (props.content?.autoDetectCountry) {
        const detectedCode = detectCountryFromLocale();
        if (detectedCode) {
          setSelectedCountryCode(detectedCode);
        }
      }

      // Set initial value from props if provided
      if (props.content?.value) {
        setValue(props.content.value);
      }
    });

    // Watch for external value changes
    watch(() => props.content?.value, (newValue) => {
      if (newValue !== displayValue.value) {
        setValue(newValue);
      }
    });

    // Watch for country changes from props
    watch(() => props.content?.defaultCountry, (newCountry) => {
      if (newCountry && newCountry !== selectedCountryCode.value) {
        setSelectedCountryCode(newCountry);
      }
    });

    return {
      phoneInputRef,
      isFocused,
      hasBlurred,
      isEditing,
      selectedCountryCode,
      currentCountry,
      rawValue,
      isValid,
      displayValue,
      hasValue,
      showError,
      showLabel,
      label,
      required,
      disabled,
      readonly,
      showPhoneIcon,
      showDialCode,
      enableSearch,
      effectivePlaceholder,
      errorMessage,
      containerStyle,
      labelStyle,
      inputWrapperStyle,
      inputStyle,
      iconStyle,
      dialCodeStyle,
      errorMessageStyle,
      selectorWidth,
      selectorBackgroundColor,
      selectorHoverBackgroundColor,
      dropdownMaxHeight,
      handleInput,
      handleFocus,
      handleBlur,
      handleKeydown,
      handleCountryChange,
      setValue,
      setCountry,
      clearValue,
      focusInput,
      validate
    };
  }
};
</script>

<style scoped lang="scss">
.international-phone-input {
  display: flex;
  flex-direction: column;
  width: 100%;

  .input-label {
    display: block;
    margin-bottom: 0;
    cursor: pointer;

    .required-mark {
      color: #ef4444;
      margin-left: 2px;
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    border-style: solid;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;

    &.focused {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.readonly {
      background-color: #f9fafb;
    }

    .separator {
      width: 1px;
      height: 60%;
      background-color: #e5e7eb;
      flex-shrink: 0;
    }

    .phone-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-left: 12px;
      margin-right: 8px;

      svg {
        display: block;
      }
    }

    .dial-code-display {
      flex-shrink: 0;
      margin-left: 12px;
      margin-right: 4px;
      user-select: none;
    }

    .phone-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      min-width: 0;
      font-family: inherit;

      &::placeholder {
        color: var(--placeholder-color, #9ca3af);
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:read-only {
        cursor: default;
      }
    }
  }

  .error-message {
    margin-top: 6px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: '⚠';
      font-size: 14px;
    }
  }
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.2s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
