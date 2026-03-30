import React, { useState, useRef, useEffect, useMemo, KeyboardEvent } from "react";
import { SelectOption } from "../types/forms";

interface UseSelectProps {
  options: SelectOption[] | string[];
  value?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
}

export const useSelect = ({ options, value, onChange, disabled = false }: UseSelectProps) => {
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

  return {
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
  };
};
