const loginSchema=require("../modules/loginSchema")
require ('dotenv').config()

const users = [
    { username: process.env.USER1_USERNAME, password: process.env.USER1_PASSWORD },
    // { username: process.env.USER2_USERNAME, password: process.env.USER2_PASSWORD }
  ];
// Login route
exports.login=async (req,res)=>{
    const { username, password } = req.body;

    const login =loginSchema({
        username,
        password
    })

    const user = users.find(u => u.username === username && u.password === password);

    try {
        //validations
        if(!username || !password){
            return res.status(400).json({message: 'All fields are required!'})
        }

        if (user) {
            // Successful login
            await login.save()
            res.status(200).json({message: 'Login Successfull'})}
        else {
                // Unsuccessful login
                res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error); // Log the error to console for debugging
        res.status(500).json({error: error.message}); // Return the error message in the response
    }

    console.log(login)
}
