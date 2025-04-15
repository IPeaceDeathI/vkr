<?php

	if(!$settings['count_on_page']) $settings['count_on_page'] = 20;
	if(!$settings['page_current']) $settings['page_current'] = intval($_GET['page']);
	if(!$settings['page_current']) $settings['page_current'] = 1;

	$settings['page_count'] = floor($settings['count_mats']/$settings['count_on_page'])+1;
	// Выводим страницы
	// if($settings['page_current']<7){ $i=0;
	// 	while($i<$settings['page_count']){ $i++;
	// 		if($settings['pages_list']!='') $settings['pages_list'] .= ', ';
	// 		$settings['pages_list'] .= $i;
	// 	};
	// }
	$settings['pages_list'] = '['.$settings['page_current'].']';
	if($settings['page_current']-1>0) $settings['pages_list'] = ($settings['page_current']-1).', '.$settings['pages_list'];
	if($settings['page_current']+1<=$settings['page_count']) $settings['pages_list'] = $settings['pages_list'].', '.($settings['page_current']+1);
	//
	if($settings['page_current']>=4){
		$settings['pages_list'] = '..., '.$settings['pages_list'];
	}
	if($settings['page_current']>=3){
		$settings['pages_list'] = '1, '.$settings['pages_list'];
	}
	if($settings['page_count']-$settings['page_current']>=3){
		$settings['pages_list'] = $settings['pages_list'].', ...';
	}
	if($settings['page_count']-$settings['page_current']>=2){
		$settings['pages_list'] = $settings['pages_list'].', '.($settings['page_count']);
	}
	// render pages
	echo '<div class="pages-box">';
		echo '<div class="pages-count">Найдено: '.$settings['count_mats'].', на странице: '.$settings['count_on_page'].'</div>';
		
		// if($settings['count_mats'] AND $settings['count_mats']>$settings['count_on_page']){
			$pages = explode(', ',$settings['pages_list']);
			foreach($pages as $page){
				$isOn = strpos($page,'[')!==false ? 'on' : '';
				$page = preg_replace('/[\[\]]/','',$page);
				if($page=='...')
					echo '<span class="page">'.$page.'</span>';
				else {
					// echo '<a '.(!$isOn?'href="?'.($_GET['s']?'s='.$_GET['s'].'&':'').'page='.$page.'" ':'').' class="page '.$isOn.'">'.$page.'</a>';
					$server_url_string = preg_replace('/page=[0-9]+&/i','',$_SERVER['REQUEST_URI']);
					echo '<a '.(!$isOn? 'href="?'.($_GET['s']?'s='.$_GET['s'].'&':'').'page='.$page.'&'.(explode('?',$server_url_string)[1]).'" ' :'').' class="page '.$isOn.'">'.$page.'</a>';
				}
			}
	echo '</div>';
// }

// echo '<pre>';
// print_r($settings);
// echo '</pre>';
