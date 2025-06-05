<script setup lang="ts">

import {Head} from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ProductTable from "./Partials/Table.vue";

const props = defineProps<{
    products: any[];
}>();
</script>

<template>
    <Head title="Lista de productos"/>

    <AuthenticatedLayout>
        <ProductTable :products="products"/>
    </AuthenticatedLayout>
</template>
