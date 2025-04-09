/* ************************************************************************


************************************************************************ */

qx.Class.define("qxapp.views.TabView", {
  extend: qx.ui.tabview.TabView,

  construct(irouter, qxmsg, appheader) {
    super();

    this.setBarPosition("left");

    this.setContentPadding(0);

    this.init(irouter, qxmsg, appheader);
  },


  members: {

    __irouter : null,

    __qxmsg : null,

    init(irouter, qxmsg, appheader) {

      // Create pages
      var login = new qxapp.pages.Login(irouter, qxmsg);
      var dashboard = new qxapp.pages.Dashboard(irouter, qxmsg);
      var organizations = new qxapp.pages.Organizations(irouter, qxmsg);
      var organizationdetails = new qxapp.pages.OrganizationDetails(irouter, qxmsg);
      var contacts = new qxapp.pages.Contacts(irouter, qxmsg);
      var contactdetails = new qxapp.pages.ContactDetails(irouter, qxmsg);
      var reports = new qxapp.pages.Reports(irouter, qxmsg);
      var users = new qxapp.pages.Users(irouter, qxmsg);
      var userdetails = new qxapp.pages.UserDetails(irouter, qxmsg);

      // Setup messaging and messaging functions

      // Login
      qxmsg.on("get", "/login", () => {
        //this.getChildControl("pane").setDecorator("tbmain");
        this.getChildControl("bar").setVisibility("excluded");
        appheader.setVisibility("excluded");
        this.setSelection([login]);
      }, this);

      // Dashboard
      qxmsg.on("get", "/", this.__setmsgFunc(dashboard, appheader), this);

      // Organizations
      var orgsfunc = this.__setmsgFunc(organizations, appheader);
      qxmsg.on("get", "/organizations", orgsfunc, this);
      qxmsg.on("get", /organizations(\?[^#]*)/, orgsfunc, this);
      var orgdetailsfunc = this.__setmsgFunc(organizationdetails, appheader);
      qxmsg.on("get", "/organizations/{id}/edit", orgdetailsfunc, this);
      qxmsg.on("get", "/organizations/create", orgdetailsfunc, this);

      // Contacts
      var contactsfunc = this.__setmsgFunc(contacts, appheader);
      qxmsg.on("get", "/contacts", contactsfunc, this);
      qxmsg.on("get", /contacts(\?[^#]*)/, contactsfunc, this);
      var contactdetailsfunc = this.__setmsgFunc(contactdetails, appheader);
      qxmsg.on("get", "/contacts/{id}/edit", contactdetailsfunc, this);
      qxmsg.on("get", "/contacts/create", contactdetailsfunc, this);

      // Reports
      qxmsg.on("get", "/reports", this.__setmsgFunc(reports, appheader), this);

      // Users
      var usersfunc = this.__setmsgFunc(users, appheader);
      qxmsg.on("get", "/users", usersfunc, this);
      qxmsg.on("get", /users(\?[^#]*)/, usersfunc, this);
      var userdetailsfunc = this.__setmsgFunc(userdetails, appheader);
      qxmsg.on("get", "/users/{id}/edit", userdetailsfunc, this);
      qxmsg.on("get", "/users/create", userdetailsfunc, this);

      // Add TabPages to the TabView
      this.add(login);
      this.add(dashboard);
      this.add(organizations);
      this.add(contacts);
      this.add(reports);
      // these are tabpages with hidden buttons
      this.add(users);
      this.add(organizationdetails);
      this.add(userdetails);
      this.add(contactdetails);

      this.__irouter = irouter;
      this.__qxmsg = qxmsg;
    },

    __setmsgFunc(target, appheader)
    {
        var func = (data) => {
            this.__authUserView(appheader);
            if (data.customData) {
                target.updatePageModels(data.customData);
                appheader.updateAuthUserInfo(data.customData);
            }
            this.setSelection([target]);
          };

        return func;
    },

    __authUserView(header) {
        this.getChildControl("pane").setDecorator("main");
        this.getChildControl("bar").setVisibility("visible");
        header.setVisibility("visible");
    },

    /**
     * Override
     *
     * Event handler for <code>changeSelection</code>.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    _onChangeSelection(e) {
        var pane = this.getChildControl("pane");
        var button = e.getData()[0];
        var oldButton = e.getOldData()[0];
        var value = [];
        var old = [];

        if (button) {
          value = [button.getUserData("page")];
          if (!value[0].getUserData("pageexclude")){
            if (!value[0].getPageModelFirstRun() && value[0].getUserData("pageurl")) {
                this.__irouter.get(value[0].getUserData("pageurl"), {},
                {
                    onSuccess : (NextPage) => {
                        if (NextPage.props.auth.user) {
                            //this.__irouter.initqxpg(NextPage);
                            value[0].updatePageModels(NextPage);
                        }
                    }
                });
            }
            else if (value[0].getUserData("pageurl")) {
                this.__irouter.push({ url: value[0].getUserData("pageurl") });
            }
          }
          pane.setSelection(value);
        } else {
          pane.resetSelection();
        }

        if (oldButton) {
          old = [oldButton.getUserData("page")];
        }

        this.fireDataEvent("changeSelection", value, old);
    }
  }
});
