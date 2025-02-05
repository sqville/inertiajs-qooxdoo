qx.Mixin.define("qxapp.theme.MOutline",
    {

      properties: {

        outline: {
          check: "String",
          apply: "_applyOutline",
          event: "changeOutline",
          themeable: true,
          nullable: true,
          inheritable : true
        },

        outlineColor : {
            check : "Color",
            apply : "_applyOutlineColor",
            event : "changeOutlineColor",
            themeable : true,
            nullable : true,
            inheritable : true
        },

        outlineOffset :
        {
          check: "String",
          apply: "_applyOutlineOffset",
          event: "changeOutlineOffset",
          themeable: true,
          nullable: true,
          inheritable : true
        }
      },

      members :
      {
        // property apply
        _applyOutline(value, old) {
            var elem = this.getContentElement();
            elem.setStyle("outline", value);
        },

        _applyOutlineColor(value) {
            var elem = this.getContentElement();
            elem.setStyle("outline-color", qx.theme.manager.Color.getInstance().resolve(value));
        },

        // property apply
        _applyOutlineOffset(value, old) {
          var elem = this.getContentElement();
          elem.setStyle("outline-offset", value);
        }
      }

    });
