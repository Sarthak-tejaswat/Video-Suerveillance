import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:5000/get/user");
        if (response.ok) {
          const result = await response.json();
          setUser(result);
        } else {
          setError("Failed to fetch user information");
        }
      } catch (error) {
        setError("Error: " + error.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>User ID:</strong> {user.userId}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Token:</strong> {user.token}
      </p>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
    </div>
  );
};

export default UserInfo;
