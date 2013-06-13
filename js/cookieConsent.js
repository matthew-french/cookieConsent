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
            return (typeof consentTmpl.innerHTML === 'string' ) ? consentTmpl.innerHTML : "<p>Sorry there has been a problem.<\/p>";
        },

        /**
          * Adds the html node, animate consent node, binds close button
          */
        addConsent: function () {
            // insert node with content string into page returning object
            var consentNode = self.createConsentNode(self.getConsentString());

            cookieConsentEl = jQuery(consentNode);

            self.animateConsent({
                bottom: 0
            });

            jQuery('#cookie-consent-tm-close', cookieConsentEl).click( function () {
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
            position = (typeof position === 'object') ? position : { bottom: 0 };
            return cookieConsentEl.animate(position, animateSpeed);
        },

        /**
          * Returns html element  inserted into the dom
          *  @returns {Object}
          */
        createConsentNode: function (consentString) {
            var   consent,
                    divNode = document.createElement('div');

            divNode.setAttribute('id', 'cookie-consent-tm');

            consent = "<img alt='info' id='cookie-consent-tm-info' src='img/cookie_info.png'>";
            consent += "<img alt='close' id='cookie-consent-tm-close' src='img/cookie_close.png'>";
            consent += "<div id='cookie-consent-tm-content'>";
            consent += consentString;
            consent += "</div>";

            divNode.innerHTML = consent;

            return document.body.appendChild(divNode);
        }

    };

})(window, document);

$(document).ready(function() {
        window.cookieConsent.init();
});


