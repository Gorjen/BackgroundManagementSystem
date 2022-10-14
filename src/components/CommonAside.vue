<template>
<!-- default-active不是指第一次默认选中，而是每一次默认选中 -->
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="$route.name"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
    @select="handleSelect"
  >
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :index="item.name"
      :key="item.path"
      :ref="item.name"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" index="${item.path}" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.name" :key="subItem.path" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{subItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
import Cookie from "js-cookie";

export default {
  name: "CommonAside",
  data() {
    return {
      // menu: [
      // {
      //   path: "/home",
      //   name: "home",
      //   label: "首页",
      //   icon: "s-home",
      //   url: "Home/Home"
      // },
      // {
      //   path: "/mall",
      //   name: "mall",
      //   label: "商品管理",
      //   icon: "video-play",
      //   url: "MallManage/MallManage"
      // },
      // {
      //   path: "/user",
      //   name: "user",
      //   label: "用户管理",
      //   icon: "user",
      //   url: "UserManage/UserManage"
      // },
      // {
      //   label: "其他",
      //   icon: "location",
      //   children: [
      //     {
      //       path: "/page1",
      //       name: "page1",
      //       label: "页面1",
      //       icon: "setting",
      //       url: "Other/PageOne"
      //     },
      //     {
      //       path: "/page2",
      //       name: "page2",
      //       label: "页面2",
      //       icon: "setting",
      //       url: "Other/PageTwo"
      //     }
      //   ]
      // }
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    initMenu() {
      this.$router
        .push({
          name: "home"
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clickMenu(item) {
      // console.log(item, "item");
      this.$store.commit("selectMenu", item);
    },
    handleSelect(index, indexPath) {
      console.log("index", index, "indexPath", indexPath);
    }
  },
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children);
    },
    hasChildren() {
      return this.menuData.filter(item => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menuData() {
      return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   this.initMenu();
    // });
  }
};
</script>
<style scoped>
.menu-item-selected {
  color: #ffd04b;
}
.menu-item-unselected {
  color: #fff;
}
</style>