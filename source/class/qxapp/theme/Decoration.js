/* ************************************************************************

   Copyright: 2024 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

qx.Theme.define("qxapp.theme.Decoration",
{
  extend : qx.theme.indigo.Decoration,

  decorations :
  {
    "loginform" : {
        style : {
            width : 1,
            color : "rgb(243, 244, 246)",
            radius : 6
        }
    },

    "tbmain" :
    {
      style :
      {
        width : 0,
        color : "transparent"
      }
    },

    "ping-button-box": {
      style: {
        radius: 6,
        width: 0
      }
    },

    textfield: {
        style: {
          width : 1,
          color : "rgb(229, 231, 235)",
          radius : 6
        }
      },

      "textfield-focused": {
        style: {
          width : 2,
          color : "rgb(120, 134, 215)",
          radius : 6
        }
      }
  }
});
