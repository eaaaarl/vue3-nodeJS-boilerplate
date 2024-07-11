const service = require('../services/studentService');

const list = async (request, response) => {
    try {
        const result = await service.list({
            query: request.query
        });
        response.formatter.ok(result);
    } catch (error) {
        response.formatter.badRequest(error.message);
    }
}

const getStudent = async (request, response) => {
    try {
        const result = await service.getStudent({
            params: request.params
        });
        response.formatter.ok(result);
    } catch (error) {
        response.formatter.badRequest(error.message);
    }
}

const createStudents = async (request, response) => {
    try {
        const result = await service.createStudent({
            body: request.body,
            file: request.file
        });
        response.formatter.created(result);
    } catch (error) {
        response.formatter.badRequest(error.message);
    }
};

const Update = async (request, response) => {
    try {
        const result = await service.Update({
            params: request.params,
            body: request.body,
            file: request.file
        });
        response.formatter.ok(result);
    } catch (error) {
        response.formatter.badRequest(error.message);
    }
}

const Delete = async (request, response) => {
    try {
        const result = await service.Delete({
            params: request.params,
        });
        response.formatter.ok(result);
    } catch (error) {
        response.formatter.badRequest(error.message);
    }
}

module.exports = {
    list,
    createStudents,
    Delete,
    getStudent,
    Update
}
