import { connect } from 'mongoose'

// connecting with the database
connect( process.env.MONGODB_URI, {
    useNewUrlParser: true
})
        // if the db is successfully conected, show a message
    .then(db => console.log('db is connected'))
        // anyway, show the errror
    .catch(err => console.error(err))