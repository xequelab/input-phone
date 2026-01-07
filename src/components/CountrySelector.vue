<template>
  <div class="country-selector" ref="selectorRef">
    <!-- Selector Button -->
    <button
      type="button"
      class="selector-button"
      :class="{ open: isOpen, disabled: disabled }"
      :style="buttonStyle"
      :disabled="disabled"
      @click="toggleDropdown"
      :aria-label="`Selected country: ${selectedCountry?.name}`"
      :aria-expanded="isOpen"
    >
      <span class="flag">{{ selectedCountry?.flag }}</span>
      <span class="dial-code">{{ selectedCountry?.dialCode }}</span>
      <svg class="chevron" :class="{ rotate: isOpen }" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Dropdown -->
    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="dropdown"
        :style="dropdownStyle"
      >
        <!-- Search Input -->
        <div v-if="enableSearch" class="search-container">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            ref="searchInputRef"
            type="text"
            class="search-input"
            v-model="searchQuery"
            placeholder="Search country..."
            @keydown.escape="closeDropdown"
            @keydown.arrow-down.prevent="focusFirstCountry"
          />
        </div>

        <!-- Country List -->
        <div class="country-list" ref="listRef">
          <button
            v-for="country in filteredCountries"
            :key="country.code"
            type="button"
            class="country-item"
            :class="{ selected: country.code === selectedCountry?.code }"
            @click="selectCountry(country)"
            :aria-label="`Select ${country.name}`"
          >
            <span class="flag">{{ country.flag }}</span>
            <span class="name">{{ country.name }}</span>
            <span class="dial-code">{{ country.dialCode }}</span>
            <svg v-if="country.code === selectedCountry?.code" class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- No Results -->
          <div v-if="filteredCountries.length === 0" class="no-results">
            No countries found
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { countries, searchCountries } from '../utils/countries.js';

export default {
  name: 'CountrySelector',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enableSearch: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '90px'
    },
    backgroundColor: {
      type: String,
      default: '#f9fafb'
    },
    hoverBackgroundColor: {
      type: String,
      default: '#f3f4f6'
    },
    maxHeight: {
      type: String,
      default: '300px'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const searchQuery = ref('');
    const selectorRef = ref(null);
    const searchInputRef = ref(null);
    const listRef = ref(null);

    const selectedCountry = computed(() => {
      return countries.find(c => c.code === props.modelValue);
    });

    const filteredCountries = computed(() => {
      if (!searchQuery.value) return countries;
      return searchCountries(searchQuery.value);
    });

    const buttonStyle = computed(() => ({
      width: props.width,
      backgroundColor: props.backgroundColor
    }));

    const dropdownStyle = computed(() => ({
      '--hover-bg': props.hoverBackgroundColor,
      maxHeight: props.maxHeight
    }));

    const toggleDropdown = () => {
      if (props.disabled) return;
      isOpen.value = !isOpen.value;
    };

    const closeDropdown = () => {
      isOpen.value = false;
      searchQuery.value = '';
    };

    const selectCountry = (country) => {
      emit('update:modelValue', country.code);
      emit('change', country);
      closeDropdown();
    };

    const focusFirstCountry = () => {
      // Focus first country in filtered list
      const firstButton = listRef.value?.querySelector('.country-item');
      if (firstButton) firstButton.focus();
    };

    // Click outside to close
    const handleClickOutside = (event) => {
      if (selectorRef.value && !selectorRef.value.contains(event.target)) {
        closeDropdown();
      }
    };

    // Watch isOpen to focus search input
    watch(isOpen, (open) => {
      if (open && props.enableSearch) {
        // Focus search input after dropdown opens
        setTimeout(() => {
          searchInputRef.value?.focus();
        }, 50);
      }
    });

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isOpen,
      searchQuery,
      selectorRef,
      searchInputRef,
      listRef,
      selectedCountry,
      filteredCountries,
      buttonStyle,
      dropdownStyle,
      toggleDropdown,
      closeDropdown,
      selectCountry,
      focusFirstCountry
    };
  }
};
</script>

<style scoped lang="scss">
.country-selector {
  position: relative;

  .selector-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px;
    border: none;
    border-radius: 6px 0 0 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    height: 100%;

    &:hover:not(.disabled) {
      background-color: #f3f4f6;
    }

    &.open {
      background-color: #f3f4f6;
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .flag {
      font-size: 18px;
      line-height: 1;
    }

    .dial-code {
      font-size: 13px;
      color: #6b7280;
    }

    .chevron {
      color: #9ca3af;
      transition: transform 0.2s ease;

      &.rotate {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    min-width: 280px;
    overflow: hidden;

    .search-container {
      position: relative;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;

      .search-icon {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        pointer-events: none;
      }

      .search-input {
        width: 100%;
        padding: 8px 12px 8px 32px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s ease;

        &:focus {
          border-color: #3b82f6;
        }

        &::placeholder {
          color: #9ca3af;
        }
      }
    }

    .country-list {
      max-height: calc(var(--max-height, 300px) - 60px);
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f9fafb;
      }

      &::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 3px;

        &:hover {
          background: #9ca3af;
        }
      }

      .country-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        border: none;
        background: white;
        cursor: pointer;
        transition: background-color 0.15s ease;
        text-align: left;
        font-size: 14px;

        &:hover {
          background-color: var(--hover-bg, #f3f4f6);
        }

        &.selected {
          background-color: #eff6ff;

          &:hover {
            background-color: #dbeafe;
          }
        }

        .flag {
          font-size: 20px;
          line-height: 1;
          flex-shrink: 0;
        }

        .name {
          flex: 1;
          color: #1f2937;
          font-weight: 500;
        }

        .dial-code {
          color: #6b7280;
          font-size: 13px;
          margin-right: 8px;
        }

        .check-icon {
          color: #3b82f6;
          flex-shrink: 0;
        }
      }

      .no-results {
        padding: 24px 16px;
        text-align: center;
        color: #9ca3af;
        font-size: 14px;
      }
    }
  }
}

// Dropdown transition
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
