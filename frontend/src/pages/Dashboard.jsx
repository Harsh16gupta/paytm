import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found.");
            setLoading(false);
            return;
        }

        let currentUserId = null;

        // Fetch logged-in user ID
        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: { Authorization: "Bearer " + token },
        })
        .then(response => {
            currentUserId = response.data._id;
            return axios.get("http://localhost:3000/api/v1/user/users", {
                headers: { Authorization: "Bearer " + token },
            });
        })
        .then(response => {
            setUsers(response.data.filter(user => user._id !== currentUserId));
        })
        .catch(() => {
            setError("Failed to fetch user information.");
        });

        // Fetch balance
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: { Authorization: "Bearer " + token },
        })
        .then(response => {
            if (response.data && typeof response.data.balance === "number") {
                setBalance(response.data.balance);
            } else {
                setError("Invalid balance response from server.");
            }
        })
        .catch(() => {
            setError("Failed to fetch balance.");
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            
            <div className="max-w-4xl mx-auto px-6 py-8">
                {error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        {error}
                    </div>
                ) : (
                    <>
                        {/* ✅ Balance Section */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-white shadow-md rounded-lg p-6 w-full text-center">
                                <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
                                <p className="text-2xl font-bold text-blue-600 mt-2">
                                    {balance !== null 
                                        ? `₹${balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
                                        : "Loading..."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* ✅ Loading State */}
                        {loading ? (
                            <div className="flex justify-center my-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Users</h2>
                                <Users users={users} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
