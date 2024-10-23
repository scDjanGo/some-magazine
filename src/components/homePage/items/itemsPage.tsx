import { Suspense, lazy } from "react"



const Items = lazy(() => import("./index"))


import Loading from "@/components/UI/Loading"

export default function ItemsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Items />
    </Suspense>
  )
}
