<template>
  <section class="ad-ta">
    <!--工具条-->
      <div class="tools">
        <div class="input-wrapper">
          <input type="text" v-model="searchText">
        </div>
        <div class="btn-wrapper">
          <div class="search btn" @click="filter">查询</div>
          <div class="add btn" @click="add">新增</div>
        </div>
      </div>

    <!--列表-->
    <el-table :data="adminArticles"  style="width: 100%" class="admin-list">
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column prop="tags" label="标签" width="150"> </el-table-column>
      <el-table-column prop="category" label="分类" width="150" sortable></el-table-column>
      <el-table-column prop="created" label="日期" width="150" sortable></el-table-column>
      <el-table-column prop="visited" label="访问量" min-width="100" sortable></el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible"> 
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" >
        <el-form-item label="标题"><el-input v-model="editForm.title" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="标签"><el-input v-model="editForm.tags" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="分类"><el-input v-model="editForm.category" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="访问量"><el-input v-model="editForm.visited" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="日期"><el-input v-model="editForm.created" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="文章内容" > <el-input type="textarea" v-model="editForm.content" :rows="10"></el-input></el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" >提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="标题"><el-input v-model="addForm.title" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="标签"><el-input v-model="addForm.tags" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="分类"><el-input v-model="addForm.category" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="访问量"><el-input v-model="addForm.visited" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="日期"><el-input v-model="addForm.created" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="文章内容" > <el-input type="textarea" v-model="addForm.content" :rows="10"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import api from "@/api/index.js"
export default {
  data() {
    return {
      searchText: "",      
      adminArticles: [],
      editFormVisible: false, //编辑界面是否显示
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
      //编辑界面数据
      editForm: {
        title: '1',
        tags: "2",
        category: 3,
        created: 0,
        content: "",
      },
      addFormVisible: false, //新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
      //新增界面数据
      addForm: {
        title: '',
        tags: '',
        category: '',
        visited: 0,
        created: '',
        content: '',
      },
    };
  },
  methods: {
    // 过滤文章
    filter(){
      api.search(this.searchText).then(res=>{
        let idPool = res.map(v=>v.id);

        this.adminArticles = this.adminArticles.filter(v=>{
          if(idPool.indexOf(v.id) !== -1) return true;
        })

      }).catch(err=>{
        alert("查询失败！");
      })
    },
    
    // 新增文章
    add(){
      this.addFormVisible = true;
      this.addForm.created = new Date().toLocaleString().match(/\d+/g).slice(0,3).join('/');
    },
    // 提交新增
    addSubmit() {
      for(let key in this.addForm){
        let val = this.addForm[key];
        if(!this.warningEmpty(val)){
          alert("字段为空！");
          return;
        }
      }
       api.addNewArticle(this.addForm).then(res=>{
        if(res.status === 200){
          this.getArticles();
          this.addFormVisible = false;
        }else{
          alert("ERROR!");
        }
      }).catch(err=>{
        alert("ERROR!");
      })
    },

    // 编辑文章
    handleEdit(v) {
				this.editFormVisible = true;
        let {id,title,tags,category,created,visited} = v;
        api.getOneArticle(id).then(res=>{
        let content = res.data;
        this.editForm = {
          id,
          title,
          tags,
          category,
          created,
          visited,
          content,
        }
      }).catch(err=>{
        alert('文章请求失败')
      });
    },
    // 提交编辑
    editSubmit() {
      api.updateEdit(this.editForm).then(res=>{
        if(res.status === 200){
          this.updateFromServer();
          this.editFormVisible = false;
        }else{
          alert("ERROR!");
        }
      }).catch(err=>{
        alert("ERROR!");
      })
    },

    // 删除文章
    handleDel(row) {
      let id = row.id;
      let flag = confirm("是否删除"+row.title);
      if(flag){
        api.delArticle(id).then(res=>{
          if(res.status === 200){
            this.getArticles();
          }else{
            alert("ERROR!");
          }
        }).catch(err=>{
          alert("ERROR!");
        })
      }
 
    },
  
    // 更新文章列表
    getAdminArticles(){
      this.adminArticles = [...this.articles].map((v) => {
        if(typeof v.tags === 'object'){
          v.tags = v.tags.join(",");
        }
        return v;
      });
    },

    // 更新所有文章
    updateFromServer(){
      this.getArticles();
      this.getAdminArticles();
    }



  },



  created() {
    this.updateFromServer();
  },
  watch: {
    articles() {
      this.getAdminArticles();
    },
    searchText(){
      if(this.searchText == ''){
          this.updateFromServer();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.tools{
  width: 100%;
  height: 2.5rem;
  display: flex;
  .input-wrapper{
    margin-left: .6rem;
    flex: 14;
    input[type="text"]{
      width: 100%;
      height: 100%;
      border: 1px solid black;
    }
  }
  .btn-wrapper{
    flex: 2;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-right: .6rem;
    .btn{
      width: 4rem;
      background-color: black;
      color: white;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-weight: 800;
      font-size: 1rem;
      &:hover{
        background-color: #f10215;
        border: 1px solid white;
      }
    }
  }
}


.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ad-ta {
  width: 100%;
  .el-tool-wrapper {
    width: 100%;
    .toolbar {
      width: 100%;
      .input-type {
        width: 90%;
        display: inline-block;
        box-sizing: border-box;
        margin: 0;
        .el-input {
          width: 70rem;
        }
      }
      .query {
        display: inline-block;
        box-sizing: border-box;
        position: absolute;
        margin: 0 .5rem;
        right: 4.5rem;
        width: 3rem;
        transform: translate(-55%, 0);
        .el-button {
          width: 100%;
          height: 100%;
        }
      }
      .add {
        position: absolute;
        right: 0;
        width: 3rem;
        transform: translate(-55%, 0);
        display: inline-block;
        box-sizing: border-box;
        margin: 0;
        .el-button {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

    .el-button {
      background-color: black;
      color: white;
      &:hover {
        color: white;
        background-color: #f10215;
      }
    }

</style>