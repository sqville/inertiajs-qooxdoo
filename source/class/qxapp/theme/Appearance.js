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
