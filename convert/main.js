$('.convert_now').click(function(event) {
	$.get('https://forex.1forge.com/1.0.1/quotes?pairs=EURUSD,GBPJPY,AUDUSD', function(data){
			$('.price_aud').text(data[0].price)
			$('.price_gbp').text(data[1].price)
			$('.price_jpy').text(data[2].price)
			$('.time_aud').text(data[0].timestamp)
			$('.Time_gbp').text(data[1].timestamp)
			$('.Time_jpy').text(data[2].timestamp)
			$('.Symbol_aud').text(data[0].symbol)
			$('.Symbol_gbp').text(data[1].symbol)
			$('.symbol_jpy').text(data[2].symbol)
		
	})
	
});



function get_gate(url){
	return new Promise(function(resolve){
		$.get(url, function(data){
			//console.log(data)
			resolve(data)
		})
		
	})
}



setInterval(function(){
	get_gate('https://forex.1forge.com/1.0.1/quotes?pairs=EURUSD,GBPJPY,AUDUSD')
		.then(function (data) {

			$('.price_aud').text(data[0].price)
			$('.price_gbp').text(data[1].price)
			$('.price_jpy').text(data[2].price)
			$('.time_aud').text(data[0].timestamp)
			$('.Time_gbp').text(data[1].timestamp)
			$('.Time_jpy').text(data[2].timestamp)
			$('.Symbol_aud').text(data[0].symbol)
			$('.Symbol_gbp').text(data[1].symbol)
			$('.symbol_jpy').text(data[2].symbol)
			
			})
			
		}, 10000);

$('.convert_button').click(function(e){
	e.preventDefault()

	var convert_from = ($(e.target).parents('div').find('.select_convert').val())
	var convert_to = ($(e.target).parents('div').find('.select_convert_to').val())
	var quantity_convert = ($(e.target).parents('div').find('input[type=number]').val())


	get_gate('https://forex.1forge.com/1.0.1/convert?from='+convert_from+'&to='+convert_to+'&quantity='+quantity_convert).then(data=>
	$('.convert_result').val(data.value))
	$('.error_result_currency').html('')
	$('.error_same_currency').html('')
	if (convert_from===convert_to){
		
		$('<h2>',{
			text: 'you cant convert to the same currency',
			class: 'error_same_currency'
		}).appendTo('.container')
	}

	if ($.isNumeric($('.convert_result').val())) {

		$('<h2>',{
			text: 'your value in quantity is invalid',
			class: 'error_result_currency'
		}).appendTo('.container')
	}
});