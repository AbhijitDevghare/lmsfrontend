// redux/slices/AssignmentSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import axiosInstance from '../../Helpers/AxiosInstance'

const initialState = {
    assignments: [],
    submissions: [],
    loading: false
};

// ================= CREATE ASSIGNMENT =================

export const createAssignment = createAsyncThunk(
    "/assignment/create",
    async (data) => {

        try {

            toast.loading("Wait! creating assignment...", {
                position: "top-center"
            });

            const response = await axiosInstance.post(
                "/assignments/create",
                data
            );

            if (response.status === 201) {

                toast.dismiss();

                toast.success(response.data.message);

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= GET COURSE ASSIGNMENTS =================

export const getCourseAssignments = createAsyncThunk(
    "/assignment/get",
    async (courseId) => {

        try {

            toast.loading("Fetching assignments...", {
                position: "top-center"
            });

            const response = await axiosInstance.get(
                `/assignments/course/${courseId}`
            );

            if (response.status === 200) {

                toast.dismiss();

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= UPDATE ASSIGNMENT =================

export const updateAssignment = createAsyncThunk(
    "/assignment/update",
    async (data) => {

        try {

            toast.loading("Updating assignment...", {
                position: "top-center"
            });

            const response = await axiosInstance.put(
                `/assignments/${data.id}`,
                data
            );

            if (response.status === 200) {

                toast.dismiss();

                toast.success(response.data.message);

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= DELETE ASSIGNMENT =================

export const deleteAssignment = createAsyncThunk(
    "/assignment/delete",
    async (id) => {

        try {

            toast.loading("Deleting assignment...", {
                position: "top-center"
            });

            const response = await axiosInstance.delete(
                `/assignments/${id}`
            );

            if (response.status === 200) {

                toast.dismiss();

                toast.success(response.data.message);

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= SUBMIT ASSIGNMENT =================

export const submitAssignment = createAsyncThunk(
    "/submission/create",
    async (data) => {

        try {

            toast.loading("Submitting assignment...", {
                position: "top-center"
            });

            const formData = new FormData();

            formData.append(
                "submissionText",
                data.submissionText
            );

            if (data.files) {

                Array.from(data.files).forEach((file) => {

                    formData.append("files", file);

                });

            }

            const response = await axiosInstance.post(
                `/submissions/${data.assignmentId}`,
                formData
            );

            if (response.status === 201) {

                toast.dismiss();

                toast.success(response.data.message);

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= GET ASSIGNMENT SUBMISSIONS =================

export const getAssignmentSubmissions = createAsyncThunk(
    "/submission/get",
    async (assignmentId) => {

        try {

            toast.loading("Fetching submissions...", {
                position: "top-center"
            });

            const response = await axiosInstance.get(
                `/submissions/assignment/${assignmentId}`
            );

            console.log(response)
            if (response.status === 200) {

                toast.dismiss();

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= GRADE SUBMISSION =================

export const gradeSubmission = createAsyncThunk(
    "/submission/grade",
    async (data) => {

        try {

            toast.loading("Grading submission...", {
                position: "top-center"
            });

            const response = await axiosInstance.put(
                `/submissions/grade/${data.submissionId}`,
                {
                    marks: data.marks,
                    feedback: data.feedback
                }
            );

            if (response.status === 200) {

                toast.dismiss();

                toast.success(response.data.message);

                return response.data;

            } else {

                toast.dismiss();

                toast.error(response.data.message);

                throw new Error(response.data.message);

            }

        } catch (error) {

            toast.dismiss();

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= GET MY SUBMISSIONS =================

export const getMySubmissions = createAsyncThunk(
    "/submission/student",
    async () => {

        try {

            const response = await axiosInstance.get(
                "/submissions/my-submissions"
            );

            return response.data;

        } catch (error) {

            toast.error(error?.response?.data?.message);

            throw error;

        }

    }
);

// ================= SLICE =================

const assignmentSlice = createSlice({

    name: "assignment",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(
            getCourseAssignments.fulfilled,
            (state, action) => {

                state.assignments =
                    action.payload?.assignments;

            }
        );

        builder.addCase(
            getAssignmentSubmissions.fulfilled,
            (state, action) => {

                state.submissions =
                    action.payload?.submissions;

            }
        );

        builder.addCase(
            getMySubmissions.fulfilled,
            (state, action) => {

                state.submissions =
                    action.payload?.submissions;

            }
        );

    }

});

export default assignmentSlice.reducer;