<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $slug = Str::slug($request->name);

        $category = Category::create([
            'name' => $request->name,
            'slug' => $slug,
        ]);

        return redirect()->route('categories.index');
    }

    public function update(Request $request, Category $category)
{
    Log::info('Update method called for category ID: ' . $category->id);

    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    $category->update([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
    ]);

    Log::info('Category updated successfully for ID: ' . $category->id);

    return redirect()->route('categories.index');
}

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index');
    }
}
