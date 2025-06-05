<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import axios from 'axios';
import {ref, watch} from 'vue';
import {FilterMatchMode, FilterOperator} from '@primevue/core/api';

interface Product {
    id: number;
    sku: number;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    total: number;
}

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        sku: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    };
};

initFilters();

const props = defineProps<{
    products: Product[];
}>();

const products = ref<Product[]>([...props.products]);

watch(() => props.products, (newProducts) => {
    products.value = [...newProducts];
});

const loading = ref(false);

const confirm = useConfirm();
const toast = useToast();

const confirmDelete = (id: number) => {
    confirm.require({
        message: '¿Quieres eliminar este producto?',
        header: 'Atención',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: async () => {
            try {
                await axios.delete(`/products/${id}`, {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'Accept': 'application/json',
                    }
                });

                products.value = products.value.filter(product => product.id !== id);

                toast.add({severity: 'success', summary: 'Confirmado', detail: 'Producto eliminado', life: 3000});
            } catch (error: any) {
                const message = error.response?.data?.message || error.message || 'Error al eliminar el producto';
                toast.add({severity: 'error', summary: 'Error', detail: message, life: 3000});
            }
        },
        reject: () => {
            toast.add({severity: 'info', summary: 'Cancelado', detail: 'Se canceló la acción.', life: 3000});
        }
    });
};

const clearFilter = () => {
    initFilters();
};

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(value);
}
</script>

<template>
    <Toast/>
    <ConfirmDialog/>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <DataTable
                        v-model:filters="filters"
                        :globalFilterFields="['sku', 'name', 'price']"
                        :loading="loading"
                        :rows="10"
                        :rowsPerPageOptions="[10, 20, 50]"
                        :value="products"
                        currentPageReportTemplate="{first} al {last} de {totalRecords}"
                        filterDisplay="menu"
                        paginator
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        removableSort
                        scrollHeight="700px"
                        scrollable
                        stripedRows
                    >
                        <template #header>
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <span class="text-xl font-bold">Lista de productos</span>
                                    <Button
                                        class="p-button-sm p-button-secondary"
                                        icon="pi pi-filter-slash"
                                        label="Limpiar filtros"
                                        @click="clearFilter()"
                                    />
                                </div>

                                <Button
                                    class="p-button-sm p-button-success"
                                    icon="pi pi-plus"
                                    label="Crear producto"
                                />
                            </div>

                        </template>

                        <template #empty>No se encontraron productos.</template>
                        <template #loading>Cargando... Por favor espere.</template>

                        <Column field="sku" header="SKU" sortable>
                            <template #body="{ data }">
                                {{ data.sku }}
                            </template>
                            <template #filter="{ filterModel }">
                                <InputText v-model="filterModel.value" placeholder="Buscar por SKU" type="text"/>
                            </template>
                        </Column>
                        <Column field="name" header="Nombre" sortable>
                            <template #body="{ data }">
                                {{ data.name }}
                            </template>
                            <template #filter="{ filterModel }">
                                <InputText v-model="filterModel.value" placeholder="Buscar por Nombre" type="text"/>
                            </template>
                        </Column>
                        <Column field="quantity" header="Cantidad" sortable/>
                        <Column field="price" header="Precio" dataType="numeric" sortable>
                            <template #body="{ data }">
                                {{ formatCurrency(data.price) }}
                            </template>

                            <template #filter="{ filterModel }">
                                <InputNumber v-model="filterModel.value" mode="currency" currency="COP" locale="es-CO" />
                            </template>
                        </Column>

                        <Column field="total" header="Total" sortable>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.total) }}
                            </template>
                        </Column>
                        <Column field="actions">
                            <template #header>
                                <span class="text-center">Acciones</span>
                            </template>
                            <template #body="slotProps">
                                <div class="flex justify-center items-center gap-2">
                                    <Button aria-label="Ver" icon="pi pi-eye" raised rounded severity="secondary"
                                            size="small" variant="text"/>
                                    <Button aria-label="Editar" icon="pi pi-pencil" raised rounded severity="info"
                                            size="small" variant="text"/>
                                    <Button aria-label="Eliminar"
                                            icon="pi pi-times"
                                            raised
                                            rounded
                                            severity="danger"
                                            size="small"
                                            variant="text"
                                            @click="confirmDelete(slotProps.data.id)"
                                    />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
