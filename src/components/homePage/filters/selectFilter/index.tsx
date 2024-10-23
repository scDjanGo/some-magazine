

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { selectFilters } from "@/lib/redux/slices/filtersSlice/filterSlice"
import { setInitialItems } from "@/lib/redux/slices/itemsSlice/itemsSlice"



export default function SelectFilter() {
    const dispatch = useAppDispatch()
    const filter = useAppSelector(state => state.selectFilters.select)

    const arr = [
        {
            id: 1, title: "women’s clothing", select: "womens-clothing",
        },
        {
            id: 2, title: "men’s clothing", select: "mens-clothing",
        },
        {
            id: 3, title: "electronics", select: "electronics",
        },
        {
            id: 4, title: "jewelery", select: "jewelery",
        },
    ]



    const handleFliterSelect = (str: string) => {

        if (str !== filter) {
            dispatch(selectFilters(str))
            fetch(`https://fakestoreapi.com/products/category/${str}`)
                .then(res => res.json())
                .then(data => {
                    dispatch(setInitialItems(data))
                })
        }else {
            dispatch(selectFilters(''))
            fetch(`https://fakestoreapi.com/products?limit=9`)
                .then(res => res.json())
                .then(data => {
                    dispatch(setInitialItems(data))
                })
        }


    }




    return (
        <div className="flex flex-col gap-[32px] 695:gap-[12px]">
            <h3 className="text-[15px] font-[500]">Filters</h3>

            <div className="w-full flex flex-col gap-[16px] 695:gap-[6px] ">
                {arr.map((item) =>
                    <div onClick={() => handleFliterSelect(item.select)} key={item.id} className="flex items-center gap-[10px] cursor-pointer  w-[130px]">
                        <div className={`${filter === item.select && "bg-[#000000]"} w-[11px] h-[11px] min-w-[11px] border-[#808080] border-[1px] rounded-[3px]`} />

                        <h3 className="text-[14px] font-[400]">{item.title}</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
