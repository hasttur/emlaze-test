<script lang="ts" setup>
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import {computed, PropType, ref, watch} from 'vue'
import axios from "axios";

interface Product {
    sku: string
    name: string
    description: string
    quantity: number
    price: number
}

const props = defineProps({
    visible: Boolean,
    title: String,
    action: String as PropType<'create' | 'edit' | 'show'>,
    product: {
        type: Object as PropType<Product>,
        default: () => ({})
    }
})

const errors = ref<Record<string, string[]>>({});

const emit = defineEmits(['update:visible', 'close'])

const localProduct = ref({...props.product});

watch(() => props.product, (newVal) => {
    localProduct.value = {...newVal}
}, {immediate: true})

watch(
    () => [localProduct.value.price, localProduct.value.quantity],
    ([price, quantity]) => {
        const safePrice = price ?? 0;
        const safeQuantity = quantity ?? 0;
        localProduct.value.total = safePrice * safeQuantity;
    }
);

const disabled = computed(() => props.action === 'show')

const loading = ref(false);

function hide() {
    errors.value = {};
    emit('update:visible', false)
    emit('close')
}

async function saveProduct() {
    loading.value = true;
    errors.value = {};

    try {
        if (props.action === 'create') {
            await axios.post('/products', localProduct.value);

        } else if (props.action === 'edit' && localProduct.value.id) {
            await axios.put(`/products/${localProduct.value.id}`, localProduct.value);
        }

        hide();
    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            console.error("Error al guardar el producto:", error);
            alert("Ocurrió un error al guardar el producto.");
        }
    } finally {
        loading.value = false;
    }
}

</script>

<template>
    <Dialog :closable="false" :header="title" :visible="visible" modal>
        <div class="flex items-center gap-4 m-4">
            <div>
                <FloatLabel class="flex-1" variant="on">
                    <InputText id="sku" v-model="localProduct.sku" :disabled="props.action == 'edit' || disabled"
                               :invalid="!!errors.sku"
                               class="w-full"/>
                    <label for="sku">SKU</label>
                </FloatLabel>
                <small v-if="errors.sku" class="px-3 text-red-500">{{ errors.sku[0] }}</small>
            </div>
            <div class="flex-1">
                <FloatLabel class="flex-1" variant="on">
                    <InputText id="name" v-model="localProduct.name" :disabled="disabled" :invalid="!!errors.name"
                               class="w-full"/>
                    <label for="name">Nombre</label>
                </FloatLabel>
                <small v-if="errors.name" class="px-3 text-red-500">{{ errors.name[0] }}</small>
            </div>
        </div>

        <div class="flex items-center gap-4 m-4">
            <FloatLabel variant="on">
                <Textarea id="description" v-model="localProduct.description" :disabled="disabled" class="w-full"
                          cols="46" rows="5" style="resize: none"/>
                <label for="description">Descripcion</label>
            </FloatLabel>
        </div>

        <div class="flex items-center gap-4 m-4">
            <div>
                <FloatLabel class="flex-1" variant="on">
                    <InputNumber id="quantity" v-model="localProduct.quantity" :disabled="disabled"
                                 :invalid="!!errors.quantity"
                                 :maxFractionDigits="2" :minFractionDigits="0"
                                 class="w-full" inputId="quantity" locale="es-CO"/>
                    <label for="quantity">Cantidad</label>
                </FloatLabel>
                <small v-if="errors.quantity" class="px-3 text-red-500">{{ errors.quantity[0] }}</small>
            </div>
            <div>
                <FloatLabel class="flex-1" variant="on">
                    <InputNumber id="price" v-model="localProduct.price" :disabled="disabled" :invalid="!!errors.price"
                                 :maxFractionDigits="2" :minFractionDigits="0"
                                 class="w-full" currency="COP" inputId="price" locale="es-CO" mode="currency"/>
                    <label for="price">Precio</label>
                </FloatLabel>
                <small v-if="errors.price" class="px-3 text-red-500">{{ errors.price[0] }}</small>
            </div>
        </div>

        <div class="flex items-center gap-4 m-4">
            <FloatLabel class="flex-1" variant="on">
                <InputNumber id="total" v-model="localProduct.total" :maxFractionDigits="2" :minFractionDigits="0"
                             class="w-full"
                             currency="COP" disabled inputId="total" locale="es-CO" mode="currency"/>
                <label for="total">Total</label>
            </FloatLabel>
        </div>

        <div class="flex justify-end gap-2">
            <Button label="Cancelar" raised severity="secondary" @click="hide"/>
            <Button :loading="loading" label="Guardar" raised severity="success" @click="saveProduct" v-if="action != 'show'"/>
        </div>
    </Dialog>
</template>
