import { Stat } from '../type'
interface ILayoutPopupDetail {
    arrStat: Stat[]
}
const LayoutPopupDetail = ({ arrStat }: ILayoutPopupDetail) => {
  return (
    <>
      <div>
        <div className="px-4 sm:px-0 mt-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Item Information</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {arrStat ? arrStat.map((arr: Stat, index: number) => {
              return (
                <div key={index} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">{arr.name}</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{arr.value}</dd>
                </div>
              )
            }) : ''}
          </dl>
        </div>
      </div>
    </>
  )
}

export default LayoutPopupDetail