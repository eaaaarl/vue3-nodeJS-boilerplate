<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ContentHeader from "../components/ContentHeader.vue";
import { useStudentStore } from "../stores/studentStore";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

const studentStore = useStudentStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const operation: any = ref(route.params.operation);
const studentID: any = ref(route.query.studentID);

const formTitle = computed(() => {
  return operation.value === "new" ? "Create new Student" : "Edit Student";
});

const showCreateButton = computed(() => {
  return operation.value === "new";
});

const showUpdateButton = computed(() => {
  return operation.value === "edit";
});

const form = ref({
  full_name: "",
  status: "",
  avatar: null,
});

const getImageUrl = (avatar: any) => {
  if (!avatar) return "";
  if (typeof avatar === "string") {
    return `http://localhost:3002/api/${avatar}`;
  } else if (avatar instanceof File) {
    try {
      return URL.createObjectURL(avatar);
    } catch (error) {
      console.error("Error creating object URL:", error);
      return "";
    }
  } else {
    console.warn("Unsupported avatar type:", typeof avatar);
    return "";
  }
};

const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: any) => {
  form.value.avatar = event.target.files[0];
};

watch(
  () => route.params.operation,
  () => {
    window.location.reload();
  }
);

watch(
  () => route.query.studentID,
  () => {
    window.location.reload();
  }
);

const formLoading = ref(false);
let error = ref<string | null>(null);

const getStudent = async () => {
  const result = await studentStore.getStudent(studentID.value);

  if (result.success) {
    const student = result.data;
    form.value.full_name = student.full_name;
    form.value.status = student.status;
    form.value.avatar = student.avatar;
  }
};

const resetForm = () => {
  form.value = {
    full_name: "",
    status: "",
    avatar: null,
  };
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const onSubmitForm = async () => {
  formLoading.value = true;
  const payload = {
    full_name: form.value.full_name,
    status: form.value.status,
    avatar: form.value.avatar,
  };
  try {
    const response = await studentStore.create(payload);
    if (response.success) {
      toast.success("Student Successfully Created.");
      resetForm();
      error.value = null;
    } else if (response.error && Array.isArray(response.error)) {
      const errorMessages = response.error
        .map((error: any) => error.msg)
        .join(" ");
      error.value = errorMessages;
    }
  } catch (err) {
    console.log("Error creating student", err);
  }
  formLoading.value = false;
};

const onUpdateForm = async () => {
  const payload = {
    ...form.value,
    studentID: studentID.value,
  };
  try {
    const result = await studentStore.update(payload);
    if (result.success) {
      toast.success("Student Successfully Updated.");
      await router.push({ name: "student-page" });
    } else if (result.error && Array.isArray(result.error)) {
      const errorMessages = result.error
        .map((error: any) => error.msg)
        .join("\n");
      error.value = errorMessages;
    }
  } catch (err) {
    console.log("Error updating student", err);
  }
};

if (operation.value === "edit") {
  getStudent();
}
</script>

<template>
  <ContentHeader :title="formTitle" />
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'student-page' }" class="btn btn-dark">
            Back
          </router-link>
        </div>

        <div class="card-body">
          <template v-if="!!error">
            <div class="alert alert-danger" role="alert">
              <h5>
                <strong
                  ><i class="fas fa-exclamation-triangle"></i> Request
                  Error</strong
                >
              </h5>
              <ul class="error-list">
                <li v-for="(errorMsg, index) in error.split('. ')" :key="index">
                  {{ errorMsg }}
                </li>
              </ul>
            </div>
          </template>
          <div class="form-group mb-3">
            <label for="">Full Name</label>
            <div class="input-group-prepend"></div>
            <input
              v-model="form.full_name"
              type="text"
              class="form-control valid"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div class="form-group mb-3">
            <label for="">Avatar</label>
            <div class="input-group-prepend"></div>
            <input
              ref="fileInput"
              @change="onFileChange"
              type="file"
              class="form-control"
            />
          </div>
          <div class="form-group mb-3">
            <img
              v-if="form.avatar"
              :src="getImageUrl(form.avatar)"
              class="img-fluid elevation-3"
              width="350"
            />
          </div>
          <label for="">Status</label>
          <div class="form-group mb-3">
            <div class="form-check form-check-inline">
              <input
                v-model="form.status"
                class="form-check-input"
                type="radio"
                value="Active"
              />
              <label class="form-check-label">Active</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                v-model="form.status"
                class="form-check-input"
                type="radio"
                value="Inactive"
              />
              <label class="form-check-label">Inactive</label>
            </div>
          </div>
          <button
            v-if="showCreateButton"
            :disabled="formLoading"
            @click="onSubmitForm"
            class="btn btn-primary"
            id="liveToastBtn"
          >
            <template v-if="formLoading">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </template>
            Create
          </button>
          <button
            v-if="showUpdateButton"
            :disabled="formLoading"
            @click="onUpdateForm"
            class="btn btn-primary"
            id="liveToastBtn"
          >
            <template v-if="formLoading">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </template>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-list {
  list-style-type: none;
  padding-left: 0;
  padding-bottom: 0;
}
</style>
