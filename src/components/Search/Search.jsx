import React, { useEffect, useState } from "react";
export default function Search() {
    const [search, setSearch] = useState('')

    return (
        <div>
            <h3 className="title">Search</h3>
                <input 
                    type="text" 
                    placeholder="Search name" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
            />
           
        </div>
    )}