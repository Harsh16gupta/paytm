import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
        setUsers(Array.isArray(response.data.user) ? response.data.user : []); // Ensure response is an array
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Set an empty array in case of failure
      }
    };

    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg"></div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user) => <User key={user._id} user={user} />) // Map only if there are users
        ) : (
          <p>No users found.</p> // Fallback if no users are found
        )}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between my-2 p-2 border rounded">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName ? user.firstName[0] : "?"} {/* Handle missing firstName */}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName || "Unknown"} {user.lastName || ""} {/* Handle missing names */}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName || "User"}`)}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
