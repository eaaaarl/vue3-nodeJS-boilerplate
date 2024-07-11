<script setup lang="ts">
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const authStore = useAuthStore();
const user = ref(authStore.user);

const router = useRouter();
const route = useRoute();

const logout = () => {
  authStore.logout();
  if (route.meta.requireAuth) {
    router.push({ name: "login-page" });
  }
};
</script>

<template>
  <div class="wrapper">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            {{ user && user.email }}
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button">
              {{ user && user.username }}
            </button>
            <button class="dropdown-item" type="button">Profile</button>
            <button class="dropdown-item" type="button" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </ul>
    </nav>

    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <router-link :to="{ name: 'dashboard-page' }" class="brand-link">
        <img
          src="../assets/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">E-NSTP</span>
      </router-link>

      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              src="../assets/img/user2-160x160.jpg"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#" class="d-block">Administrator</a>
          </div>
        </div>

        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-item">
              <router-link
                :to="{ name: 'dashboard-page' }"
                active-class="active"
                class="nav-link"
              >
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'student-page' }"
                active-class="active"
                class="nav-link"
              >
                <i class="nav-icon fas fa-user"></i>
                <p>Student</p>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

    <footer class="main-footer">
      <strong
        >Copyright &copy; 2014-2021
        <a href="https://adminlte.io">AdminLTE.io</a>.</strong
      >
      All rights reserved.
    </footer>
  </div>
</template>
