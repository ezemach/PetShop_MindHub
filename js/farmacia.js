const { createApp } = Vue

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            datos: [],
            datosFarmacia: [],
            farmaciaProdcutos:[],
        }
    },
    created(){
        fetch ("https://mindhub-xj03.onrender.com/api/petshop")
        .then(response => response.json())
        .then(data => {
            this.datos = data;
            this.datosFarmacia = data.filter(producto => producto.categoria === "farmacia");
            this.productosFiltrados =  data;
            console.log(this.datosFarmacia)
        })
        .catch(error => console.log(error))
    },
    computed : {
        filtro(){
            let filtradoBusqueda = this.datos.filter( p => p.producto.toLowerCase().includes( this.valorBusqueda.toLowerCase() ) )
            this.prodcutossFiltrados = filtradoBusqueda
        },
        }
})

app.mount("#app")