//=require_self
//=require_treeapp

function isHttpSuccess(code) {
    return code >= 200 && code <= 208;
};

var app = angular.module("app",['ui.router','chart.js']);