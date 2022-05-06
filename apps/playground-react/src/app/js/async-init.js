export class User {
    static async init(userId) {
        const user = await getUser(userId)
        return new User(user)
    }

    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
    }
}

const user = User.init(1)