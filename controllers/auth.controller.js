import { userLogin } from "../services/auth.service.js";


//...........login...............//
export async function login(req, res, next) {
  console.log("trying to coneect")
  const loginData = req.body;
  try {
    const response = await userLogin(loginData);
    console.log(response)
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
