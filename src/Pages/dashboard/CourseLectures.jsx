import { useEffect, useState } from "react";

import {
    ArrowLeft,
    PlayCircle,
    Trash2,
    Pencil,
    Plus,
    BookOpen,
    Sparkles
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

import Switch from "react-switch";

import Footer from "../../components/Footer";

import {
    deleteLecture,
    getLectures
} from "../../Redux/slices/LectureSlice";

import {
    deleteAssignment,
    getCourseAssignments,
        getMySubmissions

} from "../../Redux/slices/AssignmentSlice";

function CourseLectures() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { state } = useLocation();

    const { lectures } = useSelector(
        (state) => state.lecture
    );

    const { assignments, submissions } = useSelector(
    (state) => state.assignment
);
    const { role } = useSelector(
        (state) => state.auth
    );

    const [currentVideo, setCurrentVideo] = useState(0);

    const [autoPlay, setAutoPlay] = useState(
        localStorage.getItem("autoPlay") === "true"
    );



    const [activeTab, setActiveTab] =
        useState("lectures");

        async function fetchData() {

            await dispatch(getLectures(state?._id));

            await dispatch(
                getCourseAssignments(state?._id)
            );

            await dispatch(
                getMySubmissions()
            );

        }

        async function handleDeleteAssignment(id) {

                const res = await dispatch(
                        deleteAssignment(id) 
                                       );

                if (res?.payload?.success) {

                    fetchData();

                }

            }
    async function deleteHandle(cid, lectureId) {

        const data = {
            cid,
            lectureId
        };

        const res = await dispatch(deleteLecture(data));

        if (res?.payload?.success) {

            setCurrentVideo(0);

        }

    }

    function handleVideoEnded() {

        if (
            autoPlay &&
            currentVideo < lectures.length - 1
        ) {

            setCurrentVideo(currentVideo + 1);

        }

    }

    function toggleAutoPlay() {

        const newValue = !autoPlay;

        setAutoPlay(newValue);

        localStorage.setItem(
            "autoPlay",
            newValue.toString()
        );

    }

    function handleClick(idx) {

        setCurrentVideo(idx);

    }

    const splitParagraph = (paragraph) => {

        if (!paragraph) return null;

        const sentences = paragraph.split(".");

        return (

            <ul className="flex flex-col gap-4">

                {
                    sentences.map((sentence, index) => (

                        sentence.trim() && (

                            <li
                                key={index}
                                className="text-gray-300 leading-relaxed list-disc ml-5"
                            >
                                {sentence}
                            </li>

                        )

                    ))
                }

            </ul>

        );

    };

    useEffect(() => {

        if (!state) {

            navigate("/courses");

        } else {

            fetchData();

        }

    }, []);

    useEffect(() => {

        if (
            lectures &&
            lectures[currentVideo]
        ) {

            document.title =
                `${lectures[currentVideo]?.title} - LMS`;

        }

    }, [lectures, currentVideo]);

    return (

        <div className="min-h-screen bg-[#020617] text-white">

            {
                lectures?.length > 0 ? (

                    <div className="grid lg:grid-cols-[70%,30%]">

                        {/* LEFT */}
                        <div className="min-h-screen border-r border-gray-800">

                            {/* TOP BAR */}
                            <div className="sticky top-0 z-20 bg-[#111827]/95 backdrop-blur-md border-b border-gray-800 px-5 lg:px-10 h-20 flex justify-between items-center">

                                <div className="flex items-center gap-5">

                                    <button
                                        onClick={() => navigate(-1)}
                                        className="bg-[#1f2937] hover:bg-yellow-500 hover:text-black transition-all duration-300 p-3 rounded-xl"
                                    >

                                        <ArrowLeft size={22} />

                                    </button>

                                    <div>

                                        <p className="text-gray-400 text-sm">
                                            Now Playing
                                        </p>

                                        <h1 className="font-bold text-lg lg:text-2xl capitalize">
                                            {
                                                lectures[currentVideo]?.title
                                            }
                                        </h1>

                                    </div>

                                </div>

                                {/* AUTOPLAY */}
                                <div className="flex items-center gap-4">

                                    <span className="hidden md:block text-gray-300 font-semibold">
                                        Autoplay
                                    </span>

                                    <Switch
                                        onChange={toggleAutoPlay}
                                        checked={autoPlay}
                                        height={24}
                                        width={48}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onColor="#eab308"
                                    />

                                </div>

                            </div>

                            {/* VIDEO */}
                            <div className="p-4 lg:p-8 space-y-8">

                                <div className="rounded-3xl overflow-hidden border border-gray-700 shadow-2xl w-full max-w-6xl mx-auto aspect-video bg-black">

                                    <video
                                        key={
                                            lectures[currentVideo]
                                                ?.lecture?.secure_url
                                        }
                                        controls
                                        autoPlay={autoPlay}
                                        controlsList="nodownload"
                                        disablePictureInPicture
                                        onEnded={handleVideoEnded}
                                        className="w-full h-full object-contain bg-black"
                                    >

                                        <source
                                            src={
                                                lectures[currentVideo]
                                                    ?.lecture?.secure_url
                                            }
                                            type="video/mp4"
                                        />

                                    </video>

                                </div>

                                {/* OVERVIEW */}
                                <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8 space-y-6">

                                    <div className="flex items-center gap-4">

                                        <Sparkles
                                            className="text-yellow-400"
                                            size={30}
                                        />

                                        <h1 className="text-3xl font-bold">
                                            Lecture Overview
                                        </h1>

                                    </div>

                                    {
                                        splitParagraph(
                                            lectures[currentVideo]
                                                ?.description
                                        )
                                    }

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="h-screen overflow-y-auto bg-[#0f172a]">

                            {/* HEADER */}
                            <div className="sticky top-0 z-20 bg-[#111827]/95 backdrop-blur-md border-b border-gray-800 p-6">

                                <div className="flex items-center gap-4 mb-4">

                                    <BookOpen
                                        className="text-yellow-400"
                                        size={30}
                                    />

                                    <div>

                                        <h1 className="text-2xl font-bold capitalize">
                                            {state?.title}
                                        </h1>

                                        <p className="text-gray-400">
                                            {lectures?.length} Lectures
                                        </p>

                                    </div>

                                </div>

                                {
                                    role === "ADMIN" && (

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/course/${state?.title}/${state?._id}/lectures/addlecture`,
                                                    { state: state }
                                                )
                                            }
                                            className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold py-3 rounded-2xl flex items-center justify-center gap-3"
                                        >

                                            <Plus size={20} />

                                            Add Lecture

                                        </button>

                                    )
                                }

                            </div>

                            {/* TABS */}
                            <div className="flex gap-3 p-5 sticky top-[116px] bg-[#0f172a] z-10 border-b border-gray-800">

                                <button
                                    onClick={() =>
                                        setActiveTab("lectures")
                                    }
                                    className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                        activeTab === "lectures"
                                            ? "bg-yellow-500 text-black"
                                            : "bg-[#111827] text-white border border-gray-700 hover:border-yellow-400"
                                    }`}
                                >
                                    Lectures
                                </button>

                                <button
                                    onClick={() =>
                                        setActiveTab("assignments")
                                    }
                                    className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                        activeTab === "assignments"
                                            ? "bg-yellow-500 text-black"
                                            : "bg-[#111827] text-white border border-gray-700 hover:border-yellow-400"
                                    }`}
                                >
                                    Assignments
                                </button>

                            </div>

                            {/* CONTENT */}
                            <div className="p-5 flex flex-col gap-5">

                                {/* LECTURES */}
                                {
                                    activeTab === "lectures" && (

                                        <>
                                            {
                                                lectures?.map((lecture, idx) => (

                                                    <div
                                                        key={lecture._id}
                                                        onClick={() => handleClick(idx)}
                                                        className={`group border rounded-3xl p-5 cursor-pointer transition-all duration-300 ${
                                                            currentVideo === idx
                                                                ? "bg-yellow-500/10 border-yellow-400"
                                                                : "bg-[#111827] border-gray-700 hover:border-yellow-400"
                                                        }`}
                                                    >

                                                        <div className="flex justify-between items-start gap-4">

                                                            <div className="flex gap-4">

                                                                <div className={`mt-1 ${
                                                                    currentVideo === idx
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-400"
                                                                }`}>

                                                                    <PlayCircle size={26} />

                                                                </div>

                                                                <div>

                                                                    <h2 className="font-semibold text-lg capitalize group-hover:text-yellow-400 transition-all duration-300">
                                                                        {lecture?.title}
                                                                    </h2>

                                                                    <p className="text-sm text-gray-400 mt-1">
                                                                        Lecture {idx + 1}
                                                                    </p>

                                                                </div>

                                                            </div>

                                                            {
                                                                role === "ADMIN" && (

                                                                    <div
                                                                        className="flex gap-3"
                                                                        onClick={(e) =>
                                                                            e.stopPropagation()
                                                                        }
                                                                    >

                                                                        <button
                                                                            className="bg-blue-500/10 hover:bg-blue-500 transition-all duration-300 text-blue-400 hover:text-white p-3 rounded-xl"
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/course/${state?.title}/${state?._id}/lectures/editlecture`,
                                                                                    {
                                                                                        state: lecture
                                                                                    }
                                                                                )
                                                                            }
                                                                        >

                                                                            <Pencil size={18} />

                                                                        </button>

                                                                        <button
                                                                            className="bg-red-500/10 hover:bg-red-500 transition-all duration-300 text-red-400 hover:text-white p-3 rounded-xl"
                                                                            onClick={() =>
                                                                                deleteHandle(
                                                                                    state?._id,
                                                                                    lecture?._id
                                                                                )
                                                                            }
                                                                        >

                                                                            <Trash2 size={18} />

                                                                        </button>

                                                                    </div>

                                                                )
                                                            }

                                                        </div>

                                                    </div>

                                                ))
                                            }
                                        </>

                                    )
                                }

                                {/* ASSIGNMENTS */}
                               {
    activeTab === "assignments" && (

        <>

            {/* ADMIN CREATE BUTTON */}
            {
                role === "ADMIN" && (

                    <button
                        onClick={() =>
                            navigate(
                                `/course/${state?._id}/assignments/create`,
                                {
                                    state: state
                                }
                            )
                        }
                        className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-3"
                    >

                        <Plus size={20} />

                        Create Assignment

                    </button>

                )
            }

            {
                assignments?.length > 0 ? (

                    assignments?.map((assignment) => {

                        const submittedAssignment =
                            submissions?.find(
                                (sub) =>
                                    sub?.assignment?._id ===
                                    assignment?._id
                            );

                        return (

                            <div
                                key={assignment?._id}
                                className="bg-[#111827] border border-gray-700 rounded-3xl p-6 flex flex-col gap-4 hover:border-yellow-400 transition-all duration-300"
                            >

                                {/* TOP */}
                                <div className="flex justify-between items-start gap-4 flex-wrap">

                                    <div>

                                        <h1 className="text-2xl font-bold">
                                            {assignment?.title}
                                        </h1>

                                        <p className="text-gray-400 mt-2">
                                            {assignment?.description}
                                        </p>

                                    </div>

                                    {
    assignment?.attachments?.length > 0 && (

        <div className="flex flex-wrap gap-3 mt-5">

            {
                assignment?.attachments?.map(
                    (file, idx) => (

                        <a
                            key={idx}
                            href={file?.secure_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative overflow-hidden rounded-2xl border border-gray-700 hover:border-yellow-400 transition-all duration-300"
                        >

                            {
                                file?.secure_url?.match(
                                    /\.(jpg|jpeg|png|webp)$/i
                                ) ? (

                                    <img
                                        src={file?.secure_url}
                                        alt="attachment"
                                        className="w-28 h-28 object-cover group-hover:scale-110 transition-all duration-300"
                                    />

                                ) : (

                                    <div className="w-28 h-28 flex items-center justify-center bg-[#1f2937] text-sm text-center p-3">

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

                                    <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500 px-4 py-2 rounded-xl text-sm whitespace-nowrap">

                                        Due:
                                        {" "}
                                        {
                                            new Date(
                                                assignment?.dueDate
                                            ).toLocaleDateString()
                                        }

                                    </span>

                                </div>

                                {/* BOTTOM */}
                                <div className="flex justify-between items-center pt-4 flex-wrap gap-4">

                                    {/* LEFT */}
                                    <div className="flex gap-3 flex-wrap">

                                        <span className="bg-[#1f2937] px-4 py-2 rounded-xl text-sm">

                                            {assignment?.totalMarks} Marks

                                        </span>

                                        {
                                            submittedAssignment && (

                                                <span className={`px-4 py-2 rounded-xl text-sm border ${
                                                    submittedAssignment?.status === "reviewed"
                                                        ? "bg-green-500/10 text-green-400 border-green-500"
                                                        : submittedAssignment?.status === "late"
                                                            ? "bg-red-500/10 text-red-400 border-red-500"
                                                            : "bg-blue-500/10 text-blue-400 border-blue-500"
                                                }`}>

                                                    {
                                                        submittedAssignment?.status === "reviewed"
                                                            ? `Reviewed • ${submittedAssignment?.marks} Marks`
                                                            : submittedAssignment?.status === "late"
                                                                ? "Late Submission"
                                                                : "Submitted"
                                                    }

                                                </span>

                                            )
                                        }

                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex gap-3">

                                        {
                                            submittedAssignment ? (
<button
    onClick={() =>
        navigate(
            `/submission/${submittedAssignment?._id}`,
            {
                state: submittedAssignment
            }
        )
    }
    className="bg-green-500 hover:bg-green-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
>
    View Submission
</button>

                                            ) : (

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/assignment/${assignment?._id}/submit`,
                                                            {
                                                                state: assignment
                                                            }
                                                        )
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
                                                >
                                                    Submit
                                                </button>

                                            )
                                        }

                                        {
                                            role === "ADMIN" && (

                                                <>
    <button
        onClick={() =>
            navigate(
                `/assignment/${assignment?._id}/submissions`,
                {
                    state: assignment
                }
            )
        }
        className="bg-purple-500 hover:bg-purple-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
    >
        View Submissions
    </button>
<button
    onClick={() =>
        navigate(
            `/assignment/${assignment?._id}/edit`,
            {
                state: assignment
            }
        )
    }
    className="bg-blue-500/10 hover:bg-blue-500 transition-all duration-300 text-blue-400 hover:text-white p-3 rounded-xl"
>

    <Pencil size={18} />

</button>
<button
    onClick={() =>
        handleDeleteAssignment(
            assignment?._id
        )
    }
    className="bg-red-500/10 hover:bg-red-500 transition-all duration-300 text-red-400 hover:text-white p-3 rounded-xl"
>

    <Trash2 size={18} />

</button>
</>
                                            )
                                        }

                                    </div>

                                </div>

                            </div>

                        );

                    })

                ) : (

                    <div className="bg-[#111827] border border-gray-700 rounded-3xl p-10 text-center">

                        <h1 className="text-2xl font-bold mb-3">
                            No Assignments Yet
                        </h1>

                        <p className="text-gray-400">
                            Assignments will appear here.
                        </p>

                    </div>

                )
            }

        </>

    )
}
                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="min-h-screen flex flex-col justify-center items-center gap-8 px-4">

                        <div className="bg-[#111827] border border-gray-700 rounded-[2rem] p-10 text-center max-w-xl w-full">

                            <BookOpen
                                className="mx-auto text-yellow-400 mb-6"
                                size={70}
                            />

                            <h1 className="text-4xl font-bold mb-4 capitalize">
                                {state?.title}
                            </h1>

                            <p className="text-gray-400 text-lg mb-8">
                                No lectures available yet.
                            </p>

                        </div>

                    </div>

                )
            }

            <Footer />

        </div>

    );

}

export default CourseLectures;