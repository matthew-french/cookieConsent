/**
 * @module cookieConsent
 * @author French
 * @version 0.0.2
 */
var cookieConsent = (function (window, document) {

    var   self,
            cookieConsentEl,
            closeEl,
            animateSpeed = 600;

    return {

        /**
          * Checik for jQuery, setTimeOut until jQuery
          */
        init: function () {
            console.log('ok');
            self = this;

            if (typeof window.jQuery === "undefined") {

                // try to init every 500 ms until jQuery is loaded
                setTimeout(function() {
                    cookieConsent.init();
                }, 500);
            }
            else {
                self.addConsent();
            }
        },

        /**
          * Returns the innerHTML contents of a script tag
          *  @returns {String}
          */
        getConsentString: function() {
            var consentTmpl = document.getElementById("consent_tmpl");
            if ( typeof consentTmpl !== 'object'  ) {
                return "";
            }
            return (typeof consentTmpl.innerHTML === 'string' ) ? consentTmpl.innerHTML : "<p>Sorry there has been a problem<\/p>";
        },

        /**
          * Adds the html node, animate consent node, binds close button
          */
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

        /**
          * Returns the innerHTML contents of a script tag
          *  @returns {Object} jQuery Object cookieConsent
          */
        animateConsent: function (position) {
            position = (typeof position === 'object') ? position : {
                bottom: 0
            };
            return cookieConsentEl.animate(position, animateSpeed);
        },

        /**
          * Returns html element  inserted into the dom
          *  @returns {Object}
          */
        createConsentNode: function (consentString) {
            var   consent,
                    divNode = document.createElement('div');

            divNode.setAttribute('id', 'cnWrap');

            consent = "<div id='cookieNotice' style='position:fixed;bottom:-300px;left:0px;width:100%;height:auto;background:#000000;opacity:.80; -ms-filter: â€œalpha(opacity=80)â€; filter: alpha(opacity=80);-khtml-opacity: .80; -moz-opacity: .80; color:#FFFFFF;font-family:arial;font-size:14px;text-align:center;z-index:9999;'>";
            consent += "<div  style='position:relative;height:auto;width:75%;padding:15px;margin-left:auto;margin-right:auto;'>";
            consent += consentString;
            consent += "<div style='position:absolute;top:0px;right:-30px;height:30px;width:50px;'' id='close'>close</div>";
            consent += "</div></div></div>";

            divNode.innerHTML = consent;

            return document.body.appendChild(divNode);
        }

    };

})(window, document);

cookieConsent.init();

