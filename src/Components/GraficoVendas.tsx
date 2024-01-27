import { IVenda } from "../Context/DataContext";
import { LineChart,XAxis, Tooltip, Line, YAxis, ResponsiveContainer, Legend } from "recharts";


interface VendaDia {
  data: string, 
  pago: number,
  processando: number,
  falha: number
}

function transformData(data: IVenda[]): VendaDia[]{
  const dias = data.reduce((acc: {[key: string]: VendaDia}, item) =>{
    const dia = item.data.split(' ')[0];
    if(!acc[dia]) { 
      acc[dia] = {
        data: dia,
        pago: 0,
        falha: 0,
        processando: 0
      }
    }
    acc[dia][item.status] += item.preco;
    return acc
  }, {});
  return Object.values(dias).map(dia => ({...dia, data: dia.data.substring(5)}))
}

function GraficoVendas({data}: {data:IVenda[] }) {
  const transformedData = transformData(data)
  return ( 
    <ResponsiveContainer width={"99%"} height={400}>
      <LineChart data={transformedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="data" />
        <YAxis/>
        <Tooltip />
        <Legend/>
        {/* <CartesianGrid stroke="#f5f5f5" /> */}
        <Line type="monotone" dataKey="pago" stroke="#387908" strokeWidth={3} />
        <Line type="monotone" dataKey="processando" stroke="#ff7300" strokeWidth={3}  />
        <Line type="monotone" dataKey="falha" stroke="#901" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
    // <div>Graficos</div> 
  );
}

export default GraficoVendas;