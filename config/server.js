const server = {}

server.port = process.env.PORT || 8080
server.secret = process.env.JWT_SECRET || 'nextgeneration'
server.authKey = process.env.AUTH_KEY || 'e04a1c2-5408-98179-cb581462e25e-680c1ed-f5f7e13401b01b-c228e887-82a2a70'


server.alpaca={
    DEVELOPMENT:{
        api_key: 'CKTPO1TMNY5TNG69L2BJ',
        api_secret: 'TZ9NAVJVJA7yTr6eMVIPudY4RigYwaoQydebSvs1',
    },
    PRODUCTION:{
        api_key: 'CKTPO1TMNY5TNG69L2BJ',
        api_secret: 'TZ9NAVJVJA7yTr6eMVIPudY4RigYwaoQydebSvs1',
    }
}['DEVELOPMENT'];


module.exports = Object.freeze(server)
