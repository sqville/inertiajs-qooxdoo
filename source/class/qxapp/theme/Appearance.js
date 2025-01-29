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
      CHECKED SELECT BOX
    ---------------------------------------------------------------------------
    */
    "checked-selectbox": "selectbox",
    "checked-selectbox/allNone": {
      include: "button",
      style(states) {
        return {
          padding: [2, 10],
          textColor: "text-on-primary"
        };
      }
    },

    "checked-selectbox/tag": "tag",
    tag: {
      alias: "button",
      include: "button",
      style(states) {
        return {
          padding: [1, 7],
          margin: 0,
          decorator: "tag"
        };
      }
    }
  }
});
