
<?php 

use Noks\Env;

?>

<div class="admin-content scrollable-content" id="app">
<!-- admin-content-wrapper  В  /user/pay_invoices -->

<div data-is="app-common" class="app-common ">
    <div data-is="page-progress-loader" loading="done" class="page-progress-loader state-done ">
      <div class="page-progress-bar" style="width: 100%"></div>
    </div>
    <div data-is="settings-side-menu" class="admin-side-menu settings-side-menu ">
      <div data-is="side-menu" class="side-menu  ">
        <div class="menu-header">
          <div class="flexbe-title text-title"> <?=$panel['name']?> </div>
        </div>
        <div class="item-list-outer">

            <?php foreach($panel['menu'] as $panel_chapter){ ?>
                <div class="item-list-outer">
                    <div class="list-title"><?=$panel_chapter['name']?></div>
                    <div class="item-list">

                        <?php foreach($panel_chapter['links'] as $panel_link){ ?>
                            <?php
                                $isActive = false;
                                $search = Env::$_SPLIT[1].(Env::$_SPLIT[2]?'/'.Env::$_SPLIT[2]:'').(Env::$_SPLIT[3]?'/'.Env::$_SPLIT[3]:'').'/';
                                if(strpos($panel_link['href'],$search)!==false)
                                    $isActive = true;
                            ?>
                            <a class="menu-item <?=$isActive?'active':''?>" href="<?=$panel_link['href']?>">
                                <div class="menu-item__inner">
                                    <svg class="flexbe-icon size-16">
                                        <use xlink:href="/<?=VERSION?>/admin/resources/images/side_menu.svg?1c7acb5f#<?=$panel_link['icon']?>"></use>
                                    </svg> 
                                    <span class="flexbe-text"><?=$panel_link['name']?></span> 
                                </div>
                            </a>
                        <?php } ?>

                    </div>
                </div>
            <?php } ?>

        </div>  
      </div>
    </div>

