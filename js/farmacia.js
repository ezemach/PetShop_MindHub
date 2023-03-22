const { createApp } = Vue

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            datos: [],
            datosFarmacia: [],
            datosFarmaciaFiltrados: [{}, {}],
            isAsideInactive: true,
            valorBusqueda: "",
            favoritos:[],
            valorModal: {},
            valorContador: 0,
            arrayCarrito:[]
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then(data => {
                this.datos = data;
                for (producto of this.datos){
                  producto.contador = 0
                }
                this.datosFarmacia = this.datos.filter(producto => producto.categoria === "farmacia");
                this.datosFarmaciaFiltrados = this.datos.filter(producto => producto.categoria === "farmacia");
            })
            .catch(error => console.log(error))
            this.favoritos= JSON.parse(localStorage.getItem("favoritos"))||[];
            this.arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];
            this.totalCompra = JSON.parse(localStorage.getItem("totalCompra")) || 0;
    },
    methods: {
        filtroBusqueda() {
            this.datosFarmaciaFiltrados = this.datosFarmacia.filter(producto =>
                producto.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase())
            )
        },
        aparecerCarrito() {
            this.isAsideInactive = !this.isAsideInactive;
        },
        borrarFavoritos(){
            this.favoritos=[]
            localStorage.setItem("favoritos", JSON.stringify(this.favoritos))
        },
        evento(evento){
            this.valorModal = this.datosFarmaciaFiltrados.find(e => e.producto == evento.target.alt)
        },
        handleFav(){
            localStorage.setItem("favoritos", JSON.stringify(this.favoritos))
        },

        restarValor(evento){
          this.datos.map(e => {if (e.producto == evento.target.name){ 
            if(e.contador == 0){
              e.contador = 0
            } else {
              e.contador -= 1;
            }
          }})
          this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
          localStorage.setItem("totalCompra", JSON.stringify(this.totalCompra))
        },
  
        sumarValor(evento){
          this.datos.map(e => {if (e.producto == evento.target.name){ 
            e.contador += 1
          }})
          this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
          localStorage.setItem("totalCompra", JSON.stringify(this.totalCompra))
        },
  
        restarCarrito(evento){
          this.arrayCarrito.map(e => {if (e.producto == evento.target.name){ 
            if(e.contador == 0){
              e.contador = 0
            } else {
              e.contador -= 1;
            }
          }})
          this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
          localStorage.setItem("arrayCarrito", JSON.stringify(this.arrayCarrito));
          localStorage.setItem("totalCompra", JSON.stringify(this.totalCompra))
        },
  
        sumarCarrito(evento){
          this.arrayCarrito.map(e => {if (e.producto == evento.target.name){ 
            e.contador += 1
          }})
          this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
          localStorage.setItem("arrayCarrito", JSON.stringify(this.arrayCarrito));
          localStorage.setItem("totalCompra", JSON.stringify(this.totalCompra))
        },

        añadirCarrito(evento){
          this.arrayCarrito.push(this.datosFarmaciaFiltrados.find(e => e.producto == evento.target.alt))
          this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
          localStorage.setItem("arrayCarrito", JSON.stringify(this.arrayCarrito));
          localStorage.setItem("totalCompra", JSON.stringify(this.totalCompra))
        },
  
        borrarRegistro(evento){
          this.arrayCarrito = this.arrayCarrito.filter(e => e.producto !== evento.target.alt);
          this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0);
          localStorage.setItem("arrayCarrito", JSON.stringify(this.arrayCarrito));
          localStorage.setItem("totalCompra", JSON.stringify(this.totalCompra))
        }
  },
})

app.mount("#app")

//boton
const btnScrollTop = document.querySelector('#btn-scroll-top');

btnScrollTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 200) {
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
});
