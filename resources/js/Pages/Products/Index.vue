<script lang="ts" setup>

import {Head} from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ProductTable from "./Partials/Table.vue";
import ProductForm from "./Partials/Form.vue";
import {ref} from "vue";

const props = defineProps<{
    products: any[];
}>();

const showModal = ref(false)
const title = ref('');
const action = ref('');
const product = ref({});

function createProduct() {
    showModal.value = true;
    title.value = "Crear producto";
    action.value = "create";
    product.value = {};
}

function editProduct(editableProduct: any) {
    showModal.value = true;
    title.value = "Editar producto";
    action.value = "edit";
    product.value = {...editableProduct};
}

function showProduct(editableProduct: any) {
    showModal.value = true;
    title.value = "Ver producto";
    action.value = "show";
    product.value = {...editableProduct};
}

function closeModal() {
    showModal.value = false
}
</script>

<template>
    <Head title="Lista de productos"/>

    <AuthenticatedLayout>
        <ProductTable :products="products" @create-form="createProduct" @edit-form="editProduct"
                      @show-form="showProduct"/>

        <ProductForm :action="action" :product="product" :title="title" :visible="showModal" @close="closeModal"/>
    </AuthenticatedLayout>
</template>
