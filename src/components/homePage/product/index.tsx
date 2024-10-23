
import { Item } from "@/lib/redux/types/types"
import Image from "next/image"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"

import { setFavorite, removeFavorite } from "@/lib/redux/slices/favorite/favorite"
import FavoriteButton from "@/components/UI/favoriteButton"

export default function Product({currentProduct} : {currentProduct : Item | null}) {
    const dispatch = useAppDispatch()
    const favorite = useAppSelector(state => state.favorite)
  return (

    currentProduct ?

        <div className="flex items-start gap-[25px_42px] mt-[28px] 695:flex-col 695:items-center">
            <Image width={195} height={260} src={currentProduct.image || ""} alt="item" />




            <div className="flex flex-col gap-[40px] w-full">

                <div className="w-full flex items-start justify-between gap-[15px] pb-[15px] border-b-[1px] border-[#E2E8F0] 495:flex-col 495:items-center">
                    <div className="flex flex-col gap-[6px]">
                        <p className="text-[20px] font-[900] max-w-[250px]">{currentProduct.title}</p>
                        <div className="flex items-center gap-[6px]">
                            <div className="flex items-center gap-[4px] w-[60px]">
                                {[1, 2, 3, 4, 5].map(item =>
                                    <Image
                                        key={item}
                                        width={9}
                                        height={10}
                                        src={currentProduct.rating.rate >= item ? "/svg/yellow-star.svg" : "/svg/grey-star.svg"}
                                        alt="*"
                                    />
                                )}
                            </div>
                            <p className="text-[14px] font-[400]">({currentProduct.rating.count} rated)</p>
                        </div>
                    </div>


                    <FavoriteButton className="cursor-pointer min-w-[170px] max-w-[170px] min-h-[25px] p-[9px_17px_9px_22px] rounded-[4px] border-[1px] border-[#E2E8F0] flex items-center justify-between gap-[13px]" favorite={favorite.data.some((i) => i == currentProduct.id)} onClick={() => {
                        if (!favorite.data.some((i) => i == currentProduct.id)) {
                            dispatch(setFavorite(currentProduct.id))
                        } else {
                            dispatch(removeFavorite(currentProduct.id))
                        }
                    }}>


                        {favorite.data.some((i) => i == currentProduct.id) ?

                            <button className="w-full flex items-center justify-center text-[#ffffff] text-[14px] font-[600]">
                                Remove
                            </button>
                            :

                            <>
                                <p className="text-[14px] font-[400]">Add to favourite</p>

                                <Image width={19} height={19} src={"/svg/favorite.svg"} alt="logo" />
                            </>
                        }
                    </FavoriteButton>

                </div>



                <div className="flex gap-[35px_70px] items-start 495:flex-col">
                    <div className="flex flex-col gap-[25px]">
                        <h4 className="text-[14px] font-[900]">Description</h4>
                        <p className="text-[14px] font-[400]">{currentProduct.description}</p>
                    </div>

                    <div className="flex flex-col justify-end items-end gap-[15px]">
                        <p className="font-[900] text-[20px]">{currentProduct.price} $</p>
                        <button className="bg-[#FFC700] text-[#ffffff] text-[16px] font-[500] p-[8px_25px] rounded-[4px]">Купить</button>
                    </div>
                </div>

            </div>

        </div>

        :

        <div>
            <p className={`flex items-center justify-center text-[32px] text-center font-[700]`}>Error: 404</p>
        </div>
  )
}
