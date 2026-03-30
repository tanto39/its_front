import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ItsRange } from "../components/UI/Its/itsRange";

interface UseItsProps {
  its_val?: number;
}

export const useIts = ({ its_val }: UseItsProps) => {
  // Получаем контекст формы, если он есть
  const formContext = useFormContext();

  // Актуальное значение: из контекста (watch) или из пропса
  const currentItsVal = formContext ? formContext.watch("its") : its_val;

  // Приводим к числу (watch может вернуть строку)
  const numericItsVal = typeof currentItsVal === "string" ? parseFloat(currentItsVal) : currentItsVal;

  // Определяем элемент диапазона по актуальному значению
  const range = useMemo(
    () => ItsRange.find((item) => numericItsVal >= item.its_min && numericItsVal <= item.its_max),
    [numericItsVal],
  );

  const itsColorClass = range?.its_color_class;
  const itsDescr = range?.its_descr ?? "";

  return {
    its_val,
    itsColorClass,
    itsDescr,
  };
};
