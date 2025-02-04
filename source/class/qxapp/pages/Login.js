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
        this.setUserData("pageurl", pageurl);
        this.setUserData("pageexclude", true);
        this.getButton().set({ visibility: "excluded" });
        this.setBackgroundColor("rgb(47, 54, 95)");

        // Top header label
        var logo1 = new qx.ui.basic.Label("Ping");
        logo1.set({
            font : qx.bom.Font.fromString("58px sans-serif"),
            textColor : "white"
        });
        var logo2 = new qx.ui.basic.Label("CRM");
        logo2.set({
            font : qx.bom.Font.fromString("22px sans-serif bold italic"),
            textColor : "white",
            padding : [0, 0, 10, 4]
        });

        var logoBar = new qx.ui.container.Composite().set({ margin : [18, 0, 14, 0] });
        logoBar.setLayout(new qx.ui.layout.HBox(0).set({alignY: "bottom"}));
        logoBar.add(logo1);
        logoBar.add(logo2);

        // Form
        var form = new qx.ui.form.Form();

        // Form header
        form.addGroupHeader("Welcome Back!");

        // Username
        var txtusername = new qx.ui.form.TextField().set({ appearance : "ping-textfield", required : true, marginBottom : 20, font : "logintxtfield" });
        txtusername.setPlaceholder("User name");
        //txtusername.setMaxWidth(150);
        txtusername.setValue("johndoe@example.com");
        form.add(txtusername, "Email", qx.util.Validate.email());

        // Password
        var txtpassword = new qx.ui.form.PasswordField().set({ appearance : "ping-textfield", required : true, marginBottom : 20, font : "logintxtfield" });
        txtpassword.setPlaceholder("Password");
        //txtusername.setMaxWidth(150);
        txtpassword.setValue("secret");
        form.add(txtpassword, "Password");

        // Remember me
        var rememberme = new qx.ui.form.CheckBox("Remember Me").set({ marginBottom : 44, font : "logintxtfield" });
        form.add(rememberme, "");

        // Login button
        var loginbutton = new qx.ui.form.Button("Login").set({ appearance : "ping-button" });
        loginbutton.addListener("execute", () => {
            if (form.validate()) {
                irouter.post(pageurl, {
                    email: txtusername.getValue(),
                    password: txtpassword.getValue(),
                    remember: rememberme.getValue()
                  },
                  {onSuccess : (NextPage) => {
                        if (NextPage.props.auth.user) {
                            //irouter.initqxpg(NextPage);
                            qxmsg.emit("get", NextPage.url, null, NextPage);
                        }
                    }
                });
            }
        }, this);
        form.addButton(loginbutton);

        var loginForm = new qxapp.components.form.renderer.LoginForm(form);
        loginForm.set({
            decorator : "loginform",
            backgroundColor : "white"
        });

        // Add content to the page
        var layout = new qx.ui.layout.Flow();
        // Align children to the X axis of the container (left|center|right)
        layout.setAlignX("center");
        layout.setSpacingX(0);
        layout.setSpacingY(10);
        this.getChildrenContainer().setLayout(layout);
        var pageContent = new qx.ui.container.Composite();
        pageContent.setLayout(new qx.ui.layout.VBox(10).set({alignX: "center"}));
        pageContent.setMinWidth(440);
        pageContent.add(loginForm);
        this.getChildrenContainer().add(logoBar, { lineBreak : true });
        this.getChildrenContainer().add(pageContent);
    },

    members: {

        __pageModelFirstRun : true,

        getPageModelFirstRun() {
            return this.__pageModelFirstRun;
        }
    }
  });
