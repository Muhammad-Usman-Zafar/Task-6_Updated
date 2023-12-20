const expressAsyncHandler = require("express-async-handler")

const Contact = require("../DB/Schema")


const fetchingusers = expressAsyncHandler( async (req, res)=>{
    const users = await Contact.find();
    res.status(200).send(users)
});

const fetchingAuthentic = expressAsyncHandler( async (req, res)=>{
    const users = await Contact.find({user_id: req.user.id});
    res.status(200).send(users)
})

const fetchingById =  expressAsyncHandler( async (req, res)=>{
    const user = await Contact.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User Not Found")
    }

    res.status(200).json({success:true, data: user})

});

const update = expressAsyncHandler(async(req, res)=>{
    const users = await Contact.findById(req.params.id);
    if (!users) {
        res.status(404);
        throw new Error("User Not Found")
    }

    if (users.user_id.toString() !== req.user.id) {
        res.status(401)
        throw new Error("You do not have permission to update")
    }

    const userUpdate = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true});
    
    res.status(200).json({success:true, data: userUpdate})

});

const deletec = expressAsyncHandler( async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("User not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You do not have permission to update")
    }
    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
})

const create = expressAsyncHandler( async (req, res)=>{
    const {name , email, role} = req.body;

    if(!name || !email || !role){
        res.status(400).json({success: false, msg: "Fill all the Fields!"})
        throw new Error("Sub Fill kro chalo Shabash")
    }
    const newUser = await Contact.create({
        name,
        email,
        role,
        user_id: req.user.id
    });
    res.status(200).json({success: true, data: newUser})
});

module.exports = {
    fetchingusers,
    fetchingAuthentic,
    fetchingById,
    update,
    deletec,
    create
}