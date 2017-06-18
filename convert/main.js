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
			//console.log(data)
			})
			
		}, 10000);

$('.convert_button').click(function(e){
	e.preventDefault()

	var convert_from = ($(e.target).parents('div').find('.select_convert').val())
	var quantity_convert = ($(e.target).parents('div').find('input[type=number]').val())
	console.log(quantity_convert)

	get_gate('https://forex.1forge.com/1.0.1/convert?from='+convert_from+'&to=USD&quantity='+quantity_convert).then(data=>
		$('.convert_result').val(data.value))

});