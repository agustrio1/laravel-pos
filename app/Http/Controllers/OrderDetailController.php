<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderDetailController extends Controller
{
    public function index()
    {
        $orderDetails = OrderDetail::with(['order', 'product'])->get();
        return Inertia::render('OrderDetails/Index', [
            'orderDetails' => $orderDetails
        ]);
    }

    public function create()
    {
        $orders = Order::all();
        $products = Product::all();
        return Inertia::render('OrderDetails/Create', [
            'orders' => $orders,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        OrderDetail::create($request->all());
        return redirect()->route('order-details.index');
    }

    public function edit(OrderDetail $orderDetail)
    {
        $orders = Order::all();
        $products = Product::all();
        return Inertia::render('OrderDetails/Edit', [
            'orderDetail' => $orderDetail,
            'orders' => $orders,
            'products' => $products
        ]);
    }

    public function update(Request $request, OrderDetail $orderDetail)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $orderDetail->update($request->all());
        return redirect()->route('order-details.index');
    }

    public function destroy(OrderDetail $orderDetail)
    {
        $orderDetail->delete();
        return redirect()->route('order-details.index');
    }
}

