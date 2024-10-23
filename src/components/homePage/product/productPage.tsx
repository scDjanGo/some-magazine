"use client"

import { useParams } from "next/navigation"
import { useState, useLayoutEffect } from "react"
import Link from "next/link"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchProductId } from "@/lib/redux/slices/productSlice/productSlice"

import Image from "next/image"
import Loading from "@/components/UI/Loading"
import Product from "@/components/homePage/product"

export default function ProductPage() {
    const dispatch = useAppDispatch()
    const { product } = useParams()
    const currentProduct = useAppSelector(state => state.product.value)
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        if (!product) return;

        if (currentProduct && currentProduct.id === +product) {
            setLoading(false);
            return;
        }

        setLoading(true);
        dispatch(fetchProductId(product as string)).unwrap()
            .finally(() => setLoading(false))
    }, [dispatch, product, currentProduct]);
    

    return (
        <div className="p-[64px_170px_100px] 995:p-[32px_30px_100px]">
            <div className="flex items-center gap-[10px]">
                <Link href={"/"} className="text-[14px] font-[400]">Main</Link>
                <Image priority width={6} height={3} src={"/svg/arrow-black.svg"} alt="/" />
                <p className="text-[14px] font-[400]">Catalog</p>
                <Image priority width={6} height={3} src={"/svg/arrow-black.svg"} alt="/" />
                {currentProduct && <p className="text-[14px] font-[700]">{currentProduct.title}</p>}
            </div>

            {loading ? <Loading /> : currentProduct && <Product currentProduct={currentProduct} />}
        </div>
    )
}
