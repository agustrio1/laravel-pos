<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role; 

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all(); 
        return Inertia::render('Users/Create', [
            'roles' => $roles  
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Tambahkan logika untuk assign role ke user (sesuaikan dengan kebutuhan Anda)
        // Contoh: assign role "writer" secara default
        $user->assignRole('writer');

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        $roles = Role::all(); 
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles  
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Tambahkan logika untuk update role user (sesuaikan dengan kebutuhan Anda)

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}

