/**
 * TODOS:
 * 1. Enable right click, context window, open in a new browser tab/window
 *
 */
qx.Class.define("qxapp.components.Table", {
    extend: qx.ui.table.Table,

    construct(irouter, qxmsg, pageurl, tableConfig) {

        // table model obj
        // columnNames []
        // columnIds []
        // columnWidths []
        // noresultsLabel string

        this.setUserData("noresultslabel", tableConfig.noresultsLabel ?? "table items");

        var model = new qx.ui.table.model.Simple();
        model.setColumns(tableConfig.columnNames, tableConfig.columnIds);
        model.setEditable(false);
        for (let s = 0; s < model.getColumnCount(); s++) {
            model.setColumnSortable(s, false);
        }

        // Customize the table column model.  We want one that automatically resizes columns.
        var custom = {
            tableColumnModel() {return new qx.ui.table.columnmodel.Resize()}
        };

        super(model, custom);

        // Obtain the behavior object to manipulate
        var colrb = this.getTableColumnModel().getBehavior();
        for (let i = 0; i < tableConfig.columnWidths.length; i++) {
            colrb.set(i, { width: tableConfig.columnWidths[i] });
        }

        this.set({
            maxHeight: 300,
            showCellFocusIndicator: false,
            focusCellOnPointerMove: true
          });

        this.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);

        this.addListener("cellTap", (e) => {
            var detailid = this.getTableModel().getRowDataAsMap(e.getRow()).id;
            irouter.get(`${pageurl}/${detailid}/edit`, {}, {
                onSuccess : (NextPage) => {
                    if (NextPage.props.auth.user) {
                        irouter.initqxpg(NextPage);
                        qxmsg.emit("get", NextPage.url, null, NextPage);
                    }
                }
            });
        }, this);

    },

    members : {

        _updateTableModel(target) {
            var data = target.data ?? target;
            this.getTableModel().setDataAsMapArray(data);
            this._handleEmptyTable(data.length, this.getUserData("noresultslabel"));
        },

        _handleEmptyTable(data, label) {
            if (data === 0) {
                this.getChildControl("statusbar").setValue(`No ${label} found`);
                this.setMaxHeight(53);
            } else {
                this.setMaxHeight(300);
            }
        },

        _setTableColumnsSortable(sortable) {
            const model = this.getTableModel();
            for (let i = 0; i < model.getColumnCount(); i++) {
                model.setColumnSortable(i, sortable);
            }
        }
    }
});
