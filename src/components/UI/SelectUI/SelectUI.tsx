import React, { useState, useRef, useEffect, useMemo, KeyboardEvent } from "react";
import { SelectOption } from "../../../types/forms";
import styles from "./SelectUI.module.css";

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);

  // Нормализация опций в единый формат
  const normalizedOptions = useMemo(() => {
    if (options.length === 0) return [];

    return options.map((option) => {
      if (typeof option === "string") {
        return { value: option, label: option };
      }
      return option;
    });
  }, [options]);

  // Получение выбранной опции
  const selectedOption = useMemo(() => {
    return normalizedOptions.find((option) => option.value === value) || null;
  }, [normalizedOptions, value]);

  // Фильтрация опций по поисковому запросу
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return normalizedOptions;

    const term = searchTerm.toLowerCase();
    return normalizedOptions.filter((option) => option.label.toLowerCase().includes(term));
  }, [normalizedOptions, searchTerm]);

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Фокус на поле поиска при открытии
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Прокрутка к выделенному элементу
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsListRef.current) {
      const items = optionsListRef.current.querySelectorAll("li");
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelectClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;

      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;

      case "Tab":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
    }
  };

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
