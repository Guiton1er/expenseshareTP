export default function EventDisplay({ event }) {

    let expenses = [];

    event.event.expenses.map((expense) => {
        expenses.push(
        <div key={expense.id} className="flex flex-col mx-2 p-2 gap-1 bg-slate-100 rounded-lg">
            <h2 className="text-xl">{expense.title}</h2>
            <p>Dépense : {expense.amount}€</p>
            {expense.paid ? <p className="bg-emerald-800 text-white p-1 rounded-lg text-center">Payé</p> : <p className="bg-red-800 text-white p-1 rounded-lg text-center">Non payé</p>}
            <p>Pris en charge par {expense.person.firstName} {expense.person.lastName}</p>
        </div>
        );
    });

    let persons = [];

    event.event.persons.map((person) => {
        persons.push(
        <li key={person.id} className="bg-slate-100 border rounded-lg p-2 text-2xl mt-2">
            {person.firstName} {person.lastName}
        </li>
        );
    });

    const personTest = {
        firstName: 'Gaël',
        lastName: 'BAHIER',
        expenses: [],
        event: "/api/events/voyage-en-islande",
    }

    // Appel de la fonction fetch avec toutes les informations nécessaires
    function addPerson(person) {
        const newPeople = fetch("http://localhost:8000/api/people", {
            method: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: JSON.stringify(person)
        });
    }

    return (
        <>
            <article className='flex flex-col border rounded-lg p-4 m-4 justify-center max-w-5xl mx-auto'>
                <h1 className="text-3xl mx-auto">{event.event.name}</h1>
                <h2 className="mx-2">Liste des Participants</h2>
                <ul className="flex flex-col mx-2 mb-1">
                    {persons}
                </ul>
                <h2 className="mx-2 mb-1">Liste des Dépenses</h2>
                <div className="flex flex-row">
                    {expenses}
                </div>
            </article>
            <form action="POST" className="flex flex-row border rounded-lg p-4 justify-left gap-4 max-w-5xl mx-auto">
                <h3 className="mb-2">Ajouter une personne au groupe :</h3>
                <input type="text" placeholder="Prénom" className="border p-1 rounded-lg text-center"/>
                <input type="text" placeholder="Nom" className="border p-1 rounded-lg text-center"/>
                <button type="submit" className="border p-1 px-4 bg-emerald-800 text-white rounded-lg text-center">Ajouter</button>
            </form>
        </>
    )
}