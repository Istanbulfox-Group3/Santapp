const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client, JWT } = require('google-auth-library')


class UserController {

    // static findName (req, res, next) {
    //     let name = req.headers.access_token


    //     User.findOne({
    //         where: {
    //             name :
    //         }
    //     })
    // }


    static googleOAuth (req, res, next){
        // console.log("line 16");
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify(){
            // jwt.sign({})
            const ticket = await client.verifyIdToken({
                idToken: req.body.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            console.log(ticket, "TICKET <<<<<<<<<<<<");
            const googleUserParams = ticket.getPayload()
            console.log(googleUserParams, "INI GOOGLE USER PARAMS <<<<<<<<<");
            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    name: googleUserParams.name,
                    password: (new Date()).toDateString()
                }
            })
            .then(user => {
                let payload = { id: user.id, name: user.name, city: user.city, email: user.email }
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    city: user.city,
                    email: user.email,
                    access_token: generateToken(payload)
                })
            })
            .catch(err => {
                console.log("ERROR");
                res.status(400).json({err})
            })
        
        }

        verify().catch(console.error)
    }


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
}

module.exports = UserController