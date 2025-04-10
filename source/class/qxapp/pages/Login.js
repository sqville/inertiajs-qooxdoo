/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.Login", {
    extend: qx.ui.tabview.Page,

    construct(irouter, qxmsg) {
        super();

        const pagenameroot = "login";
        const pageurl = `/${pagenameroot}`;
        const pageName = qx.lang.String.firstUp(pagenameroot);

        this.setLabel(pageName);
        this.setUserData("pageurl", pageurl);
        this.setUserData("pageexclude", true);
        this.getButton().set({ visibility: "excluded" });
        //this.setBackgroundColor("rgb(47, 54, 95)");
        this.setCssUtilityClass("flex items-center justify-center p-6 min-h-screen bg-indigo-800");
        this.setExcludeFromLayout(true);
        this.setCssUtilityStyleClearAll(true);
        //var pageContainer = this.getChildrenContainer();
        //pageContainer.setCssUtilityClass("w-full max-w-md");
        //pageContainer.setExcludeFromLayout(true);
        //pageContainer.setCssUtilityStyleClearAll(true);

        // Top header label
        /*var logo1 = new qx.ui.basic.Label("Ping");
        logo1.set({
            font : qx.bom.Font.fromString("58px sans-serif"),
            textColor : "white"
        });
        var logo2 = new qx.ui.basic.Label("CRM");
        logo2.set({
            font : qx.bom.Font.fromString("22px sans-serif bold italic"),
            textColor : "white",
            padding : [0, 0, 10, 4]
        });*/


        // Logo
        var svgclass = "block mx-auto w-full max-w-xs fill-white";
        var pingcrmlogo = `<svg class= "${svgclass}" xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 1185 266">
            <path d="M77.463 265c-19.497 0-35.318-15.405-35.318-34.39v-22.054C17.987 202.676 0 181.326 0 155.948V55.206C0 25.291 24.946 1 55.668 1h154.664C241.054 1 266 25.29 266 55.206v100.806c0 29.916-24.946 54.206-55.668 54.206H145.67c-2.823 0-5.383 1.407-6.827 3.58-10.7 17.067-24.158 31.897-39.98 43.915-6.236 4.794-13.654 7.287-21.4 7.287zM55.701 27.336c-15.771 0-28.65 12.465-28.65 27.87v100.806c0 15.342 12.813 27.87 28.65 27.87 7.49 0 13.536 5.881 13.536 13.168v33.624c0 4.922 4.272 7.99 8.214 7.99 1.709 0 3.286-.575 4.732-1.662 13.273-10.1 24.576-22.565 33.578-36.947 6.309-10.036 17.743-16.237 29.965-16.237h64.727c15.77 0 28.65-12.464 28.65-27.87V55.206c0-15.341-12.814-27.87-28.65-27.87H55.7z"></path>
            <path d="M395.752 2.4c37.152 0 65.088 27.936 65.088 64.8 0 36.576-27.936 64.8-65.088 64.8h-46.368v72H322.6V2.4h73.152zm0 104.544c22.176 0 38.592-16.992 38.592-39.744 0-23.04-16.416-39.744-38.592-39.744h-46.368v79.488h46.368zM502.6 33.792c-9.504 0-16.992-7.488-16.992-16.704 0-9.216 7.488-16.992 16.992-16.992 9.216 0 16.704 7.776 16.704 16.992 0 9.216-7.488 16.704-16.704 16.704zM489.928 204V60h25.056v144h-25.056zM625 56.256c33.696 0 55.872 22.464 55.872 59.328V204h-25.056v-86.976c0-23.616-13.536-36.864-35.712-36.864-23.04 0-41.76 13.536-41.76 47.52V204h-25.056V60h25.056v20.736C589 63.744 604.84 56.256 625 56.256zM835.24 60h24.768v137.952c0 44.928-36 67.392-73.44 67.392-32.256 0-56.448-12.384-68.256-35.136l21.888-12.384c6.624 13.536 18.72 24.192 46.944 24.192 29.952 0 48.096-16.992 48.096-44.064v-20.448c-11.52 17.568-29.952 28.8-54.144 28.8-40.896 0-73.44-33.12-73.44-75.168 0-41.76 32.544-74.88 73.44-74.88 24.192 0 42.624 10.944 54.144 28.512V60zm-51.264 122.4c29.088 0 51.264-22.176 51.264-51.264 0-28.8-22.176-50.976-51.264-50.976-29.088 0-51.264 22.176-51.264 50.976 0 29.088 22.176 51.264 51.264 51.264zM946.8 205.08c-28.21 0-45.63-20.8-41.08-48.88 4.42-27.17 26.91-46.28 53.56-46.28 19.37 0 31.59 9.36 38.35 22.36l-23.79 12.61c-3.25-5.85-9.1-9.49-16.9-9.49-12.35 0-23.14 9.23-25.35 22.1-2.08 11.83 4.29 22.1 17.16 22.1 8.06 0 13.91-4.03 18.59-10.14l21.58 13.65c-9.36 13.78-24.44 21.97-42.12 21.97zm126.36-59.93c-1.95 11.18-8.58 19.5-18.2 24.44l11.7 33.28h-26l-9.36-28.6h-8.32l-5.07 28.6h-26l16.12-91h36.4c18.33 0 32.24 13.65 28.73 33.28zm-43.42-9.36l-2.99 16.9h10.66c5.07.13 8.84-2.99 9.75-8.32.91-5.33-1.82-8.58-7.02-8.58h-10.4zM1184.05 112l-15.99 91h-26l7.67-43.81-25.48 33.54h-2.34l-14.82-35.23-7.93 45.5h-26l15.99-91h26l13.65 37.31 27.95-37.31h27.3z"></path>
            </svg>`;
        var logoImg = new qx.ui.container.Composite().set({ margin : [18, 0, 14, 0] });
        logoImg.setLayout(new qx.ui.layout.HBox(0).set({alignY: "bottom"}));
        logoImg.setExcludeFromLayout(true);
        logoImg.setCssUtilityStyleClearAll(true);
        var logoelem = logoImg.getContentElement();
        logoelem.useMarkup(pingcrmlogo);
        logoelem.removeStyle("position", true);


        /*var logoBar = new qx.ui.container.Composite().set({ margin : [18, 0, 14, 0] });
        logoBar.setLayout(new qx.ui.layout.HBox(0).set({alignY: "bottom"}));
        logoBar.add(logo1);
        logoBar.add(logo2);*/

        // Form
        var form = new qx.ui.form.Form();

        // Form header
        form.addGroupHeader("Welcome Back!");

        // Username
        var txtusername = new qx.ui.form.TextField().set({ appearance : "ping-exp-textfield", required : true });
        txtusername.setPlaceholder("User name");
        txtusername.setValue("johndoe@example.com");
        txtusername.setCssUtilityClass("form-input");
        txtusername.setQxClassClear(["qx-abstract-field", "qx-placeholder-color"]);
        txtusername.setExcludeFromLayout(true);
        //txtusername.setCssUtilityStyle(["position", "zIndex", "touch-action", "boxSizing"]);
        txtusername.setCssUtilityStyleClearAll(true);
        txtusername.setTextColor(null);
        form.add(txtusername, "Email", qx.util.Validate.email());

        // Password
        var txtpassword = new qx.ui.form.PasswordField().set({ appearance : "ping-exp-textfield", required : true });
        txtpassword.setPlaceholder("Password");
        txtpassword.setValue("secret");
        txtpassword.setCssUtilityClass("form-input");
        txtpassword.setQxClassClear(["qx-abstract-field", "qx-placeholder-color"]);
        txtpassword.setExcludeFromLayout(true);
        txtpassword.setCssUtilityStyle(["position", "zIndex", "touch-action", "boxSizing"]);
        form.add(txtpassword, "Password");

        // Remember me
        var rememberme = new qx.ui.form.CheckBox("Remember Me");
        rememberme.setExcludeFromLayout(true);
        rememberme.setCssUtilityStyle(["overflowX", "overflowY"]);
        form.add(rememberme, "");

        // Login button
        var loginbutton = new qx.ui.form.Button("Login").set({ appearance : "ping-exp-button" });
        loginbutton.setCssUtilityClass("flex items-center btn-indigo ml-auto");
        loginbutton.setCssUtilityStyle(["position"]);
        var btnlabel = loginbutton.getChildControl("label");
        //btnlabel.setCssUtilityStyle(["position"]);
        btnlabel.setExcludeFromLayout(true);
        btnlabel.setCssUtilityStyleClearAll(true);
        loginbutton.setExcludeFromLayout(true);
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
        loginForm.setCssUtilityClass("mt-8 bg-white rounded-lg shadow-xl overflow-hidden");
        loginForm.setExcludeFromLayout(true);
        loginForm.setCssUtilityStyleClearAll(true);
        /*loginForm.set({
            decorator : "loginform",
            backgroundColor : "white"
        });*/

        // Add content to the page
        var layout = new qx.ui.layout.Flow();
        // Align children to the X axis of the container (left|center|right)
        layout.setAlignX("center");
        layout.setAlignY("middle");
        layout.setSpacingX(0);
        layout.setSpacingY(10);
        //this.getChildrenContainer().setLayout(layout);
        this.setLayout(layout);
        var pageContent = new qx.ui.container.Composite();
        pageContent.setLayout(new qx.ui.layout.VBox(10).set({alignX: "center"}));
        pageContent.setMinWidth(440);
        pageContent.setCssUtilityClass("w-full max-w-md");
        pageContent.setCssUtilityStyle(["position"]);
        pageContent.setExcludeFromLayout(true);
        pageContent.add(logoImg);
        pageContent.add(loginForm);
        //this.getChildrenContainer().add(logoImg, { lineBreak : true });
        //this.getChildrenContainer().add(pageContent);
        //this.add(logoImg, { lineBreak : true });
        this.add(pageContent);
    },

    members: {

        __pageModelFirstRun : true,

        getPageModelFirstRun() {
            return this.__pageModelFirstRun;
        }
    }
  });
