// pages/Assignments/SubmitAssignment.jsx

import { useState } from "react";

import {
    ArrowLeft,
    Upload,
    FileText,
    Sparkles,
    Send
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

import { submitAssignment } from "../../Redux/slices/AssignmentSlice";

function SubmitAssignment() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { state } = useLocation();

    const { id } = useParams();

    const [data, setData] = useState({

        assignmentId: id,

        submissionText: "",

        files: []

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });

    }

    function handleFile(e) {

        setData({
            ...data,
            files: e.target.files
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const res = await dispatch(
            submitAssignment(data)
        );

        if (res?.payload?.success) {

            navigate(-1);

        }

    }

    return (

        <div className="min-h-screen bg-[#020617] text-white px-4 lg:px-20 py-10">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-10">

                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#111827] hover:bg-yellow-500 hover:text-black transition-all duration-300 p-3 rounded-2xl border border-gray-700"
                    >

                        <ArrowLeft size={22} />

                    </button>

                    <div>

                        <p className="text-gray-400 text-sm">
                            Assignment Submission
                        </p>

                        <h1 className="text-3xl font-bold">
                            Submit Assignment
                        </h1>

                    </div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8"
                >

                    {/* TOP */}
                    <div>

                        <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400 w-fit mb-5">

                            <Sparkles size={18} />

                            <span className="uppercase tracking-widest text-sm font-semibold">
                                Student Submission
                            </span>

                        </div>

                        <h1 className="text-4xl font-bold mb-3">
                            {state?.title}
                        </h1>

                        <p className="text-gray-400 text-lg">
                            Submit your assignment solution below.
                        </p>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-6">

                        <h2 className="text-xl font-bold mb-3">
                            Assignment Description
                        </h2>

                        <p className="text-gray-400 leading-relaxed">
                            {state?.description}
                        </p>

                    </div>

                    {/* TEXT */}
                    <div className="space-y-3">

                        <label
                            htmlFor="submissionText"
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <FileText
                                className="text-yellow-400"
                                size={22}
                            />

                            Submission Text

                        </label>

                        <textarea
                            name="submissionText"
                            id="submissionText"
                            rows="8"
                            value={data.submissionText}
                            onChange={handleChange}
                            placeholder="Write your answer here..."
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 resize-none"
                        ></textarea>

                    </div>

                    {/* FILE */}
                    <div className="space-y-3">

                        <label
                            htmlFor="files"
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <Upload
                                className="text-yellow-400"
                                size={22}
                            />

                            Upload Files

                        </label>

                        <input
                            type="file"
                            name="files"
                            id="files"
                            multiple
                            onChange={handleFile}
                            className="file-input file-input-bordered w-full bg-[#1f2937] border-gray-700 text-white rounded-2xl"
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3"
                    >

                        <Send size={22} />

                        Submit Assignment

                    </button>

                </form>

            </div>

        </div>

    );

}

export default SubmitAssignment;