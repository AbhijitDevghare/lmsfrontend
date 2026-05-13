// pages/Assignments/CreateAssignment.jsx

import { useState } from "react";

import {
    ArrowLeft,
    ClipboardList,
    Calendar,
    Trophy,
    FileText,
    Sparkles
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { createAssignment } from "../../Redux/slices/AssignmentSlice";

function CreateAssignment() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { state } = useLocation();

    const [data, setData] = useState({

        course: state?._id,

        title: "",

        description: "",

        dueDate: "",

        totalMarks: 100,

        attachments: [],

        previewImages: []

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });

    }

    function handleFiles(e) {

        const files = Array.from(
            e.target.files
        );

        setData({
            ...data,
            attachments: files,
            previewImages: files.map(
                (file) =>
                    URL.createObjectURL(file)
            )
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const formData =
            new FormData();

        formData.append(
            "course",
            data.course
        );

        formData.append(
            "title",
            data.title
        );

        formData.append(
            "description",
            data.description
        );

        formData.append(
            "dueDate",
            data.dueDate
        );

        formData.append(
            "totalMarks",
            data.totalMarks
        );

        data.attachments.forEach(
            (file) => {

                formData.append(
                    "attachments",
                    file
                );

            }
        );

        const res = await dispatch(
            createAssignment(formData)
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
                            Back to Course
                        </p>

                        <h1 className="text-3xl font-bold">
                            Create Assignment
                        </h1>

                    </div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8"
                >

                    {/* TOP BADGE */}
                    <div>

                        <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400 w-fit mb-5">

                            <Sparkles size={18} />

                            <span className="uppercase tracking-widest text-sm font-semibold">
                                Assignment Module
                            </span>

                        </div>

                        <h1 className="text-4xl font-bold mb-3">
                            New Assignment
                        </h1>

                        <p className="text-gray-400 text-lg">
                            Create assignments for students enrolled in this course.
                        </p>

                    </div>

                    {/* TITLE */}
                    <div className="space-y-3">

                        <label
                            htmlFor="title"
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <ClipboardList
                                className="text-yellow-400"
                                size={22}
                            />

                            Assignment Title

                        </label>

                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Enter assignment title"
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                        />

                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-3">

                        <label
                            htmlFor="description"
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <FileText
                                className="text-yellow-400"
                                size={22}
                            />

                            Assignment Description

                        </label>

                        <textarea
                            name="description"
                            id="description"
                            rows="7"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Write assignment details..."
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 resize-none"
                        ></textarea>

                    </div>

                    {/* DATE + MARKS */}
                    <div className="grid lg:grid-cols-2 gap-6">

                        {/* DUE DATE */}
                        <div className="space-y-3">

                            <label
                                htmlFor="dueDate"
                                className="flex items-center gap-3 text-lg font-semibold"
                            >

                                <Calendar
                                    className="text-yellow-400"
                                    size={22}
                                />

                                Due Date

                            </label>

                            <input
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                value={data.dueDate}
                                onChange={handleChange}
                                className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                            />

                        </div>

                        {/* MARKS */}
                        <div className="space-y-3">

                            <label
                                htmlFor="totalMarks"
                                className="flex items-center gap-3 text-lg font-semibold"
                            >

                                <Trophy
                                    className="text-yellow-400"
                                    size={22}
                                />

                                Total Marks

                            </label>

                            <input
                                type="number"
                                name="totalMarks"
                                id="totalMarks"
                                value={data.totalMarks}
                                onChange={handleChange}
                                className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                            />

                        </div>

                    </div>

                    {/* ATTACHMENTS */}
                    <div className="space-y-3">

                        <label
                            htmlFor="attachments"
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <FileText
                                className="text-yellow-400"
                                size={22}
                            />

                            Assignment Attachments

                        </label>

                        <input
                            type="file"
                            id="attachments"
                            multiple
                            onChange={handleFiles}
                            className="file-input file-input-bordered w-full bg-[#1f2937] border-gray-700 text-white rounded-2xl"
                        />

                        {/* PREVIEW */}
                        {
                            data.previewImages?.length > 0 && (

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

                                    {
                                        data.previewImages.map(
                                            (img, idx) => (

                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt="preview"
                                                    className="h-32 w-full object-cover rounded-2xl border border-gray-700"
                                                />

                                            )
                                        )
                                    }

                                </div>

                            )
                        }

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg"
                    >

                        Create Assignment

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateAssignment;