
const { encrypt, decrypt, compare } = require('n-krypta');

const secret = 'my-secret';


const userNameTemp="admin";
const passwordTemp="shoedog1994"
exports.loginByUserAndPassword = async (req, res) => {
  try{
    const userName=req.body.userName;
    const passWord=req.body.password;
    const passwordMatch = compare(passwordTemp, passWord, secret);
    console.log(userName,passwordMatch)
    if(userName==userNameTemp&&passwordMatch==true){
      return res.status(200).json({"status": "success", "data": passwordMatch});
    }
    else{
      return res.status(200).json({"status": "wrong", "data": passwordMatch});
    }
  }catch (e) {
    return res.status(500).json({"status": "error", "message": e.message});
  }
}
