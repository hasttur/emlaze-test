import '../css/app.css';
import './bootstrap';

import {createInertiaApp} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createApp, h} from 'vue';
import {ZiggyVue} from '../../vendor/tightenco/ziggy';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({el, App, props, plugin}) {
        return createApp({render: () => h(App, props)})
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: Aura,
                    options: {
                        darkModeSelector: 'none',
                    }
                },
                locale: {
                    startsWith: "Empieza con",
                    contains: "Contiene",
                    notContains: "No contiene",
                    endsWith: "Termina con",
                    equals: "Igual a",
                    notEquals: "Diferente de",
                    noFilter: "Sin filtro",
                    lt: "Menor que",
                    lte: "Menor o igual que",
                    gt: "Mayor que",
                    gte: "Mayor o igual que",
                    dateIs: "Fecha es",
                    dateIsNot: "Fecha no es",
                    dateBefore: "Fecha es anterior a",
                    dateAfter: "Fecha es posterior a",
                    clear: "Limpiar",
                    apply: "Aplicar",
                    matchAll: "Coincidir con todos",
                    matchAny: "Coincidir con cualquiera",
                    addRule: "Agregar regla",
                    removeRule: "Eliminar regla",
                    accept: "Aceptar",
                    reject: "Rechazar",
                    choose: "Seleccionar",
                    upload: "Subir",
                    cancel: "Cancelar",
                    completed: "Completado",
                    pending: "Pendiente",
                    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                    chooseYear: "Seleccionar año",
                    chooseMonth: "Seleccionar mes",
                    chooseDate: "Seleccionar fecha",
                    prevDecade: "Década anterior",
                    nextDecade: "Década siguiente",
                    prevYear: "Año anterior",
                    nextYear: "Año siguiente",
                    prevMonth: "Mes anterior",
                    nextMonth: "Mes siguiente",
                    prevHour: "Hora anterior",
                    nextHour: "Hora siguiente",
                    prevMinute: "Minuto anterior",
                    nextMinute: "Minuto siguiente",
                    prevSecond: "Segundo anterior",
                    nextSecond: "Segundo siguiente",
                    am: "am",
                    pm: "pm",
                    today: "Hoy",
                    weekHeader: "Sm",
                    firstDayOfWeek: 0,
                    showMonthAfterYear: false,
                    dateFormat: "dd/mm/yy",
                    weak: "Débil",
                    medium: "Media",
                    strong: "Fuerte",
                    passwordPrompt: "Ingrese una contraseña",
                    searchMessage: "{0} resultados disponibles",
                    selectionMessage: "{0} elementos seleccionados",
                    emptySelectionMessage: "No hay elementos seleccionados",
                    emptySearchMessage: "No se encontraron resultados",
                    fileChosenMessage: "{0} archivo(s) seleccionado(s)",
                    noFileChosenMessage: "Ningún archivo seleccionado",
                    emptyMessage: "No hay opciones disponibles",
                    "aria.trueLabel": "Verdadero",
                    "aria.falseLabel": "Falso",
                    "aria.nullLabel": "No seleccionado",
                    "aria.star": "1 estrella",
                    "aria.stars": "{star} estrellas",
                    "aria.selectAll": "Seleccionar todos los elementos",
                    "aria.unselectAll": "Deseleccionar todos los elementos",
                    "aria.close": "Cerrar",
                    "aria.previous": "Anterior",
                    "aria.next": "Siguiente",
                    "aria.navigation": "Navegación",
                    "aria.scrollTop": "Ir arriba",
                    "aria.moveTop": "Mover arriba",
                    "aria.moveUp": "Mover hacia arriba",
                    "aria.moveDown": "Mover hacia abajo",
                    "aria.moveBottom": "Mover abajo",
                    "aria.moveToTarget": "Mover al destino",
                    "aria.moveToSource": "Mover al origen",
                    "aria.moveAllToTarget": "Mover todos al destino",
                    "aria.moveAllToSource": "Mover todos al origen",
                    "aria.pageLabel": "Página {page}",
                    "aria.firstPageLabel": "Primera página",
                    "aria.lastPageLabel": "Última página",
                    "aria.nextPageLabel": "Página siguiente",
                    "aria.prevPageLabel": "Página anterior",
                    "aria.rowsPerPageLabel": "Filas por página",
                    "aria.jumpToPageDropdownLabel": "Ir a la página (desplegable)",
                    "aria.jumpToPageInputLabel": "Ir a la página (input)",
                    "aria.selectRow": "Fila seleccionada",
                    "aria.unselectRow": "Fila no seleccionada",
                    "aria.expandRow": "Fila expandida",
                    "aria.collapseRow": "Fila colapsada",
                    "aria.showFilterMenu": "Mostrar menú de filtro",
                    "aria.hideFilterMenu": "Ocultar menú de filtro",
                    "aria.filterOperator": "Operador de filtro",
                    "aria.filterConstraint": "Restricción de filtro",
                    "aria.editRow": "Editar fila",
                    "aria.saveEdit": "Guardar edición",
                    "aria.cancelEdit": "Cancelar edición",
                    "aria.listView": "Vista de lista",
                    "aria.gridView": "Vista de cuadrícula",
                    "aria.slide": "Deslizar",
                    "aria.slideNumber": "Deslizar {slideNumber}",
                    "aria.zoomImage": "Ampliar imagen",
                    "aria.zoomIn": "Acercar",
                    "aria.zoomOut": "Alejar",
                    "aria.rotateRight": "Rotar a la derecha",
                    "aria.rotateLeft": "Rotar a la izquierda"
                }
            })
            .use(ConfirmationService)
            .use(ToastService)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
