// PrepaPRIO 2 - CEIP Capitulaciones
// Sistema de gestión para Actuación Prioritaria

// ============================================
// SISTEMA DE ALMACENAMIENTO
// ============================================
class StorageManager {
    constructor() {
        this.storageKey = 'prepaPRIO2_data';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                programacion: {
                    situacionesAprendizaje: []
                },
                accionTutorial: {
                    reuniones: []
                },
                evidencias: {
                    practicas: [],
                    seguimiento: []
                },
                diversidad: {
                    medidasGenerales: [
                        { id: 1, text: 'Metodologías didácticas favorecedoras de la inclusión', checked: false },
                        { id: 2, text: 'Organización flexible de espacios y tiempos', checked: false },
                        { id: 3, text: 'Diversificación de procedimientos de enseñanza', checked: false },
                        { id: 4, text: 'Diversificación de instrumentos de evaluación', checked: false },
                        { id: 5, text: 'Agrupamientos flexibles y heterogéneos', checked: false },
                        { id: 6, text: 'Desdobles en áreas instrumentales (si procede)', checked: false },
                        { id: 7, text: 'Apoyo en grupos ordinarios (PT/AL si procede)', checked: false },
                        { id: 8, text: 'Programas de refuerzo para alumnado que no promociona', checked: false },
                        { id: 9, text: 'Programas de profundización para alumnado de altas capacidades', checked: false },
                        { id: 10, text: 'Adaptaciones de acceso (materiales adaptados, TIC...)', checked: false }
                    ],
                    neeAneae: [],
                    refuerzo: [],
                    proa: {
                        alumnos: [],
                        reuniones: []
                    }
                },
                evaluacion: {
                    procesoChecklist: [
                        { id: 1, text: 'Criterios de evaluación definidos en la programación', checked: false },
                        { id: 2, text: 'Instrumentos de evaluación variados (observación, pruebas, trabajos...)', checked: false },
                        { id: 3, text: 'Evaluación continua y formativa', checked: false },
                        { id: 4, text: 'Evaluación inicial realizada al comienzo de curso', checked: false },
                        { id: 5, text: 'Sesiones de evaluación planificadas', checked: false },
                        { id: 6, text: 'Información al alumnado sobre su proceso de evaluación', checked: false },
                        { id: 7, text: 'Coordinación con el equipo docente en las sesiones', checked: false }
                    ],
                    criteriosInformados: false,
                    aspectosGenerales: [],
                    plantillaSesiones: [],
                    documentacionVerificada: false
                },
                observacion: {
                    registros: []
                },
                otrosDatos: {
                    descripcionClase: '',
                    casosAcoso: [],
                    protocolosSuicidas: [],
                    protocolosAbsentismo: []
                },
                salidas: [],
                documentos: {
                    planResolucionProblemas: null,
                    planLectura: null,
                    otros: []
                },
                directivo: {
                    informes: []
                }
            };
            this.saveData(initialData);
        }
    }

    getData() {
        let data = JSON.parse(localStorage.getItem(this.storageKey));
        
        // Migrar datos antiguos al nuevo formato
        if (data) {
            let needsSave = false;

            // Asegurar que todos los módulos principales existen
            if (!data.programacion) data.programacion = { situacionesAprendizaje: [] };
            if (!data.accionTutorial) data.accionTutorial = { reuniones: [] };
            if (!data.diversidad) data.diversidad = {};
            if (!data.evaluacion) data.evaluacion = {};
            if (!data.observacion) data.observacion = { registros: [] };
            if (!data.otrosDatos) data.otrosDatos = {};
            if (!data.salidas) data.salidas = [];
            if (!data.documentos) data.documentos = {};
            if (!data.directivo) data.directivo = {};

            // Migrar evidencias: de array simple a objeto con practicas y seguimiento
            if (Array.isArray(data.evidencias)) {
                data.evidencias = {
                    practicas: [],
                    seguimiento: []
                };
                needsSave = true;
            } else if (!data.evidencias) {
                data.evidencias = {
                    practicas: [],
                    seguimiento: []
                };
                needsSave = true;
            } else {
                // Asegurar que las propiedades existen
                if (!data.evidencias.practicas) {
                    data.evidencias.practicas = [];
                    needsSave = true;
                }
                if (!data.evidencias.seguimiento) {
                    data.evidencias.seguimiento = [];
                    needsSave = true;
                }
            }

            // Migrar diversidad: añadir medidasGenerales si no existe
            if (!data.diversidad.medidasGenerales) {
                data.diversidad.medidasGenerales = [
                    { id: 1, text: 'Metodologías didácticas favorecedoras de la inclusión', checked: false },
                    { id: 2, text: 'Organización flexible de espacios y tiempos', checked: false },
                    { id: 3, text: 'Diversificación de procedimientos de enseñanza', checked: false },
                    { id: 4, text: 'Diversificación de instrumentos de evaluación', checked: false },
                    { id: 5, text: 'Agrupamientos flexibles y heterogéneos', checked: false },
                    { id: 6, text: 'Desdobles en áreas instrumentales (si procede)', checked: false },
                    { id: 7, text: 'Apoyo en grupos ordinarios (PT/AL si procede)', checked: false },
                    { id: 8, text: 'Programas de refuerzo para alumnado que no promociona', checked: false },
                    { id: 9, text: 'Programas de profundización para alumnado de altas capacidades', checked: false },
                    { id: 10, text: 'Adaptaciones de acceso (materiales adaptados, TIC...)', checked: false }
                ];
                needsSave = true;
            }

            // Asegurar otras propiedades de diversidad
            if (!data.diversidad.neeAneae) data.diversidad.neeAneae = [];
            if (!data.diversidad.refuerzo) data.diversidad.refuerzo = [];
            if (!data.diversidad.proa) data.diversidad.proa = { alumnos: [], reuniones: [] };

            // Migrar evaluación: añadir aspectosGenerales si no existe
            if (!data.evaluacion.aspectosGenerales) {
                data.evaluacion.aspectosGenerales = [];
                needsSave = true;
            }

            // Migrar evaluación: añadir procesoChecklist si no existe
            if (!data.evaluacion.procesoChecklist) {
                data.evaluacion.procesoChecklist = [
                    { id: 1, text: 'Criterios de evaluación definidos en la programación', checked: false },
                    { id: 2, text: 'Instrumentos de evaluación variados (observación, pruebas, trabajos...)', checked: false },
                    { id: 3, text: 'Evaluación continua y formativa', checked: false },
                    { id: 4, text: 'Evaluación inicial realizada al comienzo de curso', checked: false },
                    { id: 5, text: 'Sesiones de evaluación planificadas', checked: false },
                    { id: 6, text: 'Información al alumnado sobre su proceso de evaluación', checked: false },
                    { id: 7, text: 'Coordinación con el equipo docente en las sesiones', checked: false }
                ];
                needsSave = true;
            }

            // Asegurar otras propiedades de evaluación
            if (data.evaluacion.criteriosInformados === undefined) data.evaluacion.criteriosInformados = false;
            if (!data.evaluacion.plantillaSesiones) data.evaluacion.plantillaSesiones = [];
            if (data.evaluacion.documentacionVerificada === undefined) data.evaluacion.documentacionVerificada = false;

            // Migrar otrosDatos: añadir protocolosSuicidas si no existe
            if (!data.otrosDatos.protocolosSuicidas) {
                data.otrosDatos.protocolosSuicidas = [];
                needsSave = true;
            }

            // Migrar otrosDatos: añadir protocolosAbsentismo si no existe
            if (!data.otrosDatos.protocolosAbsentismo) {
                data.otrosDatos.protocolosAbsentismo = [];
                needsSave = true;
            }

            // Asegurar otras propiedades de otrosDatos
            if (!data.otrosDatos.descripcionClase) data.otrosDatos.descripcionClase = '';
            if (!data.otrosDatos.casosAcoso) data.otrosDatos.casosAcoso = [];

            // Migrar programación: cambiar mes por temporizacion
            if (data.programacion && data.programacion.situacionesAprendizaje) {
                data.programacion.situacionesAprendizaje.forEach(sda => {
                    if (sda.mes && !sda.temporizacion) {
                        sda.temporizacion = sda.mes;
                        delete sda.mes;
                        needsSave = true;
                    }
                });
            }

            // Guardar si hay cambios
            if (needsSave) {
                this.saveData(data);
            }
        }
        
        return data;
    }

    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    updateModule(moduleName, moduleData) {
        const data = this.getData();
        data[moduleName] = moduleData;
        this.saveData(data);
    }
}

const storage = new StorageManager();

// ============================================
// SISTEMA DE NAVEGACIÓN
// ============================================
class NavigationManager {
    constructor() {
        this.currentModule = 'dashboard';
        this.initializeNavigation();
    }

    initializeNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const module = e.currentTarget.dataset.module;
                this.switchModule(module);
            });
        });
    }

    switchModule(moduleName) {
        // Actualizar botones activos
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-module="${moduleName}"]`).classList.add('active');

        // Cargar módulo
        this.currentModule = moduleName;
        this.loadModule(moduleName);
        
        // Actualizar progreso
        this.updateGlobalProgress();
    }

    loadModule(moduleName) {
        const mainContent = document.getElementById('mainContent');
        const moduleManager = new ModuleManager();
        
        switch(moduleName) {
            case 'dashboard':
                mainContent.innerHTML = moduleManager.getDashboard();
                break;
            case 'programacion':
                mainContent.innerHTML = moduleManager.getProgramacion();
                moduleManager.initProgramacionEvents();
                break;
            case 'accionTutorial':
                mainContent.innerHTML = moduleManager.getAccionTutorial();
                moduleManager.initAccionTutorialEvents();
                break;
            case 'evidencias':
                mainContent.innerHTML = moduleManager.getEvidencias();
                moduleManager.initEvidenciasEvents();
                break;
            case 'diversidad':
                mainContent.innerHTML = moduleManager.getDiversidad();
                moduleManager.initDiversidadEvents();
                break;
            case 'evaluacion':
                mainContent.innerHTML = moduleManager.getEvaluacion();
                moduleManager.initEvaluacionEvents();
                break;
            case 'observacion':
                mainContent.innerHTML = moduleManager.getObservacion();
                moduleManager.initObservacionEvents();
                break;
            case 'otrosDatos':
                mainContent.innerHTML = moduleManager.getOtrosDatos();
                moduleManager.initOtrosDatosEvents();
                break;
            case 'salidas':
                mainContent.innerHTML = moduleManager.getSalidas();
                moduleManager.initSalidasEvents();
                break;
            case 'documentos':
                mainContent.innerHTML = moduleManager.getDocumentos();
                moduleManager.initDocumentosEvents();
                break;
            case 'directivo':
                mainContent.innerHTML = moduleManager.getDirectivo();
                moduleManager.initDirectivoEvents();
                break;
        }
    }

    updateGlobalProgress() {
        const data = storage.getData();
        let totalItems = 0;
        let completedItems = 0;

        // Calcular completitud de cada módulo
        if (data.programacion.situacionesAprendizaje.length > 0) completedItems++;
        totalItems++;

        if (data.accionTutorial.reuniones.length > 0) completedItems++;
        totalItems++;

        if (data.evidencias.practicas.length > 0 || data.evidencias.seguimiento.length > 0) completedItems++;
        totalItems++;

        if (data.diversidad.neeAneae.length > 0 || data.diversidad.refuerzo.length > 0) completedItems++;
        totalItems++;

        if (data.evaluacion.procesoChecklist.some(item => item.checked)) completedItems++;
        totalItems++;

        if (data.observacion.registros.length > 0) completedItems++;
        totalItems++;

        if (data.otrosDatos.descripcionClase) completedItems++;
        totalItems++;

        const percentage = Math.round((completedItems / totalItems) * 100);
        document.getElementById('globalProgress').textContent = `${percentage}%`;
        document.getElementById('globalProgressBar').style.width = `${percentage}%`;
    }
}

// ============================================
// GESTOR DE MÓDULOS
// ============================================
class ModuleManager {
    // DASHBOARD
    getDashboard() {
        const data = storage.getData();
        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Panel de Control - PrepaPRIO 2</h2>
                    <p class="module-subtitle">Resumen de tu preparación para la Actuación Prioritaria</p>
                </div>
                
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <div class="card-icon">📚</div>
                        <h3>Programación</h3>
                        <p class="card-stat">${data.programacion.situacionesAprendizaje.length} SdA registradas</p>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">👨‍👩‍👧</div>
                        <h3>Acción Tutorial</h3>
                        <p class="card-stat">${data.accionTutorial.reuniones.length} reuniones</p>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">🤝</div>
                        <h3>Atención Diversidad</h3>
                        <p class="card-stat">${data.diversidad.neeAneae.length + data.diversidad.refuerzo.length + data.diversidad.proa.alumnos.length} alumnos</p>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">✏️</div>
                        <h3>Evidencias</h3>
                        <p class="card-stat">${data.evidencias.practicas.length + data.evidencias.seguimiento.length} registros</p>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">📋</div>
                        <h3>Evaluación</h3>
                        <p class="card-stat">${data.evaluacion.procesoChecklist.filter(i => i.checked).length}/${data.evaluacion.procesoChecklist.length} items</p>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">🚌</div>
                        <h3>Salidas</h3>
                        <p class="card-stat">${data.salidas.length} salidas planificadas</p>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <h3>Acciones rápidas</h3>
                    <div class="actions-grid">
                        <button class="action-btn" onclick="nav.switchModule('programacion')">➕ Añadir SdA</button>
                        <button class="action-btn" onclick="nav.switchModule('accionTutorial')">➕ Registrar reunión</button>
                        <button class="action-btn" onclick="nav.switchModule('diversidad')">➕ Añadir alumno NEE</button>
                        <button class="action-btn" onclick="nav.switchModule('salidas')">➕ Planificar salida</button>
                    </div>
                </div>
            </div>
        `;
    }

    // PROGRAMACIÓN
    getProgramacion() {
        const data = storage.getData();
        let sdasHTML = '';
        
        data.programacion.situacionesAprendizaje.forEach((sda, index) => {
            sdasHTML += `
                <div class="sda-item">
                    <div class="sda-header">
                        <h4>${sda.temporizacion} - ${sda.curso}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteSdA(${index})">🗑️ Eliminar</button>
                    </div>
                    <div class="sda-files">
                        ${sda.lengua ? `<span class="file-badge">📄 Lengua</span>` : ''}
                        ${sda.matematicas ? `<span class="file-badge">📄 Matemáticas</span>` : ''}
                        ${sda.ingles ? `<span class="file-badge">📄 Inglés</span>` : ''}
                        ${sda.ef ? `<span class="file-badge">📄 EF</span>` : ''}
                        ${sda.conocimiento ? `<span class="file-badge">📄 Conocimiento</span>` : ''}
                    </div>
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Mi Programación</h2>
                    <p class="module-subtitle">Gestión de Situaciones de Aprendizaje</p>
                </div>

                <div class="content-section">
                    <h3>Situaciones de Aprendizaje</h3>
                    <div class="form-group">
                        <label>Temporalización:</label>
                        <input type="text" id="sdaTemporizacion" class="form-input" placeholder="Ej: Septiembre-Octubre, 1er Trimestre, etc.">
                    </div>

                    <div class="form-group">
                        <label>Curso:</label>
                        <input type="text" id="sdaCurso" class="form-input" placeholder="Ej: 3º Primaria">
                    </div>

                    <div class="upload-grid">
                        <div class="upload-item">
                            <label>📄 Lengua:</label>
                            <input type="file" id="sdaLengua" accept=".pdf" class="file-input">
                        </div>
                        <div class="upload-item">
                            <label>📄 Matemáticas:</label>
                            <input type="file" id="sdaMatematicas" accept=".pdf" class="file-input">
                        </div>
                        <div class="upload-item">
                            <label>📄 Inglés:</label>
                            <input type="file" id="sdaIngles" accept=".pdf" class="file-input">
                        </div>
                        <div class="upload-item">
                            <label>📄 Educación Física:</label>
                            <input type="file" id="sdaEF" accept=".pdf" class="file-input">
                        </div>
                        <div class="upload-item">
                            <label>📄 Conocimiento:</label>
                            <input type="file" id="sdaConocimiento" accept=".pdf" class="file-input">
                        </div>
                    </div>

                    <button class="btn-primary" id="btnAddSdA">➕ Guardar Situación de Aprendizaje</button>
                </div>

                <div class="content-section">
                    <h3>SdA Registradas</h3>
                    <div class="sda-list">
                        ${sdasHTML || '<p class="empty-state">No hay SdA registradas aún</p>'}
                    </div>
                </div>

                <div style="margin-top: 2rem; padding: 1rem; text-align: center; border-top: 2px solid var(--border);">
                    <button class="btn-primary" onclick="pdfGenerator.generateModulePDF('programacion')">📄 Generar PDF de este módulo</button>
                </div>
            </div>
        `;
    }

    initProgramacionEvents() {
        document.getElementById('btnAddSdA').addEventListener('click', () => this.addSdA());
    }

    async addSdA() {
        const temporizacion = document.getElementById('sdaTemporizacion').value;
        const curso = document.getElementById('sdaCurso').value;
        
        if (!temporizacion || !curso) {
            alert('Por favor, completa la temporalización y el curso');
            return;
        }

        const files = {
            lengua: document.getElementById('sdaLengua').files[0],
            matematicas: document.getElementById('sdaMatematicas').files[0],
            ingles: document.getElementById('sdaIngles').files[0],
            ef: document.getElementById('sdaEF').files[0],
            conocimiento: document.getElementById('sdaConocimiento').files[0]
        };

        const sdaData = {
            temporizacion,
            curso,
            fecha: new Date().toISOString(),
            lengua: files.lengua ? files.lengua.name : null,
            matematicas: files.matematicas ? files.matematicas.name : null,
            ingles: files.ingles ? files.ingles.name : null,
            ef: files.ef ? files.ef.name : null,
            conocimiento: files.conocimiento ? files.conocimiento.name : null
        };

        const data = storage.getData();
        data.programacion.situacionesAprendizaje.push(sdaData);
        storage.saveData(data);

        alert('SdA guardada correctamente');
        nav.switchModule('programacion');
    }

    deleteSdA(index) {
        if (confirm('¿Eliminar esta SdA?')) {
            const data = storage.getData();
            data.programacion.situacionesAprendizaje.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('programacion');
        }
    }

    // ACCIÓN TUTORIAL
    getAccionTutorial() {
        const data = storage.getData();
        let reunionesHTML = '';
        
        data.accionTutorial.reuniones.forEach((reunion, index) => {
            reunionesHTML += `
                <div class="reunion-item">
                    <div class="reunion-header">
                        <h4>${reunion.alumno}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteReunion(${index})">🗑️</button>
                    </div>
                    <p><strong>Fecha:</strong> ${new Date(reunion.fecha).toLocaleDateString()}</p>
                    <p><strong>Trimestre:</strong> ${reunion.trimestre}</p>
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Acción Tutorial</h2>
                    <p class="module-subtitle">Registro de reuniones con familias</p>
                </div>

                <div class="content-section">
                    <h3>Nueva Reunión</h3>
                    <div class="form-group">
                        <label>Nombre y apellidos del alumno:</label>
                        <input type="text" id="reunionAlumno" class="form-input" placeholder="Nombre completo">
                    </div>

                    <div class="form-group">
                        <label>Fecha de la reunión:</label>
                        <input type="date" id="reunionFecha" class="form-input">
                    </div>

                    <div class="form-group">
                        <label>Trimestre:</label>
                        <select id="reunionTrimestre" class="form-input">
                            <option value="Primer Trimestre">Primer Trimestre</option>
                            <option value="Segundo Trimestre">Segundo Trimestre</option>
                            <option value="Tercer Trimestre">Tercer Trimestre</option>
                        </select>
                    </div>

                    <button class="btn-primary" id="btnAddReunion">➕ Registrar Reunión</button>
                </div>

                <div class="content-section">
                    <h3>Reuniones Registradas</h3>
                    <div class="reuniones-list">
                        ${reunionesHTML || '<p class="empty-state">No hay reuniones registradas aún</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    initAccionTutorialEvents() {
        document.getElementById('btnAddReunion').addEventListener('click', () => this.addReunion());
    }

    addReunion() {
        const alumno = document.getElementById('reunionAlumno').value;
        const fecha = document.getElementById('reunionFecha').value;
        const trimestre = document.getElementById('reunionTrimestre').value;

        if (!alumno || !fecha) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const data = storage.getData();
        data.accionTutorial.reuniones.push({
            alumno,
            fecha,
            trimestre,
            registrado: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Reunión registrada correctamente');
        nav.switchModule('accionTutorial');
    }

    deleteReunion(index) {
        if (confirm('¿Eliminar esta reunión?')) {
            const data = storage.getData();
            data.accionTutorial.reuniones.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('accionTutorial');
        }
    }

    // EVIDENCIAS
    getEvidencias() {
        const data = storage.getData();
        
        let practicasHTML = '';
        data.evidencias.practicas.forEach((p, index) => {
            practicasHTML += `
                <div class="evidencia-item">
                    <div class="evidencia-header">
                        <h4>${p.area} - ${p.fecha}</h4>
                        <button class="btn-delete" onclick="moduleManager.deletePractica(${index})">🗑️ Eliminar</button>
                    </div>
                    <p>${p.descripcion}</p>
                </div>
            `;
        });

        let seguimientoHTML = '';
        data.evidencias.seguimiento.forEach((s, index) => {
            const estadoBadge = s.estado === 'completada' ? 'success' : s.estado === 'en_curso' ? 'warning' : 'info';
            const estadoTexto = s.estado === 'completada' ? 'Completada' : s.estado === 'en_curso' ? 'En curso' : 'Iniciada';
            seguimientoHTML += `
                <div class="evidencia-item">
                    <div class="evidencia-header">
                        <h4>${s.ud}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteSeguimiento(${index})">🗑️ Eliminar</button>
                    </div>
                    <p><span class="badge-${estadoBadge}" style="padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; color: white; background: var(--${estadoBadge});">${estadoTexto}</span> - ${s.fecha}</p>
                    ${s.observaciones ? `<p>${s.observaciones}</p>` : ''}
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Evidencias de Aula</h2>
                    <p class="module-subtitle">Registro de actividades y evidencias del trabajo en el aula</p>
                </div>

                <div class="content-section">
                    <h3>⭐ Buenas Prácticas Metodológicas</h3>
                    <p style="color: #7f8c8d; margin-bottom: 1.5rem;">Registra aquí las buenas prácticas metodológicas implementadas en tu aula.</p>
                    
                    <div class="form-group">
                        <label>Descripción de la práctica:</label>
                        <textarea id="practicaDesc" class="form-textarea" rows="4" placeholder="Ej: Trabajo cooperativo por grupos para proyecto de ciencias naturales..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" id="practicaFecha" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                    </div>

                    <div class="form-group">
                        <label>Área/Materia:</label>
                        <input type="text" id="practicaArea" class="form-input" placeholder="Ej: Lengua Castellana">
                    </div>

                    <button class="btn-primary" id="btnAddPractica">➕ Añadir Práctica</button>

                    <div style="margin-top: 2rem;">
                        <h4 style="margin-bottom: 1rem;">Prácticas Registradas</h4>
                        ${practicasHTML || '<p class="empty-state">No hay prácticas registradas aún</p>'}
                    </div>
                </div>

                <div class="content-section">
                    <h3>📊 Seguimiento de Programación</h3>
                    <p style="color: #7f8c8d; margin-bottom: 1.5rem;">Registra el seguimiento de tu programación didáctica.</p>
                    
                    <div class="form-group">
                        <label>Unidad Didáctica / Tema:</label>
                        <input type="text" id="seguimientoUD" class="form-input" placeholder="Ej: UD 3 - Los seres vivos">
                    </div>

                    <div class="form-group">
                        <label>Estado:</label>
                        <select id="seguimientoEstado" class="form-input">
                            <option value="iniciada">Iniciada</option>
                            <option value="en_curso">En curso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" id="seguimientoFecha" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                    </div>

                    <div class="form-group">
                        <label>Observaciones:</label>
                        <textarea id="seguimientoObs" class="form-textarea" rows="4" placeholder="Comentarios sobre el desarrollo de la UD, ajustes realizados, etc."></textarea>
                    </div>

                    <button class="btn-primary" id="btnAddSeguimiento">➕ Añadir Registro</button>

                    <div style="margin-top: 2rem;">
                        <h4 style="margin-bottom: 1rem;">Registros de Seguimiento</h4>
                        ${seguimientoHTML || '<p class="empty-state">No hay registros de seguimiento aún</p>'}
                    </div>
                </div>

                <div style="margin-top: 2rem; padding: 1rem; text-align: center; border-top: 2px solid var(--border);">
                    <button class="btn-primary" onclick="pdfGenerator.generateModulePDF('evidencias')">📄 Generar PDF de este módulo</button>
                </div>
            </div>
        `;
    }

    initEvidenciasEvents() {
        document.getElementById('btnAddPractica').addEventListener('click', () => this.addPractica());
        document.getElementById('btnAddSeguimiento').addEventListener('click', () => this.addSeguimiento());
    }

    addPractica() {
        const descripcion = document.getElementById('practicaDesc').value.trim();
        const fecha = document.getElementById('practicaFecha').value;
        const area = document.getElementById('practicaArea').value.trim();

        if (!descripcion || !fecha || !area) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const data = storage.getData();
        data.evidencias.practicas.push({ descripcion, fecha, area });
        storage.saveData(data);

        alert('Práctica añadida correctamente');
        nav.switchModule('evidencias');
    }

    deletePractica(index) {
        if (confirm('¿Eliminar esta práctica?')) {
            const data = storage.getData();
            data.evidencias.practicas.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('evidencias');
        }
    }

    addSeguimiento() {
        const ud = document.getElementById('seguimientoUD').value.trim();
        const estado = document.getElementById('seguimientoEstado').value;
        const fecha = document.getElementById('seguimientoFecha').value;
        const observaciones = document.getElementById('seguimientoObs').value.trim();

        if (!ud || !fecha) {
            alert('Por favor, completa los campos obligatorios (UD y Fecha)');
            return;
        }

        const data = storage.getData();
        data.evidencias.seguimiento.push({ ud, estado, fecha, observaciones });
        storage.saveData(data);

        alert('Registro de seguimiento añadido correctamente');
        nav.switchModule('evidencias');
    }

    deleteSeguimiento(index) {
        if (confirm('¿Eliminar este registro?')) {
            const data = storage.getData();
            data.evidencias.seguimiento.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('evidencias');
        }
    }

    // ATENCIÓN A LA DIVERSIDAD
    getDiversidad() {
        const data = storage.getData();
        
        // NEE/ANEAE
        let neeHTML = '';
        data.diversidad.neeAneae.forEach((alumno, index) => {
            neeHTML += `
                <div class="alumno-item">
                    <div class="alumno-header">
                        <h4>${alumno.siglas}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteNEE(${index})">🗑️</button>
                    </div>
                    <div class="atencion-badges">
                        ${alumno.pt ? '<span class="badge-pt">PT</span>' : ''}
                        ${alumno.al ? '<span class="badge-al">AL</span>' : ''}
                        ${alumno.atal ? '<span class="badge-atal">ATAL</span>' : ''}
                        ${alumno.programaEspecifico ? '<span class="badge-especial">Prog. Específico</span>' : ''}
                        ${alumno.acs ? '<span class="badge-acs">ACS</span>' : ''}
                    </div>
                    ${alumno.acsFile ? `<p class="file-attached">📄 ACS adjunta</p>` : ''}
                </div>
            `;
        });

        // Refuerzo
        let refuerzoHTML = '';
        data.diversidad.refuerzo.forEach((alumno, index) => {
            refuerzoHTML += `
                <div class="alumno-item">
                    <div class="alumno-header">
                        <h4>${alumno.siglas}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteRefuerzo(${index})">🗑️</button>
                    </div>
                    <div class="atencion-badges">
                        ${alumno.lengua ? '<span class="badge-lengua">Lengua</span>' : ''}
                        ${alumno.matematicas ? '<span class="badge-matematicas">Matemáticas</span>' : ''}
                    </div>
                </div>
            `;
        });

        // PROA
        let proaAlumnosHTML = '';
        data.diversidad.proa.alumnos.forEach((siglas, index) => {
            proaAlumnosHTML += `
                <div class="proa-alumno-item">
                    <span>${siglas}</span>
                    <button class="btn-delete-small" onclick="moduleManager.deleteProaAlumno(${index})">🗑️</button>
                </div>
            `;
        });

        let proaReunionesHTML = '';
        data.diversidad.proa.reuniones.forEach((reunion, index) => {
            proaReunionesHTML += `
                <div class="reunion-item">
                    <div class="reunion-header">
                        <h4>Reunión - ${new Date(reunion.fecha).toLocaleDateString()}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteProaReunion(${index})">🗑️</button>
                    </div>
                    <p><strong>Acuerdos:</strong> ${reunion.acuerdos}</p>
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Atención a la Diversidad</h2>
                    <p class="module-subtitle">Gestión de alumnado con necesidades específicas</p>
                </div>

                <!-- MEDIDAS GENERALES -->
                <div class="content-section">
                    <h3>✅ Medidas Generales Aplicadas</h3>
                    <p style="color: #7f8c8d; margin-bottom: 1.5rem;">La atención a la diversidad es un elemento clave en la evaluación. Marca las medidas generales que aplicas en tu aula.</p>
                    
                    <div class="checkbox-group" style="flex-direction: column; align-items: flex-start;">
                        ${data.diversidad.medidasGenerales.map((item, index) => `
                            <label style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px; border: 2px solid ${item.checked ? 'var(--success)' : 'var(--border)'}; cursor: pointer; width: 100%;">
                                <input type="checkbox" ${item.checked ? 'checked' : ''} 
                                       onchange="moduleManager.toggleMedidaGeneral(${item.id})"
                                       style="width: 20px; height: 20px; cursor: pointer;">
                                <span style="flex: 1; font-weight: ${item.checked ? '600' : '400'}; color: ${item.checked ? 'var(--success)' : 'var(--text)'};">
                                    ${item.text}
                                </span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <!-- NEE/ANEAE -->
                <div class="content-section">
                    <h3>Alumnado NEE/ANEAE</h3>
                    <div class="form-group">
                        <label>Siglas del alumno:</label>
                        <input type="text" id="neeSiglas" class="form-input" placeholder="Ej: JGM">
                    </div>

                    <div class="checkbox-group">
                        <label><input type="checkbox" id="neePT"> PT</label>
                        <label><input type="checkbox" id="neeAL"> AL</label>
                        <label><input type="checkbox" id="neeATAL"> ATAL</label>
                        <label><input type="checkbox" id="neeProgramaEspecifico"> Programa Específico</label>
                        <label><input type="checkbox" id="neeACS"> ACS</label>
                    </div>

                    <div class="form-group" id="acsUploadGroup" style="display:none;">
                        <label>Subir ACS (PDF):</label>
                        <input type="file" id="neeACSFile" accept=".pdf" class="file-input">
                    </div>

                    <button class="btn-primary" id="btnAddNEE">➕ Añadir Alumno NEE/ANEAE</button>

                    <div class="alumnos-list">
                        ${neeHTML || '<p class="empty-state">No hay alumnos NEE/ANEAE registrados</p>'}
                    </div>
                </div>

                <!-- REFUERZO -->
                <div class="content-section">
                    <h3>Alumnado con Refuerzo</h3>
                    <div class="form-group">
                        <label>Siglas del alumno:</label>
                        <input type="text" id="refuerzoSiglas" class="form-input" placeholder="Ej: MLS">
                    </div>

                    <div class="checkbox-group">
                        <label><input type="checkbox" id="refuerzoLengua"> Lengua</label>
                        <label><input type="checkbox" id="refuerzoMatematicas"> Matemáticas</label>
                    </div>

                    <button class="btn-primary" id="btnAddRefuerzo">➕ Añadir Alumno Refuerzo</button>

                    <div class="alumnos-list">
                        ${refuerzoHTML || '<p class="empty-state">No hay alumnos de refuerzo registrados</p>'}
                    </div>
                </div>

                <!-- PROA -->
                <div class="content-section">
                    <h3>Programa PROA</h3>
                    
                    <h4>Alumnado PROA</h4>
                    <div class="form-group">
                        <label>Siglas del alumno:</label>
                        <input type="text" id="proaSiglas" class="form-input" placeholder="Ej: ARP">
                    </div>
                    <button class="btn-primary" id="btnAddProaAlumno">➕ Añadir Alumno PROA</button>

                    <div class="proa-alumnos-list">
                        ${proaAlumnosHTML || '<p class="empty-state">No hay alumnos PROA registrados</p>'}
                    </div>

                    <hr>

                    <h4>Reuniones de Coordinación</h4>
                    <div class="form-group">
                        <label>Fecha de reunión:</label>
                        <input type="date" id="proaReunionFecha" class="form-input">
                    </div>

                    <div class="form-group">
                        <label>Acuerdos generales tomados:</label>
                        <textarea id="proaReunionAcuerdos" class="form-textarea" rows="4" placeholder="Describe los acuerdos..."></textarea>
                    </div>

                    <button class="btn-primary" id="btnAddProaReunion">➕ Registrar Reunión</button>

                    <div class="reuniones-list">
                        ${proaReunionesHTML || '<p class="empty-state">No hay reuniones PROA registradas</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    initDiversidadEvents() {
        // NEE/ANEAE
        document.getElementById('neeACS').addEventListener('change', (e) => {
            document.getElementById('acsUploadGroup').style.display = e.target.checked ? 'block' : 'none';
        });
        document.getElementById('btnAddNEE').addEventListener('click', () => this.addNEE());

        // Refuerzo
        document.getElementById('btnAddRefuerzo').addEventListener('click', () => this.addRefuerzo());

        // PROA
        document.getElementById('btnAddProaAlumno').addEventListener('click', () => this.addProaAlumno());
        document.getElementById('btnAddProaReunion').addEventListener('click', () => this.addProaReunion());
    }

    toggleMedidaGeneral(itemId) {
        const data = storage.getData();
        const item = data.diversidad.medidasGenerales.find(i => i.id === itemId);
        if (item) {
            item.checked = !item.checked;
            storage.saveData(data);
            nav.switchModule('diversidad');
        }
    }

    addNEE() {
        const siglas = document.getElementById('neeSiglas').value.trim();
        if (!siglas) {
            alert('Por favor, indica las siglas del alumno');
            return;
        }

        const alumno = {
            siglas,
            pt: document.getElementById('neePT').checked,
            al: document.getElementById('neeAL').checked,
            atal: document.getElementById('neeATAL').checked,
            programaEspecifico: document.getElementById('neeProgramaEspecifico').checked,
            acs: document.getElementById('neeACS').checked,
            acsFile: document.getElementById('neeACSFile').files[0]?.name || null,
            fecha: new Date().toISOString()
        };

        const data = storage.getData();
        data.diversidad.neeAneae.push(alumno);
        storage.saveData(data);

        alert('Alumno NEE/ANEAE añadido correctamente');
        nav.switchModule('diversidad');
    }

    deleteNEE(index) {
        if (confirm('¿Eliminar este alumno?')) {
            const data = storage.getData();
            data.diversidad.neeAneae.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('diversidad');
        }
    }

    addRefuerzo() {
        const siglas = document.getElementById('refuerzoSiglas').value.trim();
        const lengua = document.getElementById('refuerzoLengua').checked;
        const matematicas = document.getElementById('refuerzoMatematicas').checked;

        if (!siglas || (!lengua && !matematicas)) {
            alert('Por favor, indica las siglas y al menos una materia');
            return;
        }

        const alumno = {
            siglas,
            lengua,
            matematicas,
            fecha: new Date().toISOString()
        };

        const data = storage.getData();
        data.diversidad.refuerzo.push(alumno);
        storage.saveData(data);

        alert('Alumno de refuerzo añadido correctamente');
        nav.switchModule('diversidad');
    }

    deleteRefuerzo(index) {
        if (confirm('¿Eliminar este alumno?')) {
            const data = storage.getData();
            data.diversidad.refuerzo.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('diversidad');
        }
    }

    addProaAlumno() {
        const siglas = document.getElementById('proaSiglas').value.trim();
        if (!siglas) {
            alert('Por favor, indica las siglas del alumno');
            return;
        }

        const data = storage.getData();
        data.diversidad.proa.alumnos.push(siglas);
        storage.saveData(data);

        alert('Alumno PROA añadido correctamente');
        nav.switchModule('diversidad');
    }

    deleteProaAlumno(index) {
        if (confirm('¿Eliminar este alumno?')) {
            const data = storage.getData();
            data.diversidad.proa.alumnos.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('diversidad');
        }
    }

    addProaReunion() {
        const fecha = document.getElementById('proaReunionFecha').value;
        const acuerdos = document.getElementById('proaReunionAcuerdos').value.trim();

        if (!fecha || !acuerdos) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const data = storage.getData();
        data.diversidad.proa.reuniones.push({
            fecha,
            acuerdos,
            registrado: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Reunión PROA registrada correctamente');
        nav.switchModule('diversidad');
    }

    deleteProaReunion(index) {
        if (confirm('¿Eliminar esta reunión?')) {
            const data = storage.getData();
            data.diversidad.proa.reuniones.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('diversidad');
        }
    }

    // EVALUACIÓN
    getEvaluacion() {
        const data = storage.getData();

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Proceso de Evaluación</h2>
                    <p class="module-subtitle">Aspectos fundamentales del proceso de evaluación</p>
                </div>

                <div class="content-section">
                    <h3>✅ Checklist del Proceso de Evaluación</h3>
                    <p style="color: #7f8c8d; margin-bottom: 1.5rem;">El proceso de evaluación es uno de los aspectos fundamentales que revisará la inspección.</p>
                    
                    <div class="checkbox-group" style="flex-direction: column; align-items: flex-start;">
                        ${data.evaluacion.procesoChecklist.map((item, index) => `
                            <label style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px; border: 2px solid ${item.checked ? 'var(--success)' : 'var(--border)'}; cursor: pointer; width: 100%;">
                                <input type="checkbox" ${item.checked ? 'checked' : ''} 
                                       onchange="moduleManager.toggleChecklistItem(${item.id})"
                                       style="width: 20px; height: 20px; cursor: pointer;">
                                <span style="flex: 1; font-weight: ${item.checked ? '600' : '400'}; color: ${item.checked ? 'var(--success)' : 'var(--text)'};">
                                    ${item.text}
                                </span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="content-section">
                    <h3>📢 Criterios Informados al Alumnado</h3>
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--light); border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="criteriosInformados" ${data.evaluacion.criteriosInformados ? 'checked' : ''} 
                               style="width: 24px; height: 24px; cursor: pointer;">
                        <span style="flex: 1; font-weight: 500;">
                            He informado al alumnado y familias de los criterios de evaluación y calificación
                        </span>
                    </label>
                    <p style="margin-top: 1rem; padding: 0.75rem; background: #fff3cd; border-left: 4px solid var(--warning); border-radius: 4px; color: #856404;">
                        <strong>Importante:</strong> Es obligatorio informar a principio de curso sobre los criterios de evaluación, instrumentos y procedimientos de calificación.
                    </p>
                </div>

                <div class="content-section">
                    <h3>📝 Aspectos Generales de las Sesiones de Evaluación</h3>
                    <p style="color: #7f8c8d; margin-bottom: 1.5rem;">Describe los aspectos generales según el tipo de evaluación:</p>
                    
                    <div class="form-group">
                        <label>Tipo de Evaluación:</label>
                        <select id="aspectoTipo" class="form-input">
                            <option value="inicial">Evaluación Inicial</option>
                            <option value="1trimestre">Primer Trimestre</option>
                            <option value="2trimestre">Segundo Trimestre</option>
                            <option value="3trimestre">Tercer Trimestre</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Aspectos Generales:</label>
                        <textarea id="aspectoTexto" class="form-textarea" rows="6" placeholder="Describe los aspectos generales de la evaluación..."></textarea>
                    </div>

                    <button class="btn-primary" id="btnAddAspecto">💾 Guardar Aspectos</button>

                    ${data.evaluacion.aspectosGenerales.length > 0 ? `
                        <div style="margin-top: 2rem;">
                            <h4 style="margin-bottom: 1rem;">Aspectos Registrados</h4>
                            ${data.evaluacion.aspectosGenerales.map((aspecto, index) => `
                                <div class="evidencia-item">
                                    <div class="evidencia-header">
                                        <h4>${aspecto.tipo === 'inicial' ? 'Evaluación Inicial' : aspecto.tipo === '1trimestre' ? 'Primer Trimestre' : aspecto.tipo === '2trimestre' ? 'Segundo Trimestre' : 'Tercer Trimestre'}</h4>
                                        <button class="btn-delete" onclick="moduleManager.deleteAspecto(${index})">🗑️ Eliminar</button>
                                    </div>
                                    <p>${aspecto.texto}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="content-section">
                    <h3>📄 Documentación Oficial</h3>
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--light); border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="documentacionVerificada" ${data.evaluacion.documentacionVerificada ? 'checked' : ''} 
                               style="width: 24px; height: 24px; cursor: pointer;">
                        <span style="flex: 1; font-weight: 500;">
                            La documentación oficial está actualizada (boletines, actas, Séneca)
                        </span>
                    </label>
                </div>
            </div>
        `;
    }

    initEvaluacionEvents() {
        // Checkbox de criterios informados
        const criteriosCheckbox = document.getElementById('criteriosInformados');
        if (criteriosCheckbox) {
            criteriosCheckbox.addEventListener('change', (e) => {
                const data = storage.getData();
                data.evaluacion.criteriosInformados = e.target.checked;
                storage.saveData(data);
            });
        }

        // Checkbox de documentación verificada
        const docCheckbox = document.getElementById('documentacionVerificada');
        if (docCheckbox) {
            docCheckbox.addEventListener('change', (e) => {
                const data = storage.getData();
                data.evaluacion.documentacionVerificada = e.target.checked;
                storage.saveData(data);
            });
        }

        // Botón de añadir aspecto general
        document.getElementById('btnAddAspecto').addEventListener('click', () => this.addAspectoGeneral());
    }

    addAspectoGeneral() {
        const tipo = document.getElementById('aspectoTipo').value;
        const texto = document.getElementById('aspectoTexto').value.trim();

        if (!texto) {
            alert('Por favor, escribe los aspectos generales');
            return;
        }

        const data = storage.getData();
        data.evaluacion.aspectosGenerales.push({ tipo, texto, fecha: new Date().toISOString() });
        storage.saveData(data);

        alert('Aspectos generales guardados correctamente');
        nav.switchModule('evaluacion');
    }

    deleteAspecto(index) {
        if (confirm('¿Eliminar estos aspectos generales?')) {
            const data = storage.getData();
            data.evaluacion.aspectosGenerales.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('evaluacion');
        }
    }

    toggleChecklistItem(itemId) {
        const data = storage.getData();
        const item = data.evaluacion.procesoChecklist.find(i => i.id === itemId);
        if (item) {
            item.checked = !item.checked;
            storage.saveData(data);
            nav.switchModule('evaluacion');
        }
    }

    // OBSERVACIÓN
    getObservacion() {
        const data = storage.getData();
        let registrosHTML = '';
        
        data.observacion.registros.forEach((registro, index) => {
            registrosHTML += `
                <div class="registro-item">
                    <div class="registro-header">
                        <h4>${registro.titulo}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteRegistro(${index})">🗑️</button>
                    </div>
                    <p>${registro.observacion}</p>
                    <p class="registro-date">${new Date(registro.fecha).toLocaleDateString()}</p>
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Observación de Aula</h2>
                    <p class="module-subtitle">Registro de observaciones del proceso de enseñanza-aprendizaje</p>
                </div>

                <div class="content-section">
                    <h3>Nueva Observación</h3>
                    <div class="form-group">
                        <label>Título:</label>
                        <input type="text" id="observacionTitulo" class="form-input" placeholder="Título de la observación">
                    </div>

                    <div class="form-group">
                        <label>Observación:</label>
                        <textarea id="observacionTexto" class="form-textarea" rows="6" placeholder="Describe la observación..."></textarea>
                    </div>

                    <button class="btn-primary" id="btnAddObservacion">➕ Añadir Observación</button>
                </div>

                <div class="content-section">
                    <h3>Observaciones Registradas</h3>
                    <div class="registros-list">
                        ${registrosHTML || '<p class="empty-state">No hay observaciones registradas</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    initObservacionEvents() {
        document.getElementById('btnAddObservacion').addEventListener('click', () => this.addObservacion());
    }

    addObservacion() {
        const titulo = document.getElementById('observacionTitulo').value;
        const observacion = document.getElementById('observacionTexto').value;

        if (!titulo || !observacion) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const data = storage.getData();
        data.observacion.registros.push({
            titulo,
            observacion,
            fecha: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Observación añadida correctamente');
        nav.switchModule('observacion');
    }

    deleteRegistro(index) {
        if (confirm('¿Eliminar esta observación?')) {
            const data = storage.getData();
            data.observacion.registros.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('observacion');
        }
    }

    // OTROS DATOS IMPORTANTES
    getOtrosDatos() {
        const data = storage.getData();
        
        let acososHTML = '';
        data.otrosDatos.casosAcoso.forEach((caso, index) => {
            acososHTML += `
                <div class="acoso-item ${caso.estado === 'abierto' ? 'caso-abierto' : 'caso-cerrado'}">
                    <div class="acoso-header">
                        <h4>${caso.alumno} - ${caso.estado.toUpperCase()}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteAcoso(${index})">🗑️</button>
                    </div>
                    <p><strong>Fecha:</strong> ${new Date(caso.fecha).toLocaleDateString()}</p>
                    ${caso.medidasTexto ? `<p><strong>Medidas:</strong> ${caso.medidasTexto}</p>` : ''}
                    ${caso.medidasFile ? `<p class="file-attached">📄 Medidas adjuntas</p>` : ''}
                </div>
            `;
        });

        let suicidasHTML = '';
        data.otrosDatos.protocolosSuicidas.forEach((protocolo, index) => {
            suicidasHTML += `
                <div class="acoso-item ${protocolo.estado === 'activo' ? 'caso-abierto' : 'caso-cerrado'}">
                    <div class="acoso-header">
                        <h4>${protocolo.alumno} - ${protocolo.estado.toUpperCase()}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteProtocoloSuicida(${index})">🗑️</button>
                    </div>
                    <p><strong>Fecha Activación:</strong> ${new Date(protocolo.fecha).toLocaleDateString()}</p>
                    ${protocolo.observaciones ? `<p><strong>Observaciones:</strong> ${protocolo.observaciones}</p>` : ''}
                    ${protocolo.documentoFile ? `<p class="file-attached">📄 Protocolo adjunto</p>` : ''}
                </div>
            `;
        });

        let absentismoHTML = '';
        data.otrosDatos.protocolosAbsentismo.forEach((protocolo, index) => {
            absentismoHTML += `
                <div class="acoso-item ${protocolo.estado === 'activo' ? 'caso-abierto' : 'caso-cerrado'}">
                    <div class="acoso-header">
                        <h4>${protocolo.alumno} - ${protocolo.estado.toUpperCase()}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteProtocoloAbsentismo(${index})">🗑️</button>
                    </div>
                    <p><strong>Fecha Activación:</strong> ${new Date(protocolo.fecha).toLocaleDateString()}</p>
                    ${protocolo.observaciones ? `<p><strong>Observaciones:</strong> ${protocolo.observaciones}</p>` : ''}
                    ${protocolo.documentoFile ? `<p class="file-attached">📄 Protocolo adjunto</p>` : ''}
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Otros Datos Importantes</h2>
                    <p class="module-subtitle">Información relevante del grupo-clase</p>
                </div>

                <div class="content-section">
                    <h3>Descripción General de la Clase</h3>
                    <div class="form-group">
                        <textarea id="descripcionClase" class="form-textarea" rows="8" placeholder="Describe las características generales de tu grupo-clase...">${data.otrosDatos.descripcionClase || ''}</textarea>
                    </div>
                    <button class="btn-primary" id="btnSaveDescripcion">💾 Guardar Descripción</button>
                </div>

                <div class="content-section">
                    <h3>Casos de Acoso</h3>
                    
                    <div class="form-group">
                        <label>Siglas del alumno:</label>
                        <input type="text" id="acosoAlumno" class="form-input" placeholder="Ej: PMG">
                    </div>

                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" id="acosoFecha" class="form-input">
                    </div>

                    <div class="form-group">
                        <label>Estado del caso:</label>
                        <select id="acosoEstado" class="form-input">
                            <option value="abierto">Abierto</option>
                            <option value="cerrado">Cerrado</option>
                        </select>
                    </div>

                    <div class="form-group" id="medidasGroup">
                        <label>Medidas a tomar:</label>
                        <textarea id="acosoMedidasTexto" class="form-textarea" rows="4" placeholder="Describe las medidas..."></textarea>
                        <label style="margin-top: 10px;">O subir medidas en PDF:</label>
                        <input type="file" id="acosoMedidasFile" accept=".pdf" class="file-input">
                    </div>

                    <button class="btn-primary" id="btnAddAcoso">➕ Registrar Caso</button>

                    <div class="acoso-list">
                        ${acososHTML || '<p class="empty-state">No hay casos registrados</p>'}
                    </div>
                </div>

                <div class="content-section">
                    <h3>⚠️ Protocolo de Conductas Suicidas</h3>
                    <p style="margin-bottom: 1.5rem; padding: 0.75rem; background: #ffe8e6; border-left: 4px solid var(--danger); border-radius: 4px; color: #721c24;">
                        <strong>Importante:</strong> Registra aquí la activación de cualquier protocolo de intervención ante conductas suicidas.
                    </p>
                    
                    <div class="form-group">
                        <label>Siglas del alumno:</label>
                        <input type="text" id="suicidaAlumno" class="form-input" placeholder="Ej: JMR">
                    </div>

                    <div class="form-group">
                        <label>Fecha de Activación:</label>
                        <input type="date" id="suicidaFecha" class="form-input">
                    </div>

                    <div class="form-group">
                        <label>Estado del protocolo:</label>
                        <select id="suicidaEstado" class="form-input">
                            <option value="activo">Activo</option>
                            <option value="cerrado">Cerrado</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Observaciones:</label>
                        <textarea id="suicidaObs" class="form-textarea" rows="4" placeholder="Observaciones relevantes sobre el caso..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Documento del Protocolo (PDF):</label>
                        <input type="file" id="suicidaFile" accept=".pdf" class="file-input">
                    </div>

                    <button class="btn-primary" id="btnAddProtocoloSuicida">➕ Registrar Protocolo</button>

                    <div class="acoso-list">
                        ${suicidasHTML || '<p class="empty-state">No hay protocolos registrados</p>'}
                    </div>
                </div>

                <div class="content-section">
                    <h3>📅 Protocolo de Absentismo</h3>
                    <p style="margin-bottom: 1.5rem; padding: 0.75rem; background: #fff3cd; border-left: 4px solid var(--warning); border-radius: 4px; color: #856404;">
                        <strong>Importante:</strong> Registra aquí la activación de protocolos de absentismo escolar.
                    </p>
                    
                    <div class="form-group">
                        <label>Siglas del alumno:</label>
                        <input type="text" id="absentismoAlumno" class="form-input" placeholder="Ej: MLT">
                    </div>

                    <div class="form-group">
                        <label>Fecha de Activación:</label>
                        <input type="date" id="absentismoFecha" class="form-input">
                    </div>

                    <div class="form-group">
                        <label>Estado del protocolo:</label>
                        <select id="absentismoEstado" class="form-input">
                            <option value="activo">Activo</option>
                            <option value="cerrado">Cerrado</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Observaciones:</label>
                        <textarea id="absentismoObs" class="form-textarea" rows="4" placeholder="Observaciones relevantes sobre el caso de absentismo..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Documento del Protocolo (PDF):</label>
                        <input type="file" id="absentismoFile" accept=".pdf" class="file-input">
                    </div>

                    <button class="btn-primary" id="btnAddProtocoloAbsentismo">➕ Registrar Protocolo</button>

                    <div class="acoso-list">
                        ${absentismoHTML || '<p class="empty-state">No hay protocolos registrados</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    initOtrosDatosEvents() {
        document.getElementById('btnSaveDescripcion').addEventListener('click', () => this.saveDescripcionClase());
        document.getElementById('acosoEstado').addEventListener('change', (e) => {
            document.getElementById('medidasGroup').style.display = e.target.value === 'abierto' ? 'block' : 'none';
        });
        document.getElementById('btnAddAcoso').addEventListener('click', () => this.addAcoso());
        document.getElementById('btnAddProtocoloSuicida').addEventListener('click', () => this.addProtocoloSuicida());
        document.getElementById('btnAddProtocoloAbsentismo').addEventListener('click', () => this.addProtocoloAbsentismo());
    }

    saveDescripcionClase() {
        const descripcion = document.getElementById('descripcionClase').value;
        const data = storage.getData();
        data.otrosDatos.descripcionClase = descripcion;
        storage.saveData(data);
        alert('Descripción guardada correctamente');
    }

    addAcoso() {
        const alumno = document.getElementById('acosoAlumno').value.trim();
        const fecha = document.getElementById('acosoFecha').value;
        const estado = document.getElementById('acosoEstado').value;

        if (!alumno || !fecha) {
            alert('Por favor, completa los campos obligatorios');
            return;
        }

        const caso = {
            alumno,
            fecha,
            estado,
            medidasTexto: document.getElementById('acosoMedidasTexto').value || null,
            medidasFile: document.getElementById('acosoMedidasFile').files[0]?.name || null,
            registrado: new Date().toISOString()
        };

        const data = storage.getData();
        data.otrosDatos.casosAcoso.push(caso);
        storage.saveData(data);

        alert('Caso registrado correctamente');
        nav.switchModule('otrosDatos');
    }

    deleteAcoso(index) {
        if (confirm('¿Eliminar este caso?')) {
            const data = storage.getData();
            data.otrosDatos.casosAcoso.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('otrosDatos');
        }
    }

    addProtocoloSuicida() {
        const alumno = document.getElementById('suicidaAlumno').value.trim();
        const fecha = document.getElementById('suicidaFecha').value;
        const estado = document.getElementById('suicidaEstado').value;
        const observaciones = document.getElementById('suicidaObs').value.trim();
        const documentoFile = document.getElementById('suicidaFile').files[0];

        if (!alumno || !fecha) {
            alert('Por favor, completa los campos obligatorios (alumno y fecha)');
            return;
        }

        const data = storage.getData();
        data.otrosDatos.protocolosSuicidas.push({
            alumno,
            fecha,
            estado,
            observaciones,
            documentoFile: documentoFile ? documentoFile.name : null,
            registrado: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Protocolo registrado correctamente');
        nav.switchModule('otrosDatos');
    }

    deleteProtocoloSuicida(index) {
        if (confirm('¿Eliminar este protocolo?')) {
            const data = storage.getData();
            data.otrosDatos.protocolosSuicidas.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('otrosDatos');
        }
    }

    addProtocoloAbsentismo() {
        const alumno = document.getElementById('absentismoAlumno').value.trim();
        const fecha = document.getElementById('absentismoFecha').value;
        const estado = document.getElementById('absentismoEstado').value;
        const observaciones = document.getElementById('absentismoObs').value.trim();
        const documentoFile = document.getElementById('absentismoFile').files[0];

        if (!alumno || !fecha) {
            alert('Por favor, completa los campos obligatorios (alumno y fecha)');
            return;
        }

        const data = storage.getData();
        data.otrosDatos.protocolosAbsentismo.push({
            alumno,
            fecha,
            estado,
            observaciones,
            documentoFile: documentoFile ? documentoFile.name : null,
            registrado: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Protocolo registrado correctamente');
        nav.switchModule('otrosDatos');
    }

    deleteProtocoloAbsentismo(index) {
        if (confirm('¿Eliminar este protocolo?')) {
            const data = storage.getData();
            data.otrosDatos.protocolosAbsentismo.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('otrosDatos');
        }
    }

    // SALIDAS/EXCURSIONES
    getSalidas() {
        const data = storage.getData();
        let salidasHTML = '';
        
        data.salidas.forEach((salida, index) => {
            salidasHTML += `
                <div class="salida-item">
                    <div class="salida-header">
                        <h4>${salida.actividad}</h4>
                        <button class="btn-delete" onclick="moduleManager.deleteSalida(${index})">🗑️</button>
                    </div>
                    <p><strong>Fecha:</strong> ${new Date(salida.fecha).toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> ${salida.hora}</p>
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Salidas y Excursiones</h2>
                    <p class="module-subtitle">Planificación de actividades fuera del centro</p>
                </div>

                <div class="content-section">
                    <h3>Nueva Salida/Excursión</h3>
                    <div class="form-group">
                        <label>Nombre de la actividad:</label>
                        <input type="text" id="salidaActividad" class="form-input" placeholder="Ej: Visita al museo">
                    </div>

                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" id="salidaFecha" class="form-input">
                    </div>

                    <div class="form-group">
                        <label>Hora:</label>
                        <input type="time" id="salidaHora" class="form-input">
                    </div>

                    <button class="btn-primary" id="btnAddSalida">➕ Añadir Salida</button>
                </div>

                <div class="content-section">
                    <h3>Salidas Planificadas</h3>
                    <div class="salidas-list">
                        ${salidasHTML || '<p class="empty-state">No hay salidas planificadas</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    initSalidasEvents() {
        document.getElementById('btnAddSalida').addEventListener('click', () => this.addSalida());
    }

    addSalida() {
        const actividad = document.getElementById('salidaActividad').value;
        const fecha = document.getElementById('salidaFecha').value;
        const hora = document.getElementById('salidaHora').value;

        if (!actividad || !fecha || !hora) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const data = storage.getData();
        data.salidas.push({
            actividad,
            fecha,
            hora,
            registrado: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Salida añadida correctamente');
        nav.switchModule('salidas');
    }

    deleteSalida(index) {
        if (confirm('¿Eliminar esta salida?')) {
            const data = storage.getData();
            data.salidas.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('salidas');
        }
    }

    // DOCUMENTOS
    getDocumentos() {
        const data = storage.getData();
        
        let otrosDocsHTML = '';
        data.documentos.otros.forEach((doc, index) => {
            otrosDocsHTML += `
                <div class="documento-item">
                    <span>📄 ${doc.nombre}</span>
                    <button class="btn-delete-small" onclick="moduleManager.deleteDocumento(${index})">🗑️</button>
                </div>
            `;
        });

        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Documentos</h2>
                    <p class="module-subtitle">Gestión de documentación del centro</p>
                </div>

                <div class="content-section">
                    <h3>Plan de Resolución de Problemas</h3>
                    ${data.documentos.planResolucionProblemas ? 
                        `<div class="documento-uploaded">
                            <span>📄 ${data.documentos.planResolucionProblemas}</span>
                            <button class="btn-delete-small" onclick="moduleManager.deletePlanProblemas()">🗑️</button>
                        </div>` : 
                        `<div class="form-group">
                            <input type="file" id="planProblemas" accept=".pdf" class="file-input">
                            <button class="btn-primary" id="btnUploadProblemas">📤 Subir Plan</button>
                        </div>`
                    }
                </div>

                <div class="content-section">
                    <h3>Plan de Lectura</h3>
                    ${data.documentos.planLectura ? 
                        `<div class="documento-uploaded">
                            <span>📄 ${data.documentos.planLectura}</span>
                            <button class="btn-delete-small" onclick="moduleManager.deletePlanLectura()">🗑️</button>
                        </div>` : 
                        `<div class="form-group">
                            <input type="file" id="planLectura" accept=".pdf" class="file-input">
                            <button class="btn-primary" id="btnUploadLectura">📤 Subir Plan</button>
                        </div>`
                    }
                </div>

                <div class="content-section">
                    <h3>Otros Documentos</h3>
                    <div class="form-group">
                        <input type="file" id="otroDocumento" accept=".pdf" class="file-input">
                        <button class="btn-primary" id="btnUploadOtro">📤 Subir Documento</button>
                    </div>

                    <div class="documentos-list">
                        ${otrosDocsHTML || '<p class="empty-state">No hay documentos adicionales</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    initDocumentosEvents() {
        const btnProblemas = document.getElementById('btnUploadProblemas');
        if (btnProblemas) {
            btnProblemas.addEventListener('click', () => this.uploadPlanProblemas());
        }

        const btnLectura = document.getElementById('btnUploadLectura');
        if (btnLectura) {
            btnLectura.addEventListener('click', () => this.uploadPlanLectura());
        }

        document.getElementById('btnUploadOtro').addEventListener('click', () => this.uploadOtroDocumento());
    }

    uploadPlanProblemas() {
        const file = document.getElementById('planProblemas').files[0];
        if (!file) {
            alert('Por favor, selecciona un archivo');
            return;
        }

        const data = storage.getData();
        data.documentos.planResolucionProblemas = file.name;
        storage.saveData(data);

        alert('Plan de Resolución de Problemas subido correctamente');
        nav.switchModule('documentos');
    }

    deletePlanProblemas() {
        if (confirm('¿Eliminar el Plan de Resolución de Problemas?')) {
            const data = storage.getData();
            data.documentos.planResolucionProblemas = null;
            storage.saveData(data);
            nav.switchModule('documentos');
        }
    }

    uploadPlanLectura() {
        const file = document.getElementById('planLectura').files[0];
        if (!file) {
            alert('Por favor, selecciona un archivo');
            return;
        }

        const data = storage.getData();
        data.documentos.planLectura = file.name;
        storage.saveData(data);

        alert('Plan de Lectura subido correctamente');
        nav.switchModule('documentos');
    }

    deletePlanLectura() {
        if (confirm('¿Eliminar el Plan de Lectura?')) {
            const data = storage.getData();
            data.documentos.planLectura = null;
            storage.saveData(data);
            nav.switchModule('documentos');
        }
    }

    uploadOtroDocumento() {
        const file = document.getElementById('otroDocumento').files[0];
        if (!file) {
            alert('Por favor, selecciona un archivo');
            return;
        }

        const data = storage.getData();
        data.documentos.otros.push({
            nombre: file.name,
            fecha: new Date().toISOString()
        });
        storage.saveData(data);

        alert('Documento subido correctamente');
        nav.switchModule('documentos');
    }

    deleteDocumento(index) {
        if (confirm('¿Eliminar este documento?')) {
            const data = storage.getData();
            data.documentos.otros.splice(index, 1);
            storage.saveData(data);
            nav.switchModule('documentos');
        }
    }

    // EQUIPO DIRECTIVO
    getDirectivo() {
        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>Equipo Directivo</h2>
                    <p class="module-subtitle">Herramientas de gestión para el equipo directivo</p>
                </div>

                <div class="content-section">
                    <h3>Panel de Administración</h3>
                    <p>Funcionalidades adicionales para el equipo directivo del centro.</p>
                    
                    <div class="admin-actions">
                        <button class="btn-admin" id="btnGenerarInforme">📊 Generar Informe General</button>
                        <button class="btn-admin" id="btnExportarDatos">📁 Exportar Datos</button>
                    </div>
                    
                    <div style="margin-top: 2rem; padding: 1rem; background: var(--light); border-radius: 8px;">
                        <h4 style="margin-bottom: 1rem;">Información</h4>
                        <p style="margin-bottom: 0.5rem;"><strong>📊 Generar Informe General:</strong> Crea un PDF con un resumen ejecutivo de todos los módulos.</p>
                        <p><strong>📁 Exportar Datos:</strong> Descarga todos tus datos en formato JSON para hacer backup o transferir a otro dispositivo.</p>
                    </div>
                </div>
            </div>
        `;
    }

    initDirectivoEvents() {
        document.getElementById('btnGenerarInforme').addEventListener('click', () => {
            pdfGenerator.generateFullReport();
            alert('Informe general generado correctamente');
        });
        
        document.getElementById('btnExportarDatos').addEventListener('click', () => {
            pdfGenerator.exportAllData();
            alert('Datos exportados correctamente. Guarda el archivo en un lugar seguro.');
        });
    }
}

// ============================================
// GENERADOR DE PDFs
// ============================================
class PDFGenerator {
    generateModulePDF(moduleName) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const data = storage.getData();
        
        // Configuración
        doc.setFont("helvetica");
        let yPos = 20;
        const lineHeight = 7;
        const margin = 15;
        const pageWidth = doc.internal.pageSize.width;
        const maxWidth = pageWidth - (2 * margin);
        
        // Título
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(`PrepaPRIO 2 - ${this.getModuleTitle(moduleName)}`, margin, yPos);
        yPos += lineHeight * 2;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, margin, yPos);
        yPos += lineHeight * 2;
        
        // Contenido según el módulo
        switch(moduleName) {
            case 'programacion':
                this.addProgramacionContent(doc, data, margin, yPos, lineHeight, maxWidth);
                break;
            case 'evidencias':
                this.addEvidenciasContent(doc, data, margin, yPos, lineHeight, maxWidth);
                break;
            case 'diversidad':
                this.addDiversidadContent(doc, data, margin, yPos, lineHeight, maxWidth);
                break;
            case 'evaluacion':
                this.addEvaluacionContent(doc, data, margin, yPos, lineHeight, maxWidth);
                break;
            case 'observacion':
                this.addObservacionContent(doc, data, margin, yPos, lineHeight, maxWidth);
                break;
            case 'otrosDatos':
                this.addOtrosDatosContent(doc, data, margin, yPos, lineHeight, maxWidth);
                break;
            default:
                doc.text('Módulo en desarrollo', margin, yPos);
        }
        
        // Guardar PDF
        doc.save(`PrepaPRIO2_${moduleName}_${new Date().getTime()}.pdf`);
    }
    
    getModuleTitle(moduleName) {
        const titles = {
            'programacion': 'Mi Programación',
            'evidencias': 'Evidencias de Aula',
            'diversidad': 'Atención a la Diversidad',
            'evaluacion': 'Evaluación',
            'observacion': 'Observación de Aula',
            'otrosDatos': 'Otros Datos Importantes'
        };
        return titles[moduleName] || moduleName;
    }
    
    addProgramacionContent(doc, data, margin, yPos, lineHeight, maxWidth) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text('Situaciones de Aprendizaje:', margin, yPos);
        yPos += lineHeight;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        if (data.programacion.situacionesAprendizaje.length === 0) {
            doc.text('No hay SdA registradas', margin, yPos);
        } else {
            data.programacion.situacionesAprendizaje.forEach((sda, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont("helvetica", "bold");
                doc.text(`${index + 1}. ${sda.temporizacion} - ${sda.curso}`, margin, yPos);
                yPos += lineHeight;
                doc.setFont("helvetica", "normal");
                const areas = [];
                if (sda.lengua) areas.push('Lengua');
                if (sda.matematicas) areas.push('Matemáticas');
                if (sda.ingles) areas.push('Inglés');
                if (sda.ef) areas.push('EF');
                if (sda.conocimiento) areas.push('Conocimiento');
                if (areas.length > 0) {
                    doc.text(`   Áreas: ${areas.join(', ')}`, margin, yPos);
                    yPos += lineHeight;
                }
                yPos += lineHeight * 0.5;
            });
        }
    }
    
    addEvidenciasContent(doc, data, margin, yPos, lineHeight, maxWidth) {
        // Buenas Prácticas
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text('Buenas Prácticas Metodológicas:', margin, yPos);
        yPos += lineHeight;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        if (data.evidencias.practicas.length === 0) {
            doc.text('No hay prácticas registradas', margin, yPos);
            yPos += lineHeight * 2;
        } else {
            data.evidencias.practicas.forEach((p, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont("helvetica", "bold");
                doc.text(`${index + 1}. ${p.area} - ${p.fecha}`, margin, yPos);
                yPos += lineHeight;
                doc.setFont("helvetica", "normal");
                const lines = doc.splitTextToSize(p.descripcion, maxWidth);
                lines.forEach(line => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += lineHeight * 0.5;
            });
        }
        
        // Seguimiento
        yPos += lineHeight;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text('Seguimiento de Programación:', margin, yPos);
        yPos += lineHeight;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        if (data.evidencias.seguimiento.length === 0) {
            doc.text('No hay registros de seguimiento', margin, yPos);
        } else {
            data.evidencias.seguimiento.forEach((s, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont("helvetica", "bold");
                doc.text(`${index + 1}. ${s.ud}`, margin, yPos);
                yPos += lineHeight;
                doc.setFont("helvetica", "normal");
                doc.text(`   Estado: ${s.estado} - Fecha: ${s.fecha}`, margin, yPos);
                yPos += lineHeight;
                if (s.observaciones) {
                    const lines = doc.splitTextToSize(`   ${s.observaciones}`, maxWidth);
                    lines.forEach(line => {
                        if (yPos > 270) {
                            doc.addPage();
                            yPos = 20;
                        }
                        doc.text(line, margin, yPos);
                        yPos += lineHeight;
                    });
                }
                yPos += lineHeight * 0.5;
            });
        }
    }
    
    addDiversidadContent(doc, data, margin, yPos, lineHeight, maxWidth) {
        doc.setFontSize(10);
        doc.text('Medidas Generales:', margin, yPos);
        yPos += lineHeight;
        data.diversidad.medidasGenerales.forEach(medida => {
            if (medida.checked) {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(`• ${medida.text}`, margin + 5, yPos);
                yPos += lineHeight;
            }
        });
        yPos += lineHeight;
        
        doc.text(`NEE/ANEAE: ${data.diversidad.neeAneae.length} alumnos`, margin, yPos);
        yPos += lineHeight;
        doc.text(`Refuerzo: ${data.diversidad.refuerzo.length} alumnos`, margin, yPos);
        yPos += lineHeight;
        doc.text(`PROA: ${data.diversidad.proa.alumnos.length} alumnos`, margin, yPos);
    }
    
    addEvaluacionContent(doc, data, margin, yPos, lineHeight, maxWidth) {
        doc.setFontSize(10);
        doc.text('Checklist del Proceso:', margin, yPos);
        yPos += lineHeight;
        data.evaluacion.procesoChecklist.forEach(item => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`${item.checked ? '☑' : '☐'} ${item.text}`, margin + 5, yPos);
            yPos += lineHeight;
        });
    }
    
    addObservacionContent(doc, data, margin, yPos, lineHeight, maxWidth) {
        if (data.observacion.registros.length === 0) {
            doc.setFontSize(10);
            doc.text('No hay observaciones registradas', margin, yPos);
        } else {
            data.observacion.registros.forEach((registro, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.text(`${index + 1}. ${registro.titulo}`, margin, yPos);
                yPos += lineHeight;
                doc.setFont("helvetica", "normal");
                const lines = doc.splitTextToSize(registro.observacion, maxWidth);
                lines.forEach(line => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.text(line, margin, yPos);
                    yPos += lineHeight;
                });
                yPos += lineHeight;
            });
        }
    }
    
    addOtrosDatosContent(doc, data, margin, yPos, lineHeight, maxWidth) {
        doc.setFontSize(10);
        if (data.otrosDatos.descripcionClase) {
            doc.setFont("helvetica", "bold");
            doc.text('Descripción de la Clase:', margin, yPos);
            yPos += lineHeight;
            doc.setFont("helvetica", "normal");
            const lines = doc.splitTextToSize(data.otrosDatos.descripcionClase, maxWidth);
            lines.forEach(line => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(line, margin, yPos);
                yPos += lineHeight;
            });
            yPos += lineHeight;
        }
        
        doc.text(`Casos de Acoso: ${data.otrosDatos.casosAcoso.length}`, margin, yPos);
        yPos += lineHeight;
        doc.text(`Protocolos Suicidas: ${data.otrosDatos.protocolosSuicidas.length}`, margin, yPos);
        yPos += lineHeight;
        doc.text(`Protocolos Absentismo: ${data.otrosDatos.protocolosAbsentismo.length}`, margin, yPos);
    }
    
    exportAllData() {
        const data = storage.getData();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `PrepaPRIO2_backup_${new Date().getTime()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
    
    generateFullReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const data = storage.getData();
        
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('PrepaPRIO 2 - Informe Completo', 15, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`CEIP Capitulaciones`, 15, 30);
        doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 15, 36);
        
        let yPos = 50;
        doc.setFontSize(12);
        doc.text(`Situaciones de Aprendizaje: ${data.programacion.situacionesAprendizaje.length}`, 15, yPos);
        yPos += 10;
        doc.text(`Evidencias: ${data.evidencias.practicas.length + data.evidencias.seguimiento.length}`, 15, yPos);
        yPos += 10;
        doc.text(`Alumnos NEE/ANEAE: ${data.diversidad.neeAneae.length}`, 15, yPos);
        yPos += 10;
        doc.text(`Observaciones: ${data.observacion.registros.length}`, 15, yPos);
        
        doc.save(`PrepaPRIO2_informe_completo_${new Date().getTime()}.pdf`);
    }
}

const pdfGenerator = new PDFGenerator();

// ============================================
// INICIALIZACIÓN
// ============================================
let nav;
let moduleManager;

document.addEventListener('DOMContentLoaded', () => {
    nav = new NavigationManager();
    moduleManager = new ModuleManager();
    nav.switchModule('dashboard');
    
    // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
});
