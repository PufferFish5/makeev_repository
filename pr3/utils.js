export function cityFilter(users, city) {
    return users.filter(user => user.address.city === city);
}
export function userSort(users) {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
}