new Vue({
    el: "#app",
    data: {
        tab: "stok",
        upbjjList: [],
        kategoriList: [],
        pengirimanList: [],
        paketList: [],
        stokList: [],
        trackingList: [],
    },
    created() {
        API.loadData().then((data) => {
            this.upbjjList = data.upbjjList;
            this.kategoriList = data.kategoriList;
            this.pengirimanList = data.pengirimanList;
            this.paketList = data.paket;
            this.stokList = data.stok;

            this.trackingList = [];

            if (data.tracking) {
                data.tracking.forEach((obj) => {
                    this.trackingList.push(obj);
                });
            }
        });
    },

    methods: {
        findTracking(doNumber) {
            return this.trackingList.find((t) => t.do === doNumber) || null;
        },
        nextDO() {
            const list = this.trackingList;

            if (list.length === 0) {
                return "DO" + new Date().getFullYear() + "-0001";
            }

            const lastObj = list[list.length - 1];
            const lastDO = Object.keys(lastObj)[0];

            const match = lastDO.match(/DO(\d{4})-(\d{4})/);

            const next = parseInt(match[2]) + 1;

            return "DO" + match[1] + "-" + String(next).padStart(4, "0");
        },
    },
});
