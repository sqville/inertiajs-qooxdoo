qx.Class.define("qxapp.components.page.AbstractDetailsPage", {
    type: "abstract",

    extend: qx.ui.tabview.ScrollingPage,

    construct() {
        super();

        this.getChildrenContainer().setLayout(new qx.ui.layout.Canvas());

        this.getButton().set({ visibility: "excluded" });
    },

    members : {

        _flashmessages : null,

        _listitemname : null,

        _form : null,

        _formcontroller : null,

        _formvalidator : null,

        _submitbutton : null,

        _deletebutton : null,

        _pageModelFirstRun : false,

        getPageModelFirstRun() {
            return this._pageModelFirstRun;
        },

        _updateFlashMessage(data) {
            if (this._flashmessages) {
                this._flashmessages._updateFlashMessage(data);
            }
        },

        _processFormModel(data) {
            var model = qx.data.marshal.Json.createModel(data);
            if (this._formcontroller === null) {
                this._formcontroller = new qx.data.controller.Form(model, this._form);
                this._pageModelFirstRun = true;
            } else {
                this._formcontroller.resetModel();
                this._formcontroller.resetTarget();
                this._formcontroller.setTarget(this._form);
                this._formcontroller.setModel(model);
            }
            this._form.redefineResetter();

            var properties = qx.util.PropertyUtil.getProperties(model.constructor);
            for (var name in properties) {
                var formitem = this._form.getItem(name);
                if (formitem === null) {
                    continue;
                } else {
                    if (!formitem.getUserData("formvalchangeValId")) {
                        var listenerId = formitem.addListener("changeValue", ()=> {this._formvalidator.validate()});
                        formitem.setUserData("formvalchangeValId", listenerId);
                    }
                }
            }
            this._formvalidator.validate();
            if (!this._submitbutton.getUserData("buttonbindId")) {
                var buttonbindId = this._formvalidator.bind("valid", this._submitbutton, "enabled");
                this._submitbutton.setUserData("buttonbindId", buttonbindId);
            }
            this._submitbutton._updateFormController(this._formcontroller);
        },

        _createFormModel() {
            this._deletebutton.setVisibility("excluded");
            this._submitbutton.setLabel(this._submitbutton.getUserData("createbuttonlabel"));
            this._submitbutton.setEnabled(true);
            if (this._formcontroller === null) {
                this._formcontroller = new qx.data.controller.Form(null, this._form, false);
            } else {
                this._formcontroller.resetModel();
                this._formcontroller.resetTarget();
                this._formcontroller.setTarget(this._form);
            }
            this._formcontroller.createModel();
            this._form.redefineResetter();
            var model = this._formcontroller.getModel();

            var properties = qx.util.PropertyUtil.getProperties(model.constructor);
            for (var name in properties) {
                var formitem = this._form.getItem(name);
                if (formitem === null) {
                    continue;
                } else {
                    if (formitem.getUserData("formvalchangeValId")) {
                        formitem.removeListenerById(formitem.getUserData("formvalchangeValId"));
                        formitem.resetUserData();
                    }
                }
            }
            if (this._submitbutton.getUserData("buttonbindId")) {
                this._formvalidator.removeBinding(this._submitbutton.getUserData("buttonbindId"));
                this._submitbutton.setUserData("buttonbindId", null);
            }
            this._submitbutton._updateFormController(this._formcontroller);
        }
    }
});
