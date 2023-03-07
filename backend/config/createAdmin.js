const bcrypt = require('bcrypt')
const { User } = require('./database')

const createAdmin = async () => {
    try {
        let hashedPassword = await bcrypt.hash("admin", 10)
        await new User({
            userId: 1,
            email: "admin@gmail.com",
            hash: hashedPassword,
            admin: true
        }).save()
    } catch (error) {
        console.log(error)
    }
}
module.exports = createAdmin