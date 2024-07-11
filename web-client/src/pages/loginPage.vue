<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const defaultForm = {
  username: "",
  password: "",
};
const form = ref(defaultForm);
const formLoading = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const onSubmitForm = async () => {
  try {
    formLoading.value = true;

    const result = await authStore.login(form.value);
    console.log(result.success);
    if (result.success) {
      toast.success("Login Successfully");
      router.push({ name: "dashboard-page" });
    } else {
      toast.error(result.message || "Login failed");
    }
  } catch (e) {
    /*  console.error("Login error:", e); */
    toast.error("Failed to login. Please try again.");
  } finally {
    formLoading.value = false;
  }
};
</script>

<template>
  <div class="login-box">
    <div class="login-logo">
      <a href=""><b>E-</b>NSTP</a>
    </div>

    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>
        <form @submit.prevent="onSubmitForm">
          <div class="input-group mb-3">
            <input
              v-model="form.username"
              type="text"
              class="form-control"
              placeholder="Username"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-block">
                <template v-if="formLoading">
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </template>
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
