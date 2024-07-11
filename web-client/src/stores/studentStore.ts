import { defineStore } from "pinia";
import apiClient from "../libs/api-client";

interface Student {
    id: number;
    full_name: string;
    status: string;
    created_at: Date;
    avatar?: string;
}

interface ListStudentPayload {
    page?: number;
    search: string;
}

interface CreateStudentPayload {
    full_name: string;
    status: string;
    avatar?: File | null;
}

interface UpdateStudentPayload {
    studentID: number;
    full_name: string;
    status: string;
    avatar?: File | null;
    _method?: string;
}

export const useStudentStore = defineStore("studentStore", {
    state: () => ({
        students: [] as Student[],
        currentPage: 1,
        perPage: 5,
        totalPages: 0,
        totalItems: 0,
    }),
    actions: {
        async list(payload: ListStudentPayload) {
            try {
                const parameters = apiClient.toURLSearchParams(payload);
                const response = await apiClient.get({
                    route: `students?${parameters}`,
                }) as { data: any };
                const { students, totalItems, totalPages, currentPage } = response.data;
                this.students = students;
                this.totalItems = totalItems;
                this.totalPages = totalPages;
                this.currentPage = Number(currentPage);
                return await apiClient.toReadableResponse("complete", response);
            } catch (e) {
                return await apiClient.toReadableResponse("error", e);
            }
        },
        async create(payload: CreateStudentPayload) {
            try {
                const response = await apiClient.post({
                    route: "students/create",
                    body: payload,
                    transform: "form-data",
                });
                return await apiClient.toReadableResponse("complete", response);
            } catch (e) {
                console.log(e);
                return await apiClient.toReadableResponse("error", e);
            }
        },
        async getStudent(id: number) {
            try {
                const response = await apiClient.get({
                    route: `students/${id}`,
                });
                return await apiClient.toReadableResponse("complete", response);
            } catch (e) {
                return await apiClient.toReadableResponse("error", e);
            }
        },
        async update(payload: UpdateStudentPayload) {
            try {
                const response = await apiClient.put({
                    route: `students/${payload.studentID}`,
                    body: payload,
                    transform: "form-data",
                });
                return await apiClient.toReadableResponse("complete", response);
            } catch (e) {
                return await apiClient.toReadableResponse("error", e);
            }
        },
        async delete(studentID: number) {
            try {
                const response = await apiClient.delete({
                    route: `students/${studentID}`,
                });
                this.students = this.students.filter(student => student.id !== studentID);
                return await apiClient.toReadableResponse("complete", response);
            } catch (e) {
                return await apiClient.toReadableResponse("error", e);
            }
        },
    },
});
