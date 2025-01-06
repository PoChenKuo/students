const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json(message);

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const payload = req.body;
    const message = await updateStudent({ ...payload, id });
    // did get it, what is the if-else in the updateStudent function to decide add/update
    res.json(message);

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const message = await getStudentDetail(id);
    res.json(message);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const payload = req.body;
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({ ...payload, userId, reviewerId });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
