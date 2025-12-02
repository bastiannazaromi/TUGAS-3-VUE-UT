Vue.component("order-form", {
    template: "#tpl-order-form",
    data() {
        return {
            form: {
                nim: "",
                nama: "",
                paket: "",
                upbjj: "",
                pengiriman: "",
            },

            result: null,
        };
    },
    computed: {
        paketList() {
            return this.$root.paketList;
        },
        upbjjList() {
            return this.$root.upbjjList;
        },
        pengirimanList() {
            return this.$root.pengirimanList;
        },
        isiPaket() {
            const p = this.paketList.find((x) => x.kode === this.form.paket);
            return p ? p.isi : [];
        },
        totalHarga() {
            const p = this.paketList.find((x) => x.kode === this.form.paket);
            return p ? p.harga : 0;
        },
    },
    methods: {
        generateDO() {
            return this.$root.nextDO();
        },
        submitOrder() {
            if (
                !this.form.nim ||
                !this.form.nama ||
                !this.form.paket ||
                !this.form.upbjj ||
                !this.form.pengiriman
            ) {
                alert("Semua field wajib diisi!");
                return;
            }

            if (this.form.nim.length < 5) {
                alert("NIM minimal 5 digit.");
                return;
            }

            if (this.form.nama.length < 3) {
                alert("Nama minimal 3 karakter.");
                return;
            }

            const newDO = this.$root.nextDO();
            const tanggal = new Date().toISOString().split("T")[0];

            this.result = {
                do: newDO,
                nim: this.form.nim,
                nama: this.form.nama,
                paket: this.form.paket,
                tanggal: tanggal,
                pengiriman: this.form.pengiriman,
                total: this.totalHarga,
            };

            this.$root.trackingList.push({
                [newDO]: {
                    nim: this.form.nim,
                    nama: this.form.nama,
                    paket: this.form.paket,
                    ekspedisi: this.form.pengiriman,
                    tanggalKirim: tanggal,
                    total: this.totalHarga,
                    status: "Belum Diproses",
                    perjalanan: [],
                },
            });

            alert("Pesanan berhasil dibuat. Nomor DO: " + newDO);
        },
    },
});
