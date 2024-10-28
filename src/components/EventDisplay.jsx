import { useState } from "react";

export default function EventDisplay({ event: currentEvent , categories}) {
    const [person, setPerson] = useState({
        firstName: '', 
        lastName: '',
        expenses: [],
        event: '/api/events/'+currentEvent.event.slug,
    });

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        paid: false,
        person: "",
        category: "",
        event: "/api/events/"+currentEvent.event.slug,
        createdAt: new Date,
        updatedAt: new Date
    });

    function handleNewPeopleSubmit() {
        if (person.firstName != '' && person.lastName != '') {
            addPerson(person);
        }
    }

    function handleNewExpenseSubmit() {
        if (expense.title != '' && expense.amount != '' && expense.person != '' && expense.category != '') {
            addExpense(expense);
        }
    }

    async function addPerson(p) {
        const newPeople = await fetch("http://localhost:8000/api/people", {
            method: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: JSON.stringify(p)
        });
    }

    async function addExpense(e) {
        const newExpense = await fetch("http://localhost:8000/api/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/ld+json" },
            body: JSON.stringify(e)
        });
    }

    return (
        <>
            <article className='flex flex-col border rounded-lg p-4 m-4 justify-center max-w-5xl mx-auto'>
                <h1 className="text-3xl mx-auto">{currentEvent.event.name}</h1>
                <h2 className="mx-2">Liste des Participants</h2>
                <ul className="flex flex-col mx-2 mb-1">
                    {currentEvent.event.persons.map(person => {
                        return (
                            <li key={person.id} className="bg-slate-100 border rounded-lg p-2 text-2xl mt-2">
                                {person.firstName} {person.lastName}
                            </li>
                        )
                    })}
                </ul>
                <h2 className="mx-2 mb-1">Liste des Dépenses</h2>
                <div className="flex flex-row flex-wrap gap-2"> 
                    {currentEvent.event.expenses.map((expense) => {
                        return (
                            <div key={expense.id} className="flex flex-col mx-2 p-2 gap-1 bg-slate-100 rounded-lg">
                                <h2 className="text-xl">{expense.title}</h2>
                                <p>Dépense : {expense.amount}€</p>
                                {expense.paid ? <button  className="bg-emerald-800 text-white p-1 rounded-lg text-center">Payé</button> : <button className="bg-red-800 text-white p-1 rounded-lg text-center">Non payé</button>}
                                <p>Pris en charge par {expense.person.firstName} {expense.person.lastName}</p>
                            </div>
                        );
                    })}
                </div>
            </article>

            <form className="flex flex-row border rounded-lg p-4 justify-left gap-4 max-w-5xl mx-auto mb-4" onSubmit={handleNewPeopleSubmit}>
                <h3 className="mb-2">Ajouter une personne au groupe :</h3>
                <input type="text" name="firstname" onChange={(e) => setPerson({...person,'firstName': e.target.value})} placeholder="Prénom" className="border p-1 rounded-lg text-center" required/>
                <input type="text" name="lastname" onChange={(e) => setPerson({...person,'lastName': e.target.value})} placeholder="Nom" className="border p-1 rounded-lg text-center" required/>
                <button type="submit" className="border p-1 px-4 bg-emerald-800 text-white rounded-lg text-center" required>Ajouter</button>
            </form>
            
            <form className="flex flex-row border rounded-lg p-4 justify-left gap-4 max-w-5xl mx-auto mb-4" onSubmit={handleNewExpenseSubmit}>
                <h3 className="mb-2">Ajouter une dépense :</h3>
                <input type="text" name="expenseTitle" onChange={(e) => setExpense({...expense,'title': e.target.value})} placeholder="Titre de la dépense" className="border p-1 rounded-lg text-center" required/>
                <input type="text" name="expenseAmount" onChange={(e) => setExpense({...expense,'amount': e.target.value})} placeholder="Montant de la dépense" className="border p-1 rounded-lg text-center" required/>
                <select name="category" onChange={(e) => setExpense({...expense,'category': "/api/categories/" + e.target.value})} className="border p-1 rounded-lg text-center">
                    <option value="0"></option>
                    {categories.categories.member.map((category) => {
                        return (
                            <option key={category.id} value={category.id} >
                                {category.name}
                            </option>
                        );
                    })}
                </select>
                <select name="person" onChange={(e) => setExpense({...expense,'person': "/api/people/" + e.target.value})} className="border p-1 rounded-lg text-center">
                    <option value="0"></option>
                    {currentEvent.event.persons.map((person) => {
                        return (
                            <option key={person.id} value={person.id} >
                                {person.firstName} {person.lastName}
                            </option>
                        );
                    })}
                </select>
                <button type="submit" className="border p-1 px-4 bg-emerald-800 text-white rounded-lg text-center" required>Ajouter</button>
            </form>
        </>
    )
}