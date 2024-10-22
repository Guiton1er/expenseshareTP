import { useNavigate } from "react-router-dom";

export default function SearchForm({ navigate, search, onSearch }) {

    function handleChange(event) {
        onSearch(event.target.value);
        console.log(search);
    }

    function handleSubmit() {
        event.preventDefault();
        navigate('/event/'+search);
    }

    return (
        <form className="flex justify-center gap-4 my-4" onSubmit={handleSubmit}>
            <input type="text" name="event" onChange={handleChange} placeholder="Type an event name" className="p-2 border border-gray-200 rounded-lg"/>
            <button type="submit">Rechercher</button>
        </form>
    );
}