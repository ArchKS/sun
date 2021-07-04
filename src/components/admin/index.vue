<template>
  <div class="admin-panel">
    <div class="slidebar">
      <div class="logo">
        <!-- <a href=""></a> -->
        <img class="avator" src="@/assets/image/avator.jpg" alt="" />
      </div>
      <ul>
        <li><a href="javascript:;" id="targeted">dashboard</a></li>
        <li><a href="javascript:;">pages</a></li>
        <li><a href="javascript:;">links</a></li>
        <li><a href="javascript:;">comments</a></li>
        <li><a href="javascript:;">users</a></li>
        <li><a href="javascript:;">tools</a></li>
        <li><a href="javascript:;">settings</a></li>
      </ul>
    </div>
    <div class="main">
      <div class="mainContent">
        <div id="admin-table">
          <admin-table></admin-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminTable from "@/components/admin/AdminTable.vue";

export default {
  components: {
    AdminTable,
  },
  created() {
    // console.log("1 admin mounted ");
    // let cookie = this.getCookie();
    // if (cookie.length === 0) {
    //   this.jumpto("/login");
    // }
  },
};
</script>
<style lang='scss' scoped>
.admin-panel {
  width: 70%;
  height: 78vh;
  margin: 5rem auto;
  .slidebar {
    width: 20%;
    height: 78vh;
    float: left;
    border-right: 1px solid rgb(235, 235, 235);
    background-color: rgb(247, 247, 247);
    .logo {
      height: 145px;
      border-bottom: 1px solid rgb(235, 235, 235);
      display: flex;
      justify-content: center;
      align-items: center;
      .avator {
        width: 7rem;
      }
    }
    ul {
      padding: 0;
      margin: 0;
      a {
        color: rgb(140, 140, 140);
        text-decoration: none;
        font: 16px/40px helvetica, verdana, sans-serif;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(235, 235, 235);
        display: block;
        box-shadow: inset 0 1px 0 rgb(255, 255, 255);
        text-indent: 20px;
        text-transform: capitalize;
      }
    }
    li {
      list-style-type: none;
      margin: 0;
      position: relative;
      &::before {
        content: "";
        font-family: "icomoon";
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        position: absolute;
        display: block;
        line-height: 40px;
        color: rgb(102, 102, 102);
        right: 20px;
        -webkit-font-smoothing: antialiased;
      }
      &:hover {
        a {
          background-color: rgb(255, 255, 255);
          box-shadow: 1px 0 0 rgb(255, 255, 255),
            inset 5px 0 0 -1px rgb(234, 83, 63);
        }
      }
    }
  }
  .main {
    float: left;
    width: 79%;
    height: 78vh;
    background-color: rgb(255, 255, 255);
    position: relative;
    font-family: helvetica, verdana, sans-serif;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        width: 0;
    }
  }
}
</style>