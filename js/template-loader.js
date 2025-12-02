const TemplateLoader = {
    async load(id, url) {
        const html = await fetch(url).then((res) => res.text());
        const container = document.createElement("div");
        container.innerHTML = html;
        const tpl = container.querySelector("script");
        document.body.appendChild(tpl);
    },
};
