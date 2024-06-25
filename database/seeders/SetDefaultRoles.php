<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class SetDefaultRoles extends Seeder
{
    public function run()
    {
        User::whereNull('role')->update(['role' => 'user']);
    }
}

