// pages/Assignments/EditAssignment.jsx

import { useState } from "react";

import {
    ArrowLeft,
    ClipboardList,
    Calendar,
    Trophy,
    FileText,
    Save
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

import {
    updateAssignment
} from "../../Redux/slices/AssignmentSlice";

function EditAssignment() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const { state } = useLocation();

    const [data, setData] = useState({

        title:
            state?.title || "",

        description:
            state?.description || "",

        dueDate:
            state?.dueDate
                ?.split("T")[0] || "",

        totalMarks:
            state?.totalMarks || 100,

        attachments: [],

        previewImages:
            state?.attachments || []

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
                (file) => ({

                    secure_url:
                        URL.createObjectURL(file)

                })
            )

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const formData =
            new FormData();

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

            updateAssignment({

                id,

                formData

            })

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
                        onClick={() =>
                            navigate(-1)
                        }
                        className="bg-[#111827] hover:bg-yellow-500 hover:text-black transition-all duration-300 p-3 rounded-2xl border border-gray-700"
                    >

                        <ArrowLeft size={22} />

                    </button>

                    <div>

                        <p className="text-gray-400 text-sm">
                            Update Assignment
                        </p>

                        <h1 className="text-3xl font-bold">
                            Edit Assignment
                        </h1>

                    </div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8"
                >

                    {/* TITLE */}
                    <div className="space-y-3">

                        <label
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
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Enter assignment title"
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                        />

                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-3">

                        <label
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <FileText
                                className="text-yellow-400"
                                size={22}
                            />

                            Assignment Description

                        </label>

                        <textarea
                            rows="7"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Write assignment details..."
                            className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 resize-none"
                        ></textarea>

                    </div>

                    {/* DATE + MARKS */}
                    <div className="grid lg:grid-cols-2 gap-6">

                        {/* DATE */}
                        <div className="space-y-3">

                            <label
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
                                value={data.dueDate}
                                onChange={handleChange}
                                className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                            />

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

                                Total Marks

                            </label>

                            <input
                                type="number"
                                name="totalMarks"
                                value={data.totalMarks}
                                onChange={handleChange}
                                className="w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300"
                            />

                        </div>

                    </div>

                    {/* FILES */}
                    <div className="space-y-3">

                        <label
                            className="flex items-center gap-3 text-lg font-semibold"
                        >

                            <FileText
                                className="text-yellow-400"
                                size={22}
                            />

                            Replace Attachments

                        </label>

                        <input
                            type="file"
                            multiple
                            onChange={handleFiles}
                            className="file-input file-input-bordered w-full bg-[#1f2937] border-gray-700 text-white rounded-2xl"
                        />

                    </div>

                    {/* PREVIEW */}
                    {
                        data.previewImages?.length > 0 && (

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                                {
                                    data.previewImages.map(
                                        (file, idx) => (

                                            <a
                                                key={idx}
                                                href={
                                                    file?.secure_url
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group relative overflow-hidden rounded-2xl border border-gray-700 hover:border-yellow-400 transition-all duration-300"
                                            >

                                                {
                                                    file?.secure_url?.match(
                                                        /\.(jpg|jpeg|png|webp)$/i
                                                    ) ? (

                                                        <img
                                                            src={
                                                                file?.secure_url
                                                            }
                                                            alt="attachment"
                                                            className="w-full h-32 object-cover group-hover:scale-110 transition-all duration-300"
                                                        />

                                                    ) : (

                                                        <div className="w-full h-32 flex items-center justify-center bg-[#1f2937] text-sm text-center p-3">

                                                            Attachment
                                                            {" "}
                                                            {idx + 1}

                                                        </div>

                                                    )
                                                }

                                            </a>

                                        )
                                    )
                                }

                            </div>

                        )
                    }

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3"
                    >

                        <Save size={22} />

                        Save Changes

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditAssignment;