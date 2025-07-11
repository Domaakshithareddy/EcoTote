import React,{useEffect,useState} from "react";
import fetchJSON from "../utils/fetchJSON";

const QuickSwapSuggestions=({cart})=>{
    const [swaps,setSwaps]=useState([]);

    useEffect(()=>{
        fetchJSON("wasteSwapSuggestions.json").then((data)=>{
            const matching=cart.map((item)=>
                data.find((swap)=>swap.productId===item.productId)
            ).filter(Boolean);
            setSwaps(matching);
        });
    },[cart]);

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold text-green-700"></h2>
            {swaps.map((swap,idx)=>(
                <div key={idx} className="p-3 bg-white rounded-md border shadow-sm">
                    <p><strong>Try:</strong>{swap.alternative}</p>
                    <p className="text-sm text-gray-600">{swap.benefit}</p>
                </div>
            ))}
        </div>
    );
};

export default QuickSwapSuggestions;