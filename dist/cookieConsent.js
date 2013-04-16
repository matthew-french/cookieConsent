/*! cookieConsent - v0.0.1 - 2013-04-16
* Copyright (c) 2013 ; Licensed  */

(function (window, document, undefined) {

    var self,
        jQueryVersion = "1.5.0",
        jQuerySrc = "http://ajax.googleapis.com/ajax/libs/jquery/" + jQueryVersion + "/jquery.min.js",

        cookieConsentEl,
        closeEl,
        animateSpeed = 600;

    var cookieConsent = {

        init: function () {
            self = this;

            if (window.jQuery === undefined || window.fn.jquery < jQueryVersion) {

                var s = document.createElement("script");
                s.src = jQuerySrc;
                s.type = "text/javascript";
                s.async = true;
                s.onload = s.onreadystatechange = function () {

                    if ((!s.readyState || s.readyState === "loaded" || s.readyState === "complete")) {
                        // jQuery noConflict mode
                        jQuery.noConflict();
                        self.addConsent();
                    }
                };
                document.getElementsByTagName("head")[0].appendChild(s);
            } else {
                self.addConsent();
            }
        },

        getConsentString: function() {
            var consentTmpl = document.getElementById("consent_tmpl");
            if ( typeof consentTmpl !== 'object'  ) {
                return " ";
            }
            return (typeof consentTmpl.innerHTML === 'string' ) ? consentTmpl.innerHTML : " ";
        },

        addConsent: function () {
            // insert node with content string into page returning object
            var consetNode = self.createConsentNode(self.getConsentString());

            cookieConsentEl = jQuery("#cookieNotice", consetNode);

            self.animateConsent({
                bottom: 0
            });

            jQuery("#close", consetNode).click( function () {
                self.animateConsent({
                    bottom: -300
                });
            });
        },

        animateConsent: function (position) {
            position = (typeof position === 'object') ? position : {
                bottom: 0
            };
            return cookieConsentEl.animate(position, animateSpeed);
        },

        createConsentNode: function (consentString) {
            var divNode = document.createElement('div');
            divNode.setAttribute('id', 'cnWrap');

            var consent = "<div id='cookieNotice' style='position:fixed;bottom:-300px;left:0px;width:100%;height:auto;background:#000000;opacity:.80; -ms-filter: â€œalpha(opacity=80)â€; filter: alpha(opacity=80);-khtml-opacity: .80; -moz-opacity: .80; color:#FFFFFF;font-family:arial;font-size:14px;text-align:center;z-index:9999;'>";
            consent += "<div  style='position:relative;height:auto;width:75%;padding:15px;margin-left:auto;margin-right:auto;'>";
            consent += consentString;
            consent += "<div style='position:absolute;top:0px;right:-30px;height:30px;width:50px;'' id='close'>close</div>";
            consent += "</div></div></div>";

            divNode.innerHTML = consent;

            return document.body.appendChild(divNode);
        }

    };

    cookieConsent.init();

})(window, document);
