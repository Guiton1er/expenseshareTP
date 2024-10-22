import { useLoaderData } from "react-router-dom";
import EventDisplay from "../components/EventDisplay";

export async function loader({ params }) {
    const response = await fetch(`http://localhost:8000/api/events/${params.eventName}`);
    const event = await response.json();
    return { event };
}

export default function Event() {
    const { event } = useLoaderData();
    console.log({event});

    return (
        <>
            <EventDisplay event={{event}}/>
        </>
    );
}