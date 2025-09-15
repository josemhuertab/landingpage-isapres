<template>
  <div class="landing-page">
    <!-- Header fijo -->
    <v-app-bar
      app
      fixed
      color="primary"
      dark
      elevation="0"
      height="70"
    >
      <v-container class="d-flex align-center">
        <v-toolbar-title class="text-h5 font-weight-bold">
          <v-img
            src="/src/assets/logo.png"
            alt="Logo"
            max-height="40"
            max-width="120"
            contain
          />
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <!-- Menú de navegación -->
        <v-toolbar-items class="d-none d-md-flex">
          <v-btn text @click="scrollToSection('hero')">
            Inicio
          </v-btn>
          <v-btn text @click="scrollToSection('beneficios')">
            Servicios
          </v-btn>
          <v-btn text @click="scrollToSection('planes')">
            Planes de Isapre
          </v-btn>
          <v-btn text @click="scrollToSection('faq')">
            Preguntas Frecuentes
          </v-btn>
        </v-toolbar-items>
        
        <!-- Botón CTA -->
        <v-btn
          color="primary"
          variant="elevated"
          class="ml-4 cta-button"
          size="large"
          elevation="8"
          @click="scrollToSection('cotizar')"
        >
          <v-icon class="mr-2">mdi-message-text</v-icon>
          Cotiza Ahora
        </v-btn>
        
        <!-- Menú móvil -->
        <v-app-bar-nav-icon
          class="d-md-none"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <!-- Drawer para móvil -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="scrollToSection(item.section)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Carrusel de Isapres -->
    <IsapresCarousel />

    <!-- Hero Principal -->
    <section id="hero" class="hero-section">
      <v-container>
        <v-row align="center" class="min-height-screen">
          <v-col cols="12" md="6">
            <div class="hero-content">
              <h1 class="display-1 font-weight-bold mb-4 text-primary">
                Cotiza tu Isapre
              </h1>
              <p class="text-h6 mb-6" style="color: #3077c2;">
                Asesoría gratuita y profesional. Comparamos más de 4.000 planes de las principales isapres de Chile.
              </p>
              
              <!-- Formulario de cotización inicial -->
              <v-card class="pa-6" elevation="8" id="cotizar">
                <v-card-title class="text-h5 mb-4">Cotiza tu plan ideal</v-card-title>
                <v-form ref="heroForm" v-model="heroFormValid">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="heroForm.nombre"
                        label="Nombre"
                        :rules="nameRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="heroForm.apellido"
                        label="Apellido"
                        :rules="nameRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="heroForm.rut"
                        label="RUT"
                        :rules="rutRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-card-account-details"
                        placeholder="12.345.678-9"
                        @update:model-value="onRutChange"
                        maxlength="12"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="heroForm.celular"
                        label="Celular"
                        :rules="phoneRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-cellphone"
                        placeholder="+56 9 1234 5678"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="heroForm.email"
                        label="Correo electrónico"
                        :rules="emailRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="heroForm.region"
                        :items="regiones"
                        label="Región"
                        :rules="regionRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-map-marker"
                        @update:model-value="onRegionChange"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="heroForm.comuna"
                        :items="comunasDisponibles"
                        label="Comuna"
                        :rules="comunaRules"
                        variant="outlined"
                        prepend-inner-icon="mdi-city"
                        :disabled="!heroForm.region"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        color="primary"
                        size="large"
                        block
                        :disabled="!heroFormValid"
                        @click="submitHeroForm"
                      >
                        <v-icon class="mr-2">mdi-calculator</v-icon>
                        Cotizar Gratis
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-card class="pa-8 text-center" elevation="4" max-width="520">
              <div class="mb-6">
                <v-img
                  src="/src/assets/img/super-intendencia.png"
                  alt="Superintendencia de Salud"
                  max-width="280"
                  class="mx-auto mb-4"
                ></v-img>
              </div>
              <div class="text-secondary">
                <h3 class="text-h6 font-weight-bold mb-3 text-secondary">
                  Autorizado por la SUPERINTENDENCIA DE SALUD
                </h3>
                <p class="text-body-1 mb-3" style="color: #777777;">
                  La Superintendencia de Salud permite consultar si el ejecutivo está habilitado para ejercer funciones de Agente de Ventas
                </p>
                <p class="text-body-1" style="color: #777777;">
                  Su información es comparada en todas las plataformas de las Isapres del país.
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Sección de Beneficios Rediseñada -->
    <section id="beneficios" class="benefits-section">
      <div class="benefits-background">
        <div class="benefits-pattern"></div>
      </div>
      
      <v-container class="position-relative">
        <!-- Header mejorado -->
        <div class="benefits-header text-center mb-16">
          <div class="benefits-badge mb-4">
            <v-icon color="white" size="20" class="mr-2">mdi-star</v-icon>
            <span>Nuestras Ventajas</span>
          </div>
          <h2 class="benefits-title mb-6">
            ¿Por qué <span class="text-gradient">elegirnos</span>?
          </h2>
          <p class="benefits-subtitle mx-auto">
            Te ofrecemos la mejor experiencia en asesoría de salud con un servicio personalizado y profesional
          </p>
        </div>
        
        <!-- Grid de beneficios mejorado -->
        <v-row class="benefits-grid" justify="center">
          <v-col 
            v-for="(benefit, index) in benefits" 
            :key="benefit.title" 
            cols="12" 
            sm="6" 
            lg="3"
            class="benefit-col"
          >
            <div 
              class="benefit-card" 
              :class="`benefit-card-${index + 1}`"
              @mouseenter="onBenefitHover(index)"
              @mouseleave="onBenefitLeave(index)"
            >
              <!-- Fondo con gradiente dinámico -->
              <div class="benefit-bg" :class="`bg-${benefit.color}`"></div>
              
              <!-- Contenido de la tarjeta -->
              <div class="benefit-content">
                <!-- Icono con efecto -->
                <div class="benefit-icon-container">
                  <div class="benefit-icon-bg" :class="`icon-bg-${benefit.color}`"></div>
                  <v-icon 
                    :color="benefit.color" 
                    size="40" 
                    class="benefit-icon"
                  >
                    {{ benefit.icon }}
                  </v-icon>
                </div>
                
                <!-- Título y descripción -->
                <h3 class="benefit-title">{{ benefit.title }}</h3>
                <p class="benefit-description">{{ benefit.description }}</p>
                
                <!-- Indicador de hover -->
                <div class="benefit-arrow">
                  <v-icon size="16" color="primary">mdi-arrow-right</v-icon>
                </div>
              </div>
              
              <!-- Efectos decorativos -->
              <div class="benefit-decoration">
                <div class="decoration-circle"></div>
                <div class="decoration-dots"></div>
              </div>
            </div>
          </v-col>
        </v-row>
        

      </v-container>
    </section>

    <!-- Sección de Familia Feliz -->
    <section class="family-section">
      <v-container>
        <v-row align="center" class="py-16">
          <v-col cols="12" md="6" order="2" order-md="1">
            <div class="family-content">
              <div class="family-badge mb-4">
                <v-icon color="white" size="18" class="mr-2">mdi-heart</v-icon>
                <span>Tu Familia Protegida</span>
              </div>
              <h2 class="family-title mb-6">
                Protege a quienes más <span class="text-gradient">amas</span>
              </h2>
              <p class="family-description mb-8">
                En nuestra empresa entendemos que la salud de tu familia es lo más importante. 
                Por eso trabajamos día a día para encontrar el plan de isapre que mejor se adapte 
                a las necesidades de cada uno de los miembros de tu hogar.
              </p>
              <div class="family-features">
                <div class="feature-item mb-4">
                  <v-icon color="success" size="24" class="mr-3">mdi-check-circle</v-icon>
                  <span class="feature-text">Cobertura completa para toda la familia</span>
                </div>
                <div class="feature-item mb-4">
                  <v-icon color="success" size="24" class="mr-3">mdi-check-circle</v-icon>
                  <span class="feature-text">Asesoría personalizada y gratuita</span>
                </div>
                <div class="feature-item mb-4">
                  <v-icon color="success" size="24" class="mr-3">mdi-check-circle</v-icon>
                  <span class="feature-text">Años de experiencia</span>
                </div>
              </div>
              <v-btn 
                color="primary" 
                size="large" 
                class="family-cta-btn"
                @click="scrollToCotizacion"
              >
                <v-icon class="mr-2">mdi-calculator</v-icon>
                Cotiza para tu Familia
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2">
            <div class="family-image-container">
              <div class="image-decoration">
                <div class="decoration-blob"></div>
                <div class="decoration-dots"></div>
              </div>
              <div class="family-image">
                <img 
                  src="@/assets/img/familia-feliz.jpg" 
                  alt="Familia feliz protegida con isapre"
                  class="family-img"
                />
                <!-- Overlay con texto -->
                <div class="family-overlay">
                  <div class="family-overlay-content">
                    <h3 class="family-overlay-title">Familia Protegida</h3>
                    <p class="family-overlay-subtitle">Con la mejor cobertura de salud</p>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Sección de Isapres Rediseñada -->
    <section id="planes" class="isapres-section">
      <div class="isapres-background">
        <div class="isapres-pattern"></div>
      </div>
      
      <v-container class="position-relative">
        <!-- Header mejorado -->
        <div class="isapres-header text-center mb-16">
          <div class="isapres-badge mb-4">
            <v-icon color="white" size="20" class="mr-2">mdi-hospital-building</v-icon>
            <span>Nuestros Partners</span>
          </div>
          <h2 class="isapres-title mb-6">
            <span class="text-gradient">Isapres</span> Disponibles
          </h2>
          <p class="isapres-subtitle mx-auto">
            Trabajamos con las principales isapres de Chile para ofrecerte la mejor cobertura de salud
          </p>
        </div>
        
        <!-- Grid de isapres mejorado -->
        <v-row class="isapres-grid" justify="center">
          <v-col 
            v-for="(isapre, index) in isapres" 
            :key="isapre.name" 
            cols="6" 
            sm="4" 
            md="3" 
            lg="2"
            class="isapre-col"
          >
            <div 
              class="isapre-card" 
              :class="`isapre-card-${index + 1}`"
              @mouseenter="onIsapreHover(index)"
              @mouseleave="onIsapreLeave(index)"
            >
              <!-- Fondo con gradiente dinámico -->
              <div class="isapre-bg" :class="`bg-${isapre.color}`"></div>
              
              <!-- Contenido de la tarjeta -->
              <div class="isapre-content">
                <!-- Logo con efecto -->
                <div class="isapre-logo-container">
                  <div class="isapre-logo-bg" :class="`logo-bg-${isapre.color}`"></div>
                  <v-icon 
                    :color="isapre.color" 
                    size="48" 
                    class="isapre-icon"
                  >
                    {{ isapre.icon }}
                  </v-icon>
                </div>
                
                <!-- Nombre de la isapre -->
                <h3 class="isapre-name">{{ isapre.name }}</h3>
                
                <!-- Indicador de disponibilidad -->
                <div class="availability-indicator">
                  <div class="availability-dot"></div>
                  <span class="availability-text">Disponible</span>
                </div>
                
                <!-- Botón de acción -->
                 <div class="isapre-action">
                   <v-btn 
                     size="small" 
                     variant="outlined" 
                     :color="isapre.color"
                     class="action-btn"
                     @click="scrollToCotizacion"
                   >
                     Contactar
                   </v-btn>
                 </div>
              </div>
              
              <!-- Efectos decorativos -->
              <div class="isapre-decoration">
                <div class="decoration-shine"></div>
                <div class="decoration-corner"></div>
              </div>
            </div>
          </v-col>
        </v-row>
        
        <!-- Información adicional -->
        <div class="isapres-info mt-16">
          <v-row justify="center" align="center">
            <v-col cols="12" md="8" class="text-center">
              <div class="info-card">
                <v-icon color="primary" size="48" class="mb-4">mdi-shield-check-outline</v-icon>
                <h3 class="info-title mb-3">Todas las Isapres Autorizadas</h3>
                <p class="info-description">
                  Trabajamos exclusivamente con isapres autorizadas por la Superintendencia de Salud, 
                  garantizando tu seguridad y tranquilidad en el proceso de afiliación.
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- Sección de Confianza -->
    <section class="py-16 bg-primary">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="8">
            <div class="text-white">
              <h3 class="text-h4 font-weight-bold mb-4">
                <v-icon class="mr-3" size="32" color="white">mdi-shield-check</v-icon>
                Autorizado por la Superintendencia de Salud
              </h3>
              <p class="text-h6 mb-0">
                Somos agentes de ventas habilitados y autorizados. Tu información es tratada con total confidencialidad y comparada en todas las plataformas de las isapres del país.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon color="white" size="120">mdi-certificate</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Preguntas Frecuentes -->
    <section id="faq" class="py-16" style="background-color: #f0f1f2;">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-4 text-primary">Preguntas Frecuentes</h2>
          <p class="text-h6" style="color: #777777;">Resolvemos tus dudas más comunes</p>
        </div>
        
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-expansion-panels variant="accordion">
              <v-expansion-panel v-for="faq in faqs" :key="faq.question">
                <v-expansion-panel-title class="text-h6 font-weight-medium">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-body-1">
                  {{ faq.answer }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Formulario de Contacto -->
    <section id="contacto" class="py-16">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-4 text-primary">Contáctanos</h2>
          <p class="text-h6" style="color: #777777;">Estamos aquí para ayudarte a encontrar tu plan ideal</p>
        </div>
        
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-8" elevation="8">
              <v-form ref="contactForm" v-model="contactFormValid">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="contactForm.nombre"
                      label="Nombre completo"
                      :rules="nameRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="contactForm.telefono"
                      label="Teléfono"
                      :rules="phoneRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="contactForm.email"
                      label="Correo electrónico"
                      :rules="emailRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="contactForm.mensaje"
                      label="Mensaje"
                      :rules="messageRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-message-text"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      color="primary"
                      size="large"
                      block
                      :disabled="!contactFormValid"
                      @click="submitContactForm"
                    >
                      <v-icon class="mr-2">mdi-send</v-icon>
                      Enviar Mensaje
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Botón Flotante de Ayuda Rediseñado -->
    <div class="floating-help-container">
      <!-- Overlay para cerrar el menú -->
      <div 
        v-if="showHelpMenu" 
        class="help-overlay" 
        @click="showHelpMenu = false"
      ></div>
      
      <!-- Botón principal -->
      <div class="main-help-button" :class="{ 'menu-open': showHelpMenu }">
        <v-btn
          class="help-trigger"
          :class="{ 'rotated': showHelpMenu }"
          @click="toggleHelpMenu"
          aria-label="¿Necesitas Ayuda?"
        >
          <v-icon size="28">{{ showHelpMenu ? 'mdi-close' : 'mdi-headset' }}</v-icon>
        </v-btn>
        
        <!-- Tooltip informativo -->
        <div class="help-tooltip" v-if="!showHelpMenu">
          ¿Necesitas ayuda?
        </div>
      </div>
      
      <!-- Menú de opciones mejorado -->
      <transition name="help-menu">
        <div v-if="showHelpMenu" class="help-options-menu">
          <div class="help-option whatsapp-option" @click="openWhatsApp">
            <div class="option-icon">
              <v-icon color="white" size="24">mdi-whatsapp</v-icon>
            </div>
            <div class="option-content">
              <span class="option-title">WhatsApp</span>
              <span class="option-subtitle">Chatea con nosotros</span>
            </div>
          </div>
          
          <div class="help-option phone-option" @click="makeCall">
            <div class="option-icon">
              <v-icon color="white" size="24">mdi-phone</v-icon>
            </div>
            <div class="option-content">
              <span class="option-title">Llamar</span>
              <span class="option-subtitle">+56 9 5976 4022</span>
            </div>
          </div>
          
          <div class="help-option email-option" @click="sendEmail">
            <div class="option-icon">
              <v-icon color="white" size="24">mdi-email</v-icon>
            </div>
            <div class="option-content">
              <span class="option-title">Email</span>
              <span class="option-subtitle">Envíanos un correo</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import IsapresCarousel from '@/components/IsapresCarousel.vue'

// Estados reactivos
const drawer = ref(false)
const showHelpMenu = ref(false)
const heroFormValid = ref(false)
const contactFormValid = ref(false)

// Formularios
const heroForm = reactive({
  nombre: '',
  apellido: '',
  rut: '',
  email: '',
  celular: '',
  region: '',
  comuna: ''
})

const contactForm = reactive({
  nombre: '',
  telefono: '',
  email: '',
  mensaje: ''
})

// Reglas de validación
const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 2 || 'El nombre debe tener al menos 2 caracteres'
]

const phoneRules = [
  v => !!v || 'El teléfono es requerido',
  v => /^[+]?[0-9]{8,15}$/.test(v) || 'Ingrese un teléfono válido'
]

const emailRules = [
  v => !!v || 'El correo es requerido',
  v => /.+@.+\..+/.test(v) || 'Ingrese un correo válido'
]

const messageRules = [
  v => !!v || 'El mensaje es requerido',
  v => v.length >= 10 || 'El mensaje debe tener al menos 10 caracteres'
]

const rutRules = [
  v => !!v || 'El RUT es requerido',
  v => {
    if (!v) return true // Ya se maneja arriba
    
    // Permitir formatos parciales durante la escritura
    const cleanValue = v.replace(/[^0-9kK.-]/gi, '')
    const numbersOnly = cleanValue.replace(/[^0-9kK]/gi, '')
    
    // Si tiene menos de 7 caracteres, permitir (formato parcial)
    if (numbersOnly.length < 7) return true
    
    // Si tiene 7 o más, debe estar en formato completo
    const completePattern = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/i
    return completePattern.test(v) || 'Formato de RUT inválido (ej: 12.345.678-9)'
  }
]

const regionRules = [
  v => !!v || 'La región es requerida'
]

const comunaRules = [
  v => !!v || 'La comuna es requerida'
]

// Datos
const menuItems = [
  { title: 'Inicio', section: 'hero' },
  { title: 'Servicios', section: 'beneficios' },
  { title: 'Planes de Isapre', section: 'planes' },
  { title: 'Preguntas Frecuentes', section: 'faq' },
  { title: 'Cotiza Ahora', section: 'cotizar' }
]

// Regiones y comunas de Chile
const regiones = [
  { title: 'Región Metropolitana de Santiago', value: 'metropolitana' },
  { title: 'Región de Arica y Parinacota', value: 'arica' },
  { title: 'Región de Tarapacá', value: 'tarapaca' },
  { title: 'Región de Antofagasta', value: 'antofagasta' },
  { title: 'Región de Atacama', value: 'atacama' },
  { title: 'Región de Coquimbo', value: 'coquimbo' },
  { title: 'Región de Valparaíso', value: 'valparaiso' },
  { title: 'Región del Libertador General Bernardo O\'Higgins', value: 'ohiggins' },
  { title: 'Región del Maule', value: 'maule' },
  { title: 'Región de Ñuble', value: 'nuble' },
  { title: 'Región del Biobío', value: 'biobio' },
  { title: 'Región de La Araucanía', value: 'araucania' },
  { title: 'Región de Los Ríos', value: 'rios' },
  { title: 'Región de Los Lagos', value: 'lagos' },
  { title: 'Región de Aysén del General Carlos Ibáñez del Campo', value: 'aysen' },
  { title: 'Región de Magallanes y de la Antártica Chilena', value: 'magallanes' }
]

const comunasPorRegion = {
  metropolitana: [
    'Santiago', 'Las Condes', 'Providencia', 'Ñuñoa', 'La Reina', 'Vitacura', 'Lo Barnechea',
    'Maipú', 'Puente Alto', 'La Florida', 'Peñalolén', 'San Miguel', 'Independencia',
    'Recoleta', 'Quilicura', 'Huechuraba', 'Conchalí', 'Renca', 'Cerro Navia', 'Lo Prado',
    'Quinta Normal', 'Estación Central', 'Cerrillos', 'Pedro Aguirre Cerda', 'San Joaquín',
    'San Ramón', 'La Cisterna', 'El Bosque', 'La Pintana', 'San Bernardo', 'Pudahuel',
    'Lo Espejo', 'Macul', 'La Granja', 'Calera de Tango', 'Buin', 'Paine', 'Melipilla',
    'Curacaví', 'María Pinto', 'San Pedro', 'Alhué', 'Talagante', 'Peñaflor', 'Padre Hurtado',
    'El Monte', 'Isla de Maipo', 'Colina', 'Lampa', 'Tiltil', 'Pirque', 'San José de Maipo'
  ],
  valparaiso: [
    'Valparaíso', 'Viña del Mar', 'Concón', 'Quintero', 'Puchuncaví', 'Casablanca',
    'Juan Fernández', 'San Antonio', 'Santo Domingo', 'Cartagena', 'El Tabo', 'El Quisco',
    'Algarrobo', 'San Felipe', 'Putaendo', 'Santa María', 'Panquehue', 'Llaillay',
    'Catemu', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua',
    'Cabildo', 'Papudo', 'Zapallar', 'Petorca', 'Chincolco', 'Hijuelas', 'La Calera',
    'La Cruz', 'Limache', 'Nogales', 'Olmué', 'Quillota'
  ],
  // Agregar más regiones según sea necesario
  arica: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  tarapaca: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
  antofagasta: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'],
  atacama: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'],
  coquimbo: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'],
  ohiggins: ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente'],
  maule: ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén'],
  nuble: ['Chillán', 'Bulnes', 'Cobquecura', 'Coelemu', 'Coihueco', 'Chillán Viejo', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],
  biobio: ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa'],
  araucania: ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol'],
  rios: ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'],
  lagos: ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao'],
  aysen: ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O\'Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'],
  magallanes: ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine']
}

const comunasDisponibles = ref([])

const benefits = [
  {
    title: 'Asesoría Gratuita',
    description: 'Te ayudamos sin costo alguno a encontrar el mejor plan',
    icon: 'mdi-account-heart',
    color: 'primary'
  },
  {
    title: 'Ahorro Garantizado',
    description: 'Comparamos precios para que obtengas el mejor valor',
    icon: 'mdi-piggy-bank',
    color: 'green'
  },
  {
    title: 'Proceso Rápido',
    description: 'Cambio de isapre en tiempo récord y sin complicaciones',
    icon: 'mdi-clock-fast',
    color: 'orange'
  },
  {
    title: 'Variedad de Planes',
    description: 'Muchos planes disponibles para elegir',
    icon: 'mdi-format-list-bulleted',
    color: 'purple'
  }
]

const isapres = [
  { name: 'Colmena', icon: 'mdi-hexagon', color: 'blue' },
  { name: 'Cruz Blanca', icon: 'mdi-cross', color: 'red' },
  { name: 'Consalud', icon: 'mdi-heart-pulse', color: 'green' },
  { name: 'Banmédica', icon: 'mdi-bank', color: 'blue-darken-2' },
  { name: 'Nueva MasVida', icon: 'mdi-leaf', color: 'green-darken-2' },
  { name: 'Vida Tres', icon: 'mdi-numeric-3-circle', color: 'orange' },
  { name: 'Esencial', icon: 'mdi-star', color: 'purple' }
]

const faqs = [
  {
    question: '¿Qué necesito para cambiarme de isapre?',
    answer: 'Solo necesitas tu RUT, estar al día en tus cotizaciones y no tener licencias médicas vigentes. Nosotros te ayudamos con todo el proceso.'
  },
  {
    question: '¿Tiene costo el servicio de asesoría?',
    answer: 'No, nuestro servicio de asesoría es completamente gratuito. Las isapres nos pagan una comisión por cada afiliación exitosa.'
  },
  {
    question: '¿Cuánto demora el proceso de cambio?',
    answer: 'El proceso de cambio de isapre demora entre 30 a 60 días hábiles desde que presentas la solicitud.'
  },
  {
    question: '¿Puedo incluir a mis cargas familiares?',
    answer: 'Sí, puedes incluir a tu cónyuge, hijos menores de 24 años (o 18 si no estudian) y otros familiares que califiquen como cargas.'
  },
  {
    question: '¿Qué pasa si tengo preexistencias?',
    answer: 'Las preexistencias deben ser declaradas. Algunas isapres pueden aplicar períodos de carencia o exclusiones específicas.'
  }
]

// Métodos
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  drawer.value = false
}

const onRegionChange = (region) => {
  heroForm.comuna = ''
  if (region && comunasPorRegion[region]) {
    comunasDisponibles.value = comunasPorRegion[region].map(comuna => ({
      title: comuna,
      value: comuna
    }))
  } else {
    comunasDisponibles.value = []
  }
}

const formatRut = (value) => {
  if (!value) return ''
  
  // Limpiar caracteres no válidos
  const cleanValue = value.replace(/[^0-9kK.-]/g, '')
  
  // Si ya está en formato completo correcto, mantenerlo
  const completePattern = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/i
  if (completePattern.test(cleanValue)) {
    return cleanValue.toUpperCase()
  }
  
  // Extraer solo números y K
  const numbersAndK = cleanValue.replace(/[^0-9kK]/gi, '')
  
  if (numbersAndK.length === 0) return ''
  
  // Si tiene menos de 7 dígitos, no formatear aún
  if (numbersAndK.length < 7) {
    return numbersAndK.toUpperCase()
  }
  
  // Si tiene 7 o más dígitos, formatear
  if (numbersAndK.length >= 7) {
    const body = numbersAndK.slice(0, -1)
    const dv = numbersAndK.slice(-1).toUpperCase()
    
    // Formatear el cuerpo con puntos
    let formattedBody = ''
    for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
      if (j > 0 && j % 3 === 0) {
        formattedBody = '.' + formattedBody
      }
      formattedBody = body[i] + formattedBody
    }
    
    return formattedBody + '-' + dv
  }
  
  return numbersAndK.toUpperCase()
}

const onRutChange = (value) => {
  const formatted = formatRut(value)
  heroForm.rut = formatted
}

const submitHeroForm = () => {
  console.log('Formulario hero enviado:', heroForm)
  // Aquí puedes integrar con EmailJS o tu backend
  alert('¡Gracias! Te contactaremos pronto para ayudarte con tu cotización.')
}

const submitContactForm = () => {
  console.log('Formulario contacto enviado:', contactForm)
  // Aquí puedes integrar con EmailJS o tu backend
  alert('¡Mensaje enviado! Te responderemos a la brevedad.')
}

const openWhatsApp = () => {
  window.open('https://wa.me/56959764022?text=Hola, me interesa cotizar un plan de isapre', '_blank')
}

const makeCall = () => {
  window.open('tel:+56959764022', '_self')
}

const sendEmail = () => {
  window.open('mailto:contacto@isapresfacil.cl?subject=Consulta sobre planes de isapre', '_self')
}

const toggleHelpMenu = () => {
      showHelpMenu.value = !showHelpMenu.value
    }

    // Funciones para efectos de beneficios
    const onBenefitHover = (index) => {
      // Agregar clase de hover para animaciones
      const card = document.querySelector(`.benefit-card-${index + 1}`)
      if (card) {
        card.classList.add('hovered')
      }
    }

    const onBenefitLeave = (index) => {
      // Remover clase de hover
      const card = document.querySelector(`.benefit-card-${index + 1}`)
      if (card) {
        card.classList.remove('hovered')
      }
    }

    const onIsapreHover = (index) => {
      const card = document.querySelector(`.isapre-card-${index + 1}`)
      if (card) {
        card.classList.add('hovered')
      }
    }

    const onIsapreLeave = (index) => {
      const card = document.querySelector(`.isapre-card-${index + 1}`)
      if (card) {
        card.classList.remove('hovered')
      }
    }

    const scrollToCotizacion = () => {
      const cotizacionSection = document.querySelector('#cotizacion')
      if (cotizacionSection) {
        cotizacionSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
</script>

<style scoped>
.landing-page {
  padding-top: 70px;
}

.hero-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 70px);
}

.min-height-screen {
  min-height: calc(100vh - 70px);
}

.hero-content {
  padding: 2rem 0;
}

.isapre-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 960px) {
  .hero-content {
    text-align: center;
  }
  
  .display-1 {
    font-size: 2.5rem !important;
  }
}

/* === BOTÓN FLOTANTE DE AYUDA REDISEÑADO === */
.floating-help-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

/* Overlay para cerrar el menú */
.help-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: -1;
}

/* Botón principal */
.main-help-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-trigger {
  width: 64px !important;
  height: 64px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, #3077c2 0%, #2196f3 100%) !important;
  color: white !important;
  box-shadow: 0 8px 32px rgba(48, 119, 194, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: none !important;
  cursor: pointer;
  position: relative;
  overflow: visible;
}

.help-trigger:hover {
  transform: translateY(-4px) scale(1.05) !important;
  box-shadow: 0 16px 48px rgba(48, 119, 194, 0.4) !important;
  background: linear-gradient(135deg, #42a5f5 0%, #29b6f6 100%) !important;
}

.help-trigger.rotated {
  transform: rotate(180deg) !important;
  background: linear-gradient(135deg, #f44336 0%, #e91e63 100%) !important;
}

.help-trigger.rotated:hover {
  transform: rotate(180deg) translateY(-4px) scale(1.05) !important;
  box-shadow: 0 16px 48px rgba(244, 67, 54, 0.4) !important;
}

/* Tooltip */
.help-tooltip {
  position: absolute;
  right: 76px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.help-trigger:hover + .help-tooltip,
.main-help-button:hover .help-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-8px);
}

/* Menú de opciones */
.help-options-menu {
  position: absolute;
  bottom: 76px;
  right: 0;
  min-width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.help-option {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.help-option:last-child {
  border-bottom: none;
}

.help-option:hover {
  background: rgba(48, 119, 194, 0.05);
  transform: translateX(4px);
}

.option-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  transition: all 0.2s ease;
}

.whatsapp-option .option-icon {
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
}

.phone-option .option-icon {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
}

.email-option .option-icon {
  background: linear-gradient(135deg, #ff5722 0%, #d84315 100%);
}

.option-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.option-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.option-subtitle {
  font-size: 13px;
  color: #666;
  font-weight: 400;
}

/* Animaciones del menú */
.help-menu-enter-active,
.help-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.help-menu-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.help-menu-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Responsive */
@media (max-width: 600px) {
  .floating-help-container {
    bottom: 16px;
    right: 16px;
  }
  
  .help-trigger {
    width: 56px !important;
    height: 56px !important;
  }
  
  .help-options-menu {
    min-width: 260px;
    right: -8px;
  }
  
  .help-tooltip {
    display: none;
  }
}

/* Botón CTA mantiene el estilo del botón de ayuda */
.cta-button {
  background: linear-gradient(45deg, #2196f3, #21cbf3) !important;
  color: white !important;
  font-weight: bold !important;
  border-radius: 25px !important;
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4) !important;
  transition: all 0.3s ease !important;
  animation: bounce-help 3s infinite;
  white-space: nowrap !important;
}

.cta-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 35px rgba(33, 150, 243, 0.6) !important;
  background: linear-gradient(45deg, #42a5f5, #29b6f6) !important;
}

/* Animación utilizada por botones */
@keyframes bounce-help {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
  60% { transform: translateY(-3px); }
}

/* Estilos para la sección de beneficios rediseñada */
.benefits-section {
  position: relative;
  padding: 120px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow: hidden;
}

.benefits-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.benefits-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, #1976d2 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, #42a5f5 1px, transparent 1px);
  background-size: 60px 60px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.benefits-header {
  max-width: 800px;
  margin: 0 auto;
}

.benefits-badge {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.3);
}

.benefits-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a202c;
  line-height: 1.2;
  margin-bottom: 24px;
}

.text-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.benefits-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.6;
  max-width: 600px;
}

.benefits-grid {
  margin-top: 80px;
}

.benefit-col {
  padding: 16px;
}

.benefit-card {
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 40px 32px;
  height: 100%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.benefit-card:hover::before {
  opacity: 0.7;
}

.benefit-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.benefit-card:hover .benefit-bg {
  opacity: 0.05;
}

.bg-primary {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

.bg-success {
  background: linear-gradient(135deg, #4caf50 0%, #81c784 100%);
}

.bg-warning {
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%);
}

.bg-info {
  background: linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%);
}

.benefit-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.benefit-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.benefit-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.1;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon-bg {
  opacity: 0.2;
  transform: translate(-50%, -50%) scale(1.1);
}

.icon-bg-primary {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

.icon-bg-success {
  background: linear-gradient(135deg, #4caf50 0%, #81c784 100%);
}

.icon-bg-warning {
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%);
}

.icon-bg-info {
  background: linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%);
}

.benefit-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
}

.benefit-card:hover .benefit-icon {
  transform: scale(1.1) rotate(5deg);
}

.benefit-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
  line-height: 1.3;
}

.benefit-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
}

.benefit-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-arrow {
  opacity: 1;
  transform: translateX(0);
}

.benefit-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(25, 118, 210, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.benefit-card:hover .decoration-circle {
  transform: scale(1.2) rotate(90deg);
  border-color: rgba(25, 118, 210, 0.2);
}

.decoration-dots {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-image: 
    radial-gradient(circle, rgba(25, 118, 210, 0.3) 2px, transparent 2px);
  background-size: 8px 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-card:hover .decoration-dots {
  opacity: 1;
}

/* Animaciones de entrada */
.benefit-card-1 {
  animation: slideInUp 0.6s ease-out 0.1s both;
}

.benefit-card-2 {
  animation: slideInUp 0.6s ease-out 0.2s both;
}

.benefit-card-3 {
  animation: slideInUp 0.6s ease-out 0.3s both;
}

.benefit-card-4 {
  animation: slideInUp 0.6s ease-out 0.4s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



/* Responsive para beneficios */
@media (max-width: 768px) {
  .benefits-section {
    padding: 80px 0;
  }
  
  .benefits-title {
    font-size: 2.5rem;
  }
  
  .benefits-subtitle {
    font-size: 1.1rem;
  }
  
  .benefit-card {
    padding: 32px 24px;
  }
}

/* ===== SECCIÓN FAMILIA FELIZ ===== */
.family-section {
  position: relative;
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  overflow: hidden;
}

.family-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.03) 0%, transparent 50%);
  background-size: 600px 600px;
  animation: familyPatternMove 25s ease-in-out infinite;
}

@keyframes familyPatternMove {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, -20px) rotate(1deg); }
}

.family-content {
  position: relative;
  z-index: 2;
  animation: slideInLeft 0.8s ease-out;
}

.family-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  background: linear-gradient(135deg, #ec4899, #be185d);
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
  animation: slideInDown 0.8s ease-out;
}

.family-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1e293b;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

.family-description {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
  animation: slideInUp 0.8s ease-out 0.4s both;
}

.family-features {
  animation: slideInUp 0.8s ease-out 0.6s both;
}

.feature-item {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateX(8px);
}

.feature-text {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.family-cta-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  animation: slideInUp 0.8s ease-out 0.8s both;
}

.family-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
}

/* Contenedor de imagen */
.family-image-container {
  position: relative;
  animation: slideInRight 0.8s ease-out;
}

.image-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.decoration-blob {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
  border-radius: 50% 40% 60% 30%;
  animation: float 6s ease-in-out infinite;
}

.decoration-dots {
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 100px;
  height: 100px;
  background-image: 
    radial-gradient(circle, #3b82f6 2px, transparent 2px),
    radial-gradient(circle, #ec4899 2px, transparent 2px);
  background-size: 20px 20px, 25px 25px;
  background-position: 0 0, 12px 12px;
  opacity: 0.6;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.family-image {
  position: relative;
  z-index: 2;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.family-image:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
}

.family-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 24px;
}

.family-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);
  border-radius: 0 0 24px 24px;
  padding: 30px 20px 20px;
  color: white;
  text-align: center;
}

.family-overlay-content {
  position: relative;
  z-index: 2;
}

.family-overlay-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.family-overlay-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Animaciones */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive para familia */
@media (max-width: 768px) {
  .family-section {
    padding: 60px 0;
  }
  
  .family-title {
    font-size: 2.25rem;
  }
  
  .family-description {
    font-size: 1rem;
  }
  
  .decoration-blob {
    width: 120px;
    height: 120px;
  }
  
  .decoration-dots {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .family-title {
    font-size: 1.875rem;
  }
  
  .feature-text {
    font-size: 0.9rem;
  }
}

/* ===== SECCIÓN ISAPRES REDISEÑADA ===== */
.isapres-section {
  position: relative;
  padding: 120px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow: hidden;
}

.isapres-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.isapres-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
  background-size: 400px 400px;
  animation: patternMove 20s ease-in-out infinite;
}

@keyframes patternMove {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(1deg); }
  66% { transform: translate(-20px, 20px) rotate(-1deg); }
}

/* Header de la sección */
.isapres-header {
  position: relative;
  z-index: 2;
}

.isapres-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  animation: slideInDown 0.8s ease-out;
}

.isapres-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1e293b;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

.isapres-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  line-height: 1.6;
  animation: slideInUp 0.8s ease-out 0.4s both;
}

/* Grid de isapres */
.isapres-grid {
  position: relative;
  z-index: 2;
}

.isapre-col {
  animation: slideInUp 0.6s ease-out both;
}

.isapre-col:nth-child(1) { animation-delay: 0.1s; }
.isapre-col:nth-child(2) { animation-delay: 0.2s; }
.isapre-col:nth-child(3) { animation-delay: 0.3s; }
.isapre-col:nth-child(4) { animation-delay: 0.4s; }
.isapre-col:nth-child(5) { animation-delay: 0.5s; }
.isapre-col:nth-child(6) { animation-delay: 0.6s; }

.isapre-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 24px;
  height: 280px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
}

.isapre-card:hover,
.isapre-card.hovered {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.isapre-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  opacity: 0.1;
  transition: all 0.4s ease;
}

.isapre-card:hover .isapre-bg,
.isapre-card.hovered .isapre-bg {
  opacity: 0.15;
  height: 80px;
}

.bg-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.bg-red { background: linear-gradient(135deg, #ef4444, #dc2626); }
.bg-green { background: linear-gradient(135deg, #10b981, #059669); }
.bg-blue-darken-2 { background: linear-gradient(135deg, #1e40af, #1e3a8a); }
.bg-green-darken-2 { background: linear-gradient(135deg, #047857, #065f46); }
.bg-orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
.bg-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

.isapre-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.isapre-logo-container {
  position: relative;
  margin-bottom: 20px;
}

.isapre-logo-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.1;
  transition: all 0.4s ease;
}

.isapre-card:hover .isapre-logo-bg,
.isapre-card.hovered .isapre-logo-bg {
  opacity: 0.2;
  transform: translate(-50%, -50%) scale(1.1);
}

.logo-bg-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.logo-bg-red { background: linear-gradient(135deg, #ef4444, #dc2626); }
.logo-bg-green { background: linear-gradient(135deg, #10b981, #059669); }
.logo-bg-blue-darken-2 { background: linear-gradient(135deg, #1e40af, #1e3a8a); }
.logo-bg-green-darken-2 { background: linear-gradient(135deg, #047857, #065f46); }
.logo-bg-orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
.logo-bg-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

.isapre-icon {
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
}

.isapre-card:hover .isapre-icon,
.isapre-card.hovered .isapre-icon {
  transform: scale(1.1);
}

.isapre-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.isapre-card:hover .isapre-name,
.isapre-card.hovered .isapre-name {
  color: #3b82f6;
}

.availability-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 8px;
}

.availability-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.availability-text {
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.isapre-action {
  margin-top: auto;
}

.action-btn {
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: none;
}

.isapre-card:hover .action-btn,
.isapre-card.hovered .action-btn {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.isapre-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.decoration-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.isapre-card:hover .decoration-shine,
.isapre-card.hovered .decoration-shine {
  transform: translateX(100%);
}

.decoration-corner {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  border-top: 2px solid rgba(59, 130, 246, 0.2);
  border-right: 2px solid rgba(59, 130, 246, 0.2);
  opacity: 0;
  transition: all 0.3s ease;
}

.isapre-card:hover .decoration-corner,
.isapre-card.hovered .decoration-corner {
  opacity: 1;
  transform: scale(1.2);
}

/* Información adicional */
.isapres-info {
  position: relative;
  z-index: 2;
}

.info-card {
  background: white;
  border-radius: 24px;
  padding: 48px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.4s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.info-description {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Animaciones */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive para isapres */
@media (max-width: 768px) {
  .isapres-section {
    padding: 80px 0;
  }
  
  .isapres-title {
    font-size: 2.5rem;
  }
  
  .isapres-subtitle {
    font-size: 1.1rem;
  }
  
  .isapre-card {
    height: 240px;
    padding: 20px;
  }
  
  .info-card {
    padding: 32px 24px;
  }
  
  .info-title {
    font-size: 1.25rem;
  }
  
  .info-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .isapres-title {
    font-size: 2rem;
  }
  
  .isapre-card {
    height: 220px;
    padding: 16px;
  }
}
</style>
