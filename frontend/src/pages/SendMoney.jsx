import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate("/dashboard"); // Redirect after 5 seconds
            }, 5000);
        }
    }, [success, navigate]);

    const handleTransfer = () => {
        if (!id || !name) {
            setError("User details are missing.");
            return;
        }
        if (amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError(null);
        axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount,
            password
        }, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then(() => {
            setSuccess(true);
        })
        .catch(() => {
            setError("Transfer failed. Incorrect password or insufficient funds.");
        });
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name ? name[0].toUpperCase() : '?'}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name || 'Unknown User'}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="password">
                                    Confirm Password
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    id="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {success && (
                                <p className="text-green-500 mt-2">
                                    Transfer successful! Redirecting to dashboard in 5 seconds...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
