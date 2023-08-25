<template>
  <div>
    <bread-crumb-vue></bread-crumb-vue>
    <el-card class="mt">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-input
            placeholder="请输入运单号"
            v-model="params.waybilllNo"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入客户名称"
            v-model="params.name"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="tr">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button type="primary">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-radio-group v-model="params.status" @input="loadData">
        <el-radio-button :label="1">全部订单(300)</el-radio-button>
        <el-radio-button :label="2">装货中(55)</el-radio-button>
        <el-radio-button :label="3">运输中(45)</el-radio-button>
        <el-radio-button :label="4">已完成(101)</el-radio-button>
        <el-radio-button :label="5">订单异常(99)</el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card>
      <el-table
        v-loading ="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="no" label="订单号"></el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="cargo" label="货物名称"></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column prop="start" label="起始地"></el-table-column>
        <el-table-column prop="end" label="目的地"></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column prop="needRecive" label="需要接货">
            <template slot-scope="scope">
                {{ scope.row.needRecive==1?"需要":"不需要" }}
            </template>
        </el-table-column>
        <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
        <el-table-column prop="driver" label="司机"></el-table-column>
        <el-table-column prop="tel" label="司机电话"></el-table-column>
        <el-table-column prop="percent" label="运输进度">
            <template slot-scope="scope">
                <el-progress :percentage="scope.row.percent"></el-progress>
            </template>
        </el-table-column>
        <el-table-column label="操作" >
            <template>
                <el-button size="mini" class="reset fl">详情</el-button>
                <el-button size="mini" type="danger" class="reset fr">操作</el-button>
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
  </div>
</template>

<script>
import moment from "moment";
import BreadCrumbVue from "@/components/BreadCrumb.vue";
import { post } from "@/utils/http";
export default {
  data() {
    return {
      params: {
        waybilllNo: "",
        name: "",
        status: 1,
      },
      pageDate: {
        page: 1,
        pageSize: 10,
      },
      currentPage:1,
      date: "",
      tableData: [],
      total: 0,
      loading:false
    };
  },
  components: {
    BreadCrumbVue,
  },
  methods: {
    async loadData() {
        this.loading =true
      // moment("日期对象").format("日期字符串格式") ("YYYY-MM-DD hh:mm:ss")
      // console.log(moment(new Date()).format("YYYY-MM-DD hh:mm:ss"))
      const startDate = this.date[0]
        ? moment(this.date[0]).format("YYYY-MM-DD hh:mm:ss")
        : "";
      const endDate = this.date[1]
        ? moment(this.date[0]).format("YYYY-MM-DD hh:mm:ss")
        : "";
      const {
        data: { list, total },
      } = await post("/waybillList", {
        ...this.params,
        ...this.pageDate,
        startDate,
        endDate,
      });
      this.loading =false;
      //   console.log(list,total)
      this.tableData = list;
      this.total = total;
    },
    handleCurrentChange(page){
      this.pageDate.page =page
      this.loadData()
    },
    handleSizeChange(pageSize){
      this.pageDate.pageSize =pageSize;
      this.loadData()
    }
  },
  mounted() {
    this.loadData()
  },
};
</script>

<style lang="less" scoped>
</style>