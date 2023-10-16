import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // ES6
import Swal from "sweetalert2";
const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id, name, quantity, supplier, taste, photo } = coffee;

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://coffee-store-server-tau-peach.vercel.app/coffee/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your Coffee has been deleted.", "success");
                            const remaining = coffees.filter((cof) => cof._id !== id);
                            setCoffees(remaining);
                        }
                    });
            }
        });
    };
    return (
        <div className="card card-side bg-base-100 shadow-xl p-4">
            <figure>
                <img src={photo} alt="Movie" />
            </figure>
            <div className="flex justify-between items-center w-full pr-4">
                <div>
                    <h2 className="card-title">Name: {name}</h2>
                    <p>{quantity}</p>
                    <p>{supplier}</p>
                    <p>{taste}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="btn-group btn-group-vertical space-y-4">
                        <button className="btn">View</button>
                        <Link to={`updateCoffee/${_id}`}>
                            <button className="btn">Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(_id)} className="btn bg-orange-500">
                            X
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
CoffeeCard.propTypes = {
    coffee: PropTypes.object,
    coffees: PropTypes.array,
    setCoffees: PropTypes.func,
};
export default CoffeeCard;
