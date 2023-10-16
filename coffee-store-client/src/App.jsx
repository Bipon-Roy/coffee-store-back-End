import { useLoaderData } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CoffeeCard from "./components/CoffeeCard";
import { useState } from "react";

function App() {
    const loadedCoffees = useLoaderData();
    const [coffees, setCoffees] = useState(loadedCoffees);
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <h1>All Coffees {coffees.length}</h1>
            <div className="grid grid-cols-2 gap-4">
                {coffees.map((coffee) => (
                    <CoffeeCard
                        key={coffee._id}
                        coffee={coffee}
                        coffees={coffees}
                        setCoffees={setCoffees}
                    ></CoffeeCard>
                ))}
            </div>
        </div>
    );
}

export default App;
