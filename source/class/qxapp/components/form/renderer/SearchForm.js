/* ************************************************************************


************************************************************************ */

/**
 * Horizontal renderer for {@link qx.ui.form.Form}.
 */
qx.Class.define("qxapp.components.form.renderer.SearchForm", {
    extend: qx.ui.form.renderer.AbstractRenderer,

    construct(form) {
      var layout = new qx.ui.layout.HBox().set({alignY: "middle"});
      layout.setSpacing(8);
      this._setLayout(layout);
      //this.setPaddingLeft(0);

      super(form);
    },

    members: {

      /**
       * Add a group of form items with the corresponding names. The names are
       * displayed as label.
       * The title is optional and is used as grouping for the given form
       * items.
       *
       * @param items {qx.ui.core.Widget[]} An array of form items to render.
       * @param names {String[]} An array of names for the form items.
       * @param title {String?} A title of the group you are adding.
       */
      addItems(items, names, title, customize) {

        // add the items
        for (var i = 0; i < items.length; i++) {
          var pushname = false;
          if (customize[i]) {
            if (customize[i].viewitem) {
                this._add(items[i]);
                pushname = true;
            }
          }
          else {
            this._add(items[i]);
            pushname = true;
          }
          // store the names for translation
          if (qx.core.Environment.get("qx.dynlocale") && pushname) {
            this._names.push({ name: names[i], label: {}, item: items[i] });
          }
        }
      },

      /**
       * Adds a button to the form renderer.
       *
       * @param button {qx.ui.form.Button} The button to add.
       */
      addButton(button, customize) {
        if (customize) {
            if (customize.position) {
                this._addAt(button, customize.position.index);
            }
            if (customize.afteritem) {
                this._add(button);
                this._addAfter(customize.afteritem.layoutitem, button, customize.afteritem.options);
            }
        } else {
            this._add(button);
        }
      },

      /**
       * Returns the set layout for configuration.
       *
       * @return {qx.ui.layout.Grid} The grid layout of the widget.
       */
      getLayout() {
        return this._getLayout();
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct() {
      // first, remove all buttons from the button row because they
      // should not be disposed
      if (this._buttonRow) {
        this._buttonRow.removeAll();
        this._disposeObjects("_buttonRow");
      }
    }
  });
