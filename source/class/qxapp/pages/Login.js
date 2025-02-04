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
        var logo = new qx.ui.basic.Label("PingCRM");
        logo.set({
            font : qx.bom.Font.fromString("36px sans-serif"),
            textColor : "white",
            margin : [20,0,20,0]
        });

        // Form
        var form = new qx.ui.form.Form();

        // Form header
        form.addGroupHeader("Welcome Back!");

        // Username
        var txtusername = new qx.ui.form.TextField().set({ required : true, marginBottom : 20 });
        txtusername.setPlaceholder("User name");
        //txtusername.setMaxWidth(150);
        txtusername.setValue("johndoe@example.com");
        form.add(txtusername, "Email", qx.util.Validate.email());

        // Password
        var txtpassword = new qx.ui.form.PasswordField().set({ required : true, marginBottom : 20 });
        txtpassword.setPlaceholder("Password");
        //txtusername.setMaxWidth(150);
        txtpassword.setValue("secret");
        form.add(txtpassword, "Password");

        // Remember me
        var rememberme = new qx.ui.form.CheckBox("Remember Me").set({ marginBottom : 20 });
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
        //pageContent.setBackgroundColor("yellow");
        pageContent.setMinWidth(340);
        /*pageContent.set({
            backgroundColor : "yellow",
            allowShrinkX : true,
            minWidth : 300,
            allowGrowX : true,
            maxWidth : 500,
        });*/
        //pageContent.setAlignX("center");
        pageContent.add(loginForm);
        //this.getChildrenContainer().add(pageContent, { top: 40, edge: 0 });
        this.getChildrenContainer().add(logo, { lineBreak : true });
        this.getChildrenContainer().add(pageContent);
    },

    members: {

        __pageModelFirstRun : true,

        getPageModelFirstRun() {
            return this.__pageModelFirstRun;
        }
    }
  });
