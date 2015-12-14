'use strict';

const events = require('monument').events
    , env = require('../utils/env')
    , MongoClient = require('mongodb').MongoClient
    , url = env.MONGO_URL
    , utils = require('../utils');


MongoClient.connect(url, (err, db) => {

    const store = db.collection('store');

    events.on('data:get', (input) => {
        const id = utils.convertToMongoID(input.id);

        if (utils.isDefined(input.id)) {
            store.findOne({
                $and: [
                    { '_meta.access.app': input.app }
                    , { '_meta.access.read': true }
                    , {
                        $or: [
                            { '_meta.id': id }
                            , { _id: id }
                        ]
                    }
                ]
            }, (findOneError, doc) => {
                events.emit(`data:set:${input.app}:${input.id}`, doc);
            });
        } else {
            events.emit(`data:set:${input.app}:${input.id}`, null);
        }
    });

    events.on('data:get:all', (input) => {
        store.find({
            $and: [
                { '_meta.access.app': input.key }
                , { '_meta.access.read': true }
            ]
        }).toArray((findErr, docs) => {
            events.emit(`data:set:all:${input.key}`, docs);
        });
    });

    events.on('data:new', (input) => {
        // clone data
        const data = utils.clone(input.data);

        data._meta = {
            access: [
                { app: input.key, read: true, write: true, del: true }
            ]
            , createdDate: new Date()
            , updatedDate: new Date()
            , createdBy: input.key
        };

        // remove any id the user might have set in the object through _id
        //  and put it in _meta where we will query it
        if (data.id || data._id) {
            data._meta.id = data.id || data._id;
            data._id = undefined;
        }

        store.insert(data, (insertErr, doc) => {
            if (insertErr) {
                console.log(insertErr);
            }

            events.emit(`data:saved:${input.id}`, doc);
        });

    });

    events.on('data:update', (input) => {
        input.data._meta.updatedDate = new Date();
        input.data._id = utils.convertToMongoID(input.data._id);

        store.update({ _id: input.data._id }, input.data, (updateErr, result) => {
            events.emit(`data:saved:${input.data._id}`, result.result.ok === 1);
        });

    });

    events.on('data:delete', (idIn) => {
        const id = utils.convertToMongoID(idIn);

        if (utils.isDefined(id)) {
            store.remove({ _id: id }, (removeErr, result) => {
                events.emit(`data:deleted:${id}`, { success: result === 1 });
            });
        } else {
            events.emit(`data:deleted:${id}`, false);
        }
    });
});
