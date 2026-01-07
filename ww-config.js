export default {
  editor: {
    label: {
      en: 'International Phone Input'
    },
    icon: 'phone'
  },
  triggerEvents: [
    {
      name: 'change',
      label: { en: 'On value change' },
      event: {
        value: '',
        rawValue: '',
        countryCode: '',
        isValid: false
      },
      default: true
    },
    {
      name: 'countryChange',
      label: { en: 'On country change' },
      event: {
        countryCode: '',
        dialCode: '',
        countryName: ''
      }
    },
    {
      name: 'focus',
      label: { en: 'On focus' },
      event: {
        value: ''
      }
    },
    {
      name: 'blur',
      label: { en: 'On blur' },
      event: {
        value: '',
        isValid: false
      }
    }
  ],
  actions: [
    {
      label: { en: 'Set value' },
      action: 'setValue',
      args: [
        {
          name: 'phoneNumber',
          type: 'string'
        }
      ]
    },
    {
      label: { en: 'Set country' },
      action: 'setCountry',
      args: [
        {
          name: 'countryCode',
          type: 'string'
        }
      ]
    },
    {
      label: { en: 'Clear value' },
      action: 'clearValue'
    },
    {
      label: { en: 'Focus input' },
      action: 'focusInput'
    },
    {
      label: { en: 'Validate' },
      action: 'validate'
    }
  ],
  properties: {
    // Value & State
    value: {
      label: { en: 'Value' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The formatted phone number value'
      },
      propertyHelp: {
        tooltip: 'The current phone number value (can be formatted or raw)'
      }
      /* wwEditor:end */
    },
    defaultCountry: {
      label: { en: 'Default Country' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'BR',
      options: {
        options: [
          { value: 'BR', label: '🇧🇷 Brazil (+55)' },
          { value: 'US', label: '🇺🇸 United States (+1)' },
          { value: 'GB', label: '🇬🇧 United Kingdom (+44)' },
          { value: 'PT', label: '🇵🇹 Portugal (+351)' },
          { value: 'ES', label: '🇪🇸 Spain (+34)' },
          { value: 'FR', label: '🇫🇷 France (+33)' },
          { value: 'DE', label: '🇩🇪 Germany (+49)' },
          { value: 'IT', label: '🇮🇹 Italy (+39)' },
          { value: 'AR', label: '🇦🇷 Argentina (+54)' },
          { value: 'MX', label: '🇲🇽 Mexico (+52)' },
          { value: 'CL', label: '🇨🇱 Chile (+56)' },
          { value: 'CO', label: '🇨🇴 Colombia (+57)' },
          { value: 'PE', label: '🇵🇪 Peru (+51)' },
          { value: 'CA', label: '🇨🇦 Canada (+1)' },
          { value: 'AU', label: '🇦🇺 Australia (+61)' },
          { value: 'JP', label: '🇯🇵 Japan (+81)' },
          { value: 'CN', label: '🇨🇳 China (+86)' },
          { value: 'IN', label: '🇮🇳 India (+91)' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'ISO 3166-1 alpha-2 country code (e.g., "BR", "US", "GB")'
      },
      propertyHelp: {
        tooltip: 'The default country to show when component loads'
      }
      /* wwEditor:end */
    },
    placeholder: {
      label: { en: 'Placeholder' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      options: {
        placeholder: 'e.g., (11) 99999-9999'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Custom placeholder text'
      },
      propertyHelp: {
        tooltip: 'Custom placeholder. Leave empty to use country-specific format example'
      }
      /* wwEditor:end */
    },

    // Behavior
    required: {
      label: { en: 'Required' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether the field is required'
      }
      /* wwEditor:end */
    },
    disabled: {
      label: { en: 'Disabled' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether the input is disabled'
      }
      /* wwEditor:end */
    },
    readonly: {
      label: { en: 'Read Only' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether the input is read-only'
      }
      /* wwEditor:end */
    },
    autoFormat: {
      label: { en: 'Auto Format' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to automatically format the phone number as user types'
      },
      propertyHelp: {
        tooltip: 'Automatically format phone number according to country standards'
      }
      /* wwEditor:end */
    },
    showValidation: {
      label: { en: 'Show Validation' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to show visual validation feedback'
      },
      propertyHelp: {
        tooltip: 'Show green/red border when phone is valid/invalid'
      }
      /* wwEditor:end */
    },
    validateOnBlur: {
      label: { en: 'Validate on Blur Only' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to validate only when input loses focus'
      },
      propertyHelp: {
        tooltip: 'When enabled, validation feedback only shows after user leaves the field'
      }
      /* wwEditor:end */
    },
    autoDetectCountry: {
      label: { en: 'Auto Detect Country' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to try detecting country from browser locale'
      },
      propertyHelp: {
        tooltip: 'Attempt to detect user country from browser settings on load'
      }
      /* wwEditor:end */
    },
    enableSearch: {
      label: { en: 'Enable Country Search' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to enable search in country dropdown'
      },
      propertyHelp: {
        tooltip: 'Allow users to search countries by name or dial code'
      }
      /* wwEditor:end */
    },

    // UI Elements
    showLabel: {
      label: { en: 'Show Label' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to show the label'
      }
      /* wwEditor:end */
    },
    label: {
      label: { en: 'Label Text' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Phone Number',
      options: {
        placeholder: 'Phone Number'
      },
      hidden: content => !content.showLabel,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The label text'
      }
      /* wwEditor:end */
    },
    showPhoneIcon: {
      label: { en: 'Show Phone Icon' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to show phone icon in input'
      }
      /* wwEditor:end */
    },
    showDialCode: {
      label: { en: 'Show Dial Code in Input' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to show dial code (+55) inside the input'
      },
      propertyHelp: {
        tooltip: 'Display the country dial code as a prefix in the input field'
      }
      /* wwEditor:end */
    },
    errorMessage: {
      label: { en: 'Error Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Please enter a valid phone number',
      options: {
        placeholder: 'Error message'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Custom error message'
      },
      propertyHelp: {
        tooltip: 'Message shown when phone number is invalid'
      }
      /* wwEditor:end */
    },

    // Style - Container
    containerWidth: {
      label: { en: 'Container Width' },
      type: 'Length',
      section: 'style',
      responsive: true,
      defaultValue: '100%',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 1000 },
          { value: '%', label: '%', min: 0, max: 100 }
        ]
      }
    },
    containerGap: {
      label: { en: 'Gap (Label to Input)' },
      type: 'Length',
      section: 'style',
      responsive: true,
      defaultValue: '8px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },

    // Style - Label
    labelFontSize: {
      label: { en: 'Label Font Size' },
      type: 'Length',
      section: 'style',
      responsive: true,
      defaultValue: '14px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 32 }
        ]
      }
    },
    labelFontWeight: {
      label: { en: 'Label Font Weight' },
      type: 'TextSelect',
      section: 'style',
      bindable: true,
      defaultValue: '500',
      options: {
        options: [
          { value: '300', label: 'Light (300)' },
          { value: '400', label: 'Normal (400)' },
          { value: '500', label: 'Medium (500)' },
          { value: '600', label: 'Semi-bold (600)' },
          { value: '700', label: 'Bold (700)' }
        ]
      }
    },
    labelColor: {
      label: { en: 'Label Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#374151',
      options: {
        nullable: true
      }
    },

    // Style - Input Field
    inputHeight: {
      label: { en: 'Input Height' },
      type: 'Length',
      section: 'style',
      responsive: true,
      defaultValue: '44px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 30, max: 80 }
        ]
      }
    },
    inputPadding: {
      label: { en: 'Input Padding' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px 12px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Padding inside input (e.g., "8px 12px")'
      }
      /* wwEditor:end */
    },
    inputFontSize: {
      label: { en: 'Input Font Size' },
      type: 'Length',
      section: 'style',
      responsive: true,
      defaultValue: '16px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 12, max: 24 }
        ]
      }
    },
    inputBorderRadius: {
      label: { en: 'Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '6px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 50 }
        ]
      }
    },
    inputBorderWidth: {
      label: { en: 'Border Width' },
      type: 'Length',
      section: 'style',
      defaultValue: '1px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 10 }
        ]
      }
    },

    // Style - Colors
    inputBackgroundColor: {
      label: { en: 'Background Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
      options: {
        nullable: true
      }
    },
    inputTextColor: {
      label: { en: 'Text Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#1f2937',
      options: {
        nullable: true
      }
    },
    inputBorderColor: {
      label: { en: 'Border Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#d1d5db',
      options: {
        nullable: true
      }
    },
    inputFocusBorderColor: {
      label: { en: 'Focus Border Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#3b82f6',
      options: {
        nullable: true
      }
    },
    inputValidBorderColor: {
      label: { en: 'Valid Border Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#10b981',
      options: {
        nullable: true
      }
    },
    inputInvalidBorderColor: {
      label: { en: 'Invalid Border Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ef4444',
      options: {
        nullable: true
      }
    },
    inputDisabledBackgroundColor: {
      label: { en: 'Disabled Background' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#f3f4f6',
      options: {
        nullable: true
      }
    },
    placeholderColor: {
      label: { en: 'Placeholder Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#9ca3af',
      options: {
        nullable: true
      }
    },

    // Style - Country Selector
    selectorWidth: {
      label: { en: 'Country Selector Width' },
      type: 'Length',
      section: 'style',
      defaultValue: '90px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 60, max: 150 }
        ]
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip: 'Width of the country selector dropdown button'
      }
      /* wwEditor:end */
    },
    selectorBackgroundColor: {
      label: { en: 'Selector Background' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#f9fafb',
      options: {
        nullable: true
      }
    },
    selectorHoverBackgroundColor: {
      label: { en: 'Selector Hover Background' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#f3f4f6',
      options: {
        nullable: true
      }
    },
    dropdownMaxHeight: {
      label: { en: 'Dropdown Max Height' },
      type: 'Length',
      section: 'style',
      defaultValue: '300px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 150, max: 500 }
        ]
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip: 'Maximum height of the country dropdown list'
      }
      /* wwEditor:end */
    },

    // Style - Error Message
    errorMessageColor: {
      label: { en: 'Error Message Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ef4444',
      options: {
        nullable: true
      }
    },
    errorMessageFontSize: {
      label: { en: 'Error Message Font Size' },
      type: 'Length',
      section: 'style',
      responsive: true,
      defaultValue: '12px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 18 }
        ]
      }
    },

    // Style - Icons
    iconColor: {
      label: { en: 'Icon Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#6b7280',
      options: {
        nullable: true
      }
    },
    iconSize: {
      label: { en: 'Icon Size' },
      type: 'Length',
      section: 'style',
      defaultValue: '20px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 14, max: 32 }
        ]
      }
    }
  }
};
