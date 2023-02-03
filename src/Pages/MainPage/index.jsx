import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "./styles.css";

import { createRepository, getRepositories } from "../../services/api";
import Nav from "./Nav";
import Repositories from "./Repositories";
import Search from "./Search";


const MainPage = () => {
    
    const user = useContext(AuthContext)
    
    const [repositories, setRepositories] = useState([]);


    const [loading , setLoading] = useState(true);


    const [loadingError, setLoadingError] = useState(false);

    const loadData = async(query = '') => {

        try{
            const response = await getRepositories(user?.id, query);

            console.log(response.data);

            setLoading(false)
    
            setRepositories(response.data);
            
        }catch(err){
            console.error(err);
            setLoadingError(true);
        }
    }

    useEffect(()=>{

        (async () => await loadData())();

    }
    ,[]);

    const handleLogout = () => {

    };

    const handleSearch = (query) => {
        loadData(query)
    };

    const handleNewRepo = async (url) => {
        console.log('new repo', url);
        
        try{
            await createRepository(user?.id, url);
            await loadData();
        }catch(err){
            console.error(err);
            setLoadingError(true);
        }
    }


    const handleDeleteRepo = (repository) => {
        console.log('repositorio deletado', repository);
    };

    if(loadingError){
        return(
            <div className="loading">
                Fail to load <Link to="/login"> Voltar </Link>
            </div>
        )
    }

    if(loading){
        return(
            <div className="loading">
                Loading...
            </div>
        )
    }


    return (
        <div id="main">
           <Nav onLogout={handleLogout}/>

           <Search onSearch={handleSearch}/>

           <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleNewRepo} />

            
        </div>

    )
};


export default MainPage;