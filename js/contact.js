const { createApp } = Vue;

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            infoName : "",
            infoTel : "",
            infoEmail : "",
            infoMascota : "",
            textArea : "",
        }
    },
    methods: {
        onSubmit() {
            this.infoName = "";
            this.infoTel = "";
            this.infoEmail = "";
            this.infoMascota = "";
            this.textArea = "";
        },
    }
})

app.mount("#app");