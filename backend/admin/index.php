<?php

// CONTROLLER
$notNum = ($_SPLIT[2] AND !is_int((int)$_SPLIT[2]));
$controller = VERSION . '/admin/controller/' . ($_SPLIT[1]??'') . ($notNum?'/'.$_SPLIT[2]:'') . '.php';
if(file_exists($controller)){
    include $controller;
    exit();
}


// HEAD + PANEL
include VERSION.'/admin/components/head.php';


// VIEW
$view = VERSION . '/admin/view/' . ($_SPLIT[1]??'') . '.php';
if(file_exists($view))
    include $view;
else
    echo '<div class="admin-content-wrapper scrollable-content" id="app">
        <div data-is="admin-lead-list" class="admin-content admin-lead-list container fluid fade-in-animation ">
            <header>
                <div class="flexbe-title text-title"> Страница не найдена </div>
            </header>
        </div>
    </div>';


// FOOTER
include VERSION.'/admin/components/footer.php';