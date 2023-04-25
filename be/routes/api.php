<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\LoginController;

Route::post('login', [LoginController::class, 'login']);

Route::get('users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('users/{id}', [UserController::class, 'show']);

