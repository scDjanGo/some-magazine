"use client"

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchItemsSlice, setInitialItems } from "@/lib/redux/slices/itemsSlice/itemsSlice";
import { Item } from "@/lib/redux/types/types";
import Loading from "@/components/UI/Loading";
import Cards from "../cards";

const ItemsPage = () => {
    const dispatch = useAppDispatch();
    const { value, status, error } = useAppSelector((state) => state.items);
    const filter = useAppSelector(state => state.selectFilters.select)
    const price = useAppSelector(state => state.priceFilter.select)

    const [count, setCount] = useState(6);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!filter) {
            const fetchInitialItems = async () => {
                try {
                    const response = await fetch('https://fakestoreapi.com/products?limit=6');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const initialItems: Item[] = await response.json();
                    dispatch(setInitialItems(initialItems));
                } catch (error) {
                    console.error("Error fetching initial items:", error);
                }
            };

            fetchInitialItems();
        }
    }, [dispatch]);

    const loadMoreItems = async () => {
        setIsFetching(true);
        try {
            const response = await fetch(`https://fakestoreapi.com/products?limit=${count}`);
            const newItems = await response.json();
            if (newItems && value) {
                dispatch(setInitialItems([...newItems]));
                setCount(prev => prev + 6);
            }
        } catch (error) {
            console.error("Error fetching more items:", error);
        } finally {
            setIsFetching(false);
        }
    };


    useEffect(() => {


        if (!filter && value && value.length < 20) {
            const handleScroll = () => {
                if (
                    window.innerHeight + document.documentElement.scrollTop >=
                    document.documentElement.offsetHeight - 250
                ) {
                    if (!isFetching && status !== "loading") {
                        loadMoreItems();
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isFetching, status, filter, price]);


    return (
        <div>
            {status === "loading" && <Loading />}
            {status === "failed" && (
                <p className="text-center text-[14px] font-[500] border-[#333333] border-b-[1px] pb-[12px]">
                    Error: {error}
                </p>
            )}
            {status === "succeeded" && (
                value && value.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(235px,_1fr))] mt-[28px]">
                        {value.map((item, index) => (
                            <Cards key={index} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <h3 className="text-[24px] font-[700]">Empty</h3>
                    </div>
                )
            )}
            {isFetching && <Loading />}
        </div>
    );
};

export default ItemsPage;
