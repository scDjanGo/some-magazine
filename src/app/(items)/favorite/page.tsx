'use client'

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { getFavorite } from "@/lib/redux/slices/favorite/favorite";
import { setInitialItems } from "@/lib/redux/slices/itemsSlice/itemsSlice";
import { setFavoriteItems as setReduxFavoriteItems } from "@/lib/redux/slices/favoriteItems/favoriteitemsSlice";
import { Item } from "@/lib/redux/types/types";
import Loading from "@/components/UI/Loading";
import Image from "next/image";
import Link from "next/link";

import FavoriteItems from "@/components/favoriteItems";


export default function Page() {
    const dispatch = useAppDispatch();
    const favorite = useAppSelector((state) => state.favorite);
    const items = useAppSelector((state) => state.items.value);
    const favoriteItems = useAppSelector(state => state.favoriteItems.value);

    useEffect(() => {
        if ((favoriteItems && favoriteItems.length) !== favorite.data.length) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products`);
                    const newItems = await response.json();
                    dispatch(setInitialItems([...newItems]));
                } catch (error) {
                    console.error("Error fetching more items:", error);
                }
            };
            dispatch(getFavorite());
            fetchData();
        }
    }, [dispatch]);

    useEffect(() => {
        if ((favoriteItems && favoriteItems.length) !== favorite.data.length) {
            if (items) {
                const res: Item[] = items.filter(item => favorite.data.includes(item.id));
                dispatch(setReduxFavoriteItems(res));
            }
        }
    }, [items, dispatch, favorite]);



    return (
        <div>
            <div className="border-b-[1px] border-[#E2E8F0] p-[64px_170px_5px] 995:text-[32px] 995:p-[12px_30px_5px]">
                <h3 className="text-[32px] font-[400]">Favourite</h3>
            </div>



            {favoriteItems ?

                favoriteItems.length > 0 ?
                    <div className="p-[0_170px] 995:p-[0_30px]">
                        <h4 className="text-[24px] font-[400] mt-[40px]">{favoriteItems.length} items</h4>

                        <div className="flex flex-col gap-[50px_15px] mt-[35px]">
                            {favoriteItems.map(item =>

                            <FavoriteItems key={item.id} item={item} favorite={favorite.data} />
                            
                            )}
                        </div>
                    </div>

                    :
                    <div className=" flex items-center justify-center gap-[15px] mt-[50px]">

                        <Link href={"/"}>
                            <Image className="cursor-pointer transition-all duration-200 p-[4px] rounded-[8px] hover:bg-[#FFC700]" width={50} height={50} src={"/svg/back.svg"} alt="back" /></Link>
                        <p className="text-[24px] font-[400]">Empty</p>
                    </div>
                :
                <Loading />
            }
        </div>
    );
}