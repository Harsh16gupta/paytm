import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
    const [userName, setUserName] = useState(""); // Store the user's first name
    const [userInitial, setUserInitial] = useState(""); // Store the first letter of the user's name

    useEffect(() => {
        // Fetch user details including the name
        axios.get("http://localhost:3000/api/v1/user/details", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(response => {
            const firstName = response.data.firstName; // Assuming response contains firstName
            setUserName(firstName);
            setUserInitial(firstName[0].toUpperCase()); // Set the initial of the user's name
        })
        .catch(error => {
            console.error("Failed to fetch user details", error);
        });
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg h-16 flex justify-between items-center px-6 md:px-10">
            {/* App Title */}
            <div className="text-white text-xl md:text-2xl font-bold tracking-wide">
                💰 Pay-Sphere
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
                {/* Welcome Text */}
                <span className="text-white text-sm md:text-base font-medium">
                    Hello, {userName ? userName : "User"}
                </span>

                {/* User Initial Badge */}
                <div className="rounded-full h-12 w-12 bg-white text-indigo-600 font-bold flex items-center justify-center shadow-md text-lg">
                    {userInitial ? userInitial : "U"}
                </div>
            </div>
        </div>
    );
};
