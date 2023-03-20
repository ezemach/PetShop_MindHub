const { createApp } = Vue

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            datos: undefined,
            primerdatoJuguetes: {undefined},
            otrosdatosJuguetes: undefined,
            primerdatoFarmacia: {undefined},
            otrosdatosFarmacia: undefined,
            datosJuguetes: undefined,
            datosFarmacia: undefined,
        }
    },
    created(){
        fetch ("https://mindhub-xj03.onrender.com/api/petshop")
        .then(response => response.json())
        .then(data => {
            this.datos = data;
            this.datosJuguetes = data.filter(producto => producto.categoria === "jugueteria")
            this.datosFarmacia = data.filter(producto => producto.categoria === "farmacia")
            this.primerdatoJuguetes = this.datosJuguetes.slice(0,1)[0]
            this.otrosdatosJuguetes = this.datosJuguetes.slice(1,-1)
            this.primerdatoFarmacia = this.datosFarmacia.slice(0,1)[0]
            this.otrosdatosFarmacia = this.datosFarmacia.slice(1,-1)
        })
        .catch(error => console.log(error))
    },
})

app.mount("#app")