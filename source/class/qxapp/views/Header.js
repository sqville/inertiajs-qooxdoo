/* ************************************************************************



************************************************************************ */
/**
 * The Application's header
 */

qx.Class.define("qxapp.views.Header", {
  extend: qx.ui.container.Composite,

  construct(irouter, qxmsg) {
    super();

    this.setLayout(new qx.ui.layout.HBox());
    this.getLayout().setAlignY("middle");

    // Add Logo here
    var title = new qx.ui.basic.Label("Ping CRM").set({ marginLeft: 10});

    // Logged in users Organization
    this.__orglabel = new qx.ui.basic.Label("Org Name");

    // Logged in users Full name
    var menuButton = new qx.ui.toolbar.MenuButton("Full Name");

    // Menu and MenuButton
    var menu = new qx.ui.menu.Menu;
    var myprofilebtn = new qx.ui.menu.Button("My Profile");
    var mngusersbtn = new qx.ui.menu.Button("Manage Users");
    var logoutbtn = new qx.ui.menu.Button("Logout");
    menu.add(myprofilebtn);
    menu.add(mngusersbtn);
    menu.add(logoutbtn);
    menuButton.setMenu(menu);
    this.__menubutton = menuButton;

    // MenuButton Listeners
    myprofilebtn.addListener("execute", () => {
        irouter.get(`/users/${this.__menubutton.getUserData("userid")}/edit`, {}, {
            onSuccess : (NextPage) => {
                if (NextPage.props.auth.user) {
                    irouter.initqxpg(NextPage);
                    qxmsg.emit("get", NextPage.url, null, NextPage);
                }
            }
          });
      }, this);

      mngusersbtn.addListener("execute", () => {
        irouter.get('/users', {}, {
            onSuccess : (NextPage) => {
                if (NextPage.props.auth.user) {
                    irouter.initqxpg(NextPage);
                    qxmsg.emit("get", NextPage.url, null, NextPage);
                }
            }
          });
      }, this);

    logoutbtn.addListener("execute", () => {
        irouter.delete('/logout',{
            onSuccess : (response) => {
                window.location.reload();
            }
        });
      }, this);

    // Finally assemble header
    this.add(title);
    this.add(new qx.ui.core.Spacer(), { flex: 1 });
    this.add(this.__orglabel);
    this.add(new qx.ui.core.Spacer(), { flex: 1 });
    this.add(menuButton);
  },

  members: {

    __menubutton : null,

    __orglabel : null,

    updateAuthUserInfo(data) {
        if (data) {
            this.__menubutton.setUserData("userid", data.props.auth.user.id);
            this.__menubutton.setLabel(`${data.props.auth.user.first_name} ${data.props.auth.user.last_name}`);
            this.__orglabel.setValue(data.props.auth.user.account.name);
        }
    }
  }
});
