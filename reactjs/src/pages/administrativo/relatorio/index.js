import { Relator } from "./styled"
import { Botao } from "../../../components/botoes/styled"
import { useEffect, useState } from "react";
import PieGraphic from './graphicType';
import Api from "../../../service/apiAdmGeneral";
const api = new Api();


export default function ADMRelatorios () {
    const[report, setReport] = useState([]);
    
    const listReports = async(type) => {
        let e = await api.allReports(type);
        let r = report;
        r.push( { tipo: type, data: e } );
        setReport(r);
        console.log(report)
    }
    

    useEffect(() => {
        listReports('diário')
        listReports('semanal')
        listReports('mensal')
        listReports('semestral')
    }, [] );


    return (
        <Relator>
        <div class="title"> Relatórios </div>
        <div class="graphics-rel">
            <div class="column">
                {report.map(item => {
                    return <div class="the-box">
                        <div> 
                            <div class="the-title"> Relatório {item.tipo} </div>
                        </div>
                        <div class="the-graphic">
                            <div> <PieGraphic info={item.data}> </PieGraphic> </div>
                        </div>

                    </div>
                })}
            </div>
                
        </div>

    </Relator>
    )
}