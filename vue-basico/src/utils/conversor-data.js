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

export default {
    aplicarMascaraEmDataIso,
    aplicarMascaraEmDataHoraIso
}