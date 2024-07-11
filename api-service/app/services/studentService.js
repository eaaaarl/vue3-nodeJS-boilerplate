const database = require('../../database');
const path = require('path');
const fs = require('fs/promises');

/* const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
 */

const ITEMS_PER_PAGE = 5;

const list = async (payload) => {
    const { search, page = 1 } = payload.query;

    // Calculate the offset
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Create the base query
    let query = database('students').select('*');

    // Add search functionality
    if (search) {
        query = query.where('full_name', 'like', `%${search}%`);
    }

    // Add pagination
    query = query.limit(ITEMS_PER_PAGE).offset(offset);

    // Execute the query
    const students = await query;

    // Get the total count for pagination
    let countQuery = database('students').count({ count: '*' });

    // Add search functionality to count query
    if (search) {
        countQuery = countQuery.where('full_name', 'like', `%${search}%`);
    }

    const [{ count }] = await countQuery;

    return {
        students,
        totalItems: parseInt(count, 10),
        totalPages: Math.ceil(count / ITEMS_PER_PAGE),
        currentPage: Number(page)  // Ensure currentPage is returned as a number
    };
};


const getStudent = async (payload) => {
    try {
        const student = await database('students').where('id', payload.params.id).first();

        if (!student) {
            throw new Error('Students not found.');
        }

        return { ...student };
    } catch (error) {
        throw new Error(`Error getting student: ${error.message}`);
    }
}

const createStudent = async (payload) => {
    try {
        const { body, file } = payload;
        const student = await database('students').insert({
            full_name: body.full_name,
            status: body.status,
            avatar: file ? `uploads/${file.filename}` : null
        });

        console.log('File uploaded', file ? file.path : 'No file uploaded');

        return student;
    } catch (error) {
        throw new Error(`Error creating student: ${error.message}`);
    }
};



const Update = async (payload) => {
    try {
        const { file } = payload;
        const currentStudent = await database('students').where('id', payload.params.id).first();
        const updatedFields = {
            full_name: payload.body.full_name,
            status: payload.body.status,
        };

        if (payload.file) {
            updatedFields.avatar = `uploads/${file.filename}`;

            if (currentStudent.avatar) {
                const oldAvatarPath = path.join(__dirname, '../../', currentStudent.avatar);
                try {
                    await fs.access(oldAvatarPath);
                    await fs.unlink(oldAvatarPath);
                } catch (error) {
                    if (error.code === 'ENOENT') {
                        console.log(`Old avatar file not found: ${oldAvatarPath}`);
                    } else {
                        throw new Error(`Error deleting old avatar file: ${error.message}`);
                    }
                }
            }
        } else {
            updatedFields.avatar = currentStudent.avatar;
        }

        await database('students').where('id', payload.params.id).update(updatedFields);

        const updatedStudent = await database('students').where('id', payload.params.id).first();
        return updatedStudent;
    } catch (error) {
        throw new Error(`Error updating student: ${error.message}`);
    }
}

const Delete = async (payload) => {
    try {
        const currentStudent = await database('students').where('id', payload.params.id).first();
        const student = await database('students').where('id', payload.params.id).del();

        if (currentStudent && currentStudent.avatar) {
            const oldAvatarPath = path.join(__dirname, '../../', currentStudent.avatar);
            await fs.unlink(oldAvatarPath);
        }
        return student;
    } catch (error) {
        throw new Error(`Error creating student: ${error.message}`);
    }
}

module.exports = {
    list,
    createStudent,
    Delete,
    getStudent,
    Update
}
