<template>
  <div class="manage" style="height: 80%;">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :inline="true" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header" style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center;">
      <el-button type="primary" @click="handleAdd()">+ 新增</el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table" style="height: 100%;">
      <el-table stripe :data="tableData" style="width: 100%; margin-top: 30px;" height="90%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.sex === 1? "男" : "女"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column prop="sex" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="size"
          :hide-on-single-page="true"
          @current-change="handlePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, deleteUser } from "../../api/data.js";
import { MessageBox, Message } from "element-ui";

export default {
  name: "UserPage",
  data() {
    return {
      dialogVisible: false,
      // dialog_info: [
      //   {
      //     model: "name",
      //     label: "姓名",
      //     type: "input"
      //   },
      //   {
      //     model: "age",
      //     label: "年龄",
      //     type: "input"
      //   },
      //   {
      //     model: "sex",
      //     label: "性别",
      //     type: "select",
      //     opts: [
      //       {
      //         label: "男",
      //         value: 1
      //       },
      //       {
      //         label: "女",
      //         value: 2
      //       }
      //     ]
      //   },
      //   {
      //     model: "birth",
      //     label: "出生日期",
      //     type: "date"
      //   },
      //   {
      //     model: "addr",
      //     label: "地址",
      //     type: "input"
      //   }
      // ],
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名"
          }
        ],
        age: [
          {
            required: true,
            message: "请输入年龄"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        birth: [
          {
            required: true,
            message: "请选择出生日期"
          }
        ],
        addr: [
          {
            required: true,
            message: "请输入地址"
          }
        ]
      },
      tableData: [],
      modelType: 0,
      total: 0,
      size: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      // 编辑要先获取当前这条数据的信息
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      // confirm方法来自MessageBox 用到再引入
      // message来自Message 用到再引入
      // $是全局引用的意思
      MessageBox.confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 这里要传入对象
          deleteUser({ id: row.id }).then(() => {
            Message({
              type: "success",
              message: "删除成功！"
            });
            this.getList();
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getList() {
      // console.log("pageData", this.pageData);
      getUser({ ...this.userForm, ...this.pageData }).then(({ data }) => {
        console.log("data", data);
        this.tableData = data.list;
        this.size = data.list ? data.list.length : 0;
        this.total = data.count ? data.count : 0;
      });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    handlePage(val) {
      // console.log(val, "val");
      this.pageData.page = val;
      this.getList();
    },
    onSubmit() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.manage {
  .common-table {
    position: relative;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>