import Link from "next/link"

export default function Navbar() {
    return (
        <div className="py-[15px] px-[170px] m-[12px_0_21px] border-[#E2E8F0] border-y-[1px] 995:px-[30px] 695:gap-[15px]">

            <div className="flex items-center gap-[32px] 695:gap-[24px]">
                <Link href={"/"} className="mplus text-[14px] font-[400]">Main page</Link>
                <Link href={"#"} className="mplus text-[14px] font-[400]">Delivery</Link>
                <Link href={"#"} className="mplus text-[14px] font-[400]">Contact</Link>
                <Link href={"#"} className="mplus text-[14px] font-[400]">Blog</Link>
            </div>


        </div>
    )
}

