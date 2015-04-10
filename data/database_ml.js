var events = require('monument').events
    , mlclient = require('lds-ml-js')
    , config = require('lds-cf-service-config')
    , crypto = require('crypto')
    , utils = require('../utils')

    , ml = mlclient.connect(config['content-store'].credentials);


events.on('data:get', function (input) {
    'use strict';

    var id = input.id;

    if(typeof input.id !== 'undefined') {
        ml.find({'_meta.access.app': input.app, '_id': id, '_meta.access.read': true}, function (err, doc) {
            events.emit('data:set:' + input.app + ':' + input.id, doc);
        });
    } else {
        events.emit('data:set:' + input.app + ':' + input.id, null);
    }
});

events.on('data:get:all', function (input) {
    'use strict';

    ml.find({'_meta.access.app': input.key, '_meta.access.read': true}, function (err, docs) {
        events.emit('data:set:all:' + input.key, docs.results || []);
    });
});

events.on('data:new', function (input) {
    'use strict';

    //clone data
    var data = JSON.parse(JSON.stringify(input.data))
        , id = crypto.createHash('sha1').update(JSON.stringify(input.data)).digest('hex');

    data._meta = {
        access: [
            {app: input.key, read:true, write:true, del:true}
        ]
        , createdDate: new Date()
        , updatedDate: new Date()
        , createdBy: input.key
    };

    ml.save(data, function(err,doc) {
        if(err){
            console.log(err);
        }

        events.emit('data:saved:' + id, doc);
    });

});

events.on('data:update', function (input) {
    'use strict';

    input.data._meta.updatedDate = new Date();
    input.data._id = utils.convertToMongoID(input.data._id);

    // alittle more complicated here...
    //TODO: get the document
    //TODO: update the document
    //TODO: save the document

    ml.update({'_id': input.data._id}, input.data, function (err, result) {
        events.emit('data:saved:' + input.id, (result === 1));
    });

});

events.on('data:delete', function (idIn) {
    'use strict';

    var id = utils.convertToMongoID(idIn);

    if(typeof id !== 'undefined'){
        ml.findAndDelete({'_id': id}, function(err, result) {
            events.emit('data:deleted:' + id, (result === 1));
         });
    } else {
        events.emit('data:deleted:' + id, false);
    }
});
