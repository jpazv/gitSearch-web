import React, { useState } from "react";


const Search = ({ onSearch, onClear }) => {

        const [query, setQuery] =useState('');

        const handleClear = () => {
            setQuery('');
            onSearch('');
        }
    
    return (
        <div className="search">
        <label htmlFor="query">Search for repository:</label>
        <input 
        type="text" 
        name="query" 
        id="query" 
        value={query}
        onChange={(e) => setQuery(e.target.value) }/>
        <button onClick={handleClear}>Clear</button>
        <button onClick={()=> onSearch(query)}>Search</button>
    </div>
    )
}

export default Search;