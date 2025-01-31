/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.OrganizationDetails", {
    extend: qxapp.components.page.AbstractDetailsPage,

    construct(irouter, qxmsg) {
      super();

      // Page specific setup
      const pagenameroot = "organizations";
      const pageurl = `/${pagenameroot}`;
      const pageName = qx.lang.String.firstUp(pagenameroot);
      const pageNameSingle = pageName.slice(0, -1);

      // Flash Messages
      var flashMessage = this._flashmessages = new qxapp.components.FlashMessages();

      // Links
      var breadcrumbContent = new qx.ui.container.Composite();
      breadcrumbContent.setLayout(new qx.ui.layout.HBox(10).set({alignY: "middle"}));
      var listlink = new qxapp.components.Link(`${pageName} /`, null, pageurl, irouter, qxmsg).set({allowGrowX: false});
      //var listitemname = this._listitemname = new qx.ui.basic.Label();
      var listitemorgname = new qx.ui.basic.Label();
      breadcrumbContent.add(listlink);
      breadcrumbContent.add(listitemorgname);

      // Form
      // create the form
      var form = this._form = new qx.ui.form.Form();

      // name
      var orgname = new qx.ui.form.TextField().set({ required : true });
      orgname.bind("value", listitemorgname, "value");
      form.add(orgname, "Name", null, "name");

      // email
      var email = new qx.ui.form.TextField().set({ required : true });
      form.add(email, "Email", null, "email", null, { linebreak: true });

      // phone
      var phone = new qx.ui.form.TextField();
      form.add(phone, "Phone", null, "phone");

      // address
      var address = new qx.ui.form.TextField();
      form.add(address, "Address", null, "address", null, { linebreak: true });

      // city
      var city = new qx.ui.form.TextField();
      form.add(city, "City", null, "city");

      // state
      var state = new qx.ui.form.TextField();
      form.add(state, "Province/State", null, "region", null, { linebreak: true });

      // country
      var country = new qx.ui.form.SelectBox();
      var CanadaItem = new qx.ui.form.ListItem("Canada", null, "Canada");
      country.add(CanadaItem);
      var USAItem = new qx.ui.form.ListItem("United States", null, "US");
      country.add(USAItem);
      form.add(country, "Country", null, "country");

      // postal code
      var postalcode = new qx.ui.form.TextField();
      form.add(postalcode, "Postal code", null, "postal_code", null, { linebreak: true });

      // form buttons
      var updateLabeltext = `Update ${pageNameSingle}`;
      var submitbutton = this._submitbutton = new qxapp.components.SubmitButton(updateLabeltext, null, pageurl, flashMessage, irouter, qxmsg);   //qx.ui.form.Button(updateLabeltext);
      submitbutton.setUserData("updatebuttonlabel", updateLabeltext);
      submitbutton.setUserData("createbuttonlabel", `Create ${pageNameSingle}`);
      var deletebutton = this._deletebutton = new qx.ui.form.Button(`Delete ${pageNameSingle}`);
      form.addButton(deletebutton);
      form.addButton(submitbutton);

      var titleupdatefunc = () => {
        document.title = `${orgname.getValue()} - Ping CRM Qooxdoo`;
      };

      orgname.addListener("changeValue", titleupdatefunc);

      // form validator
      var validator = this._formvalidator = form.getValidationManager();
      validator.add(email, qx.util.Validate.email());
      validator.setValidator(function (items) {
        return form.origFormDataChanged();
      });

      // contacts section header
      var contactsheader = this.__contactsHeader = new qx.ui.basic.Label("Contacts");

      // Table
      const tableConfig = {
            columnNames    : ["ID", "Name", "Phone", "City"],
            columnIds      : ["id", "name", "phone", "city"],
            columnWidths   : ["6%", "34%", "30%", "30%"],
            noresultsLabel : "contacts"
      };
      var table = this._table = new qxapp.components.Table(irouter, qxmsg, "/contacts", tableConfig);

      var detailsForm = new qxapp.components.form.renderer.DetailsForm(form);

      // Add all controls to the page
      var pageContent = new qx.ui.container.Composite();
      pageContent.setLayout(new qx.ui.layout.VBox(10));
      pageContent.add(flashMessage);
      pageContent.add(breadcrumbContent);
      pageContent.add(detailsForm);
      pageContent.add(contactsheader);
      pageContent.add(table);
      this.getChildrenContainer().add(pageContent, { edge: 0 });
    },

    members: {

        __contactsHeader : null,

        updatePageModels(data) {
            if (data) {
                this._updateFlashMessage(data);
                this.updateFormModel(data);
                this.updateTableModel(data);
            }
        },

        updateFormModel(data) {
            const org = data.props.organization ?? null;
            if (org != null) {
                document.title = `${org.name} - Ping CRM Qooxdoo`;
                this._deletebutton.setVisibility("visible");
                this._submitbutton.setLabel(this._submitbutton.getUserData("updatebuttonlabel"));
                this._processFormModel(org);
            } else {
                document.title = "Create Organization - Ping CRM Qooxdoo";
                this._createFormModel();
            }
        },

        updateTableModel(data) {
            const org = data.props.organization ?? null;
            if (org != null) {
                this.__contactsHeader.setVisibility("visible");
                this._table.setVisibility("visible");
                this._table._updateTableModel(data.props.organization.contacts);
            } else {
                this.__contactsHeader.setVisibility("excluded");
                this._table.setVisibility("excluded");
            }
        }
    }
  });
