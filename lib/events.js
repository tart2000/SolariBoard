//     Backbone.js 0.5.3
//     (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://documentcloud.github.com/backbone
var Events = {

  // Bind an event, specified by a string name, `ev`, to a `callback` function.
  // Passing `"all"` will bind the callback to all events fired.
  bind : function(ev, callback, context) {
    var calls = this._callbacks || (this._callbacks = {});
    var list  = calls[ev] || (calls[ev] = []);
    list.push([callback, context]);
    return this;
  },

  // Remove one or many callbacks. If `callback` is null, removes all
  // callbacks for the event. If `ev` is null, removes all bound callbacks
  // for all events.
  unbind : function(ev, callback) {
    var calls;
    if (!ev) {
      this._callbacks = {};
    } else if (calls = this._callbacks) {
      if (!callback) {
        calls[ev] = [];
      } else {
        var list = calls[ev];
        if (!list) return this;
        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i] && callback === list[i][0]) {
            list[i] = null;
            break;
          }
        }
      }
    }
    return this;
  },

  // Trigger an event, firing all bound callbacks. Callbacks are passed the
  // same arguments as `trigger` is, apart from the event name.
  // Listening for `"all"` passes the true event name as the first argument.
  trigger : function(eventName) {
    var list, calls, ev, callback, args;
    var both = 2;
    if (!(calls = this._callbacks)) return this;
    while (both--) {
      ev = both ? eventName : 'all';
      if (list = calls[ev]) {
        for (var i = 0, l = list.length; i < l; i++) {
          if (!(callback = list[i])) {
            list.splice(i, 1); i--; l--;
          } else {
            args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
            callback[0].apply(callback[1] || this, args);
          }
        }
      }
    }
    return this;
  }

};
