import { lazy, Suspense } from "react"


import Loading from "@/components/UI/Loading"


const ProductPage = lazy(() => import("@/components/homePage/product/productPage"))




export default function Page() {
    

    return (
        <Suspense fallback={<Loading />}>
            <ProductPage />
        </Suspense>
    )
}
