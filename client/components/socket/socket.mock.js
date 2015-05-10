// Socket mock taken from socket-io.js from angular-socket-io
// TODO just pull in the 'socket' var definition from the socket-io.js "somehow" :)
(function() {
  /*jshint unused: false */
  'use strict';

  angular.module('socketMock', [])
    .factory('socket', function() {
      var socket = {
        on: function(ev, fn) {
          (this._listeners[ev] = this._listeners[ev] || []).push(fn);
        },
        once: function(ev, fn) {
          (this._listeners[ev] = this._listeners[ev] || []).push(fn);
          fn._once = true;
        },
        emit: function(ev, data) {
          if (this._listeners[ev]) {
            var args = arguments;
            this._listeners[ev].forEach(function(listener) {
              if (listener._once) {
                this.removeListener(ev, listener);
              }
              listener.apply(null, Array.prototype.slice.call(args, 1));
            }.bind(this));
          }
        },
        _listeners: {},
        removeListener: function(ev, fn) {
          if (fn) {
            var index = this._listeners[ev].indexOf(fn);
            if (index > -1) {
              this._listeners[ev].splice(index, 1);
            }
          } else {
            delete this._listeners[ev];
          }
        },
        removeAllListeners: function(ev) {
          if (ev) {
            delete this._listeners[ev];
          } else {
            this._listeners = {};
          }
        },
        disconnect: function() {}
      };

      return {
        socket: socket,

        /**
         * Register listeners to sync an array with updates on a model
         *
         * Takes the array we want to sync, the model name that socket updates are sent from,
         * and an optional callback function after new items are updated.
         *
         * @param {String} modelName
         * @param {Array} array
         * @param {Function} cb
         */
        syncUpdates: function(modelName, array, cb) {
          cb = cb || angular.noop;

          /**
           * Syncs item creation/updates on 'model:save'
           */
          socket.on(modelName + ':save', function(item) {
            var oldItem = _.find(array, {
              _id: item._id
            });
            var index = array.indexOf(oldItem);
            var event = 'created';

            // replace oldItem if it exists
            // otherwise just add item to the collection
            if (oldItem) {
              array.splice(index, 1, item);
              event = 'updated';
            } else {
              array.push(item);
            }

            cb(event, item, array);
          });

          /**
           * Syncs removed items on 'model:remove'
           */
          socket.on(modelName + ':remove', function(item) {
            var event = 'deleted';
            _.remove(array, {
              _id: item._id
            });
            cb(event, item, array);
          });
        },

        /**
         * Removes listeners for a models updates on the socket
         *
         * @param modelName
         */
        unsyncUpdates: function(modelName) {
          socket.removeAllListeners(modelName + ':save');
          socket.removeAllListeners(modelName + ':remove');
        }
      };
    });
})();
