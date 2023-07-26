// This is the base path of the Express route we'll define

async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const res = await fetch(`api/users/createUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

async function checkUsername(username) {
  try {
    // Make a GET request to the backend API with the username as a query parameter
    const response = await fetch(`/api/users/checkUn/${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to check username");
    }
    // Parse the response data as JSON
    const data = await response.json();
    return data.exists;
  } catch (error) {
    // Handle any errors that occurred during the fetch or parsing the response
    console.error("Error checking username availability:", error);
    return false; // Return false to indicate an error occurred during the check
  }
}


async function login(credentials) {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Email and password do not match");
      }
      throw new Error("Login failed");
    }

    const token = await response.json();
    return token;
  } catch (error) {
    throw new Error("Login failed");
  }
}

export { signUp, checkUsername, login };
