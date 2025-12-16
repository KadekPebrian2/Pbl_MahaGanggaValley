<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth; 

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        
        // 1. Cek apakah user SUDAH Login? (Auth::check())
        // 2. Cek apakah jabatannya ADALAH 'admin'? (Auth::user()->role === 'admin')
        
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            // Jika TIDAK memenuhi syarat (Bukan Admin), tendang ke Home
            return redirect('/'); 
        }

        // Jika AMAN (Dia Admin), silakan lanjut masuk
        return $next($request);
    }
}