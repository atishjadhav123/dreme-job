
import mongoose from "mongoose"
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    requirement: [{ type: String }],
    salary: { type: Number, required: true },
    experiencelevel: { type: String, type: Number, required: true },
    location: { type: String, required: true },
    jobtype: { type: String, required: true },
    position: { type: Number, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "company", required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    aplications: [{ type: mongoose.Schema.Types.ObjectId, ref: "aplication" }]
}, { timestamps: true })
export const Job = mongoose.model("job", jobSchema)


export const postJob = async (req, res) => {
    try {
        const { title, desc, requirement, salary, location, jobtype, position, experience, companyid } = req.body
        console.log("req.body", req.body);

        const userid = req.id
        if (!title || !desc || !requirement || !salary || !location || !jobtype || !position || !experience || !companyid) {
            return res.status(400).json({ message: "Somthing is mising" })
        }
        const job = await Job.create({
            title,
            desc,
            requirement: requirement.split(","),
            salary: Number(salary),
            location,
            jobtype,
            experiencelevel: experience,
            position,
            company: companyid,
            created_by: userid
        })
        res.status(201).json({
            message: "new job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)

    }
}
