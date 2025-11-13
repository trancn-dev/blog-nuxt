<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl gap-2">
        <span class="text-3xl">👨‍💻</span>
        <span class="font-bold text-primary">Portfolio</span>
      </NuxtLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-2">
        <li><NuxtLink to="/" class="btn btn-ghost">Trang chủ</NuxtLink></li>
        <li><a href="/#about" class="btn btn-ghost">Về tôi</a></li>
        <li><a href="/#projects" class="btn btn-ghost">Dự án</a></li>
        <li><NuxtLink to="/posts" class="btn btn-ghost">Blog</NuxtLink></li>
        <li><a href="/#contact" class="btn btn-ghost">Liên hệ</a></li>
      </ul>
    </div>

    <div class="navbar-end">
      <div class="dropdown dropdown-end lg:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
        >
          <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
          <li><a href="/#about">Về tôi</a></li>
          <li><a href="/#projects">Dự án</a></li>
          <li><NuxtLink to="/posts">Blog</NuxtLink></li>
          <li><a href="/#contact">Liên hệ</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup></script>
