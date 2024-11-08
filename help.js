class Ayuda {
    constructor({ fondoPalabra = 'yellow', pesoPalabra = 'bold', subrayado = 'dotted', color, icono = false, fondoGlobo, colorIcono = '#fff', fondoIcono = '#000', duracion = 5000 }) {
        this.fondoPalabra = fondoPalabra;
        this.pesoPalabra = pesoPalabra;
        this.subrayado = subrayado;
        this.color = color;
        this.fondoGlobo = fondoGlobo;
        this.icono = icono;
        this.fondoIcono = fondoIcono || '#000';
        this.colorIcono = colorIcono  || '#fff';
        this.duracion = duracion;
        this.itemAyuda = document.querySelectorAll('[data-ayuda]');
        
        this.ponerFondoPalabras();
        this.ponerIcono();
        this.pulsarItem();
    }

    ponerIcono() {
        if (this.icono) {
            const estilos = document.querySelector('head style') || document.createElement('style');
            estilos.innerHTML += `
                [data-ayuda] {
                    padding-right: 0.8em;
                    border-bottom: 2px ${this.subrayado} #666;
                }
                [data-ayuda]::after {
                    content: "${this.icono}";
                    font-size: 0.5625em;
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 1.3em;
                    height: 1.3em;
                    text-align: center;
                    background-color: ${this.fondoIcono};
                    color: ${this.colorIcono};
                    border-radius: 50%;
                }
            `;
            document.head.appendChild(estilos);
        }
    }

    ponerFondoPalabras() {
        this.itemAyuda.forEach(palabra => palabra.style.backgroundColor = this.fondoPalabra);
    }

    darAyuda(e) {
        const globoExistente = document.getElementById('globo-ayuda');
        if (globoExistente) globoExistente.remove();

        const target = e.currentTarget;
        target.setAttribute('id', 'actual');

        let globoAyuda = document.createElement('div');
        globoAyuda.setAttribute('id', 'globo-ayuda');
        globoAyuda.classList.add('globo');
        globoAyuda.style = `
            padding: 10px 0 0;
            background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8"%3E%3Cpath d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="${encodeURIComponent(this.fondoGlobo)}"/%3E%3C/svg%3E') no-repeat 20px 3px;
        `;

        const altoTexto = parseInt(window.getComputedStyle(target).fontSize);
        globoAyuda.style.top = e.offsetY + altoTexto + 'px';
        globoAyuda.style.left = e.offsetX + 'px';

        globoAyuda.innerHTML = `<p style="background-color: ${this.fondoGlobo}; color: ${this.color};">${target.getAttribute('data-ayuda')}</p>`;
        target.appendChild(globoAyuda);

        setTimeout(() => {
            if ((globoAyuda.getBoundingClientRect().top + globoAyuda.offsetHeight) > window.innerHeight) {
                globoAyuda.style.top = e.offsetY - globoAyuda.offsetHeight - altoTexto + 'px';
                globoAyuda.style.padding = '0 0 10px 0';
                globoAyuda.style.backgroundPositionY = `${globoAyuda.offsetHeight - 11}px`;
            }
            if ((globoAyuda.getBoundingClientRect().left + globoAyuda.offsetWidth) > window.innerWidth) {
                globoAyuda.style.left = e.offsetX - globoAyuda.offsetWidth + 'px';
            }
        }, 0);

        setTimeout(() => {
            target.removeAttribute('id');
            globoAyuda.remove();
        }, this.duracion);
    }

    pulsarItem() {
        this.itemAyuda.forEach(ayuda => ayuda.addEventListener('click', this.darAyuda.bind(this)));
    }
}
