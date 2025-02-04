qx.Class.define("qxapp.components.SearchFilter", {
    extend: qxapp.components.form.renderer.SearchForm,

    construct(irouter, qxmsg, pageurl, config) {

      // settings that affect sizing - NEED TO REMOVE
      var searchtextfield = {width: 200};

      // Make router and messaging global to the page
      this.__irouter = irouter;
      this.__qxmsg = qxmsg;

      this.setUserData("pageurl", pageurl);

      // Search filter form
      var form = new qx.ui.form.Form();
      // Filter
      var filterMenuButton = new qx.ui.toolbar.MenuButton("Filter").set({margin: 0});
      // Menu
      var menu = new qx.ui.menu.Menu;
      // Search Text
      var searchtext = new qx.ui.form.TextField().set(searchtextfield);
      searchtext.setPlaceholder("Search...");
      // Reset Button
      var resetfilterbutton = this.__resetfilterbutton = new qx.ui.form.Button("Reset").set({allowGrowX: false, allowGrowY: false});
      // add controls to the Form
      form.addButton(filterMenuButton, { position: { index: 0 } });
      form.add(searchtext, null, null, "search", null, { viewitem: true } );
      form.addButton(resetfilterbutton);
      // Resetter
      var searchresetter = new qx.ui.form.Resetter();
      searchresetter.add(searchtext);
      resetfilterbutton.addListener("execute", ()=> {
        if (searchresetter.reset() === null) {
            if (resetfilterbutton.getUserData("currentpageurl") != pageurl) {
                this._executeSearch(pageurl);
            }
        }
      }, this);

      // Search form controller
      var formcontroller = this.__formController = new qx.data.controller.Object();
      formcontroller.addTarget(searchtext, "value", "search", true);

      // Role - include if noted in config
      if (config && config.includes("role")) {
        var roleuser = new qx.ui.menu.RadioButton("User").set({model: "user"});
        var roleowner = new qx.ui.menu.RadioButton("Owner").set({model: "owner"});
        menu.add(roleuser);
        menu.add(roleowner);
        menu.addSeparator();
        var rolegroup = new qx.ui.form.RadioGroup().set({allowEmptySelection : true});
        rolegroup.add(roleuser);
        rolegroup.add(roleowner);
        searchresetter.add(rolegroup);
        roleuser.addListener("click", this._executeSearchClick, this);
        roleowner.addListener("click", this._executeSearchClick, this);
        formcontroller.addTarget(rolegroup, "modelSelection[0]", "role", true);
      }

      // Trashed
      var trashedwith = new qx.ui.menu.RadioButton("With Trashed").set({model: "with"});
      var trashedonly = new qx.ui.menu.RadioButton("Only Trashed").set({model: "only"});
      menu.add(trashedwith);
      menu.add(trashedonly);
      var trashedgroup = new qx.ui.form.RadioGroup().set({allowEmptySelection : true});
      trashedgroup.add(trashedwith);
      trashedgroup.add(trashedonly);
      searchresetter.add(trashedgroup);
      // Form control click listeners
      trashedwith.addListener("click", this._executeSearchClick, this);
      trashedonly.addListener("click", this._executeSearchClick, this);
      formcontroller.addTarget(trashedgroup, "modelSelection[0]", "trashed", true);

      filterMenuButton.setMenu(menu);

      super(form);
    },

    members : {
        __irouter : null,

        __qxmsg : null,

        __formController : null,

        __resetfilterbutton : null,

        _updateFilterModel(data) {
            var model = qx.data.marshal.Json.createModel(data.props.filters);
            if (this.__formController === null) {
                this.__formController = new qx.data.controller.Object(model);
            } else {
                this.__formController.setModel(model);
            }

            this.__resetfilterbutton.setUserData("currentpageurl", data.url);

            model.addListener("changeSearch", function (e) {
                const url = this._buildSearchUri() ?? this.getUserData("pageurl");
                this._executeSearch(url);
            }, this);
        },

        _executeSearchClick(e) {
            var url = this._buildSearchUri();
            if (url) {
                this._executeSearch(url);
            } else {
                if (!e.getTarget().getValue()) {
                    this._executeSearch(this.getUserData("pageurl"));
                }
            }
        },

        _buildSearchUri() {
            var model = this.__formController.getModel();
            var pageurl = this.getUserData("pageurl");
            var parts = [];
            var paramsstr = "";
            var returnval = null;
            var properties = qx.util.PropertyUtil.getProperties(model.constructor);

            for (var name in properties) {
                var value = model["get" + qx.lang.String.firstUp(name)]();
                if (value != null && value !=  "") {
                    parts.push(`${name}=${value}`);
                }
            }

            paramsstr = parts.join("&");
            if (paramsstr != "") {
                returnval = (`${pageurl}?${paramsstr}`);
            }

            return returnval;
        },

        _executeSearch(url) {
            this.__irouter.get(url, {}, {
                onSuccess : (NextPage) => {
                    if (NextPage.props.auth.user) {
                        //this.__irouter.initqxpg(NextPage);
                        this.__qxmsg.emit("get", NextPage.url, null, NextPage);
                    }
                }
            });
        }
    }
});
