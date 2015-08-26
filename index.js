var schemas = require('./commands');
var pjson = require('./package.json');
var elasticsearch = require('elasticsearch');

var service = {
    "name": "elasticsearch"
    , "label": "Elasticsearch"
    , "description": "This integration gets a JSON webhook"
    , "version": pjson.version
    , "private": true
    , "form_options": null
    , "is_oauth": false
    , "logo": "//linchpin-web-assets.s3.amazonaws.com/v1/integrations/elasticsearch/logos/www.png"
    , "server_integration": true
    , "frontend_integration": true
    , "supports_webhook": false
};

module.exports = function(options) {
    var lpis = this;

    options = lpis.util.deepextend({
    },options);

    lpis.add({lpi:'elasticsearch',cmd:'about'},about);
    lpis.add({lpi:'elasticsearch',cmd:'list'},list);
    lpis.add({lpi:'elasticsearch',cmd:'stats'},stats);

    return {
        name:'elasticsearch'
    };

    function about (args, done ){
        return done(null,service);
    }

    function list (args, done){
        return done(null, schemas);
    }

    function stats(args,done){
        var host = args.config.elasticsearch.host;
        var port = args.config.elasticsearch.port || 9200;

        var client = new elasticsearch.Client({
            host: host+':'+port,
            log: 'info'
        });

        client.cluster.stats({
            flatSettings: false,
            human: true
        }, function(err, result){
            if (err){
                return done(err);
            }

            done(null, result);
        })

    }
};