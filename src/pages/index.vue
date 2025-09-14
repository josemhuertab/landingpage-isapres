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

    <!-- Sección de Beneficios -->
    <section id="beneficios" class="py-16" style="background-color: #f0f1f2;">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-4 text-primary">¿Por qué elegirnos?</h2>
          <p class="text-h6" style="color: #777777;">Te ayudamos a encontrar el mejor plan de salud con asesoría profesional gratuita</p>
        </div>
        
        <v-row>
          <v-col v-for="benefit in benefits" :key="benefit.title" cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 h-100" elevation="4" hover>
              <v-icon :color="benefit.color" size="64" class="mb-4">{{ benefit.icon }}</v-icon>
              <v-card-title class="text-h6 mb-2">{{ benefit.title }}</v-card-title>
              <v-card-text class="text-body-1">{{ benefit.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Listado de Isapres -->
    <section id="planes" class="py-16">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-4 text-primary">Isapres Disponibles</h2>
          <p class="text-h6" style="color: #777777;">Comparamos planes de las principales isapres de Chile</p>
        </div>
        
        <v-row justify="center">
          <v-col v-for="isapre in isapres" :key="isapre.name" cols="6" sm="4" md="3" lg="2">
            <v-card class="text-center pa-4 h-100" elevation="2" hover>
              <div class="isapre-logo mb-2">
                <v-icon :color="isapre.color" size="48">{{ isapre.icon }}</v-icon>
              </div>
              <v-card-title class="text-subtitle-1">{{ isapre.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
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

    <!-- Botón Flotante de Ayuda -->
    <div class="help-floating-button">
      <v-btn
        color="primary"
        variant="elevated"
        class="help-button"
        size="large"
        elevation="8"
        @click="toggleHelpMenu"
        aria-label="¿Necesitas Ayuda?"
      >
        <v-icon>mdi-help-circle</v-icon>
        <span class="help-label">¿Necesitas Ayuda?</span>
      </v-btn>
      
      <!-- Menú radial de opciones de ayuda -->
      <div v-if="showHelpMenu" class="radial-menu open">
        <v-btn
          color="green"
          variant="elevated"
          class="radial-item pos-up"
          size="48"
          elevation="8"
          @click="openWhatsApp"
          aria-label="WhatsApp"
        >
          <v-icon>mdi-whatsapp</v-icon>
          <span class="help-option-label">WhatsApp</span>
        </v-btn>
    
        <v-btn
          color="blue"
          variant="elevated"
          class="radial-item pos-up-left"
          size="48"
          elevation="8"
          @click="makeCall"
          aria-label="Llamar"
        >
          <v-icon>mdi-phone</v-icon>
          <span class="help-option-label">Llamar</span>
        </v-btn>
    
        <v-btn
          color="red"
          variant="elevated"
          class="radial-item pos-left"
          size="48"
          elevation="8"
          @click="sendEmail"
          aria-label="Email"
        >
          <v-icon>mdi-email</v-icon>
          <span class="help-option-label">Email</span>
        </v-btn>
      </div>
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
    description: 'Más de 4.000 planes disponibles para elegir',
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

.help-floating-button {
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  z-index: 1000 !important;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* Botón principal: icono visible, texto al hover */
.help-button {
  background: linear-gradient(45deg, #2196f3, #21cbf3) !important;
  color: white !important;
  font-weight: bold !important;
  border-radius: 28px !important;
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4) !important;
  transition: all 0.3s ease !important;
  animation: bounce-help 3s infinite;
  height: 56px !important;
  min-width: 56px !important;
  max-width: 56px; /* colapsado por defecto */
  padding: 0 16px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px;
  overflow: hidden; /* oculta el texto al inicio */
}

.help-button .help-label {
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.help-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 35px rgba(33, 150, 243, 0.6) !important;
  background: linear-gradient(45deg, #42a5f5, #29b6f6) !important;
  max-width: 240px; /* se expande para mostrar el texto */
}

.help-button:hover .help-label {
  opacity: 1;
}

/* Menú radial */
.radial-menu {
  position: absolute;
  bottom: 28px; /* alineado al centro del botón */
  right: 28px;
  width: 0; height: 0;
}

.radial-item {
  position: absolute !important;
  width: 48px !important; height: 48px !important;
  border-radius: 50% !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
  transform: translate(0, 0) scale(0);
  opacity: 0;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.radial-menu.open .radial-item { opacity: 1; }

/* Posiciones cuando el menú está abierto */
.radial-menu.open .pos-up { transform: translate(0, -90px) scale(1); }
.radial-menu.open .pos-up-left { transform: translate(-64px, -64px) scale(1); }
.radial-menu.open .pos-left { transform: translate(-90px, 0) scale(1); }

/* Label emergente al hover de cada icono */
.help-option-label {
  position: absolute;
  right: 58px; /* al lado izquierdo del icono */
  background: #fff;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px 10px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  pointer-events: none;
  white-space: nowrap;
  font-weight: 600;
}

.radial-item:hover .help-option-label {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 600px) {
  .help-floating-button { bottom: 16px !important; right: 16px !important; }
  .help-button { height: 52px !important; min-width: 52px !important; max-width: 52px; }
  .radial-menu.open .pos-up { transform: translate(0, -80px) scale(1); }
  .radial-menu.open .pos-up-left { transform: translate(-56px, -56px) scale(1); }
  .radial-menu.open .pos-left { transform: translate(-80px, 0) scale(1); }
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

/* ... existing code ... */
</style>
