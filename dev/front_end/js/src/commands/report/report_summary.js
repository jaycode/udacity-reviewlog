// report_summary [year_start] [month_start] [year_end] [month_end]
// report_monthly [year_start] [month_start] [year_end] [month_end]
// report_weekly [year_start] [month_start] [year_end] [month_end]

var app = app || {};
app.commands = app.commands || {};
app.commands.report = app.commands.report || {};

(function() {
  app.commands.report = {
    help: function(short) {
      if (short) {
        return "Show report page.";
      }
      else {
        return "" +
        "usage: report";
      }
    },
    run: function(args, terminal) {
      app.showPage('report-main');
    }
  }
})();