// pages/Assignments/ViewSubmission.jsx

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    Trophy,
    AlertTriangle
} from "lucide-react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

function ViewSubmission() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const statusStyles = {

        reviewed:
            "bg-green-500/10 text-green-400 border-green-500",

        late:
            "bg-red-500/10 text-red-400 border-red-500",

        pending:
            "bg-blue-500/10 text-blue-400 border-blue-500"

    };

    const statusIcons = {

        reviewed: <CheckCircle2 size={18} />,

        late: <AlertTriangle size={18} />,

        pending: <Clock3 size={18} />

    };

    return (

        <div className="min-h-screen bg-[#020617] text-white px-4 lg:px-20 py-10">

            <div className="max-w-5xl mx-auto">

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
                            Student Submission
                        </p>

                        <h1 className="text-3xl font-bold">
                            View Submission
                        </h1>

                    </div>

                </div>

                {/* MAIN CARD */}
                <div className="bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8">

                    {/* TOP */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                        <div>

                            <h1 className="text-4xl font-bold mb-3">
                                {
                                    state?.assignment?.title ||
                                    "Assignment Submission"
                                }
                            </h1>

                            <p className="text-gray-400 text-lg">
                                Submitted assignment details and evaluation.
                            </p>

                        </div>

                        {/* STATUS */}
                        <div
                            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border w-fit ${
                                statusStyles[
                                    state?.status
                                ]
                            }`}
                        >

                            {
                                statusIcons[
                                    state?.status
                                ]
                            }

                            <span className="font-semibold capitalize">
                                {state?.status}
                            </span>

                        </div>

                    </div>

                    {/* STATS */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* DATE */}
                        <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-6">

                            <div className="flex items-center gap-3 mb-4">

                                <CalendarDays
                                    className="text-yellow-400"
                                    size={24}
                                />

                                <h2 className="text-lg font-semibold">
                                    Submitted On
                                </h2>

                            </div>

                            <p className="text-gray-300">
                                {
                                    new Date(
                                        state?.createdAt
                                    ).toLocaleString()
                                }
                            </p>

                        </div>


{
    state?.assignment?.attachments?.length > 0 && (

        <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
                Assignment Attachments
            </h2>

            <div className="flex flex-col gap-4">

                {
                    state?.assignment?.attachments?.map(
                        (file, idx) => (

                            <a
                                key={idx}
                                href={file?.secure_url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#111827] hover:border-yellow-400 border border-gray-700 transition-all duration-300 px-5 py-4 rounded-2xl"
                            >

                                Attachment {idx + 1}

                            </a>

                        )
                    )
                }

            </div>

        </div>

    )
}
                        {
    state?.files?.length > 0 && (

        <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
                Assignment Submission
            </h2>

            <div className="flex flex-col gap-4">

                {
                    state?.files?.map(
                        (file, idx) => (

                            <a
                                key={idx}
                                href={file?.secure_url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#111827] hover:border-yellow-400 border border-gray-700 transition-all duration-300 px-5 py-4 rounded-2xl"
                            >

                                Attachment {idx + 1}

                            </a>

                        )
                    )
                }

            </div>

        </div>

    )
}




                        {/* MARKS */}
                        <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-6">

                            <div className="flex items-center gap-3 mb-4">

                                <Trophy
                                    className="text-yellow-400"
                                    size={24}
                                />

                                <h2 className="text-lg font-semibold">
                                    Marks
                                </h2>

                            </div>

                            <p className="text-3xl font-bold">

                                {
                                    state?.marks !== undefined
                                        ? state?.marks
                                        : "--"
                                }

                            </p>

                        </div>

                        {/* STATUS */}
                        <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-6">

                            <div className="flex items-center gap-3 mb-4">

                                <CheckCircle2
                                    className="text-yellow-400"
                                    size={24}
                                />

                                <h2 className="text-lg font-semibold">
                                    Review Status
                                </h2>

                            </div>

                            <p className="capitalize text-gray-300">
                                {state?.status}
                            </p>

                        </div>

                    </div>

                    {/* SUBMISSION TEXT */}
                    <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-8">

                        <div className="flex items-center gap-3 mb-5">

                            <FileText
                                className="text-yellow-400"
                                size={24}
                            />

                            <h2 className="text-2xl font-bold">
                                Submission Text
                            </h2>

                        </div>

                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">

                            {
                            
                                state?.assignment?.description ||
                                "No submission text provided."
                            }

                        </p>

                    </div>

                    {/* FEEDBACK */}
                    <div className="bg-[#1f2937] border border-gray-700 rounded-2xl p-8">

                        <div className="flex items-center gap-3 mb-5">

                            <CheckCircle2
                                className="text-yellow-400"
                                size={24}
                            />

                            <h2 className="text-2xl font-bold">
                                Instructor Feedback
                            </h2>

                        </div>

                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">

                            {
                                state?.feedback ||
                                "Feedback not available yet."
                            }

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ViewSubmission;