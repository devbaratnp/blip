<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->prefix('v1')->group(function (): void {
    Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'admin']);
    Route::get('/auth/me', [AuthController::class, 'me'])->middleware(['auth:sanctum', 'admin']);
    Route::middleware(['auth:sanctum', 'admin'])->group(function (): void {
        Route::get('/catalog/options', [ProductController::class, 'options']);
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::get('/products/{product}', [ProductController::class, 'show']);
        Route::patch('/products/{product}', [ProductController::class, 'update']);
        Route::post('/products/{product}/publish', [ProductController::class, 'publish']);
        Route::post('/products/{product}/archive', [ProductController::class, 'archive']);
    });
});
