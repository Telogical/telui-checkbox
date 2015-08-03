'use strict';

var CheckboxDemo = require('../../scripts/app.js');
var jsf = require('json-schema-faker');
var schemas = {
    people: require('./schemas/people')
};

CheckboxDemo
    .Services
    .service('mock', function mockList() {

      console.log(schemas)

        function mockEntity(entityName) {

            entityName = entityName || 'people';

            return jsf(schemas[entityName]);
        }

        this.entity = mockEntity;
    });
