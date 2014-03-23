exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  files:
    javascripts:
      joinTo:
        '../www/js/app.js': /^app/
        '../www/js/vendor.js': /^vendor/
      order:
        # Files in `vendor` directories are compiled before other files
        # even if they aren't specified in order.before.
        before: []

    stylesheets:
      joinTo:
        '../www/css/app.css': /^(app|vendor)/
      order:
        before: ['vendor/scripts/jquery.mobile-1.4.2.min.js']
        after: []

    templates:
      joinTo: '../www/js/app.js'
