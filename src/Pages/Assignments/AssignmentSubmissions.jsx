// pages/Assignments/AssignmentSubmissions.jsx

import { useEffect } from "react";

import {
    ArrowLeft,
    Eye,
    CalendarDays,
    Trophy,
    CheckCircle2,
    Clock3,
    AlertTriangle
} from "lucide-react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getAssignmentSubmissions
} from "../../Redux/slices/AssignmentSlice";

function AssignmentSubmissions() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const { state } = useLocation();

    const { submissions } = useSelector(
        (state) => state.assignment
    );

    async function fetchData() {

        await dispatch(
            getAssignmentSubmissions(id)
        );

    }

    useEffect(() => {

        fetchData();

    }, []);

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

            <div className="max-w-6xl mx-auto">

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
                            Assignment Submissions
                        </p>

                        <h1 className="text-3xl font-bold">
                            {state?.title}
                        </h1>

                    </div>

                </div>

                {/* LIST */}
                <div className="flex flex-col gap-5">

                    {
                        submissions?.length > 0 ? (

                            submissions?.map((submission) => (

                                <div
                                    key={submission?._id}
                                    className="bg-[#111827] border border-gray-700 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-yellow-400 transition-all duration-300"
                                >

                                    {/* LEFT */}
                                    <div className="space-y-4">

                                        <div>

                                            <h1 className="text-2xl font-bold">
                                                {
                                                    submission?.student?.name
                                                }
                                            </h1>

                                            <p className="text-gray-400">
                                                {
                                                    submission?.student?.email
                                                }
                                            </p>

                                        </div>

                                        <div className="flex flex-wrap gap-3">

                                            {/* STATUS */}
                                            <span
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm ${
                                                    statusStyles[
                                                        submission?.status
                                                    ]
                                                }`}
                                            >

                                                {
                                                    statusIcons[
                                                        submission?.status
                                                    ]
                                                }

                                                {
                                                    submission?.status
                                                }

                                            </span>

                                            {/* MARKS */}
                                            <span className="bg-[#1f2937] px-4 py-2 rounded-xl text-sm flex items-center gap-2">

                                                <Trophy
                                                    size={16}
                                                />

                                                {
                                                    submission?.marks
                                                } Marks

                                            </span>

                                            {/* DATE */}
                                            <span className="bg-[#1f2937] px-4 py-2 rounded-xl text-sm flex items-center gap-2">

                                                <CalendarDays
                                                    size={16}
                                                />

                                                {
                                                    new Date(
                                                        submission?.submittedAt
                                                    ).toLocaleDateString()
                                                }

                                            </span>

                                        </div>

                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex gap-3">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/submission/${submission?._id}`,
                                                    {
                                                        state:
                                                            submission
                                                    }
                                                )
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold flex items-center gap-3"
                                        >

                                            <Eye size={20} />

                                            View

                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/submission/${submission?._id}/grade`,
                                                    {
                                                        state:
                                                            submission
                                                    }
                                                )
                                            }
                                            className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black px-5 py-3 rounded-xl font-semibold"
                                        >

                                            Grade

                                        </button>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="bg-[#111827] border border-gray-700 rounded-3xl p-10 text-center">

                                <h1 className="text-3xl font-bold mb-3">
                                    No Submissions Yet
                                </h1>

                                <p className="text-gray-400">
                                    Student submissions will appear here.
                                </p>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default AssignmentSubmissions;