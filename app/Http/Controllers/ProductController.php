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
     * Guardar un producto nuevo.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['total'] = $data['quantity'] * $data['price'];

        Product::create($data);

        return response()->json(['message' => 'Producto creado correctamente.']);
    }

    /**
     * Actualizar un producto existente.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $data['total'] = $data['quantity'] * $data['price'];

        $product->update($data);

        return response()->json(['message' => 'Producto actualizado correctamente.']);
    }

    /**
     * Eliminar un producto.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Producto eliminado correctamente.']);
    }
}
