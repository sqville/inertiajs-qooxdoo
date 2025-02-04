/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.components.Link", {
    extend: qx.ui.form.ToggleButton,

    construct(label, icon, href, irouter, qxmsg) {
        super(label, icon);

        if (href) {
            this.__irouter = irouter ?? null;
            this.__qxmsg = qxmsg ?? null;
            this.setHref(href);
        }
    },

    properties: {
        href: {
            apply: "_applyHref",
            nullable: true,
            check: "String"
        }
    },

    members: {

        __irouter : null,

        __qxmsg : null,

        // property apply
        _applyHref(value) {
            if (value) {
                this.getContentElement().setNodeName("a");
                this.getContentElement().setAttribute("href", value);
                this.addListener("click", (e) => {e.preventDefault()});
                if (this.__irouter != null && this.__qxmsg != null) {
                    this.addListener("execute", () => {
                        this.__irouter.get(value, {}, {
                            onSuccess : (NextPage) => {
                                if (NextPage.props.auth.user) {
                                    //this.__irouter.initqxpg(NextPage);
                                    this.__qxmsg.emit("get", NextPage.url, null, NextPage);
                                }
                            }
                        });
                    }, this);
                }
            }
        }
    }
  });
