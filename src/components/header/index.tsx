"use client"


import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/lib/redux/hooks";


import SearchInput from "./searchInput";



export default function Header() {
    const favorite = useAppSelector(state => state.favorite.data)
    return (
        <div className=" flex items-end justify-between gap-[15px] mt-[12px] px-[170px] 995:px-[30px] 595:flex-col 595:items-start  695:grid 695:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">

            <div className="relative max-w-[116px]">
                <Image width={116} height={40} src={"/svg/gushop-logo.svg"} alt="logo" />
                <p className="saira text-[13px] font-[500] absolute top-[-5px] right-0 995:text-[11px]">clothes store</p>
            </div>

            <SearchInput />


            <Link href={"/favorite"} className="flex flex-col justify-center items-center gap-[1px] group cursor-pointer 695:absolute 695:z-[1] 695:right-[30px] 695:top-[12px] ">
                <Image priority className="group:hover:bg-[#FFC700] transition-all duration-200" width={19} height={19} src={"/svg/favorite.svg"} alt="logo" />
                <p className="text-[14px] font-[400] text-[#000000]">Favourite</p>
                <div></div>
                {favorite.length > 0 &&
                    <div className="relative translate-x-[15px] translate-y-[-48px]">
                        <div className="w-[10px] h-[10px] absolute top-0 right-0 z-[101] bg-[#FFC700] rounded-[50%] flex items-center justify-center">
                            <p className="text-[#ffffff] text-[8px] font-[200]">{favorite.length}</p>
                        </div>
                    </div>

                }
            </Link>

        </div>
    )
}
