

import Image from "next/image"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { priceFilter } from "@/lib/redux/slices/priceFilter/priceFilterSlice"
import { setInitialItems } from "@/lib/redux/slices/itemsSlice/itemsSlice"

export default function PriceFilter() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.selectFilters.select)

  const arr = [
    { id: 1, title: "cheap", req: "asc" },
    { id: 2, title: "expensive", req: "desc" },
  ]


  useEffect(() => {
    dispatch(priceFilter("true"));
    return () => {
      dispatch(priceFilter(""));
    };
  }, [dispatch]);




  const handleSelectPrice = (e: string) => {
    if (filter) {
      fetch(`https://fakestoreapi.com/products/category/${filter}?&sort=${e}`)
        .then(res => res.json())
        .then(data => {
          dispatch(setInitialItems(data))

        })
        .catch(err => console.error(err))

    } else {
      fetch(`https://fakestoreapi.com/products?sort=${e}`)
        .then(res => res.json())
        .then(data => {
          dispatch(setInitialItems(data))

        })
        .catch(err => console.error(err))
    }

  }





  return (
    <div className="flex flex-col gap-[28px] 695:gap-[12px]">
      <div className="flex items-center gap-[10px]">
        <p className="text-[14px] font-[400]">Main</p> <Image priority width={6} height={3} src={"/svg/arrow-black.svg"} alt="/" />
        <p className="text-[14px] font-[700]">Catalog</p>
      </div>


      <h4 className="text-[20px] font-[500]">Catalog</h4>


      <div className="flex items-center gap-[5px] relative group w-[55px]">
        <p className="text-[14px] font-[400] cursor-pointer">Price</p>
        <Image priority className="rotate-[-90deg] transition-all duration-300 cursor-pointer group-hover:rotate-[90deg]" width={6} height={3} src={"/svg/arrow-black.svg"} alt="/" />

        <div className="flex flex-col gap-[5px] transition-all duration-200 scale-0 group-hover:scale-100 p-[8px_0] absolute bottom-[-65px] z-[1] left-0 border-[1px] rounded-[4px] bg-white shadow-lg">
          {arr.map(item =>
            <p onClick={() => handleSelectPrice(item.req)} key={item.id} className="text-[14px] font-[400] cursor-pointer hover:bg-[#E2E8F0] px-[3px]">{item.title}</p>
          )}
        </div>
      </div>

    </div>
  )
}
