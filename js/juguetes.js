const { createApp } = Vue

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            datos: undefined,
            datosJuguetes: undefined,
            datosJuguetesFiltrados: [{},{}],
            valorBusqueda: "",
            isAsideInactive: true,
        }
    },
    created(){
        fetch ("https://mindhub-xj03.onrender.com/api/petshop")
        .then(response => response.json())
        .then(data => {
            this.datos = data;
            this.datosJuguetes = data.filter(producto => producto.categoria === "jugueteria")
            this.datosJuguetesFiltrados = data.filter(producto => producto.categoria === "jugueteria")
            console.log(this.valorBusqueda);
        })
        .catch(error => console.log(error))
    },
    methods : {
        filtroBusqueda(){ 
            this.datosJuguetesFiltrados = this.datosJuguetes.filter( producto => 
            producto.producto.toLowerCase().includes( this.valorBusqueda.toLowerCase()) 
        )},
        aparecerCarrito() {
            this.isAsideInactive = !this.isAsideInactive;
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