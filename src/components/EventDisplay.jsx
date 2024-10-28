import { useState } from "react";

export default function EventDisplay({ event: currentEvent , categories}) {
    const [person, setPerson] = useState({
        firstName: '', 
        lastName: '',
        expenses: [],
        event: '/api/events/'+currentEvent.event.slug,
    });

    let expenses = [];

    currentEvent.event.expenses.map((expense) => {
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

    currentEvent.event.persons.map((person) => {
        persons.push(
        <li key={person.id} className="bg-slate-100 border rounded-lg p-2 text-2xl mt-2">
            {person.firstName} {person.lastName}
        </li>
        );
    });

    let categoriesOptions = [];

    categories.categories.member.map((categorie) => {
        categoriesOptions.push(
        <option key={categorie.id} value={categorie.id} >
            {categorie.name}
        </option>
        );
    });

    async function handleSubmit(event) {
        await setPerson({
            ...person,
            'firstName': new FormData(event.target).get('firstname').valueOf(),
            'lastName': new FormData(event.target).get('lastname').valueOf(),
        });
        event.preventDefault();
        if (person.firstName != '') {
            addPerson(person);
        }
    }

    async function addPerson(p) {
        const newPeople = await fetch("http://localhost:8000/api/people", {
            method: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: JSON.stringify(p)
        });
    }

    return (
        <>
            <article className='flex flex-col border rounded-lg p-4 m-4 justify-center max-w-5xl mx-auto'>
                <h1 className="text-3xl mx-auto">{currentEvent.event.name}</h1>
                <h2 className="mx-2">Liste des Participants</h2>
                <ul className="flex flex-col mx-2 mb-1">
                    {persons}
                </ul>
                <h2 className="mx-2 mb-1">Liste des Dépenses</h2>
                <div className="flex flex-row">
                    {expenses}
                </div>
            </article>
            <form className="flex flex-row border rounded-lg p-4 justify-left gap-4 max-w-5xl mx-auto mb-4" onSubmit={handleSubmit}>
                <h3 className="mb-2">Ajouter une personne au groupe :</h3>
                <input type="text" name="firstname" placeholder="Prénom" className="border p-1 rounded-lg text-center" required/>
                <input type="text" name="lastname" placeholder="Nom" className="border p-1 rounded-lg text-center" required/>
                <button type="submit" className="border p-1 px-4 bg-emerald-800 text-white rounded-lg text-center" required>Ajouter</button>
            </form>
            <form className="flex flex-row border rounded-lg p-4 justify-left gap-4 max-w-5xl mx-auto">
                <h3 className="mb-2">Ajouter une dépense à l'évènement :</h3>
                <input type="text" name="expenseTitle" placeholder="Nom de la dépense" className="border p-1 rounded-lg text-center" required/>
                <select name="categorie" className="border p-1 rounded-lg text-center">
                    {categoriesOptions}
                </select>
                <button type="submit" className="border p-1 px-4 bg-emerald-800 text-white rounded-lg text-center" required>Ajouter</button>
            </form>
        </>
    )
}