const loginSchema=require("../modules/loginSchema")
require ('dotenv').config()

const users = [
    { username: process.env.USER1_USERNAME, password: process.env.USER1_PASSWORD },
    // { username: process.env.USER2_USERNAME, password: process.env.USER2_PASSWORD }
  ];
// Login route
let loginStatus='';
exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    const login = loginSchema({
        username,
        password
    });

    const user = users.find(u => u.username === username && u.password === password);

    try {
        // Validations
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (user) {
            // Successful login
            login.loginStatus='successful'
            loginStatus = { message: 'Login Successful'};
            await login.save();
            res.status(200).json(loginStatus);
        } else {
            // Unsuccessful login
            loginStatus ={ message: 'Invalid username or password' }
            await login.save();
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message }); 
    }

    console.log(login);
};



// exports.getLoginStatus = async (req, res) => {
//     try {
//         const lastLogin = await Login.findOne().sort({ createdAt: -1 }).select('loginStatus');
//         if (!lastLogin) {
//             return res.status(404).json({ message: 'No login attempts found' });
//         }
//         res.status(200).json({ loginStatus: lastLogin.loginStatus });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

exports.getLoginStatus=async(req,res)=>{
    try {
        const login =await loginSchema.findOne().sort({createdAt: -1}).select('loginStatus -_id');
        res.status(200).json(login)
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        
    }
}
