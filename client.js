/** @module BaseHTTPClient */

var request = require("request");
var qs = require("querystring");
var _ = require("underscore");

var HTTPJSONClient = function() {};

/**
 * Does the legwork parsing JSON response. Assumes REST server returns string
 * formatted as JSON.
 */
HTTPJSONClient.prototype._handleResponse = function(err, result, body) {
    if(err) { 
        return err;
    }

    if(!_.isEmpty(body)) {
        try {
            return JSON.parse(body);
        }
        catch(e) {
            return {
                error: new Error("Invalid Body Content"),
                body: body
            };
        }
    }

    else {
        return {};
    }
};

/**
 * Thin wrapper around request module. 
 * @param {string} method - GET, POST, etc
 * @param {string} uri - fully formed URI including protocol (eg http://google.com)
 * @param {object} data - JSON object that will be stringified (POST) or queryified (GET)
 * @param {object} extraHeaders - dictionary of additional headers
 * @param {function} callback
 */
HTTPJSONClient.prototype._request = function(method, uri, data, extraHeaders, callback) {
    var _this = this;

    var headers = _.extend({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }, extraHeaders);

    var requestObject = {
        uri: uri,
        headers: headers,
        method: method,
        timeout: 30*60*1000
    };

    if(data && method === "POST") {
        requestObject.body = JSON.stringify(data);
    }
    else if(data) {
        requestObject.uri += "?" + qs.stringify(data);
    }

    request(requestObject, _.compose(callback, _this._handleResponse));
};

module.exports = HTTPJSONClient;