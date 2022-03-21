"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Person = /*#__PURE__*/function () {
  function Person(fname, lname, age, address) {
    _classCallCheck(this, Person);

    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.address = address;
  }

  _createClass(Person, [{
    key: "fullNname",
    get: function get() {
      return this.fname + "-" + this.lname;
    }
  }]);

  return Person;
}();