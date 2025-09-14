<template>
  <v-footer class="bg-primary text-white py-8">
    <v-container>
      <v-row>
        <!-- Información de la empresa -->
        <v-col cols="12" md="4">
          <div class="mb-4">
            <h3 class="text-h5 font-weight-bold mb-3">
              <v-icon class="mr-2" size="28">mdi-shield-heart</v-icon>
              IsapresFácil
            </h3>
            <p class="text-body-1 mb-4">
              Asesoría gratuita y profesional para encontrar el mejor plan de salud. Autorizados por la Superintendencia de Salud.
            </p>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-2" size="20">mdi-shield-check</v-icon>
              <span class="text-body-2">Agentes autorizados</span>
            </div>
          </div>
        </v-col>
        
        <!-- Información de contacto -->
        <v-col cols="12" md="4">
          <h4 class="text-h6 font-weight-bold mb-3">Contacto</h4>
          <div class="contact-info">
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="20">mdi-phone</v-icon>
              <a href="tel:+56959764022" class="text-white text-decoration-none">
                +56 9 5976 4022
              </a>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="20">mdi-email</v-icon>
              <a href="mailto:contacto@isapresfacil.cl" class="text-white text-decoration-none">
                contacto@isapresfacil.cl
              </a>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="20">mdi-map-marker</v-icon>
              <span>Chile</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-3" size="20">mdi-whatsapp</v-icon>
              <a 
                href="https://wa.me/56959764022?text=Hola, me interesa cotizar un plan de isapre" 
                target="_blank" 
                class="text-white text-decoration-none"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </v-col>
        
        <!-- Enlaces útiles -->
        <v-col cols="12" md="4">
          <h4 class="text-h6 font-weight-bold mb-3">Enlaces Útiles</h4>
          <div class="footer-links">
            <div class="mb-2">
              <a href="#planes" class="text-white text-decoration-none d-block mb-1">
                Planes Disponibles
              </a>
            </div>
            <div class="mb-2">
              <a href="#beneficios" class="text-white text-decoration-none d-block mb-1">
                Nuestros Beneficios
              </a>
            </div>
            <div class="mb-2">
              <a href="#faq" class="text-white text-decoration-none d-block mb-1">
                Preguntas Frecuentes
              </a>
            </div>
            <div class="mb-2">
              <a href="#contacto" class="text-white text-decoration-none d-block mb-1">
                Contacto
              </a>
            </div>
            <div class="mb-2">
              <a href="#" class="text-white text-decoration-none d-block mb-1">
                Política de Privacidad
              </a>
            </div>
            <div class="mb-2">
              <a href="#" class="text-white text-decoration-none d-block mb-1">
                Términos de Uso
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <!-- Línea divisoria -->
      <v-divider class="my-6 border-opacity-25"></v-divider>
      
      <!-- Copyright y redes sociales -->
      <v-row align="center">
        <v-col cols="12" md="8">
          <p class="text-body-2 mb-0">
            &copy; {{ new Date().getFullYear() }} IsapresFácil. Todos los derechos reservados.
            <br class="d-md-none">
            Servicio autorizado por la Superintendencia de Salud de Chile.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <div class="social-links">
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              icon
              variant="text"
              class="text-white mr-2"
              size="small"
            >
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
const socialLinks = [
  {
    name: 'Facebook',
    icon: 'mdi-facebook',
    url: 'https://facebook.com/isapresfacil'
  },
  {
    name: 'Instagram',
    icon: 'mdi-instagram',
    url: 'https://instagram.com/isapresfacil'
  },
  {
    name: 'LinkedIn',
    icon: 'mdi-linkedin',
    url: 'https://linkedin.com/company/isapresfacil'
  },
  {
    name: 'Twitter',
    icon: 'mdi-twitter',
    url: 'https://twitter.com/isapresfacil'
  }
]
</script>

<style scoped>
.footer-links a:hover {
  opacity: 0.8;
}

.contact-info a:hover {
  opacity: 0.8;
}

.social-links .v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
