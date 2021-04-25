
$(function(){
	var articles = createArticles();
	articles.init();
	articles.getPagesNum(function (pagesNum) {
		console.log(pagesNum);
	});
	articles.getArticles(0, function (article) {
		console.log(article);
	});
});

function createArticles() {
	var articles = [];
	var pagesNum = 0;
	var good = false;

	var getData = function (preStatus, index) {
		if (index < pagesNum && (preStatus == 'success' || preStatus == 'start')) {
			$.get('dataset/articles/' + index, function (data) {
				articles[index] = data;
				getData('success', index + 1);
			}, 'json')
			.fail(function () {
				console.log('getData fail.')
				
				getData('success', index + 1);
			});
		}
	};

	var waitGood = function (afterGood) {
		console.log('waitGood');
		var timer = 0;

		if (!good && timer < 120) {
			setTimeout(function () {
				++timer;
				waitGood(afterGood);
			}, 1000);
		} else if (good) {
			afterGood();
		}
	};

	return {
		init : function () {
			$.get('dataset/pagesNum', function (data) {
				pagesNum = data.pagesNum;
				getData('start', 0);
				good = true;
			}, 'json')
			.fail(function () {
				console.log('get pagesNum fail.')
				good = false;
			});
		},
		getPagesNum : function (callback) {
			waitGood(function () {
				callback(pagesNum);
			});
		},
		getArticles : function (articleIndex, callback) {
			waitGood(function () {
				if (articleIndex < pagesNum) {
					var timer = 0;
					var waitArticle = function () {
						console.log('waitArticle');
						if (articles[articleIndex] == null && timer < 120) {
							setTimeout(function () {
								++timer;
								waitArticle();
							}, 1000)
						} else {
							callback(articles[articleIndex]);
						}
					};

					waitArticle();
				}
			});
		}
	};
}

