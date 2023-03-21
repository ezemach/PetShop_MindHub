const { createApp } = Vue;

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            datos: [],
            datosJuguetes: [],
            datosJuguetesFiltrados: [{}, {}],
            isAsideInactive: true,
            valorBusqueda: "",
            favoritos:[],
            valorModal: {},
            arrayCarrito:[],
            totalCompra:0,
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
              this.datosJuguetes = this.datos.filter(producto => producto.categoria == "jugueteria");
              this.datosJuguetesFiltrados = this.datos.filter(producto => producto.categoria == "jugueteria");
              this.favoritos= JSON.parse(localStorage.getItem("favoritos"))||[];
          })
          .catch(error => console.log(error))
  },
  methods: {
      filtroBusqueda() {
          this.datosJuguetesFiltrados = this.datosJuguetes.filter(producto =>
              producto.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase())
          )
      },

      aparecerCarrito() {
          this.isAsideInactive = !this.isAsideInactive;
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
      },

      sumarValor(evento){
        this.datos.map(e => {if (e.producto == evento.target.name){ 
          e.contador += 1
        }})
        this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
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
      },

      sumarCarrito(evento){
        this.arrayCarrito.map(e => {if (e.producto == evento.target.name){ 
          e.contador += 1
        }})
        this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
      },

      borrarFavoritos(){
          this.favoritos=[]
      },

      evento(evento){
          this.valorModal = this.datosJuguetesFiltrados.find(e => e.producto == evento.target.alt)
      },

      handleFav(){
          localStorage.setItem("favoritos", JSON.stringify(this.favoritos))
      },

      añadirCarrito(evento){
        this.arrayCarrito.push(this.datosJuguetesFiltrados.find(e => e.producto == evento.target.alt))
        this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
      },

      borrarRegistro(evento){
        let indice = this.arrayCarrito.indexOf(this.datosJuguetesFiltrados.find(e => e.producto == evento.target.alt));
        this.arrayCarrito.splice(indice , 1)
        this.totalCompra = this.arrayCarrito.reduce((acumulador, prod)=> acumulador += (prod.precio * prod.contador), 0)
      }
  },
})

app.mount("#app");

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