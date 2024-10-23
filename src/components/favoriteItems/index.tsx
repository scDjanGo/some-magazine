


import { Item } from "@/lib/redux/types/types";
import Image from "next/image";
import Link from "next/link";
import { setFavorite, removeFavorite } from "@/lib/redux/slices/favorite/favorite";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function FavoriteItems({ item, favorite }: { item: Item, favorite: number[] }) {

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
                <p className="text-[#707070] text-[14px] font-[400] cursor-pointer" onClick={() => {
                    if (!favorite.some((i) => i == item.id)) {
                        dispatch(setFavorite(item.id))
                    } else {
                        dispatch(removeFavorite(item.id))
                    }
                }}>Remove</p>
            </div>
        </div>
    )
}
