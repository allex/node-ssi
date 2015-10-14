"use strict";

module.exports = Conditional;

function Conditional(expression) {
    this.expression = expression;
    this.directives = [];
}

Conditional.prototype = {
    getExpression: function() {
        return this.expression;
    },

    getDirectives: function() {
        return this.directives;
    },

    addDirective: function(directive) {
        this.directives.push(directive);
    }
};
