qx.Class.define("qxapp.components.SubmitButton", {
    extend: qx.ui.form.Button,

    construct(label, icon, pageurl, flashmessage, irouter, qxmsg) {
        super(label, icon);

        this.addListener("execute", () => {
            if (this.__formcontroller) {
                if (this.__formcontroller.getTarget().validate()) {
                    var formdataobj = qx.util.Serializer.toNativeObject(this.__formcontroller.getModel());
                    if (formdataobj.id) {
                        irouter.put(`${pageurl}/${formdataobj.id}`, formdataobj,
                            { onSuccess : (NextPage) => {
                                if (NextPage.props.auth.user) {
                                    flashmessage._updateFlashMessage(NextPage);
                                }
                            },
                             onError : (Error) => {
                                console.log(Error);
                             } }
                        );
                    } else {
                        irouter.post(pageurl, formdataobj,
                            { onSuccess : (NextPage) => {
                                if (NextPage.props.auth.user) {
                                    //irouter.initqxpg(NextPage);
                                    qxmsg.emit("get", NextPage.url, null, NextPage);
                                }
                            },
                             onError : (Error) => {
                               console.log(Error);
                            } }
                        );
                    }
                }
            }
          });
    },

    members : {
        __formcontroller : null,

        _updateFormController(formcontroller) {
            if (formcontroller) {
                this.__formcontroller = formcontroller;
            }
        }
    }
});
