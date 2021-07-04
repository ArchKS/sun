<template>
  <div
    class="person-info relative flex flex-col justify-evenly items-center"
  >
    <!-- 头像部分 -->
    <div class="header-img">
      <img
        src="@/assets/image/avator.jpg"
        class="cursor-pointer w-32 h-32 rounded-full"
      />
    </div>
    <!-- 名称 -->
    <div class="person-name">
      <div class="name text-3xl m-5 font-bold cursor-pointer">
        {{ username || "" }}
      </div>
    </div>
    <!-- 联系方式 -->
    <div class="connect-tool flex w-1/2 justify-center">
      <a
        class="icon icon-qq hover:text-blue-400"
        :href="userqq"
        target="_blank"
      ></a>
      <a
        class="icon icon-email hover:text-blue-400"
        :href="useremail"
        target="_blank"
      ></a>
      <a
        class="icon icon-GitHub hover:text-blue-400"
        :href="usergithub"
        target="_blank"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    poetryList() {
      if (process.env.VUE_APP_USER_poetry) {
        return process.env.VUE_APP_USER_poetry.split("-").reverse();
      } else {
        return [];
      }
    },
    username() {
      return process.env.VUE_APP_USER_name;
    },
    userqq() {
      return `https://wpa.qq.com/msgrd?v=3&uin=${process.env.VUE_APP_USER_qq}&site=qq&menu=yes`;
    },
    useremail() {
      return `mailto:${process.env.VUE_APP_USER_email}`;
    },
    usergithub() {
      return `${process.env.VUE_APP_USER_github}`;
    },
  },
  mounted() {
    // alert(document.body.offsetWidth)
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.icon {
  font-size: 1.6rem;
  padding: 0 0.8rem;
}
.name {
  margin-top: 0.4rem;
  font-size: 1.4rem;
  font-weight: bold;
}
.person-info{
  border: 1px solid #eee;
  height: 18rem;
  box-shadow: 0px 1rem 7.5rem rgba(34, 35, 58, 0.2);
}
</style>