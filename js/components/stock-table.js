Vue.component("ba-stock-table", {
    template: "#tpl-stock-table",
    data() {
        return {
            filter: {
                upbjj: "",
                kategori: "",
                menipis: false,
                habis: false,
            },
            sortField: "judul",
            sortDir: "asc",
            newItem: {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: "",
            },
            modalOpen: false,
            itemToDelete: null,
            editModal: false,
            editItemData: {
                kode: "",
                judul: "",
                qty: 0,
                safety: 0,
                catatanHTML: "",
            },
            editTarget: null,
        };
    },
    computed: {
        upbjjList() {
            return this.$root.upbjjList;
        },
        kategoriList() {
            return this.$root.kategoriList;
        },
        stok() {
            return this.$root.stokList;
        },
        filteredData() {
            return this.stok.filter((item) => {
                if (this.filter.upbjj && item.upbjj !== this.filter.upbjj)
                    return false;
                if (
                    this.filter.kategori &&
                    item.kategori !== this.filter.kategori
                )
                    return false;
                if (this.filter.menipis && !(item.qty < item.safety))
                    return false;
                if (this.filter.habis && item.qty !== 0) return false;

                return true;
            });
        },
        sortedData() {
            return [...this.filteredData].sort((a, b) => {
                let f = this.sortField;
                if (a[f] < b[f]) return this.sortDir === "asc" ? -1 : 1;
                if (a[f] > b[f]) return this.sortDir === "asc" ? 1 : -1;
                return 0;
            });
        },
    },
    methods: {
        sortBy(field) {
            if (this.sortField === field) {
                this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
            } else {
                this.sortField = field;
                this.sortDir = "asc";
            }
        },
        resetFilter() {
            this.filter = {
                upbjj: "",
                kategori: "",
                menipis: false,
                habis: false,
            };
        },
        addStok() {
            if (!this.newItem.kode || !this.newItem.judul) {
                alert("Kode & Judul wajib diisi!");
                return;
            }

            if (!this.newItem.kategori || !this.newItem.upbjj) {
                alert("Kategori & UPBJJ wajib diisi!");
                return;
            }

            this.stok.push({
                kode: this.newItem.kode,
                judul: this.newItem.judul,
                kategori: this.newItem.kategori || "-",
                upbjj: this.newItem.upbjj || "-",
                lokasiRak: this.newItem.lokasiRak || "-",
                harga: this.newItem.harga || 0,
                qty: this.newItem.qty || 0,
                safety: this.newItem.safety || 0,
                catatanHTML: this.newItem.catatanHTML || "",
            });

            this.newItem = {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: "",
            };
        },
        updateQty(item) {
            alert("Update qty : " + item.qty);
        },
        deleteItem(item) {
            this.itemToDelete = item;
            this.modalOpen = true;
        },
        confirmDelete() {
            const idx = this.stok.indexOf(this.itemToDelete);
            if (idx !== -1) this.stok.splice(idx, 1);

            this.modalOpen = false;
            this.itemToDelete = null;
        },
        editItem(item) {
            this.editTarget = item;

            this.editItemData = {
                judul: item.judul,
                kategori: item.kategori,
                upbjj: item.upbjj,
                lokasiRak: item.lokasiRak,
                harga: item.harga,
                safety: item.safety,
                catatanHTML: item.catatanHTML,
            };

            this.editModal = true;
        },
        saveEdit() {
            if (!this.editItemData.judul) {
                alert("Judul tidak boleh kosong!");
                return;
            }

            Object.assign(this.editTarget, {
                judul: this.editItemData.judul,
                qty: this.editItemData.qty,
                safety: this.editItemData.safety,
                catatanHTML: this.editItemData.catatanHTML,
            });

            this.editModal = false;
            this.editTarget = null;
        },
    },
});
