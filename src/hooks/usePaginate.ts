import { useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../constants';

interface UsePaginateResult<T> {
  paginatedData: T[];
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

export function usePaginate<T>(data: T[]): UsePaginateResult<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  // Читаем текущую страницу из URL
  const pageParam = searchParams.get('page');
  let currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
  // Корректируем страницу, если она выходит за границы
  if (currentPage > totalPages) currentPage = totalPages;

  // Вычисляем отображаемые элементы
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  // Функция перехода на страницу (обновляет URL)
  const goToPage = useCallback((page: number) => {
    let targetPage = page;
    if (targetPage < 1) targetPage = 1;
    if (targetPage > totalPages) targetPage = totalPages;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', targetPage.toString());
    setSearchParams(newParams);
  }, [searchParams, setSearchParams, totalPages]);

  // Сбрасываем страницу при изменении исходного массива (фильтры, сортировка)
  const prevDataRef = useRef(data);
  useEffect(() => {
    if (data !== prevDataRef.current) {
      prevDataRef.current = data;
      if (currentPage !== 1) goToPage(1);
    }
  }, [data, goToPage, currentPage]);

  return { paginatedData, totalPages, currentPage, goToPage };
}