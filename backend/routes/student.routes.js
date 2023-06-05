const router = require('express').Router();
const { User, Student, Request } = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const axios = require('axios')
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MODEL_URL = process.env.MODEL_URL || "http://localhost:5000";

async function runCompletion(sub) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${sub} online courses to get job as a fresher links`,
        temperature: 0,
        max_tokens: 100,
    });
    console.log("completion=", completion.data.choices[0].text)
    return completion.data.choices[0].text
}

function getMinimumSub(obj) {
    let marksArray = []
    marksArray.push({ label: "computer networks", marks: obj.cn })
    marksArray.push({ label: "database management system", marks: obj.dbms })
    marksArray.push({ label: "data structures and algorithms", marks: obj.dsa })
    marksArray.push({ label: "machine learning", marks: obj.ml })
    marksArray.push({ label: "object oriented programming", marks: obj.oop })
    marksArray.push({ label: "operating system", marks: obj.os })

    marksArray.push({ label: "logical reasoning", marks: obj.lr / 2 })
    marksArray.push({ label: "quantitative aptitude", marks: obj.qa / 2 })
    marksArray.push({ label: "verbal ability", marks: obj.va / 2 })
    marksArray.push({ label: `${obj.progLang}`, marks: obj.programming / 2 })

    let minimum = marksArray.reduce((prev, curr) => prev.marks < curr.marks ? prev : curr);
    return minimum.label

}

router.post('/reqRegister', async (req, res, next) => {
    const { email, name, mobile, college, branch, year, rollno } = req.body
    let foundReq = await Request.findOne({ "student.email": email })
    let foundUser = await User.findOne({ email: email })
    if (foundReq) {
        return res.json({ message: "your request is pending", status: false })
    }
    if (foundUser) {
        return res.json({ message: "student present in the system", status: false })
    }
    const newReq = new Request({
        student: {
            email,
            name,
            mobile,
            college,
            branch,
            year,
            rollno
        }
    });

    newReq.save()
        .then((user) => {
            console.log(user);
            res.json({ message: "requested!", status: true })
        })
        .catch(err => console.log(err))
});



router.get('/:id', isAuth, async (req, res, next) => {
    const { id } = req.params
    try {
        let student = await Student.findOne({ userId: id }).populate('userId').select("-userId.hash")
        res.json(student)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/predictPlacement/:userId', isAuth, async (req, res) => {
    const { userId } = req.params
    const { studentData } = req.body
    console.log("studentdata=", studentData)
    try {

        var clientServerOptions = {
            url: MODEL_URL + '/predict',
            data: studentData,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let resposne = await axios(clientServerOptions)

        if (resposne.data) {
            console.log("resposne=", resposne.data)
            var courses = ''
            var weak = ''
            studentData.placementStatus = resposne.data?.status || 0
            studentData.packageRange = resposne.data?.package_range || 0
            let student = await Student.findOneAndUpdate({ userId: userId }, {
                $set: { ...studentData }
            }, { new: true }).populate('userId').select("-userId.hash")

            if (studentData.placementStatus == 0) {
                weak = getMinimumSub(studentData)
                courses = await runCompletion(weak)
            }
            return res.json({ student, courses, weakPoint: weak })
        }
    } catch (error) {
        console.log(error)
    }
    res.json(null)
})


module.exports = router;