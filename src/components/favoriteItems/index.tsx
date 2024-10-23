


import { Item } from "@/lib/redux/types/types";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/UI/favoriteButton";
import { setFavorite, removeFavorite } from "@/lib/redux/slices/favorite/favorite";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function FavoriteItems({item, favorite} : {item : Item, favorite: number[]}) {
    const dispatch = useAppDispatch()
  return (
    <div key={item.id} className="flex items-center justify-between gap-[15px] 695:flex-col">
        <div className="flex items-center gap-[15px_50px] 595:flex-col">
            <Image width={134} height={178} src={item.image || "#"} alt="image" />
            <div className=" max-w-[255px]">
                <p className="text-[14px] font-[400]">{item.category}</p>
                <Link href={`/${item.id}`} className="font-[900] text-[20px] border-b-[1px] border-[#ffffff] hover:border-[#333333]">{item.title}</Link>
            </div>
        </div>

        <div className="flex items-center gap-[24px]">
            <p className="font-[900] text-[20px]">{item.price} $</p>
            {favorite.some((i) => i == item.id) ?

                <p className="text-[#707070] text-[14px] font-[400] cursor-pointer" onClick={() => {
                    if (!favorite.some((i) => i == item.id)) {
                        dispatch(setFavorite(item.id))
                    } else {
                        dispatch(removeFavorite(item.id))
                    }
                }}>Remove</p>

                :
                <FavoriteButton className="min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px]" favorite={favorite.some((i) => i == item.id)}
                    onClick={() => {
                        if (!favorite.some((i) => i == item.id)) {
                            dispatch(setFavorite(item.id))
                        } else {
                            dispatch(removeFavorite(item.id))
                        }
                    }}>
                    <Image className="cursor-pointer hover:bg-[#FFC700] transition-all duration-200 mt-[2px] p-[2px] rounded-[4px]" width={25} height={25} src={"/svg/favorite.svg"} alt="logo" />
                </FavoriteButton>
            }
        </div>
    </div>
  )
}
