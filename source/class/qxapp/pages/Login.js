/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.Login", {
    extend: qx.ui.tabview.ScrollingPage,

    construct(irouter, qxmsg) {
        super();

        const pagenameroot = "login";
        const pageurl = `/${pagenameroot}`;
        const pageName = qx.lang.String.firstUp(pagenameroot);

        this.setLabel(pageName);
        //this.setLayout(new qx.ui.layout.Canvas());
        this.getChildrenContainer().setLayout(new qx.ui.layout.Canvas());
        this.setUserData("pageurl", pageurl);
        this.setUserData("pageexclude", true);
        this.getButton().set({ visibility: "excluded" });

        // Form
        var form = new qx.ui.form.Form();

        // Username
        var txtusername = new qx.ui.form.TextField().set({ required : true });
        txtusername.setPlaceholder("User name");
        txtusername.setWidth(150);
        txtusername.setValue("johndoe@example.com");
        form.add(txtusername, "Email", qx.util.Validate.email());

        // Password
        var txtpassword = new qx.ui.form.PasswordField().set({ required : true });
        txtpassword.setPlaceholder("Password");
        txtpassword.setWidth(150);
        txtpassword.setValue("secret");
        form.add(txtpassword, "Password");

        // Remember me
        var rememberme = new qx.ui.form.CheckBox("Remember Me");
        form.add(rememberme, "");



        // Login button
        var loginbutton = new qx.ui.form.Button("Login");
        loginbutton.addListener("execute", () => {
            if (form.validate()) {
                irouter.post(pageurl, {
                    email: txtusername.getValue(),
                    password: txtpassword.getValue(),
                    remember: rememberme.getValue()
                  },
                  {onSuccess : (NextPage) => {
                        if (NextPage.props.auth.user) {
                            irouter.initqxpg(NextPage);
                            qxmsg.emit("get", NextPage.url, null, NextPage);
                        }
                    }
                });
            }
        }, this);
        form.addButton(loginbutton);

        // invoke the inital validate
        //form.validate();


        // switch the login button on and off
        //form.getValidationManager().bind("valid", loginbutton, "enabled");

        // Add content to the page
        var pageContent = new qx.ui.container.Composite();
        pageContent.setLayout(new qx.ui.layout.VBox(10));
        pageContent.add(new qxapp.components.form.renderer.LoginForm(form));
        this.getChildrenContainer().add(pageContent, { top: 40, edge: 0 });
        //this.add(pageContent);
    },

    members: {

        __pageModelFirstRun : true,

        getPageModelFirstRun() {
            return this.__pageModelFirstRun;
        }
    }
  });
