/* ************************************************************************


************************************************************************ */

/**
 *
 *
 */

qx.Class.define("qxapp.pages.UserDetails", {
    extend: qxapp.components.page.AbstractDetailsPage,

    construct(irouter, qxmsg) {
      super();

      // Page header
      const pagenameroot = "users";
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
      //breadcrumbContent.add(listitemname);

      // Form
      // create the form
      var form = this._form = new qx.ui.form.Form();

      // firstname
      var firstname = new qx.ui.form.TextField().set({ required : true });
      firstname.bind("value", listitemfirstname, "value");
      form.add(firstname, "First name", null, "first_name");

      // lastname
      var lastname = new qx.ui.form.TextField().set({ required : true, alignX: "right" });
      lastname.bind("value", listitemlastname, "value");
      form.add(lastname, "Last name", null, "last_name", null, { linebreak: true });

      // email
      var email = new qx.ui.form.TextField().set({ required : true });
      form.add(email, "Email", null, "email");

      // password
      var password = new qx.ui.form.TextField();
      form.add(password, "Password", null, "password", null, { linebreak: true });

      // owner
      var owner = new qx.ui.form.SelectBox();
      var yesItem = new qx.ui.form.ListItem("Yes", null, true);
      owner.add(yesItem);
      var noItem = new qx.ui.form.ListItem("No", null, false);
      owner.add(noItem);
      form.add(owner, "Owner", null, "owner");

      // photo
      var photo = new qx.ui.form.TextField();
      photo.setPlaceholder("Browse for photo");
      form.add(photo, "Photo", null, "photo", null, { linebreak: true });

      // form buttons
      var updateLabeltext = `Update ${pageNameSingle}`;
      var submitbutton = this._submitbutton = new qxapp.components.SubmitButton(updateLabeltext, null, pageurl, flashMessage, irouter, qxmsg);   //qx.ui.form.Button(updateLabeltext);
      submitbutton.setUserData("updatebuttonlabel", updateLabeltext);
      submitbutton.setUserData("createbuttonlabel", `Create ${pageNameSingle}`);
      var deletebutton = this._deletebutton = new qx.ui.form.Button(`Delete ${pageNameSingle}`);
      form.addButton(deletebutton, { afteritem: { layoutitem: new qx.ui.core.Spacer(), options: { flex: 1 } } });
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

      // Page Content
      var pageContent = new qx.ui.container.Composite();
      pageContent.setLayout(new qx.ui.layout.VBox(10));
      pageContent.add(flashMessage);
      pageContent.add(breadcrumbContent);
      pageContent.add(detailsForm);
      this.getChildrenContainer().add(pageContent, { edge: 10 });
    },

    members: {

        updatePageModels(data) {
            if (data) {
                this._updateFlashMessage(data);
                this.updateFormModel(data);
            }
        },

        updateFormModel(data) {
            const user = data.props.user ?? null;
            if (user != null) {
                //this._listitemname.setValue(`${user.first_name} ${user.last_name}`);
                document.title = `${user.first_name} ${user.last_name} - Ping CRM Qooxdoo`;
                this._deletebutton.setVisibility("visible");
                this._deletebutton.setEnabled((data.props.auth.user.id === user.id) ? false : true);
                this._submitbutton.setLabel(this._submitbutton.getUserData("updatebuttonlabel"));
                user.password = null;
                this._processFormModel(user);
            } else {
                document.title = "Create User - Ping CRM Qooxdoo";
                this._createFormModel();
            }
        }
    }
  });
