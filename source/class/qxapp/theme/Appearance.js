/* ************************************************************************

   Copyright: 2024 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

qx.Theme.define("qxapp.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

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

          var decorator;
          var padding;
          if (states.focused) {
            decorator = "textfield-focused";
            padding = 6;
          } else {
            padding = 7;
            decorator = "textfield";
          }

          return {
            decorator: decorator,
            padding: padding,
            backgroundColor: "white"
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
