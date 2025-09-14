<template>
  <div class="isapres-carousel">
    <v-container fluid class="py-4">
      <div class="carousel-wrapper">
        <div class="carousel-track" ref="carouselTrack">
          <div 
            v-for="(isapre, index) in isapres" 
            :key="index"
            class="carousel-item"
          >
            <v-img
              :src="isapre.src"
              :alt="isapre.name"
              contain
              height="100"
              width="240"
              class="isapre-logo"
            />
          </div>
          <!-- Duplicamos las imágenes para efecto infinito -->
          <div 
            v-for="(isapre, index) in isapres" 
            :key="`duplicate-${index}`"
            class="carousel-item"
          >
            <v-img
              :src="isapre.src"
              :alt="isapre.name"
              contain
              height="100"
              width="240"
              class="isapre-logo"
            />
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'IsapresCarousel',
  data() {
    return {
      isapres: []
    }
  },
  async created() {
    // Importamos las imágenes dinámicamente
    const imageModules = [
      { name: 'Colmena', module: () => import('@/assets/img/isapres/1-colmena.png') },
      { name: 'Cruz Blanca', module: () => import('@/assets/img/isapres/2-cruzblanca.png') },
      { name: 'Vida Tres', module: () => import('@/assets/img/isapres/3-vidatres.png') },
      { name: 'Banmédica', module: () => import('@/assets/img/isapres/4-banmedica.png') },
      { name: 'Más Vida', module: () => import('@/assets/img/isapres/5-masvida.png') },
      { name: 'Consalud', module: () => import('@/assets/img/isapres/6-consalud.png') }
    ]
    
    for (const item of imageModules) {
      try {
        const module = await item.module()
        this.isapres.push({
          name: item.name,
          src: module.default
        })
      } catch (error) {
        console.warn(`No se pudo cargar la imagen de ${item.name}:`, error)
      }
    }
    
    // Iniciamos el carrusel después de cargar las imágenes
    this.$nextTick(() => {
      this.startCarousel()
    })
  },
  mounted() {
    // Si las imágenes ya están cargadas, iniciamos el carrusel
    if (this.isapres.length > 0) {
      this.startCarousel()
    }
  },
  methods: {
    startCarousel() {
      const track = this.$refs.carouselTrack
      if (!track) return
      
      let position = 0
      const speed = 0.5 // píxeles por frame (más lento)
      const itemWidth = 290 // ancho del item + gap
      const totalWidth = this.isapres.length * itemWidth
      
      const animate = () => {
        position -= speed
        
        // Cuando llegamos al final de las imágenes originales, reiniciamos
        if (Math.abs(position) >= totalWidth) {
          position = 0
        }
        
        track.style.transform = `translateX(${position}px)`
        requestAnimationFrame(animate)
      }
      
      animate()
    }
  }
}
</script>

<style scoped>
.isapres-carousel {
  background: linear-gradient(90deg, #f0f1f2 0%, #ffffff 50%, #f0f1f2 100%);
  /* Eliminamos bordes para integrar con el header */
  border-top: none;
  border-bottom: none;
  overflow: hidden;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.carousel-track {
  display: flex;
  align-items: center;
  will-change: transform;
  gap: 30px;
}

.carousel-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 260px;
  height: 120px;
}

.carousel-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.isapre-logo {
  filter: grayscale(30%);
  opacity: 0.85;
  transition: all 0.3s ease;
}

.carousel-item:hover .isapre-logo {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

/* Efecto de desvanecimiento en los bordes */
.carousel-wrapper::before,
.carousel-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;
  z-index: 2;
  pointer-events: none;
}

.carousel-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #f0f1f2, transparent);
}

.carousel-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #f0f1f2, transparent);
}

@media (max-width: 768px) {
  .carousel-track {
    gap: 20px;
  }
  
  .carousel-item {
    padding: 10px 8px;
  }
  
  .isapre-logo {
    height: 80px !important;
    width: 160px !important;
  }
  
  .carousel-wrapper::before,
  .carousel-wrapper::after {
    width: 30px;
  }
}
</style>