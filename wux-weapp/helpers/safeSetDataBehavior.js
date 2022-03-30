Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _default = Behavior({
    lifetimes: {
        created: function() {
            this.nextCallback = null;
        },
        detached: function() {
            this.cancelNextCallback();
        }
    },
    methods: {
        safeSetData: function(t, a) {
            var e = this;
            this.pendingData = Object.assign({}, this.data, t), a = this.setNextCallback(a), 
            this.setData(t, function() {
                e.pendingData = null, a();
            });
        },
        setNextCallback: function(a) {
            var e = this, l = !0;
            return this.nextCallback = function(t) {
                l && (l = !1, e.nextCallback = null, a.call(e, t));
            }, this.nextCallback.cancel = function() {
                l = !1;
            }, this.nextCallback;
        },
        cancelNextCallback: function() {
            null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null);
        }
    }
});

exports.default = _default;