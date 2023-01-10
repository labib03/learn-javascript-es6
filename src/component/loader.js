class Loader extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="mt-24">
        <div class="leap-frog">
        <div class="leap-frog__dot"></div>
        <div class="leap-frog__dot"></div>
        <div class="leap-frog__dot"></div>
        </div>
        </div>
        `
    }
}

customElements.define('loader-app', Loader)
