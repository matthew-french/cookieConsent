/**
 * @module cookieConsent
 * @author French
 * @version 0.0.3
 */
;var cookieConsent = (function (window, document) {

    var self,
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
                self.appendStyles();
                self.addConsent();
            }
        },

        /**
        * Returns the innerHTML contents of a script tag
        *  @returns {String}
        */
        getConsentString: function() {
            var consentTmpl = document.getElementById("consent_tmpl");

            if ( typeof consentTmpl !== "object"  ) {
                return "";
            }

            return ( typeof consentTmpl.innerHTML === "string" ) ? consentTmpl.innerHTML : "<p>Sorry there has been a problem.<\/p>";
        },

        /**
        * Adds the html node, animate consent node, binds close button
        */
        addConsent: function () {
            var consentNode = self.createConsentNode(self.getConsentString());

            cookieConsentEl = jQuery(consentNode);

            self.animateConsent({
                bottom: 0
            });

            jQuery('#cookie-consent-tm-close', cookieConsentEl).click( function () {
                self.animateConsent({
                    bottom: -500
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
            var consent,
                divNode = document.createElement('div');

            divNode.setAttribute('id', 'cookie_consent_tm');

            consent = "<img alt='info' id='cookie_consent_tm_info' src='http://creatives.as4x.tmcs.net/europe/UK/Cookie_Info.png'>";
            consent += "<img alt='close' id='cookie_consent_tm_close' src='http://creatives.as4x.tmcs.net/europe/UK/Cookie_close.png'>";
            consent += "<div id='cookie_consent_tm_content'>";
            consent += consentString;
            consent += "</div>";

            divNode.innerHTML = consent;

            return document.body.appendChild(divNode);
        },

        /**
        * Return style node inserted into the dom
        *  @returns {Object}
        */
        appendStyles: function () {
            var styles,
                css = document.createElement('style');

            css.type = 'text/css';

            styles = "#cookie_consent_tm {position: fixed !important;bottom: -500px;border-top-left-radius: 0.5em !important;border-top-right-radius: 0.5em !important;left: 10% !important;width: 80% !important;color: rgb(255, 255, 255) !important;background-color: rgb(0, 0, 0) !important;margin: 0px;z-index: 99999;background-position: initial initial !important;background-repeat: initial initial !important;}";
            styles += " #cookie_consent_tm_info {float:left !important;margin:15px 15px !important;width:55px !important;height:55px !important;}";
            styles += " #cookie_consent_tm_close {float:right !important;cursor:pointer !important;margin: 8px 15px 7px 15px !important;opacity:0.75 !important;width:18px !important;height:18px !important;}";
            styles += " #cookie_consent_tm_content {margin:15px 35px 15px 100px !important;text-align:left !important;font:12pt Arial !important;}";
            styles += " #cookie_consent_tm_content a {color: #FFDE00;text-decoration: none;}";
            styles += " #cookie_consent_tm_content a:hover {color: #9d9d9c;}";

            if (css.styleSheet) {
                css.styleSheet.cssText = styles;
            }
            else {
                css.appendChild(document.createTextNode(styles));
            }

            return document.getElementsByTagName("head")[0].appendChild(css);
        }
    };

})(window, document);

window.onload = function() {
    cookieConsent.init();
};
