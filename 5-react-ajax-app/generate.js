//rung json-server generate

module.exports = function(){
    var faker = require('faker'),
        _ = require('lodash');
    return {
        data: _.times(5, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar(),
                description: faker.lorem.sentence()
            }
        })
    }
};