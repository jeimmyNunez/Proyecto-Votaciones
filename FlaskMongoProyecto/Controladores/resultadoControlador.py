from Modelos.Mesa import Mesa
from Modelos.Resultado import Resultado
from Modelos.Candidatos import Candidatos

from Repositorios.MesaRepositorio import MesaRepositorio
from Repositorios.ResultadoRepositorio import ResultadoRepositorio
from Repositorios.CandidatosRepositorio import CandidatosRepositorio

class ResultadoControlador():
    def __init__(self):
        self.repositorioResultado = ResultadoRepositorio()
        self.repositorioCandidato = CandidatosRepositorio()
        self.repositorioMesa = MesaRepositorio()

    def index(self):
        return self.repositorioResultado.findAll()

    def create(self, infoResultado, id_mesa, id_candidato):
        nuevoResultado = Resultado(infoResultado)
        laMesa = Mesa(self.repositorioMesa.findById(id_mesa))
        elCandidato = Candidatos(self.repositorioCandidato.findById(id_candidato))
        nuevoResultado.mesa = laMesa
        nuevoResultado.candidato = elCandidato
        return self.repositorioResultado.save(nuevoResultado)

    def show(self, id):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        return elResultado.__dict__
        
    def update(self, id, infoResultado, id_mesa, id_candidato):
        nuevoResultado = Resultado(infoResultado)
        laMesa = Mesa(self.repositorioMesa.findById(id_mesa))
        elCandidato = Candidatos(self.repositorioCandidato.findById(id_candidato))
        nuevoResultado.mesa = laMesa
        nuevoResultado.candidato = elCandidato
        return self.repositorioResultado.save(nuevoResultado)


    def delete(self, id):
        return self.repositorioResultado.delete(id)

    def getListarCandidatosMesa(self, id_mesa):
        return self.repositorioResultado.getListadoCandidatosInscritosMesa(id_mesa)

    def getListarMesasDeInscritoCandidato(self, id_candidato):
        return self.repositorioResultado.getListadoMesasCandidatoInscrito(id_candidato)
         
    def getMayorCedula(self):
        return self.repositorioResultado.getNumeroCedulaMayorCandidato()