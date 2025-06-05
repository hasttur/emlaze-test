<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Listar todos los productos.
     */
    public function index(): Response
    {
        $products = Product::latest()->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Mostrar formulario de creación.
     */
    public function create(): Response
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Guardar un producto nuevo.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['total'] = $data['quantity'] * $data['price'];

        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Ver detalles de un producto (opcional).
     */
    public function show(Product $product): Response
    {
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Mostrar formulario de edición.
     */
    public function edit(Product $product): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Actualizar un producto existente.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $data['total'] = $data['quantity'] * $data['price'];

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Eliminar un producto.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Producto eliminado correctamente.');
    }
}
