// pages/Assignments/GradeSubmission.jsx

import { useState } from "react";

import {
    ArrowLeft,
    Trophy,
    MessageSquare,
    Send,
    FileText
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    gradeSubmission
} from "../../Redux/slices/AssignmentSlice";

function GradeSubmission() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { state } = useLocation();

    const [data, setData] = useState({

        submissionId: state?._id,

        marks: state?.marks || 0,

        feedback: state?.feedback || ""

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const res = await dispatch(
            gradeSubmission(data)
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
                            Submission Review
                        </p>

                        <h1 className="text-3xl font-bold">
                            Grade Submission
                        </h1>

                    </div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8"
                >

                    {/* STUDENT */}
                    <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-6">

                        <h1 className="text-2xl font-bold mb-2">
                            {
                                state?.student?.name
                            }
                        </h1>

                        <p className="text-gray-400">
                            {
                                state?.student?.email
                            }
                        </p>

                    </div>

                    {/* SUBMISSION */}
                    <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-6">

                        <div className="flex items-center gap-3 mb-5">

                            <FileText
                                className="text-yellow-400"
                                size={22}
                            />

                            <h2 className="text-xl font-bold">
                                Submission Text
                            </h2>

                        </div>

                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">

                            {
                                state?.submissionText ||
                                "No submission text"
                            }

                        </p>

                    </div>

                    {/* MARKS */}
                    <div className="space-y-3">

                        <label
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <Trophy
                                className="text-yellow-400"
                                size={22}
                            />

                            Marks

                        </label>

                        <input
                            type="number"
                            name="marks"
                            value={data.marks}
                            onChange={handleChange}
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                        />

                    </div>

                    {/* FEEDBACK */}
                    <div className="space-y-3">

                        <label
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <MessageSquare
                                className="text-yellow-400"
                                size={22}
                            />

                            Feedback

                        </label>

                        <textarea
                            rows="7"
                            name="feedback"
                            value={data.feedback}
                            onChange={handleChange}
                            placeholder="Write feedback..."
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 resize-none"
                        ></textarea>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3"
                    >

                        <Send size={22} />

                        Submit Review

                    </button>

                </form>

            </div>

        </div>

    );

}

export default GradeSubmission;