var assert = require("chai").assert; // node.js core module

describe('elasticsearch',function(){

    var seneca = require('seneca')();
    seneca.use('..');

    describe('stats',function(){
        it('should cluster stats',function(done){
            var req =  {lpi:'elasticsearch', cmd:'stats', config:{elasticsearch:{name:"TEST",host:"http://localhost"}}};

            seneca.act(req, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                done();
            });
        })
    });

    describe('about',function(){
        it('should return integration properties',function(done){
            seneca.act( {lpi:'elasticsearch', cmd:'about'}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                assert.equal(result.name,'elasticsearch','name is elasticsearch');
                done();
            });
        })
    });


    describe('list',function(){
        it('should return a command\'s json schema',function(done){
            seneca.act({lpi:'elasticsearch',cmd:'list'}, function(err,list){
                console.log('%j',list);
                assert.isObject(list,'list is object');
                done();
            });
        });
    });
});
