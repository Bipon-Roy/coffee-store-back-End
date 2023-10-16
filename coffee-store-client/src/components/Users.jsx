import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = (id) => {
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
                fetch(`https://coffee-store-server-tau-peach.vercel.app/user/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            console.log("deleted successfully");
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                            // remove the user from the UI
                            const remainingUsers = users.filter((user) => user._id !== id);
                            setUsers(remainingUsers);
                        }
                    });
            }
        });
        // make sure user is confirmed to delete
    };
    let i = 1;
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <h2>Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Last Logged In</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <th>{i++}</th>
                                <td>{user.email}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.lastLoggedAt}</td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn">
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
