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

      _createWidget() {
        var widget = new qx.ui.container.Composite(new qx.ui.layout.VBox());
        return widget;
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
        var itemscontainer = this._createWidget();
        itemscontainer.setCssUtilityClass("px-10 py-12");
        itemscontainer.setExcludeFromLayout(true);
        itemscontainer.setCssUtilityStyleClearAll(true);

        // add the header
        if (title != null) {
            var grouphead = this._createHeader(title);
            itemscontainer.add(grouphead);
            grouphead.setCssUtilityClass("text-center text-3xl font-bold");
            grouphead.setCssUtilityStyleClearAll(true);
            grouphead.setExcludeFromLayout(true);
        }

        // add space
        var spaceline = this._createWidget();
        spaceline.setCssUtilityClass("mt-6 mx-auto w-24 border-b-2");
        spaceline.setCssUtilityStyle(["position"]);
        spaceline.setExcludeFromLayout(true);

        itemscontainer.add(spaceline);

        // add the items
        for (var i = 0; i < items.length; i++) {
            var itmnmgroup = this._createWidget();
            itmnmgroup.setCssUtilityClass("mt-6");
            itmnmgroup.setCssUtilityStyle(["position"]);
            itmnmgroup.setCssUtilityStyleClearAll(true);
            itmnmgroup.setExcludeFromLayout(true);

            if (names[i] != null && names[i] != "") {
              var label = this._createLabel(names[i], items[i]);
              //label.setRich(true);
              label.setCssUtilityClass("form-label");
              label.setCssUtilityStyleClearAll(true);
              label.setExcludeFromLayout(true);
              itmnmgroup.add(label);
            }

            var item = items[i];
            itmnmgroup.add(item);

            if (label) {
              label.setBuddy(item);
              this._connectVisibility(item, label);
              // store the names for translation
              if (qx.core.Environment.get("qx.dynlocale")) {
                  this._names.push({ name: names[i], label: label, item: items[i] });
              }
            }
            itemscontainer.add(itmnmgroup);
          }
          this._add(itemscontainer);
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
          this._buttonRow = this._createWidget();
          this._buttonRow.setCssUtilityClass("flex px-10 py-4 bg-gray-100 border-t border-gray-100");
          //this._buttonRow.setCssUtilityStyle(["position"]);
          this._buttonRow.setCssUtilityStyleClearAll(true);
          this._buttonRow.setExcludeFromLayout(true);

          this._add(this._buttonRow);
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
        var label = new qx.ui.basic.Label(name);
        label.setFont(null);
        label.setTextColor(null);
        // store labels for disposal
        this._labels.push(label);
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
        header.setFont(null);
        header.setTextColor(null);
        // store labels for disposal
        this._labels.push(header);
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
