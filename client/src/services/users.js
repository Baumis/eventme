const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        email: 'admin@eventme.fi'
    }
]

const getOne = (username, password) => {
    return users.find((user) =>
        user.username === username
        && user.password === password)
}

export default { getOne }