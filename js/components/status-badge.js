Vue.component("status-badge", {
    template: "#tpl-status-badge",
    props: ["qty", "safety"],
    computed: {
        badgeClass() {
            if (this.qty === 0) return "badge kosong";
            if (this.qty < this.safety) return "badge menipis";

            return "badge aman";
        },

        text() {
            if (this.qty === 0) return "Kosong";
            if (this.qty < this.safety) return "Menipis";
            return "Aman";
        },
    },
});
