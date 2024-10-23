"use client"


import { useAppSelector } from "@/lib/redux/hooks"

import SelectFilter from "./filters/selectFilter"
import PriceFilter from "./filters/priceFilter"

import Loading from "../UI/Loading"
import ItemsPage from "./items/itemsPage"



export default function HomePage() {
    const loading = useAppSelector(state => state.loading.status)


    return (
        <div className="flex gap-[89px] 995:gap-[50px] px-[170px] 995:px-[30px] 695:flex-col">


            <div className="flex gap-[12px] justify-between">
                <SelectFilter />
                <div className="hidden 695:block 695:pt-[34px]">
                    <PriceFilter />
                </div>
            </div>





            <div className="w-full flex flex-col">
                <div className="695:hidden">
                    <PriceFilter />
                </div>
                {loading ?

                    <ItemsPage />
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}
