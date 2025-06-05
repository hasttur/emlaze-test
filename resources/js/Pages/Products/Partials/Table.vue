<script setup lang="ts">

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import axios from 'axios';
import {ref, watch} from 'vue';

interface Product {
    id: number;
    sku: number;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    total: number;
}

const props = defineProps<{
    products: Product[];
}>();

const products = ref<Product[]>([...props.products]);

watch(() => props.products, (newProducts) => {
    products.value = [...newProducts];
});

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
            toast.add({severity: 'error', summary: 'Cancelado', detail: 'Se canceló la acción.', life: 3000});
        }
    });
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
    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
                class="overflow-hidden bg-white shadow-sm sm:rounded-lg"
            >
                <div class="p-6 text-gray-900">
                    <DataTable :value="products"
                               paginator
                               removableSort
                               stripedRows
                               :rows="10"
                               :rowsPerPageOptions="[10, 20, 50]"
                               scrollable scrollHeight="700px"
                    >
                        <template #header>
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-xl font-bold">Lista de productos</span>

                                <Button
                                    label="Crear producto"
                                    icon="pi pi-plus"
                                    class="p-button-sm p-button-success"
                                />
                            </div>
                        </template>
                        <Column sortable field="sku" header="SKU"/>
                        <Column sortable field="name" header="Nombre"/>
                        <Column sortable field="quantity" header="Cantidad"/>
                        <Column sortable
                                field="price"
                                header="Precio"
                        >
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column sortable
                                field="total"
                                header="Total"
                        >
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
                                    <Button raised rounded icon="pi pi-eye" severity="secondary" variant="text"
                                            size="small" aria-label="Ver"/>
                                    <Button raised rounded icon="pi pi-pencil" severity="info" variant="text"
                                            size="small" aria-label="Editar"/>
                                    <Button raised rounded icon="pi pi-times" severity="danger" variant="text"
                                            size="small" aria-label="Eliminar"
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

    <ConfirmDialog></ConfirmDialog>
</template>
