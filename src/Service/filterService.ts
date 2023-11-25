import { INFT } from '../Components/type';
let by: string
export function setSelection(value: string) {
  by = value
}
export function getSelection() {
  return by
}

export function filterService(value: string, list: INFT[]) {
  if (value) {
    const changePriceToNumber = (price: number) => {
      return Number(price.toString().slice(0, price.toString().length - 4))
    }
    switch (value) {
    case 'price-high':
      list = list.sort((a, b) => changePriceToNumber(b.price) - changePriceToNumber(a.price));
      break;
    case 'price-low':
      list = list.sort((a, b) => changePriceToNumber(a.price) - changePriceToNumber(b.price));
      break;
    case 'by-atk':
      list = list.sort((a, b) => Number(b.atk) - Number(a.atk));
      break;
    case 'by-hp':
      list = list.sort((a, b) => Number(b.hp) - Number(a.hp));
      break;
    case 'by-crit':
      list = list.sort((a, b) => Number(b.crit) - Number(a.crit));
      break;
    case 'by-critdame':
      list = list.sort((a, b) => Number(b.critdame) - Number(a.critdame));
      break;
    case 'by-stat':
      list = list.sort((a, b) => Number(b.stat) - Number(a.stat));
      break;
    default:
      break;
    }
    return list;
  }
}
