
import express from "express";
import Userdetails from "../model/User.js";
import Usernotes from "../model/Notes.js";
import bcrypt from 'bcrypt';
import authRoute from "./authRoute.js";

const router = express.Router();

// router.get("/users", authRoute, async (req, res) => {
//     try {
//         const users = await Userdetails.find();
//         res.json(users);
//     } catch (err) {
//         res.json({ "message": "error getting data" });
//     }
// })
router.get("/users", async (req, res) => {
    try {
        const users = await Userdetails.find();
        res.json(users);
    } catch (err) {
        res.json({ "message": "error getting data" });
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Userdetails.findById(id);
        res.json(user);
    } catch (error) {
        console.log(error.message);
    }
})
router.get("/note/:id",authRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Usernotes.findById(id);
         res.json(user);
    } catch (error) {
        console.log(error.message);
    }
})
router.get("/notes", authRoute,  async (req, res) => {
    try {
        const id = req.user._id;
        // console.log(id);
        const user = await Usernotes.find({ userid: id });
      return   res.json(user);
    } catch (error) {
       return  console.log(error.message);
    }
})

router.post("/user", async (req, res) => {
    const { name = "", username = "", email = "", password = "" } = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword);

    try {
        const user = await Userdetails.create({
            name,
            username,
            email,
            "password" : hashedpassword
        })
        res.json(user);
    } catch (err) {
        console.log("error", err);
        res.json({ "error": "error creating data" });
    }
})

router.post("/user/add",authRoute, async (req, res) => {
    const {  title= "", content = ""} = req.body;
    const user_id = req.user._id;
    try {
        const notes = await Usernotes.create({
            title,
            content,
            userid : user_id
        }) 
       return  res.json(notes);
    } catch (err) {
        console.log("error", err);
       return  res.json({ "error": "error creating data" });
    }
})


router.put("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const user = await Userdetails.findByIdAndUpdate(id, { $set: { name: name, username: username, email: email } }, { new: true });
        res.json(user);

    } catch (error) {
        console.log(error.message);
    }
})

router.put("/notesupdate/:id",authRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const content = req.body.content;
       
        const user = await Usernotes.findByIdAndUpdate(id, { $set: { title: title, content: content} }, { new: true });
        res.json(user);

    } catch (error) {
        console.log(error.message);
    }
})

router.delete("/user/:id",authRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Userdetails.findByIdAndDelete(id);
        res.json(user);

    } catch (error) {
        console.log(error.message);
    }
})

router.delete("/noteseach/:id",authRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Usernotes.findByIdAndDelete(id);
        res.json(user);

    } catch (error) {
        console.log(error.message);
    }
})




export default router;