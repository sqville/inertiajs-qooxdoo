qx.Class.define("qxapp.components.FlashMessages", {
    extend: qx.ui.container.Composite,

    construct() {
        super();
        this.setLayout(new qx.ui.layout.HBox(0).set({alignY: "middle"}));
        this.setVisibility("excluded");
        this.setAllowGrowX(true);
        this.setAllowGrowY(false);
        var messagelabel = this.__messageLabel = new qx.ui.basic.Label().set({rich: true, wrap: true});
        var closeflashmessage = new qx.ui.form.Button("Close");
        closeflashmessage.addListener("execute", () => {this.setVisibility("excluded")});

        // Assemble
        this.add(messagelabel);
        this.add(new qx.ui.core.Spacer(), { flex: 1 });
        this.add(closeflashmessage);
    },

    members : {
        __messageLabel : null,

        _updateFlashMessage(data) {
            if (data.props.flash) {
                var flash = data.props.flash;
                if (flash.success === null && flash.error === null) {
                    this.setVisibility("excluded");
                } else if (flash.success) {
                    this.setBackgroundColor("flash-message-success");
                    this.__messageLabel.setValue(flash.success);
                    this.setVisibility("visible");
                } else if (flash.error) {
                    this.setBackgroundColor("flash-message-error");
                    this.__messageLabel.setValue(flash.error);
                    this.setVisibility("visible");
                }
            }
        }
    }
});
