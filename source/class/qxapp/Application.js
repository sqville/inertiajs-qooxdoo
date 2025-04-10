/* ************************************************************************

   Copyright: 2025

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 * This is the main application class of "qxapp"
 *
 * @external(qxapp/qxapp.css)
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

      // patch Form so we can enable
      qx.Class.patch(qx.ui.form.Form, qxapp.components.form.MFormDataChange);

      if (qx.core.Environment.get("ville.theme.css")) {
        qx.Class.include(qx.ui.core.LayoutItem, qxapp.exp.MControl);
        qx.Class.patch(qx.html.Label, qxapp.exp.MLabel);
        //qx.Class.patch(qx.ui.core.Widget, qxapp.exp.MWidget);
        //qx.Class.patch(qx.ui.form.AbstractField, qxapp.exp.MAbstractField);
        qx.Class.include(qx.ui.core.Widget, qxapp.exp.MCssUtilityClass);
      }

      // Create Qooxdoo Inertia; Get the inital page json; Initiate the router
      const Inertia = this.createInertia();
      const InitialPage = JSON.parse(document.getElementById('app').dataset.page);
      Inertia.router.initqxpg(InitialPage);

      // Setup the global messaging object
      var qxmsg = new qx.event.Messaging();

      // Header
      var header = new qxapp.views.Header(Inertia.router, qxmsg);
      header.setCssUtilityClass("md:flex md:shrink-0");
      header.setExcludeFromLayout(true);
      header.setCssUtilityStyleClearAll(true);

      // TabView
      var tabs = new qxapp.views.TabView(Inertia.router, qxmsg, header);
      tabs.setCssUtilityClass("md:flex md:grow md:overflow-hidden");
      //tabs.setExcludeFromLayout(true);
      //tabs.setCssUtilityStyleClearAll(true);

      // Setup the app layout and add the views
      var dockLayout = new qx.ui.layout.Dock().set({sort: "x"});
      var doccomp = new qx.ui.container.Composite(dockLayout);
      //doccomp.setCssUtilityClass("w-full max-w-md");
      doccomp.setCssUtilityClass("md:flex md:flex-col md:h-screen");
      doccomp.setCssUtilityStyleClearAll(true);
      doccomp.setExcludeFromLayout(true);
      doccomp.add(header, { edge: "north" });
      doccomp.add(tabs, { edge: "center" });
      this.getRoot().add(doccomp, { edge: 0 });

      // Show controls based on the current url
      // (see TabView for configured qxmsg listeners)
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
                swapComponent: () => {return qx.Promise.resolve()}
            })
        };

        return inertia;
    }
  }
});
