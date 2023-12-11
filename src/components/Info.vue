<template>
    <section class="about">
        <AnimateOnVisible name="slide-fade">
            <div class="title">
                <h2>Sobre mi</h2>
                <div class="wrapper">
                    <div class="text-wrapper">Desarrollador Fullstack salvadoreño </div>
                </div>
            </div>
        </AnimateOnVisible>

        <AnimateOnVisible name="slide-fade">
            <div class="angry-grid">
                <div id="item-0">
                    <div>
                        <div class="photo">
                            <a>
                                <img src="../assets/maki.jpg" alt="photo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="item-1">
                    <div class="paragraph">
                        <h3>¿QUIEN SOY?</h3>
                        <div class="begin">Informático con experiencia en el desarrollo web y móvil.
                            Estudiante aplicado y entusiasta del análisis y
                            diseño de sistemas.</div>
                        <p>Me gusta trabajar los proyectos desafiantes, aprender nuevas formas de solucionar problemas,
                            y comprender sus enfoques.</p>
                    </div>
                </div>
                <div id="item-2">
                    <div>
                        <h3>Información de Contacto</h3>
                        <div class="data"><strong>Correo:</strong> davidderas50@gmail.com</div>
                        <div class="data"><strong>Teléfono:</strong> +503 74641460</div>
                        <div class="data"><strong>Ciudad:</strong> San Salvador</div>
                        <div class="data"><strong>Idiomas:</strong> Español (nativo), Inglés (B1)</div>
                    </div>
                </div>

            </div>
        </AnimateOnVisible>
        <!-- Mi CV -->
        <div class="title-cv">
            <h3>Mi CV</h3>
            <div class="wrapper">
                <div class="text-wrapper">
                    <a href="../../public/CV_David_Deras_carta.pdf" download="CV_David_Deras_carta.pdf">Descarga mi CV</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Info',
}
</script>

<style scoped>
.about {
    padding: 50px 0;
    background-color: #ffffff;
}

.title {
    text-align: center;
    color: #353535;
}

.title h2 {
    font-size: 4rem;
    text-transform: uppercase;
}

.title-cv {
    text-align: center;
    color: #353535;
    margin: 10px 0 10px 0;
}

.title-cv h2 {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #7f1a30;
}

h3 {
    margin-bottom: 10px;
}

.text-wrapper {
    text-transform: uppercase;
    margin: 0 15px 0 15px;
}

.text-wrapper &:after {
    content: "";
    width: 150px;
    display: block;
    margin: 20px auto;
    border-bottom: 1px solid #353535;
}

.photo a:focus {
    outline: none;
}

.photo img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
}

.paragraph {
    color: #353535;
}

.paragraph .begin {
    color: #3C6E71;
}

.data {
    margin-bottom: 5px;
}



/* PARA GRID */
.angry-grid {
    display: grid;

    grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10%;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;

    gap: 0px;
    height: 100%;

}

#item-0 {

    /* background-color: #955799; */
    grid-row-start: 1;
    grid-column-start: 5;

    grid-row-end: 5;
    grid-column-end: 8;

    margin-top: 10px;
    margin-bottom: 50px;

}

#item-1 {

    /* background-color: #cbdbec; */
    grid-row-start: 5;
    grid-column-start: 2;

    grid-row-end: 8;
    grid-column-end: 6;

}

#item-2 {

    /* background-color: #cbd875; */
    grid-row-start: 5;
    grid-column-start: 7;

    grid-row-end: 8;
    grid-column-end: 10;

}

/* FIN PARA GRID */

/* PARA GRID MD */
@media (max-width: 768px) {
    .angry-grid {
        display: inline-block;
        height: 100%;
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 10%;

    }

    #item-0 {

        /* background-color: #955799; */
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 10px;

    }

    #item-1 {

        /* background-color: #cbdbec; */
        display: flex;
        justify-content: center;
        align-items: center;

    }

    #item-2 {

        /* background-color: #cbd875; */
        display: flex;
        margin-top: 10%;

    }
}
</style>