import { fetchUsers } from "./api.js";
import { cityFilter, userSort } from "./utils.js";

async function init() {
    try {
        let users = await fetchUsers();
        let filtered_users = cityFilter(users, "Bartholomebury");
        let sorted_users = userSort(users);
        let city_list_id = document.getElementById("city_list");
        filtered_users.forEach(user => {
            let li = document.createElement('li');
            li.textContent = `${user.name} aka '${user.username}', ${user.address.city})`;
            city_list_id.appendChild(li);
        });
        let user_list_id = document.getElementById("user_list");
        sorted_users.forEach(user => {
            let li = document.createElement('li');
            li.textContent = `${user.name} aka '${user.username}', ${user.address.city})`;
            user_list_id.appendChild(li);
        });
    } catch (error) {
        console.error(error)
    }
}
init()