var app = getApp();

Component({
    properties: {
        items: Object
    },
    data: {},
    methods: {
        toPage: function(t) {
            app.route({
                type: "navigate",
                url: t.currentTarget.dataset.url
            });
        }
    }
});