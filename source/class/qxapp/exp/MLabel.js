qx.Mixin.define("qxapp.exp.MLabel", {
    members: {

        // overridden
        _createDomElement() {
            var rich = this.__rich;
            var el = qx.bom.Label.create(this._content, rich);
            el.style.overflow = "hidden";
            if (qx.core.Environment.get("ville.theme.css")) {
                var lblclasses = this._qxObject.getCssUtilityClass();
                if (lblclasses) {
                    qx.bom.element.Attribute.set(el, "class", lblclasses);
                }
            }
            return el;
        }
    }
});
