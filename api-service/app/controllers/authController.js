const service = require('../services/authService');

const login = async (request, response) => {
    try {
        const result = await service.login(request.body);
        /*  response.status(200).json({
             success: true,
             message: 'OK',
             data: result.user,
             token: result.token
         }); */
        response.formatter.ok(result);
    } catch (error) {
        /*  response.status(400).json({
             code: 400,
             success: false,
             message: error.message
         }); */
        response.formatter.badRequest(error.message);
    }
}

const checkToken = async (request, response) => {
    /*  response.status(202).json({
         success: true,
         data: request.user
     }); */
    try {
        response.formatter.accepted(request.user);
    } catch (error) {
        response.formatter.badRequest(error);
    }

}

const register = async (request, response) => {
    try {
        const newUser = await service.register(request.body);
        /* response.status(201).json({ success: true, message: 'Registration successful', data: newUser }); */
        response.formatter.created(newUser);
    } catch (error) {
        /*         response.status(400).json({ success: false, message: error.message });
         */
        response.formatter.badRequest(error.message);
    }
}

module.exports = {
    register,
    login,
    checkToken
}
