import React from "react";
import { SelectOption } from "../../../types/forms";
import styles from "./SelectUI.module.css";
import { useSelect } from "../../../hooks/useSelect";

interface SelectUIProps {
  options: SelectOption[] | string[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  noOptionsMessage?: string;
  searchPlaceholder?: string;
  label?: string;
}

const SelectUI: React.FC<SelectUIProps> = ({
  options,
  value,
  onChange,
  placeholder = "Выберите значение",
  disabled = false,
  className = "",
  noOptionsMessage = "Совпадений не найдено",
  searchPlaceholder = "Поиск...",
  label,
}) => {
  const {
    isOpen,
    selectedOption,
    handleSelectClick,
    handleOptionClick,
    handleSearchChange,
    handleKeyDown,
    searchInputRef,
    wrapperRef,
    searchTerm,
    optionsListRef,
    filteredOptions,
    highlightedIndex,
    normalizedOptions,
  } = useSelect({ options, value, onChange, disabled, className });

  // Комбинируем внешние и внутренние классы
  const containerClass = `${styles.container} ${disabled ? styles.disabled : ""} ${className}`;
  const selectHeaderClass = `${styles.selectHeader} ${isOpen ? styles.open : ""}`;

  return (
    <div className={styles.selectWrap}>
      {label && <label className={styles["label"]}>{label}</label>}
      <div ref={wrapperRef} className={containerClass} onKeyDown={handleKeyDown} tabIndex={disabled ? -1 : 0}>
        <div
          className={selectHeaderClass}
          onClick={handleSelectClick}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={placeholder}
        >
          <span className={`${styles.selectedValue} ${!selectedOption ? styles.placeholder : ""}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={styles.dropdownArrow}></span>
        </div>

        {isOpen && (
          <div className={styles.dropdownContainer}>
            <div className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Поиск в списке"
              />
            </div>

            <ul ref={optionsListRef} className={styles.optionsList} role="listbox" aria-label="Опции выбора">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    className={`${styles.optionItem} ${value === option.value ? styles.selected : ""} ${
                      index === highlightedIndex ? styles.highlighted : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={value === option.value}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className={styles.noOptions}>{noOptionsMessage}</li>
              )}
            </ul>

            {filteredOptions.length > 0 && (
              <div className={styles.dropdownInfo}>
                Найдено: {filteredOptions.length} из {normalizedOptions.length}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectUI;
