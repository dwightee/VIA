var globalYoda = "";
var apiYodaKey = "dnTrF9bx9bmshLPKQivCH0GVGxsNp1J4AnDjsngTHKvXksyivk";
var audio ;
var quotesBackUp;
var quotesAmount;

function bindRunThis(){
	var scope = this;
	$('#dataCollect').find('button').on('click', function(){
		var val = $('#dataCollect').find('input').val();
		showProgressCursor();
		scope.getYodaOutput(val);
	});
}

function getYodaOutput(textVal){
	var scope = this;
	var httpAddress = "https://yoda.p.mashape.com/yoda"
	textVal = "I want to learn how to speak like yoda";
	var getAddress = httpAddress + "sentence=" + textVal;
	var answer ="";
	$.ajax({
		url: 'https://yoda.p.mashape.com/yoda',
		type: 'GET',
		data: {sentence: textVal},
		beforeSend: function (xhr) {
			xhr.setRequestHeader('X-Mashape-Key', scope.apiYodaKey);
			xhr.setRequestHeader('Accept', "text/plain");
		},
		success: function(data){
			hideProgressCursor();
			yodaAnswerSuccess(data);
		},
		error: function(err){
			hideProgressCursor();
			$('#first').addClass('error');
			var text = 'Yoda trying to reach are you. Patient you must my Padawan be. Dark side 503 I feel around.';
			$('.firstContent').text(text);
		}
	});
}

function yodaAnswerSuccess(data){
	$('.disp').css('display', 'block');
	$("#second").css('display', 'block');
	$('.insertQuoete').css('display','block');
	$('.firstContent').text(data);
	$('#first').removeClass('error');
	this.textToSpeech(data);
	var scope = this;
	$('.fa-plus-square').on('click', function(){
		var quote = $('.firstContent').text();
		scope.getQuotes();
		var publicID = scope.quotesAmount;
		console.log(publicID);
		scope.postQuote({"idPublic":publicID , "text": quote, "likes": 1});
	})
}

function textToSpeech(textVal){
	var txtKey = "ff9cd4ee451f4cdf9090841c47bfea24";
	var apiUri = 'http://api.voicerss.org/?&key=ff9cd4ee451f4cdf9090841c47bfea24&lang=en&c=mp3&f=ulaw_44khz_stereo&hl=en-us&r=0&src=';
	apiUri += textVal.replace(/ /g,"+");
	var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
		{
			m4a: apiUri,
		}, {
			cssSelectorAncestor: "#cp_container_1"
	});
}

function showProgressCursor(){
   $("#progressMessageLbl").html("Loading....");
   $("#progressMessage").show();
}

function hideProgressCursor(){
   $("#progressMessage").hide();
}

function pagesSwitch(){
	var navbar = $('.masthead-nav');
	var allLi = navbar.find('li');

	allLi.on('click', function(){
		allLi.removeClass('active');
		$(this).addClass('active');
		var tab = $(this).find('a').text();
		$('.core').find("[name='tabContent']").css('display', 'none');
		if(tab == 'Home'){
			$('#content').css('display', 'block');
		}else if(tab == 'Api Documentation'){
			$('#apiDocumentation').css('display', 'block');
		}else if(tab == 'Database'){
			$('#database').css('display', 'block');
		}
	});
}

function bindDoOrDoNot(){
	var yodaPlayer = new CirclePlayer("#jquery_jplayer_Yoda",
	{
		m4a: '../do-or-do-not-there-is-no-try.mp3',
	},{
			cssSelectorAncestor: "#cp_container_Yoda"
	});

	$('#doOrDoNot').on('click', function(){
		yodaPlayer.play();
	})
}

function initDatabaseQuotesDisplay(){
	initDatabaseFunctionality();
	getQuotes();
}

function initDatabaseFunctionality(){
	$('.fa-refresh').on('click', function(){
		refreshTable();
	});
}

function displayTheQuotes(data){
	var appendPosition = $('#tableWrap').find('tbody');
	this.quotesBackUp = data;
	for(var i=0; i < data.length; i++){
		var quote = data[i];
		var line = "<tr><th class=\"pubId\">"+quote.idPublic+"</th><th>"+quote.likes+"</th><th><i class=\"fa fa-thumbs-o-up\" data-id="+quote.id+"></i></th><th>"+quote.text+"</th><th class=\"uniqID\" style=\"display: none\">"+quote.id+"</th>";
		appendPosition.append(line);
	}
	var likeSelector = $('.fa-thumbs-o-up');
	likeSelector.off();
	likeSelector.on('click', function(){
		var pubId = $(this).parent().parent().find('.pubId').text();
		var id = $(this).attr('data-id');
		setLikeForQuote(id, pubId);
	});
}

function refreshTable(){
	$('#tableWrap').find('tbody').empty();
	getQuotes();
}

function setLikeForQuote(quoteID, pubId){
	var quote;
	for(i=0;i<this.quotesBackUp.length;i++){
		if(this.quotesBackUp[i].idPublic == pubId){
			quote = this.quotesBackUp[i];
			break;
		}
	}
	if(quote.idPublic != pubId){
		console.log("ERROR: pubID differs in back Up database")
	}
	quote.likes +=1;
	editQuote(quote);
	refreshTable();
};

function postQuote(quote){
	return $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic Y2NjYzU3OTktNTlmNy00YmQ3LWE2NjYtMjRkYmU0N2I1MzM5OjBmN2I1Njc1LWI4ZjQtNDdiOC05NWY0LWNmNjU4MmEyZDMzYQ==");
      },
      success: function(data){
   			console.log("success post quote");
		},
		error: function(err){
			console.log("error post quote");
		},
      url: 'https://starwarsquoter.apispark.net/v1/quotes/',
      method: "POST",
      type: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(quote),
      dataType: "json",
  });
}

function editQuote(quote){
	return $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic Y2NjYzU3OTktNTlmNy00YmQ3LWE2NjYtMjRkYmU0N2I1MzM5OjBmN2I1Njc1LWI4ZjQtNDdiOC05NWY0LWNmNjU4MmEyZDMzYQ==");
      },
      success: function(data){
   			console.log("success put quote");
		},
		error: function(err){
			console.log("error put quote");
		},
      url: 'https://starwarsquoter.apispark.net/v1/quotes/'+quote.id,
      method: "PUT",
      type: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(quote),
      dataType: "json",
  });
}

function getQuotes(){
	return $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic Y2NjYzU3OTktNTlmNy00YmQ3LWE2NjYtMjRkYmU0N2I1MzM5OjBmN2I1Njc1LWI4ZjQtNDdiOC05NWY0LWNmNjU4MmEyZDMzYQ==");
      },
      success: function(data){
      		quotesAmount = data.length;
   			console.log("success get quote");
   			data.sort(function(a, b) {
    			return b.likes - a.likes;
			});
   			displayTheQuotes(data);
		},
		error: function(err){
			console.log("error get quote");
		},
      url: 'https://starwarsquoter.apispark.net/v1/quotes/',
      method: "GET",
      type: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
  });
}