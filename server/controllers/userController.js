const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController {
    static register(req, res, next) {
        const { name, city, email, password} = req.body
        const newUser = { name, city, email, password }
    
        User.create(newUser)

        .then(user => {
            res.status(201).json({
                success: true,
                message: 'Register Success',
                id: user.id,
                name: user.name,
                city: user.city,
                email: user.email
            })
            
        })

        .catch((err) => {
            next(err)
        })
    }
    
    static login(req, res, next) {
        const { email, password } = req.body
    
        User.findOne({
          where: {
            email
          }
        })

        .then((user) => {
          if (user) {
                const comparedPass = comparePassword(password, user.password)
    
                if(comparedPass) {
                    const payload = { 
                        id: user.id,
                        name: user.name,
                        city: user.city,
                        email: user.email,
                    }

                    const access_token = generateToken(payload)
        
                    res.status(200).json({ access_token })
                } else {
                    throw { name: 'CustomError', message: 'Invalid Email or Password', status: 400 }
                }

            } else {
                throw { name: 'CustomError', message: 'Invalid Email or Password', status: 400 }
            }
        })

        .catch(err => {
            next(err)
        })
    }

    static logout (req, res, next){
        localStorage.removeItem()
    }
}

module.exports = UserController