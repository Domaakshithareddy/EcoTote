import React, {useEffect,useState} from "react";
import {fetchJSON} from "../utils/fetchJSON";

const FunFactPopup=()=>{
    const [fact,setFact]=useState('');

    useEffect(()=>{
        fetchJSON('funFacts.json').then((facts)=>{
            const random=facts[Math.floor(Math.random()*facts.length)];
            setFact(random);
        });
    },[]);

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 p-3 shadow-lg rounded-md max-w-xs">
            <p className="text-sm text-gray-800">Did you know?</p>
            <p className="text-xs text-gray-700 mt-1">{fact}</p>
        </div>
    );
};

export default FunFactPopup;