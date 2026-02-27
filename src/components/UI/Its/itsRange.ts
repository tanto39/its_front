export interface IItsRange {
  its_min: number;
  its_max: number;
  its_color_class: string;
  its_descr: string;
}

export const ItsRange: IItsRange[] = [
  {
    its_min: 0,
    its_max: 29,
    its_color_class: 'its_red',
    its_descr: 'Отказ'
  },
  {
    its_min: 30,
    its_max: 69,
    its_color_class: 'its_yellow',
    its_descr: 'Требуется ТО'
  },
  {
    its_min: 70,
    its_max: 100,
    its_color_class: 'its_green',
    its_descr: 'Исправен'
  },
] 