/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.components.page.AbstractPage", {
    type: "abstract",

    extend: qx.ui.tabview.ScrollingPage,

    construct(label, pageurl, showbutton) {
      super();

      // Page setup
      this.setLabel(label);
      this.addListener("appear", () => {document.title = `${label} - Ping CRM Qooxdoo`});
      //this.setLayout(new qx.ui.layout.Canvas());
      this.getChildrenContainer().setLayout(new qx.ui.layout.Canvas());
      this.setUserData("pageurl", pageurl);
      var pagebtnlink = this.getButton();
      if (showbutton) {
        pagebtnlink.getContentElement().setNodeName("a");
        pagebtnlink.getContentElement().setAttribute("href", pageurl);
        pagebtnlink.addListener("click", (e) => {e.preventDefault()});
      } else {
        pagebtnlink.set({ visibility: "excluded" });
      }
    },

    members: {

        _flashMessages : null,

        _searchFilter : null,

        _table : null,

        _pagination : null,

        _pageModelFirstRun : false,

        getPageModelFirstRun() {
            return this._pageModelFirstRun;
        },

        _updateFlashMessage(data) {
            if (this._flashmessages) {
                this._flashmessages._updateFlashMessage(data);
            }
        },

        updateSearchFilterModel(data) {
            this._searchFilter._updateFilterModel(data);
        }
    }
  });
