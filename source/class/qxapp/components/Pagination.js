qx.Class.define("qxapp.components.Pagination", {
    extend: qx.ui.container.Composite,

    construct(irouter, qxmsg) {
        super();
        this.setLayout(new qx.ui.layout.Flow(6));
        this.__irouter = irouter;
        this.__qxmsg = qxmsg;
    },

    properties : {

        /** The Statusbartext, set it, if you want some more Information */
        paginationStatusText: {
            check: "String",
            event: "changePaginationStatusText",
            nullable: true
          }

    },

    members : {
        __irouter : null,

        __qxmsg : null,

        _updatePaginationModel(target) {
            if (target.links) {
                this.removeAll();
                this.setPaginationStatusText("");
                if (target.links.length > 3) {
                    var links = target.links;
                    var statustxt = ` (from: ${target.from} to: ${target.to} total: ${target.total})`;
                    this.setPaginationStatusText(statustxt);
                    for (let i = 0; i < links.length; i++) {
                        var button = new qxapp.components.Link(links[i].label, null, links[i].url).set({rich: true});
                        button.setValue(links[i].active);
                        if (!links[i].active && links[i].url) {
                            button.addListener("execute", () => {
                                this.__irouter.get(links[i].url, {}, {
                                    onSuccess : (NextPage) => {
                                        if (NextPage.props.auth.user) {
                                            //this.__irouter.initqxpg(NextPage);
                                            this.__qxmsg.emit("get", NextPage.url, null, NextPage);
                                        }
                                    }
                                });
                            }, this);
                        }
                        if (!links[i].url)
                            button.setEnabled(false);

                        this.add(button);
                    }
                }
            }
        }
    }
});
