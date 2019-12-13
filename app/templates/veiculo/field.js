function createField(fieldName, ) {
    
    $('#lista_veiculos tbody').append(
        $('<span>').append(
            $('<label', { text: veiculo['descricao'] }),
            $('<input>', { text: veiculo['placa'] }),
            $('<td>', { text: veiculo['marca'] })
        )
    )
    

    "<span class='block-half'>" +
        "<label for='descricao'>Descrição</label>" + 
        "<input type='text' id=fieldName required maxlength="60" placeholder="Descrição do veículo" name="descricao">
    "</span>"
}