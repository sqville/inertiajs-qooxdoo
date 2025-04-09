qx.Mixin.define("qxapp.theme.MWidget",
    {
      construct : function()
      {
        this.initTouchAction();
      },

      /*
      *****************************************************************************
         PROPERTIES
      *****************************************************************************
      */

      properties :
      {
        touchAction :
        {
          check : ["auto", "none"],
          init : "auto",
          themeable : true,
          apply : "_applyTouchAction",
          event : "changeTouchAction"
        },

        /**
         *
         */
        cssClass: {
            check: "String",
            init: "",
            apply: "_applyCssClass"
          }

      },

      /*
      *****************************************************************************
         MEMBERS
      *****************************************************************************
      */

      members :
      {
        // property apply
        _applyTouchAction : function(value, old) {
          this.getContentElement().setStyles({"touch-action": value, "-ms-touch-action" : value});
        },

        // property apply
        _applyCssClass(value, old) {
            //this.getContentElement().removeClass(old);
            //this.getContentElement().addClass(value);
            this.getContentElement().setAttribute("style", "", true);
            this.getContentElement().removeAttribute("style", true);
            this.getContentElement().removeAllClasses();
            this.getContentElement().addClass(value);
        }
      }
    });
