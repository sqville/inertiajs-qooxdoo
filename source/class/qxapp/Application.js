/* ************************************************************************

   Copyright: 2025

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 * This is the main application class of "qxapp"
 *
 * @asset(qxapp/*)
 */
qx.Class.define("qxapp.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main()
    {
      // Call super class
      super.main();

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      qx.Class.patch(qx.ui.form.Form, qxapp.components.form.MFormDataChange);

      // Create Qooxdoo Inertia; Get the inital page json; Initiate the router
      const Inertia = this.createInertia();
      const InitialPage = JSON.parse(document.getElementById('app').dataset.page);
      Inertia.router.initqxpg(InitialPage);

      // Setup the global messaging object
      var qxmsg = new qx.event.Messaging();

      // Header
      var header = new qxapp.views.Header(Inertia.router, qxmsg);

      // TabView
      var tabs = new qxapp.views.TabView(Inertia.router, qxmsg, header);

      // Setup the app layout and add the views
      var dockLayout = new qx.ui.layout.Dock().set({sort: "x"});
      var doccomp = new qx.ui.container.Composite(dockLayout);
      doccomp.add(header, { edge: "north" });
      doccomp.add(tabs, { edge: "center" });
      this.getRoot().add(doccomp, { edge: 0 });

      // Show controls based on the current url
      //  (see TabView for configured qxmsg listeners)
      qxmsg.emit("get", InitialPage.url, null, InitialPage);
    },

    /**
     * Creates the Inertia router object and adds a Qooxdoo
     * friendly function since qx is not a reactive framework
     *
     * requires inertiajs/core library from local npm repository
     */
    createInertia ()
    {
        // require inertiajs core library
        var inertia = require('@inertiajs/core');

        // add a qooxdoo friendly function for sending and processing requests
        inertia.router.initqxpg = function (nextpage) {
            this.init({
                initialPage: nextpage,
                resolveComponent: () => {},
                swapComponent: () => {return new qx.Promise.resolve({})}
            })
        };

        return inertia;
    }
  }
});
