<script setup lang="ts">
import { useStudentStore } from "../stores/studentStore";
import { onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import ContentHeader from "../components/ContentHeader.vue";

const studentStore = useStudentStore();
const toast = useToast();

const currentPage = computed(() => studentStore.currentPage);
const totalPages = computed(() => studentStore.totalPages);

let searchQuery = "";

const handleSearch = () => {
  studentStore.list({ page: currentPage.value, search: searchQuery });
};

const onDelete = async (id: number) => {
  const result = await studentStore.delete(id);
  if (result?.success) {
    toast.success("Student Successfully Deleted.");
    await studentStore.list({ page: currentPage.value, search: searchQuery });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    studentStore.list({ page: currentPage.value + 1, search: searchQuery });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    studentStore.list({ page: currentPage.value - 1, search: searchQuery });
  }
};

const fetchStudents = () => {
  studentStore.list({ page: currentPage.value, search: searchQuery });
};

onMounted(fetchStudents);
</script>

<template>
  <ContentHeader title="Student" />
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-lg-6">
              <router-link
                :to="{
                  name: 'student-form-page',
                  params: { operation: 'new' },
                }"
                class="btn btn-dark"
                >Create Student</router-link
              >
            </div>
            <div class="col-lg-6">
              <div class="search-input">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  v-model="searchQuery"
                  @input="handleSearch"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <!-- Table Headers -->
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <!-- Table Rows -->
                <tr
                  v-for="(student, index) in studentStore.students"
                  :key="index"
                >
                  <td>{{ student.id }}</td>
                  <td>{{ student.full_name }}</td>
                  <td>
                    <span
                      :class="{
                        'badge badge-success': student.status === 'Active',
                        'badge badge-danger': student.status === 'Inactive',
                      }"
                    >
                      {{ student.status }}
                    </span>
                  </td>
                  <td>
                    {{ new Date(student.created_at).toLocaleDateString() }}
                  </td>
                  <td>
                    <!-- Edit and Delete Actions -->
                    <router-link
                      :to="{
                        name: 'student-form-page',
                        params: { operation: 'edit' },
                        query: { studentID: student.id },
                      }"
                      class="btn btn-primary"
                      >Edit</router-link
                    >
                    <button
                      @click="onDelete(student.id)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Pagination Controls -->
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-primary mr-2"
                @click="prevPage"
                :disabled="currentPage <= 1"
              >
                Previous
              </button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button
                class="btn btn-primary ml-2"
                @click="nextPage"
                :disabled="currentPage >= totalPages"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-input {
  width: 300px;
  margin-left: auto;
}
</style>
