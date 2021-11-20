import { Botao } from '../../../components/botoes/styled'
import { PrincipalPart } from './styled'
import { Link } from 'react-router-dom'
import ADMiniBox from './mini-boxes'
import { Pie } from 'react-chartjs-2'
import { useEffect, useState } from 'react';
import Api from '../../../service/apiAdmGeneral';
import Cookies from 'js-cookie'
const api = new Api();

export default function ADMPrincipal () {

    const[report, setReport] = useState([]);

    async function listar(type) {
        let e = await api.allReports(type);
        setReport(e);
    }


    useEffect(() => {
      listar('semanal');
    }, [])

    const pieGraphic = () => {
      const data = {
        labels: report.map(item => item.categoria), 
        datasets: [
          {
            data: report.map(item => item.qtd),
            backgroundColor: [
              'rgba(21, 49, 49, 1)',
              'rgba(36, 174, 174, 1)',
              'rgba(41, 109, 109, 1)'
            ],
            borderColor: [
              'rgba(41, 109, 109, 1)'

            ],
            borderWidth: 1,
            hoverOffset: 4,
            
          },
        ],
      };
      const options = {
        layout: {
          padding: 10
      },
        plugins: {
          legend: {
            labels: {
              color: "black", 
              font:{
                size: 15
              }
            }
          },
          
        },
      }
      return  <Pie data={data} options={options} />
    }

    return (
        <PrincipalPart>
        <div class="first-band">
            <div class="transparent-band">
                <div class="title"> Relatório Semanal </div>
                <div class="graphics">
                   <div> {pieGraphic()}</div>
                </div>

                <div class="buttons">
                    <Botao class="but-bit"> <Link to="/relatorios" className="Elink"> Ver mais relatórios </Link> </Botao>
                    <Link> <Botao> Voltar </Botao> </Link>
                </div>
            </div>
        </div>
        <div class="second-band">
            <div class="title"> Gerenciamento Geral </div>
            <div class="events-users-tickets">
                <Link to="/crud" className="Wlink"> <ADMiniBox image="/assets/images/events.svg" title="Eventos" /> </Link>
                <Link to ="usuario" className="Wlink"> <ADMiniBox image="/assets/images/tickets.svg" title="Usuários" /> </Link>
                <Link to="/compra" className="Wlink"> <ADMiniBox image="/assets/images/users.svg" title= "Ingressos" /> </Link>
            </div>
        </div>
    </PrincipalPart>
    )
}