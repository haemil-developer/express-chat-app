const users = [];

const addUser = ({ id, username, room }) => {
    username = username.trim()
    room = room.trim()

    if ( !username || !room ) {
        return {
            error: 'username and room are required'
        }
    }

    const existingUser = users.find(user => {
        return user.room === room && user.username === username;
    })

    if (existingUser) {
        return {
            error: 'already use username'
        }
    }

    // save user
    const user = {id, username, room}
    users.push(user);
    return { user };
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUsersInRoom = (room) => {
    room = room.trim()
    return users.filter(user => user.room === room);
}

module.exports = {
    addUser,
    getUser,
    removeUser,
    getUsersInRoom,
}