"use client"

import Image from "next/image"
import Link from "next/link"
import { Item } from "@/lib/redux/types/types"
import FavoriteButton from "@/components/UI/favoriteButton"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setFavorite, removeFavorite, getFavorite } from "@/lib/redux/slices/favorite/favorite"
import { useEffect } from "react"





export default function Cards({ item }: { item: Item }) {
  const dispatch = useAppDispatch()
  const favorite = useAppSelector(state => state.favorite)

  useEffect(() => {
    dispatch(getFavorite())
  }, [dispatch])

  
  return (



    <div className="flex flex-col justify-between items-center gap-[40px] border-[1px] border-[#E2E8F0] p-[10px_20px_13px_22px]">
      <div className="flex items-start gap-[10px] justify-between w-full">
        <div>
          <p className="text-[14px] font-[400] text-[#818181]">{item.category}</p>
          <Link href={item.id ? `/${item.id}` : "#"} className="text-[14px] font-[500] transition-all duration-600 hover:font-[600]">{item.title}</Link>
        </div>
        <FavoriteButton className="min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px] p-[2px] rounded-[4px]" favorite={favorite.data.some((i) => i == item.id)} onClick={() => {
                    if (!favorite.data.some((i) => i == item.id)) {
                        dispatch(setFavorite(item.id))
                    } else {
                        dispatch(removeFavorite(item.id))
                    }
                }}>
          <Image className="cursor-pointer" width={19} height={19} src={"/svg/favorite.svg"} alt="logo" />
        </FavoriteButton>
      </div>


      <Image className="" width={156} height={225} src={item.image || ""} alt="item" />

      <p className="w-full text-[24px] font-[900] mt-[10px]">{item.price} $</p>

    </div>
  )
}
