import { useState, useEffect } from "react";
import MyInput from "../UI/input";
import Image from "next/image";
import { useAppSelector } from '@/lib/redux/hooks';

export default function SearchInput() {
    const filter = useAppSelector(state => state.selectFilters.select);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (search !== "") {
            const clear = setTimeout(() => {
                    const url = `https://hadzhi2003.pythonanywhere.com/api/v1/product/?search=${search}`;

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.results);
                    })
                    .catch(err => console.log(err));
            }, 300);

            return () => clearTimeout(clear);
        }
    }, [search, filter])

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div style={{ maxWidth: "428px" }} className="flex items-center justify-between p-[18px_22px_19px_25px] border-[#E2E8F0] border-[1px] rounded-[8px] max-w-[428px] w-full 995:max-w-[330px]">
            <MyInput 
                value={search} 
                onChange={handleSearchInput} 
                className="border-none" 
                placeholder="Search" 
                type="text" 
            />
            <Image priority className="cursor-pointer" width={19} height={19} src="/svg/search.svg" alt="logo" />
        </div>
    );
}
