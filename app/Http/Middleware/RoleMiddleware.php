<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    // public function handle(Request $request, Closure $next, ...$roles)
    // {
    //     if (Auth::check() && Auth::user()->hasRole($roles[0])) { 
    //         return $next($request);
    //     }

    //     abort(403, 'Unauthorized action.');
    // }
}
