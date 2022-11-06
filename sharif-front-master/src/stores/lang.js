import { defineStore } from "pinia";

export const useLangStore = defineStore("lang", {
  state: () => ({
    lang: "fa",
  }),

  getters: {
    getMenu(state) {
      if (state.lang === "fa")
        return [
          {
            title: "داشبورد",
            icon: "fas fa-grip-vertical",

            subMenu: [
              {
                title: "خانه",
                icon: "far fa-home-user",
                link: "/student/home",
              },
            ],
          },
          {
            title: "فرم ها",
            icon: "fas fa-grip-vertical",
            subMenu: [
              {
                title: "فرم تطبیق واحد",
                icon: "far fa-plus-square",
                link: "form",
              },
            ],
          },
        ];

      return [
        {
          title: "forms",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: "checking equality of coursers",
              icon: "far fa-plus-square",
              link: "form",
            },
          ],
        },
      ];
    },
    getAdminMenu() {
      return [
        {
          title: "مدیریت درس ها",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: "ایجاد دروس جدید توسط فایل اکسل",
              icon: "far fa-plus-square",
              link: "/admin/courses/add-by-excel",
            },
            // {
            //   title: "ایجاد درس جدید بصورت درستی",
            //   icon: "far fa-plus-square",
            //   link: "/admin/courses/add-manual",
            // },
            {
              title: "مشاهده و ویرایش دروس ایجاد شده",
              icon: "far fa-plus-square",
              link: "/admin/courses/",
            },
          ],
        },
        {
          title: "حوضه های فعالیت",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: " ایجاد حوضه فعالیت جدید",
              icon: "far fa-plus-square",
              link: "/admin/aoa/add",
            },
            {
              title: "مشاهده و ویرایش حوضه های فعالیت",
              icon: "far fa-plus-square",
              link: "/admin/aoa",
            },
          ],
        },
        {
          title: "مدیریت کاربران",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: " ایجاد کاربر جدید",
              icon: "far fa-plus-square",
              link: "/admin/faculty/add",
            },
            {
              title: "مشاهده و ویرایش کاربرها",
              icon: "far fa-plus-square",
              link: "/admin/faculty",
            },
          ],
        },
        {
          title: "مدیریت رشته ها",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: " ایجاد رشته جدید جدید",
              icon: "far fa-plus-square",
              link: "/admin/field/add",
            },
            {
              title: "مشاهده و حذف رشته ها",
              icon: "far fa-plus-square",
              link: "/admin/field",
            },
          ],
        },
        {
          title: "مدیریت دانشجو ها",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: "مشاهده و مدیریت دانشجو ها",
              icon: "far fa-plus-square",
              link: "/admin/students",
            },
          ],
        },
        {
          title: "مدیریت نیم سال ها",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: "مشاهده و اضاقه کردن نیم سال",
              icon: "far fa-plus-square",
              link: "/admin/semester/add-view",
            },
          ],
        },
      ];
    },
    getFacultyMenu() {
      return [
        {
          title: "مدیریت فرم ها",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: "لیست فرم ها",
              icon: "far fa-plus-square",
              link: "/faculty/form-list",
            },

          ],
        },
        {
          title: "مدیریت پیام ها",
          icon: "fas fa-grip-vertical",
          subMenu: [
            {
              title: "لیست پیام ها",
              icon: "far fa-plus-square",
              link: "/faculty/msg",
            },
            // {
            //   title: "ایجاد درس جدید بصورت درستی",
            //   icon: "far fa-plus-square",
            //   link: "/admin/courses/add-manual",
            // },
            // {
            //   title: "مشاهده و ویرایش دروس ایجاد شده",
            //   icon: "far fa-plus-square",
            //   link: "/admin/courses/",
            // },
          ],
        },
      ];
    },

    getBasicInfoForm(state) {
      if (state.lang === "fa")
        return {
          first_name: "نام",
          last_name: "نام خانوادگی",
          field: "رشته",
          degree: "مقطع",
          sex: "جنسیت",
          student_code: "شماره دانشجویی",
          national_code: "کد ملی",
          semester: "سال ورود",
          submit: "ارسال",
          title: "اطلاعات دانشجو",
          fieldItems: [
            { label: "مهندسی کامپیوتر", value: "cs" },
            { label: "مهندسی عمران", value: "ce" },
            { label: "مهندسی مکانیک", value: "me" },
            { label: "مهندسی صتایع", value: "ie" },
            { label: "مهندسی هوافضا", value: "ae" },
          ],
          sexItems: [
            { label: "مرد", value: "m" },
            { label: "زن", value: "f" },
          ],
          degreeItems: [
            { label: "کارشناسی ارشد", value: "ms" },
            { label: "کارشناسی", value: "bs" },
            { label: "دکترا", value: "phd" },
          ],
        };

      return {
        first_name: "name",
        last_name: "last name",
        field: "field",
        degree: "degree",
        sex: "sex",
        student_code: "student number",
        national_code: "national code",
        semester: "year of entrance",
        submit: "submit",
        title: "student info",
        fieldItems: [
          { label: "Computer Engineering", value: "cs" },
          { label: "Civil Engineering", value: "ce" },
          { label: "Mechanical Engineering", value: "me" },
          { label: "Industrial Engineering", value: "ie" },
          { label: "Aerospace Engineering", value: "ae" },
        ],
        sexItems: [
          { label: "male", value: "m" },
          { label: "female", value: "f" },
        ],
        degreeItems: [
          { label: "Master's degree", value: "ms" },
          { label: "bachelor's degree", value: "bs" },
          { label: "PHD", value: "phd" },
        ],
      };
    },
    getStudentLogin(state) {
      if (state.lang === "fa")
        return {
          student_code: "شماره دانشجویی",
          national_code: "کد ملی",
          user_code: "کد کاربری",
          password: "رمز عبور",
          admin: "ورود ادمین",
          faculty: "ورود کارکنان",
          submit: "ارسال",
          back: "قبلی",
        };

      return {
        student_code: "student number",
        national_code: "national code",
        user_code: "user code",
        password: "password",
        admin: "ورود ادمین",
        faculty: "ورود کارکنان",
        submit: "submit",
        back: "back",
      };
    },

    getAdminLogin(state) {
      if (state.lang === "fa")
        return {
          student_code: "کد",
          national_code: "رمز عبور",
          submit: "ارسال",
        };

      return {
        student_code: "code",
        national_code: "password",
        submit: "submit",
      };
    },
    getStudentForm(state) {
      if (state.lang === "fa")
        return {
          title: "فرم تطبیق",
          course: "درس",
          vahed: "واحد",

          search: "نام یا کد درس",
          course_name: "نام درس",
          course_mark: "نمره",
          course_code: "کد درس",
          semester: "نیمسال",
          considerations: "ملاحظات",

          student_code: "شماره دانشجویی",
          national_code: "کد ملی",
          submit: "ارسال",

          notify_error_add_before: "این درس قبلا اضافه شده است",
        };

      return {
        title: "form to check equality",
        course: "course",
        vahed: "unit",

        search: "course name or code",
        course_name: "course name",
        course_mark: "mark",
        course_code: "code",
        semester: "semester",
        considerations: "considerations",

        student_code: "student number",
        national_code: "national code",
        submit: "submit",

        notify_error_add_before: "you add this course already",
      };
    },
  },

  actions: {
    changeLang(newLang) {
      this.counter = newLang;
    },
  },
});
