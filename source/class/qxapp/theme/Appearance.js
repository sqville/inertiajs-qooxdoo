/* ************************************************************************

   Copyright: 2024 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * @require(qxapp.theme.MOutline)
 */

qx.Theme.define("qxapp.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  boot : function () {
    qx.Class.include(qx.ui.core.Widget, qxapp.theme.MOutline);
  },

  appearances :
  {

    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    "ping-button": {
        alias: "atom",

        style(states) {
          var decorator = "ping-button-box";

          return {
            decorator: decorator,
            backgroundColor : states.hovered ? "rgb(251, 146, 60)" : "rgb(86, 97, 179)",
            padding: [8, 26, 8, 26],
            center: true,
            cursor: states.disabled ? undefined : "pointer",
            minWidth: 5,
            minHeight: 5
          };
        }
      },

      "ping-button/label": {
        alias: "atom/label",

        style(states) {
          return {
            font: "loginbutton",
            textColor : "white"
          };
        }
      },

      // TextField
      "ping-textfield" : {
        style(states) {

          return {
            decorator : states.focused ? "textfield-focused" : "textfield",
            padding : states.focused ? 6 : 7,
            backgroundColor : "white",
            outline : states.focused ? "2px solid rgba(38, 0, 255, .3)" : "none",
            outlineOffset : "1px"
          };
        }
      },


    // override
    "tabview/pane" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background",
          decorator : "main",
          padding : 10
        };
      }
    }
  }
});
