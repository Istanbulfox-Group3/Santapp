const { verifyToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

const authenticate = (req, res, next) => {
    try {
        
        let decoded = verifyToken(req.headers.access_token)
        
        User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email
            }
        })
        
        .then(user => {
            req.currentUser = { id: user.id, email: user.email}
            next()
        })
        
        .catch(err => {
            throw { name: 'CustomeError',  message: "Unauthorized", status: 401 }
        })
        
    } catch (error) {
        next(error)
    }
        
}

const authorize = (req, res, next) => {
    const userId = +req.currentUser.id

    Todo.findOne({
        where: {
            id: +req.params.id
        }
    })

    .then(data => {
        if (!data) throw { status: 404, message: 'Data Not Found' }
            if (data.UserId === userId) {
            next()
        } else {
            throw { name: 'CustomeError',  message: "Unauthorized", status: 401 }
        }
    })

    .catch(err => {
        next(err)
    })

}

module.exports = {
    authenticate,
    authorize
}