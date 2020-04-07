<template>
  <div id="countrystats">
    <el-table v-if="getStatsByLocation" :data="getStatsByLocation" :default-sort = "{prop: 'latest.confirmed', order: 'descending'}" height="450" style="width: 100%" row-class-name="no-hover" >
      <el-table-column prop="country" label="Country" width="160"></el-table-column>
      <el-table-column sortable prop="latest.confirmed" label="Confirmed" width="130"></el-table-column>
      <el-table-column sortable prop="latest.deaths" label="Deaths" width="130"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CountryStats",
  computed: {
    ...mapGetters(['getStatsByLocation'])
  }
};
</script>

<style >
.el-table{
    color: white !important;
    background-color: #313642 !important
}
.no-hover:hover > td {
  background-color: transparent !important;
}
.el-table th, .el-table tr {
    color: white !important;
    background-color: #313642 !important
}

.el-table__row{
    color: white !important;
    background-color: #313642 !important
}

.el-table::before {
    display: none;
}
</style>