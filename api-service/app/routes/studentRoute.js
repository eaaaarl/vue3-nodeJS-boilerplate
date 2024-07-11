const { Router } = require("express");
const router = Router();
const controller = require('../controllers/studentController');
const { validateCreate } = require('../requests/CreateStudentRequest');
const { validateUpdate } = require('../requests/UpdateStudentRequest');
const upload = require('../middleware/fileUploadPayload');

router.get('/', controller.list);
router.post('/create', upload.single('avatar'), validateCreate, controller.createStudents);
router.delete('/:id', controller.Delete);
router.get('/:id', controller.getStudent);
router.put('/:id', upload.single('avatar'), validateUpdate, controller.Update);

module.exports = router;
