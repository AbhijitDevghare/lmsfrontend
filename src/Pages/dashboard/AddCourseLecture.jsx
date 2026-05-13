import { useEffect, useState } from 'react'

import {
    ArrowLeft,
    Upload,
    Video,
    Sparkles,
    BookOpen,
    FileVideo
} from 'lucide-react'

import { useDispatch } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { addLecture } from '../../Redux/slices/LectureSlice'

function AddCourseLecture() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { state } = useLocation()

    useEffect(() => {

        if (!state) {

            navigate("/courses")

        }

        document.title =
            "Add Lecture - Learning Management System"

    }, [])

    const [data, setData] = useState({
        cid: state?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    })

    function handleChange(e) {

        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })

    }

    const handleVideo = (e) => {

        const video = e.target.files[0]

        if (video) {

            const source = window.URL.createObjectURL(video)

            setData({
                ...data,
                lecture: video,
                videoSrc: source
            })

        }

    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        if (
            !data.lecture ||
            !data.title ||
            !data.description
        ) {

            toast.error("All fields are required")

            return

        }

        const res = await dispatch(addLecture(data))

        if (res?.payload?.success) {

            navigate(-1)

            setData({
                cid: state._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })

        }

    }

    return (

        <div className='min-h-screen bg-[#020617] text-white px-4 lg:px-20 py-10'>

            <form
                onSubmit={handleSubmit}
                className='grid lg:grid-cols-2 gap-10 items-start'
            >

                {/* LEFT */}
                <div className='space-y-6'>

                    {/* TOP */}
                    <div className='flex items-center gap-4'>

                        <button
                            type='button'
                            onClick={() => navigate(-1)}
                            className='bg-[#111827] hover:bg-yellow-500 hover:text-black transition-all duration-300 p-3 rounded-2xl border border-gray-700'
                        >

                            <ArrowLeft size={22} />

                        </button>

                        <div>

                            <p className='text-gray-400 text-sm'>
                                Back to Course
                            </p>

                            <h1 className='text-2xl font-bold'>
                                Add New Lecture
                            </h1>

                        </div>

                    </div>

                    {/* VIDEO PREVIEW */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-5 shadow-2xl'>

                        {
                            data.videoSrc ? (

                                <div className='w-full aspect-video rounded-2xl overflow-hidden bg-black border border-gray-700'>

                                    <video
                                        key={data.videoSrc}
                                        controls
                                        controlsList="nodownload"
                                        disablePictureInPicture
                                        className='w-full h-full object-contain'
                                    >

                                        <source
                                            src={data.videoSrc}
                                            type='video/mp4'
                                        />

                                    </video>

                                </div>

                            ) : (

                                <div className='w-full aspect-video rounded-2xl border-2 border-dashed border-yellow-400 flex flex-col justify-center items-center bg-[#0f172a] text-center p-10'>

                                    <Video
                                        size={80}
                                        className='text-yellow-400 mb-5'
                                    />

                                    <h2 className='text-2xl font-bold mb-3'>
                                        Upload Lecture Video
                                    </h2>

                                    <p className='text-gray-400 max-w-md'>
                                        Upload high quality MP4 lecture videos for your students.
                                    </p>

                                </div>

                            )
                        }

                    </div>

                </div>

                {/* RIGHT */}
                <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8'>

                    {/* HEADER */}
                    <div>

                        <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400 w-fit mb-5'>

                            <Sparkles size={18} />

                            <span className='uppercase tracking-widest text-sm font-semibold'>
                                Course Management
                            </span>

                        </div>

                        <h1 className='text-4xl font-bold mb-3'>
                            Create Lecture
                        </h1>

                        <p className='text-gray-400 text-lg'>
                            Add lecture details and upload your course video.
                        </p>

                    </div>

                    {/* VIDEO INPUT */}
                    <div className='space-y-3'>

                        <label
                            htmlFor='lecture'
                            className='flex items-center gap-3 text-lg font-semibold'
                        >

                            <FileVideo
                                className='text-yellow-400'
                                size={22}
                            />

                            Lecture Video

                        </label>

                        <input
                            type='file'
                            name='lecture'
                            id='lecture'
                            accept='video/mp4'
                            onChange={handleVideo}
                            className='file-input file-input-bordered w-full bg-[#1f2937] border-gray-700 text-white rounded-2xl'
                        />

                    </div>

                    {/* TITLE */}
                    <div className='space-y-3'>

                        <label
                            htmlFor='title'
                            className='flex items-center gap-3 text-lg font-semibold'
                        >

                            <BookOpen
                                className='text-yellow-400'
                                size={22}
                            />

                            Lecture Title

                        </label>

                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={data.title}
                            onChange={handleChange}
                            placeholder='Enter lecture title'
                            className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                        />

                    </div>

                    {/* DESCRIPTION */}
                    <div className='space-y-3'>

                        <label
                            htmlFor='description'
                            className='text-lg font-semibold'
                        >
                            Lecture Description
                        </label>

                        <textarea
                            name='description'
                            id='description'
                            value={data.description}
                            onChange={handleChange}
                            rows='7'
                            placeholder='Write lecture description here...'
                            className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 resize-none'
                        ></textarea>

                    </div>

                    {/* BUTTON */}
                    <button
                        type='submit'
                        className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-lg'
                    >

                        <Upload size={22} />

                        Add Lecture

                    </button>

                </div>

            </form>

        </div>

    )

}

export default AddCourseLecture