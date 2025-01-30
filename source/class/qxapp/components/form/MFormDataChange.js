qx.Mixin.define("qxapp.components.form.MFormDataChange",
    {
      members :
      {
        _createResetter() {
            return new qxapp.components.form.Resetter();
        },

        origFormDataChanged() {
            return this._resetter.origchange();
        }
      }
    });
