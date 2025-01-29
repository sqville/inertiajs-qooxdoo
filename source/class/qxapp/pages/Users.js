/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.Users", {
    extend: qxapp.components.page.AbstractPage,

    construct(irouter, qxmsg) {
      // Page header
      const pagenameroot = "users";
      const pageurl = `/${pagenameroot}`;
      const pageName = qx.lang.String.firstUp(pagenameroot);
      const pageNameSingle = pageName.slice(0, -1);
      const createlinkurl = `${pageurl}/create`;
      super(pageName, pageurl, false);

      // Flash Messages
      var flashMessage = this._flashmessages = new qxapp.components.FlashMessages();

      // Page header
      var pagelabel = new qx.ui.basic.Label(pageName);

      // Search Filter
      var searchFilter = this._searchFilter = new qxapp.components.SearchFilter(irouter, qxmsg, pageurl, "role");

      // Create button
      var createlink = new qxapp.components.Link(`Create ${pageNameSingle}`, null, createlinkurl, irouter, qxmsg).set({allowGrowX: false, allowGrowY: false});

      // Table
      const tableConfig = {
        columnNames    : ["ID", "Name", "Email", "Owner"],
        columnIds      : ["id", "name", "email", "owner"],
        columnWidths   : ["6%", "40%", "34%", "20%"],
        noresultsLabel : pagenameroot
      };
      var table = this._table = new qxapp.components.Table(irouter, qxmsg, pageurl, tableConfig);

      // Table pagination
      var pagination = this._pagination = new qxapp.components.Pagination(irouter, qxmsg);

      // bind Table and Pagination
      pagination.bind("paginationStatusText", table, "additionalStatusBarText");

      // Search Filter and Create link on the same row
      var searchCreateBar = new qx.ui.container.Composite();
      searchCreateBar.setLayout(new qx.ui.layout.HBox(0).set({alignY: "middle"}));
      searchCreateBar.add(searchFilter);
      searchCreateBar.add(new qx.ui.core.Spacer(), { flex: 1 });
      searchCreateBar.add(createlink);

      // add controls to the page
      var pageContent = new qx.ui.container.Composite();
      pageContent.setLayout(new qx.ui.layout.VBox(10));
      pageContent.add(flashMessage);
      pageContent.add(pagelabel);
      pageContent.add(searchCreateBar);
      pageContent.add(table);
      pageContent.add(pagination);
      this.getChildrenContainer().add(pageContent, { edge: 0 });
    },

    members : {

        updatePageModels(data) {
            if (data) {
                this.updateSearchFilterModel(data);
                this.updateTableModel(data);
                this.updatePaginationModel(data);
                this._pageModelFirstRun = true;
            }
        },

        updateTableModel(data) {
            this._table._updateTableModel(data.props.users);
        },

        updatePaginationModel(data) {
            this._pagination._updatePaginationModel(data.props.users);
        }
    }
  });
