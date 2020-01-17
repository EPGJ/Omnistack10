const axios = require("axios")
const Dev = require("../models/Dev")
const parseStringAsArray = require("../utils/parseStringAsArray")
const {findConnections, sendMessage} = require("../websocket")

module.exports = {

    async store(req, res){
        const { github_username,techs,latitude,longitude} = req.body

        let dev = await Dev.findOne({github_username}).then(()=>{
            res.json(dev);
        }).catch(async()=>{
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = response.data
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: "Point",
                coordinates:[longitude,latitude],
            }
        
            // console.log(location)
        
             const dev =  await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const sendSocketMessageTo = findConnections(
                 {latitude,longitude},
                 techsArray
            )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev)

            console.log(sendSocketMessageTo)

            res.json(dev);
        })
    },

    async index(req,res){
        const devs = await Dev.find()
        return res.json(devs)
    }

}