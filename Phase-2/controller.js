import variable from './model.js'

const insert = async (req, res) => {
    const user = await variable.insertMany(req.body)
    res.send(user)
}

const find = async (req, res) => {
    const user = await variable.find()
    res.send(user)
}

const update = async (req, res) => {
    const userid = new ObjectId(req.params.id)
    const data = req.body
    const user = await variable.updateOne({ _id: userid }, { $set: data })
    res.send(user)
}
const erase = async (req, res) => {
    const userid = new objectId(req.params.id)
    const data = req.body
    const userDel = await variable.findByIdAndDelete({ _id: userid })
    res.send(userDel)

}

export { insert, find, update, erase }