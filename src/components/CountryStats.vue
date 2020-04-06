<template>
  <div id="countrystats">
    <el-table v-if="countryStats" :data="countryStats" :default-sort = "{prop: 'latest.confirmed', order: 'descending'}" height="450" style="width: 100%" row-class-name="no-hover" >
      <el-table-column prop="country" label="Country" width="160"></el-table-column>
      <el-table-column sortable prop="latest.confirmed" label="Confirmed" width="130"></el-table-column>
      <el-table-column sortable prop="latest.deaths" label="Deaths" width="130"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CountryStats",
  data() {
    return {
        countryStats: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        let res = await fetch(
          "https://coronavirus-tracker-api.herokuapp.com/v2/locations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        let processed = await res.json();
        this.countryStats = processed.locations;
        this.$refs.tableCountry.$options._parentVnode.elm.classList.remove('el-table--enable-row-hover')
      } catch (error) {
        console.log("error while fetching data", error.message);
      }
    }
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