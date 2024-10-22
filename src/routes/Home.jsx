import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    /*
    useEffect(() => {
      fetch('https://localhost:8000/api/events')
        .then(response => response.json())
        .then(data => {
            setEvents(data);
        })
    }, []);
    */
    
    //navigate('http://localhost:5173/event/voyage-en-islande');

    return (
        <>
            <SearchForm navigate={navigate} search={search} onSearch={formData => setSearch(formData)}/>
        </>
    );
}