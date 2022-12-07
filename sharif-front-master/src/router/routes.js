const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "auth/student",
        component: () => import("pages/StudentAuth.vue"),
      },
      {
        path: "auth/admin",
        component: () => import("pages/AdminAuth.vue"),
      },
    ],
  },
  {
    path: "/student",
    component: () => import("layouts/StudentLayout.vue"),
    children: [
      { path: "", component: () => import("pages/student/IndexPage.vue") },
      { path: "home", component: () => import("pages/student/HomePage.vue") },
      { path: "form", component: () => import("pages/student/FormPage.vue") },
      { path: "msg", component: () => import("pages/student/StudentMsgPage.vue") },
    ],
  },
  { path: "/form/pdf/:id", component: () => import("pages/student/FormPdfPage") },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/IndexPage.vue") },
      { path: "home", component: () => import("pages/admin/HomePage.vue") },

      {
        path: "courses/add-by-excel",
        component: () => import("pages/admin/courses/AddByExcel.vue"),
      },
      {
        path: "courses/add-manual",
        component: () => import("pages/admin/courses/AddManual.vue"),
      },
      {
        path: "courses",
        component: () => import("pages/admin/courses/IndexPage.vue"),
      },
      {
        path: "aoa/add",
        component: () => import("pages/admin/aoa/AddManual.vue"),
      },
      {
        path: "aoa",
        component: () => import("pages/admin/aoa/IndexPage.vue"),
      },
      {
        path: "faculty/add",
        component: () => import("pages/admin/faculty/AddFaculty.vue"),
      },
      {
        path: "faculty",
        component: () => import("pages/admin/faculty/IndexPage.vue"),
      },
      {
        path: "field/add",
        component: () => import("pages/admin/field/AddField.vue"),
      },
      {
        path: "field",
        component: () => import("pages/admin/field/IndexPage.vue"),
      },
      {
        path: "semester/add-view",
        component: () => import("pages/admin/semester/AddAndViewSemester.vue"),
      },
      {
        path: "students",
        component: () => import("pages/admin/students/StudentList.vue"),
      },
      {
        path: "students/:id",
        component: () => import("pages/admin/students/StudentPage.vue"),
      },
    ],
  },
  {
    path: "/faculty",
    component: () => import("layouts/FacultyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/faculty/IndexPage.vue") },
      { path: "msg", component: () => import("pages/faculty/MsgPage") },
      {
        path: "form-list",
        component: () => import("pages/faculty/FormList.vue"),
      },
      {
        path: "form/:id",
        component: () => import("pages/faculty/FormPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
