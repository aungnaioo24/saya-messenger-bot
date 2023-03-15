<script>
  export default {
    data() {
      return {
        totalUser: 0,
        todayNewUser: 0,
        thisMonthEngagement: 0,
        todayEngagement: 0
      }
    },
    methods: {
      getUserEngagements() {
        axios.get('http://localhost:8000/api/dashboard/engagements').then(response => {
            console.log(response.data.this_month_engagement);
            this.totalUser = response.data.total_users;
            this.todayNewUser = response.data.today_new_users;
            this.thisMonthEngagement = response.data.this_month_engagement;
            this.todayEngagement = response.data.today_engagement;
          }).catch(error => {
            console.log(error);
            return 'get-bot-flow-error';
          });
      }
    },
    created() {

      const app = this;

      $(document).ready(function() {
          app.getUserEngagements();
      });
    },
  }
</script>

<template>
  <!-- Begin Page Content -->
<div class="container-fluid">

  <!-- Content Row -->
  <div class="row">

      <div class="col-xl-3 col-md-6 mb-4">
          <div class="card shadow h-100 py-4">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Users</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalUser }}</div>
                      </div>
                      <div class="col-auto">
                          <i class="fas fa-users fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
          <div class="card shadow h-100 py-4">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Today New Users</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">{{ todayNewUser }}</div>
                      </div>
                      <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
          <div class="card shadow h-100 py-4">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Engagement (This Month)</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{ thisMonthEngagement }}</div>
                    </div>
                      <div class="col-auto">
                          <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
          <div class="card shadow h-100 py-4">
              <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Engagement (Today)</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">{{ todayEngagement }}</div>
                      </div>
                      <div class="col-auto">
                          <i class="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

</div>
</template>
