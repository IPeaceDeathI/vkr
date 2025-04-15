<?php

use Noks\Env;
use Noks\IPDO;

Env::$params['dev'] = true;

Env::$rb_login = "noks";
Env::$rb_is_test = true;
Env::$rb_pass_send = 'CFn8BmI51dMA4S9xuFho';
Env::$rb_pass_result = 'uYnvvB44p4fy52AOZVPE';

IPDO::$login = 'root';
IPDO::$name = 'noks_local'; 
IPDO::$pass = '';

Env::$params['mail']['login'] = '';
Env::$params['mail']['password'] = '';
Env::$params['mail']['host'] = '';
Env::$params['mail']['name'] = '';
Env::$params['mail']['port'] = 0;

Env::$params['yandex_metrika_id'] = 1234567;

Env::$params['Yandex.Metrika'] = "";

ini_set('error_reporting', E_ALL); // E_ALL, E_ERROR