import moment from "moment/moment";

function aplicarMascaraEmDataIso(data) {
    if(data){
        return moment(data).locale('pt-br').format('DD/MM/YYYY');
    }
    return undefined;
}

function aplicarMascaraEmDataHoraIso(data) {
    if(data){
        return moment(data).locale('pt-br').format('DD/MM/YYYY hh:mm:ss');
    }
    return undefined;
}

function aplicarMascaraFormatoAmericanoEmDataISO(data) {
    if(data){
        return moment(data).locale('pt-br').format('YYYY-MM-DD');
    }
    return undefined;
}

function aplicarMascaraISOEmFormatoAmericano(data) {
    if(data){
        let dataAmericana = moment(data).locale('pt-br').format('YYYY-MM-DD');
        return dataAmericana + 'T00:00:00'
    }
    return undefined;
}

export default {
    aplicarMascaraEmDataIso,
    aplicarMascaraEmDataHoraIso,
    aplicarMascaraFormatoAmericanoEmDataISO,
    aplicarMascaraISOEmFormatoAmericano
}