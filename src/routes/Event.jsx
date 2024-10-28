import { useLoaderData } from "react-router-dom";
import EventDisplay from "../components/EventDisplay";

export async function loader({ params }) {
    const response = await fetch(`http://localhost:8000/api/events/${params.eventName}`);
    const event = await response.json();

    const secondResponse = await fetch(`http://localhost:8000/api/categories`);
    const categories = await secondResponse.json();

    return [{ event }, { categories }];
}

export default function Event() {
    const [{ event }, { categories }] = useLoaderData();

    return (
        <>
            <EventDisplay event={{event}} categories={{categories}}/>
        </>
    );
}