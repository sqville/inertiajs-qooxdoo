/* ************************************************************************

************************************************************************ */

/**
 * Single column renderer for {@link qx.ui.form.Form}.
 */
qx.Class.define("qxapp.components.form.renderer.LoginForm", {
    extend: qx.ui.form.renderer.AbstractRenderer,

    construct(form) {
      var layout = new qx.ui.layout.VBox();
      layout.setSpacing(6);
      this._setLayout(layout);

      super(form);
    },

    members: {
      _row: 0,
      _buttonRow: null,

      // overridden
      _onFormChange() {
        if (this._buttonRow) {
          this._buttonRow.destroy();
          this._buttonRow = null;
        }
        this._row = 0;
        super._onFormChange();
      },

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
      addItems(items, names, title) {
        // add the header
        if (title != null) {
          var grouphead = this._createHeader(title);
            this._add(this._createHeader(title));
        }

        // add the items
        for (var i = 0; i < items.length; i++) {
          if (names[i] != null && names[i] != "") {
            var label = this._createLabel(names[i], items[i]);
            label.set({marginLeft : 40});
            this._add(label);
          }

          var item = items[i];
          item.set({marginLeft : 40, marginRight : 40});
          this._add(item);

          if (label) {
            label.setBuddy(item);
            this._connectVisibility(item, label);
            // store the names for translation
            if (qx.core.Environment.get("qx.dynlocale")) {
                this._names.push({ name: names[i], label: label, item: items[i] });
            }
          }
          //this._row++;
        }
      },

      /**
       * Adds a button the form renderer. All buttons will be added in a
       * single row at the bottom of the form.
       *
       * @param button {qx.ui.form.Button} The button to add.
       */
      addButton(button) {
        if (this._buttonRow == null) {
          // create button row
          this._buttonRow = new qx.ui.container.Composite();
          this._buttonRow.set({
            backgroundColor : "rgb(243, 244, 246)",
            padding : [18, 40, 18, 40]
          });
          var hbox = new qx.ui.layout.HBox();
          hbox.setAlignX("right");
          hbox.setSpacing(5);
          this._buttonRow.setLayout(hbox);
          // add the button row
          this._add(this._buttonRow);
          // increase the row
          //this._row++;
        }

        // add the button
        this._buttonRow.add(button);
      },

      /**
       * Returns the set layout for configuration.
       *
       * @return {qx.ui.layout.Grid} The grid layout of the widget.
       */
      getLayout() {
        return this._getLayout();
      },

      /**
       * Creates a label for the given form item.
       *
       * @param name {String} The content of the label without the
       *   trailing * and :
       * @param item {qx.ui.core.Widget} The item, which has the required state.
       * @return {qx.ui.basic.Label} The label for the given item.
       */
      _createLabel(name, item) {
        var label = new qx.ui.basic.Label(this._createLabelText(name, item));
        label.setFont("loginlabel");
        // store labels for disposal
        this._labels.push(label);
        label.setRich(true);
        label.setAppearance("form-renderer-label");
        return label;
      },

      /**
       * Creates a header label for the form groups.
       *
       * @param title {String} Creates a header label.
       * @return {qx.ui.basic.Label} The header for the form groups.
       */
      _createHeader(title) {
        var header = new qx.ui.basic.Label(title);
        // store labels for disposal
        this._labels.push(header);
        header.set({
            font : qx.bom.Font.fromString("30px sans-serif bold"),
            allowGrowX : true,
            textAlign : "center",
            textColor : "#374151",
            margin : [40,0,50,0]
        })
        return header;
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
