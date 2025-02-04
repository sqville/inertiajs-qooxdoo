/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.ContactDetails", {
    extend: qxapp.components.page.AbstractDetailsPage,

    construct(irouter, qxmsg) {
      super();

      // Page header
      const pagenameroot = "contacts";
      const pageurl = `/${pagenameroot}`;
      const pageName = qx.lang.String.firstUp(pagenameroot);
      const pageNameSingle = pageName.slice(0, -1);

      // Flash Messages
      var flashMessage = this._flashmessages = new qxapp.components.FlashMessages();

      // Links
      var breadcrumbContent = new qx.ui.container.Composite();
      breadcrumbContent.setLayout(new qx.ui.layout.HBox(4).set({alignY: "middle"}));
      var listlink = new qxapp.components.Link(`${pageName} /`, null, pageurl, irouter, qxmsg).set({allowGrowX: false});
      var listitemname = this._listitemname = new qx.ui.basic.Label();
      var listitemfirstname = new qx.ui.basic.Label();
      var listitemlastname = new qx.ui.basic.Label();
      breadcrumbContent.add(listlink);
      breadcrumbContent.add(listitemfirstname);
      breadcrumbContent.add(listitemlastname);

      // Form
      // create the form
      var form = this._form = new qx.ui.form.Form();

      // firstname
      var firstname = new qx.ui.form.TextField().set({ required : true });
      firstname.bind("value", listitemfirstname, "value");
      form.add(firstname, "First name", null, "first_name");

      // lastname
      var lastname = new qx.ui.form.TextField().set({ required : true });
      lastname.bind("value", listitemlastname, "value");
      form.add(lastname, "Last name", null, "last_name", null, { linebreak: true });

      // organization
      var organization = this.__organization = new qx.ui.form.SelectBox().set({ required : true });
      form.add(organization, "Organization", null, "organization_id");

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
        document.title = `${firstname.getValue()} ${lastname.getValue()} - Ping CRM Qooxdoo`;
      };

      firstname.addListener("changeValue", titleupdatefunc);
      lastname.addListener("changeValue", titleupdatefunc);

      // form validator
      var validator = this._formvalidator = form.getValidationManager();
      validator.add(email, qx.util.Validate.email());
      validator.setValidator(function (items) {
        return form.origFormDataChanged();
      });

      var detailsForm = new qxapp.components.form.renderer.DetailsForm(form);

      // Add all controls to the page
      var pageContent = new qx.ui.container.Composite();
      pageContent.setLayout(new qx.ui.layout.VBox(10));
      pageContent.add(flashMessage);
      pageContent.add(breadcrumbContent);
      pageContent.add(detailsForm);
      this.getChildrenContainer().add(pageContent, { edge: 10 });
    },

    members: {

        __organization : null,

        updatePageModels(data) {
            if (data) {
                this._updateFlashMessage(data);
                this.updateFormModel(data);
            }
        },

        updateFormModel(data) {
            const contact = data.props.contact ?? null;
            if (contact != null) {
                document.title = `${contact.first_name} ${contact.last_name} - Ping CRM Qooxdoo`;
                this._deletebutton.setVisibility("visible");
                this._submitbutton.setLabel(this._submitbutton.getUserData("updatebuttonlabel"));
                if (this._formcontroller === null) {
                    var orgmodel = qx.data.marshal.Json.createModel(data.props.organizations);
                    new qx.data.controller.List(orgmodel, this.__organization, "name")
                        .setDelegate({
                            bindItem(controller, item, index) {
                                controller.bindProperty("id", "model", null, item, index);
                            },
                        });
                }
                this._processFormModel(contact);
            } else {
                document.title = "Create Contact - Ping CRM Qooxdoo";
                this._createFormModel();
            }
        },

        tableModelRowCount() {
            return 1;
        }
    }
  });
