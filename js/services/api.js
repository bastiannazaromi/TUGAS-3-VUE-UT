const API = {
    async loadData() {
        try {
            const res = await fetch("data/dataBahanAjar.json");
            return await res.json();
        } catch (e) {
            console.error("Gagal memuat data JSON:", e);
            return null;
        }
    },
};
