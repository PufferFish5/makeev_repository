export async function fetchUsers() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Response error");
        }
        let users = await response.json();
        return users;
    } catch (error) {
        console.error("Fetch error", error);
        throw error;
    }
}