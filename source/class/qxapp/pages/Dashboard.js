/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.Dashboard", {
    extend: qx.ui.tabview.ScrollingPage,

    construct(irouter) {
      super();

      const pagenameroot = "dashboard";
      const pageurl = "/";
      const pageName = qx.lang.String.firstUp(pagenameroot);

      // Set up the page
      this.setLabel(pageName);
      this.addListener("appear", () => {document.title = `${pageName} - Ping CRM Qooxdoo`});
      this.getChildrenContainer().setLayout(new qx.ui.layout.Canvas());
      this.setUserData("pageurl", pageurl);
      var pagebtnlink = this.getButton();
      pagebtnlink.getContentElement().setNodeName("a");
      pagebtnlink.getContentElement().setAttribute("href", pageurl);
      pagebtnlink.addListener("click", (e) => {e.preventDefault()});

      // Add page content
      var pageContent = new qx.ui.container.Composite();
      pageContent.setLayout(new qx.ui.layout.VBox(10));
      var dashlabel = new qx.ui.basic.Label("Welcome to the Dashboard");
      pageContent.add(dashlabel);
      this.getChildrenContainer().add(pageContent, { edge: 0 });
    },

    members: {

        __pageModelFirstRun : true,

        getPageModelFirstRun() {
            return this.__pageModelFirstRun;
        },

        updatePageModels(data) {}
    }
  });
