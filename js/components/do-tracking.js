Vue.component("do-tracking", {
    template: "#tpl-do-tracking",
    data() {
        return {
            nomorDO: "",
            hasil: null,
            error: "",
            newTravel: {
                waktu: "",
                keterangan: "",
            },
        };
    },
    computed: {
        statusClass() {
            if (!this.hasil) return "";

            let s = this.hasil.status.toLowerCase();

            if (s.includes("selesai")) return "selesai";
            if (s.includes("dalam")) return "perjalanan";
            return "dikirim";
        },
        progressWidth() {
            if (!this.hasil) return "0%";

            let s = this.hasil.status.toLowerCase();

            if (s.includes("selesai")) return "100%";
            if (s.includes("dalam")) return "70%";
            return "40%";
        },
    },
    methods: {
        cariDO() {
            const key = this.nomorDO.trim();

            const found = this.$root.trackingList.find((obj) => obj[key]);

            if (!found) {
                this.error = "Nomor DO tidak ditemukan";
                this.hasil = null;
                return;
            }

            this.hasil = found[key]; // ambil data DO
            this.error = "";
        },
        resetCari() {
            this.nomorDO = "";
            this.error = "";
            this.hasil = null;
        },
        addPerjalanan() {
            if (!this.newTravel.keterangan) {
                alert("Keterangan wajib diisi!");
                return;
            }

            let waktu;

            if (this.newTravel.waktu) {
                waktu = this.formatDateTime(this.newTravel.waktu);
            } else {
                waktu = this.formatDateTime(new Date());
            }

            const newEntry = {
                waktu: waktu,
                keterangan: this.newTravel.keterangan,
            };

            this.hasil.perjalanan.push(newEntry);

            const idx = this.$root.trackingList.findIndex(
                (t) => t.do === this.nomorDO
            );
            if (idx !== -1) {
                this.$root.trackingList[idx].perjalanan.push(newEntry);
            }

            this.newTravel = { waktu: "", keterangan: "" };

            alert("Riwayat perjalanan berhasil ditambahkan!");
        },
        formatDateTime(dt) {
            const d = new Date(dt);

            const YYYY = d.getFullYear();
            const MM = String(d.getMonth() + 1).padStart(2, "0");
            const DD = String(d.getDate()).padStart(2, "0");

            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            const ss = String(d.getSeconds()).padStart(2, "0");

            return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
        },
    },
});
