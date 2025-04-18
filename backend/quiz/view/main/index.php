<!-- menu start -->
<?php include 'component/menu.php'; ?>
<!-- menu end -->

<?php if(!$quizs){ ?>
	<style>
		.quiz-first-add {
			display: block;
			text-decoration: none;
			color: #36c;
			fill: #8fb4ff;
			text-align: center;
			padding: 1.5em 2em 1.5em 2em;
			box-shadow: .1em .2em .3em rgba(0,0,0,.2);
			border-radius: .5em;
			background-color: #EBF0FF;
			margin: 8em auto;
			width: 12em;
			font-size: 1.5em;
			/* background-image: url('<?=MAIN_URL . '/sites/resource/img/plus.png'?>');
			background-size: 45%;
			background-position: center 1.5em;
			background-repeat: no-repeat; */
			transition: all .3s;
		}
		.quiz-first-add svg {
			padding-bottom: 1.5em;
			width: 60%;
			display: block;
			margin: 0 auto;
		}
		.quiz-first-add:hover {
			background-color: #d9e1fb;
		}
	</style>
	<a href="/quiz/add" class="quiz-first-add">
		<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 401.994 401.994" style="enable-background:new 0 0 401.994 401.994;" xml:space="preserve">
			<path fill="currentCollor" d="M394,154.175c-5.331-5.33-11.806-7.994-19.417-7.994H255.811V27.406c0-7.611-2.666-14.084-7.994-19.414 C242.488,2.666,236.02,0,228.398,0h-54.812c-7.612,0-14.084,2.663-19.414,7.993c-5.33,5.33-7.994,11.803-7.994,19.414v118.775 H27.407c-7.611,0-14.084,2.664-19.414,7.994S0,165.973,0,173.589v54.819c0,7.618,2.662,14.086,7.992,19.411 c5.33,5.332,11.803,7.994,19.414,7.994h118.771V374.59c0,7.611,2.664,14.089,7.994,19.417c5.33,5.325,11.802,7.987,19.414,7.987 h54.816c7.617,0,14.086-2.662,19.417-7.987c5.332-5.331,7.994-11.806,7.994-19.417V255.813h118.77 c7.618,0,14.089-2.662,19.417-7.994c5.329-5.325,7.994-11.793,7.994-19.411v-54.819C401.991,165.973,399.332,159.502,394,154.175z"
			/>
		</svg>
		Создать первый квиз
	</a>
<?php } ?>

<div class="wrapper wrapper-main">
	<div class="wrapper-sites-items">
		<?php foreach($quizs as $quiz): ?>
			<?php $count_lead[ $quiz['quiz_id'] ] = $count_lead[ $quiz['quiz_id'] ] ?? 0; ?>
		<div class="site-block">
			<div class="preview-sub-block" style="background-image: linear-gradient(transparent, black), url('<?=MAIN_URL . '/sites/resource/img/imgfish.jpeg'?>');">
				<div class="stat-block">
					<div class="type-card">Квиз</div>
					<div class="flex-block">
						<div><?=$quiz['quiz_views']?>
							<span>просмотров</span>
						</div>
						<div><?=calcCV($quiz['quiz_views'], $count_lead[ $quiz['quiz_id'] ])?>%
							<span>конверсия, CV</span>
						</div>
						<div><?=$count_lead[ $quiz['quiz_id'] ]?>
							<span>заявки</span>
						</div>
					</div>
				</div>
			</div>
			<div class="info-sub-block">
				<div class="up">
					<div class="hashtag-id">Квиз #<?=$quiz['quiz_id']?></div>
					<a href="/quiz/" class="title"><?=($quiz['quiz_title'] == '' ? 'Без названия' : $quiz['quiz_title'])?></a>
				</div>

				<div class="bottom">
					
					<div class="wrapper-buttons">
						<a href="/quiz/edit/<?=$quiz['quiz_id']?>" class="setting">Изменить</a>
						<a target="_blank" href="/quiz/preview/<?=$quiz['quiz_id']?>" class="pages">Открыть</a>
					</div>

				</div>
				
			</div>
		</div>
		<?php endforeach; ?>

	</div>
</div>