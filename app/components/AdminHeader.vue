<template>
  <header class="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
    <div class="flex-none">
      <button
        @click="$emit('toggle-sidebar')"
        class="btn btn-ghost btn-square lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>

    <div class="flex-1">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li v-if="currentPage">{{ currentPage }}</li>
        </ul>
      </div>
    </div>

    <div class="flex-none gap-2">
      <button @click="viewSite" class="btn btn-ghost btn-sm gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="hidden md:inline">View Site</span>
      </button>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm gap-2">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-8">
              <span class="text-sm">{{ userInitial }}</span>
            </div>
          </div>
          <span class="hidden md:inline">{{ userName }}</span>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3"
        >
          <li>
            <NuxtLink to="/admin/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Profile
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Settings
            </NuxtLink>
          </li>
          <li class="menu-title"><span></span></li>
          <li>
            <button @click="logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(["toggle-sidebar"]);

const route = useRoute();
const router = useRouter();

const userName = ref("Admin User");
const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

const currentPage = computed(() => {
  const path = route.path;
  if (path === "/admin") return "Dashboard";
  const parts = path.split("/");
  const page = parts[parts.length - 1];
  return page.charAt(0).toUpperCase() + page.slice(1);
});

const viewSite = () => {
  window.open("/", "_blank");
};

const logout = async () => {
  // TODO: Implement logout logic
  await router.push("/admin/login");
};
</script>
