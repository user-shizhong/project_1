<template>
  <div>
    <bread-crumb></bread-crumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="params.keyword">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button type="primary" @click="newAdd">新建订单</el-button>
          <el-button :disabled="!selection.length" @click="operate(1)">审核</el-button>
          <el-button :disabled="!selection.length" @click="operate(2)">修改</el-button>
          <el-button :disabled="!selection.length" @click="operate(3)">作废</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mt">
      <el-table
      @selection-change="handleSelectionChange"
      :data="tableData" 
      style="width: 100%" 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="订单号"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status ===1">待审核</span>
            <span v-else-if="scope.row.status ===2">已审核</span>
            <span v-else-if="scope.row.status ===3">审核通过</span>
            <span v-else>审核拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="start" label="起始城市"></el-table-column>
        <el-table-column prop="end" label="目的城市"></el-table-column>
        <el-table-column prop="cargo" label="货物名称"></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column prop="from" label="支付方式"></el-table-column>
        <el-table-column prop="pay" label="是否支付">
          <template slot-scope="scope">
            {{ scope.row.pay==1?"已支付":"未支付" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"  class="reset fl" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini"  type="danger"  class="reset fr">删除</el-button>
            <div class="clear"></div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fr mt"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <div class="clear"></div>
    </el-card>
    <order-modal :visible="visible" @hide="visible=false" @reload="getData"></order-modal>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import OrderModal from "./OrderModal.vue"
import { post } from "@/utils/http";
import BreadCrumb from "@/components/BreadCrumb.vue";
export default {
  data() {
    return {
      loading:false,
      selection:[],
      tableData: [],
      total:0,
      currentPage:1,
      val: "",
      params:{
        page:1,
        pageSize:10,
        keyword:""
      },
      visible:false
    };
  },
  components: {
    BreadCrumb,OrderModal
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["setRow"]),
    async getData() {
      this.loading =true;
      const {data: { list, total }} = await post("/orderList",this.params);
      this.loading =false;
      this.total =total
      this.tableData = list;
    },
    handleSizeChange(pageSize){
      this.params.pageSize =pageSize;
      this.getData()
    },
    handleCurrentChange(page){
      this.params.page =page
      this.getData()
    },
    handleSelectionChange(selection){
      this.selection =selection
    },
    operate(num){
      const nos = this.selection.map(item=>item.id)
      this.$notify({
          title: '操作成功',
          message: nos,
          type: 'success'
        });
    },
    edit(row){
      this.visible =true;
      this.setRow(row)
    },
    newAdd(){
      this.visible =true;
      this.setRow({})
    }
  },
  
};
</script>

<style lang="less" scoped>

</style>