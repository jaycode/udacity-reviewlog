var app = app || {};
(function() {

  app.viewModel = function() {
    self = this;
    self.shrinkConsole = function() {
      $('#console').css('height', 0);
      $('#main_area').css('padding-bottom', 60);
    };

    self.expandConsole = function() {
      $('#console').css('height', app.data.settings.consoleDefaultHeight);
      $('#main_area').css('padding-bottom', app.data.settings.consoleDefaultHeight + 40);
    };

    self.maximizeConsole = function() {
      $('#console').css('height', $(window).height()-53);
      $('#main_area').css('padding-bottom', 60);
    };

    self.resizeConsole = function() {
      if (parseFloat($('#console').css('height')) < app.data.settings.consoleDefaultHeight) {
        self.expandConsole();
      }
      else {
        self.shrinkConsole();
      }
    };
  };
  app.showPage = function(selector) {
    $('.page').removeClass('is_active');
    $(selector).addClass('is_active');
  };

  $(document).ready(function() {
    app.vm = new app.viewModel();
    ko.applyBindings(app.vm);

    app.vm.expandConsole();

    jQuery(function($, undefined) {
      $('#console').terminal(function(command, term) {
        var cmd = $.terminal.splitCommand(command);
        $('#console').terminal().echo("Command entered: " + cmd.name);
      }, {
        greetings: "Type 'help' for list of commands.",
        name: 'Udacity Review Log console',
        height: app.data.settings.consoleDefaultHeight,
        prompt: 'reviewlog> ',
        keydown: function(e) {
          if (e.which === 82 && e.ctrlKey) { // CTRL+R
            return true;
          }
          else if (e.which === 187 && e.altKey) { // ALT++
            app.vm.maximizeConsole();
            return true;
          }
          else if (e.which === 189 && e.altKey) { // ALT+-
            app.vm.shrinkConsole();
            return true;
          }
          else if (e.which === 48 && e.altKey) { // ALT+0
            app.vm.expandConsole();
            return true;
          }
        }
      });
    });
  });
})();