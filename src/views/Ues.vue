<template>
    <section class="ues">
        <div class="title ues-header">
            <h2>Repositorio UES</h2>
            <div class="wrapper">
                <div class="text-wrapper">Archivos, guias y utilidades.
                    <p>También puedes consultar el drive completo
                        <v-btn icon="mdi-open-in-new" size="large" variant="plain" density="compact"
                            href="https://drive.google.com/drive/folders/1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h?usp=drive_link"
                            target="_blank"></v-btn>
                    </p>
                </div>
            </div>
        </div>

        <div class="ues-grid">
            <iframe src="https://drive.google.com/embeddedfolderview?id=1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h#grid"
                style="width:100%; height:1000px; border:0;" title="Google Drive UES - DDeras"></iframe>
        </div>

        <v-divider></v-divider>

        <!-- Contacto -->
        <div class="title">
            <div class="wrapper">
                <div class="text-wrapper-contact">
                    <p>(*) Este repositorio es una recopilación de recursos de la UES, no es un repositorio oficial de la
                        universidad. Si tienes preguntas o deseas compartir algún recurso, puedes hacerlo al
                        correo:
                    </p>
                    <a href="mailto:davidderas50@gmail.com">
                        <v-btn style="margin-top: 10px;" color="primary" dark size="small">Contáctame</v-btn>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx;

onMounted(() => {
    ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.ues-header', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.ues-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })
        .from('.ues-grid', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.ues-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }, "-=0.5");
    });
});

onUnmounted(() => {
    ctx.revert();
});
</script>

<style scoped>
.ues {
    background-color: #ffffff;
    margin: 50px 5% 30px 5%;
}


.title {
    text-align: center;
}

.title h2 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
}

.wrapper {
    display: flex;
    justify-content: center;
}

.text-wrapper {
    margin: 0 25% 0 25%;
    font-style: italic;
}

.text-wrapper &:after {
    content: "";
    width: 150px;
    display: block;
    margin: 20px auto;
    border-bottom: 1px solid #353535;
}

.text-wrapper-contact {
    margin: 20px 15% 0 15%;
    font-size: 11px;
}


.ues-grid {
    display: flex;
    margin-bottom: 20px;
}


@media (max-width: 960px) {
    .text-wrapper {
        margin: 0 10% 0 10%;
        font-style: italic;
    }

    .text-wrapper-contact {
        margin: 10px 10% 0 10%;
    }
}
</style>
