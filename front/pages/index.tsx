import { timeStamp } from "console";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle } from 'recharts';

const inter = Inter({ subsets: ["latin"] });

interface AverageValues {
  equipmentId : string,
  average_value : number,
}

interface Averages { 
  equipmentId : string,
  average_value1m :number,
  average_value1w : number,
  average_value48h: number,
  average_value24h: number,
}

export default function Home() {
  
  const [averageValues24h, setAverageValues24h] = useState<[AverageValues]>()
  const [averageValues48h, setAverageValues48h] = useState<[AverageValues]>()
  const [averageValues1w, setAverageValues1w]= useState<[AverageValues]>()
  const [averageValues1m, setAverageValues1m] = useState<[AverageValues]>()
  const [averageValues, setAverageValues] = useState<Averages[]>()
  

  function findAverage() {

    let averageValues : Array<Averages> = [];

    averageValues1m?.map(equipment => {
      let averages : Averages = {
        equipmentId : equipment.equipmentId,
        average_value1m : averageValues1m?.find(item => item.equipmentId === equipment.equipmentId)?.average_value || 0,
        average_value1w : averageValues1w?.find(item => item.equipmentId === equipment.equipmentId)?.average_value || 0,
        average_value48h : averageValues48h?.find(item => item.equipmentId === equipment.equipmentId)?.average_value || 0,
        average_value24h : averageValues24h?.find(item => item.equipmentId === equipment.equipmentId)?.average_value || 0,
      };

      averageValues.push(averages);
    })

    setAverageValues(averageValues)

    return averageValues;
  }

  useEffect(() => {
    
    const getData = async (days: number) =>{
      const query = await fetch(`http://localhost:3333/event/${days}`, {
        method:"GET",
        mode:'cors',
        credentials: "same-origin",

      })
      const res = await query.json();
      let events = res.event;
      return events;
    }

    const setValeus = async () => {
      const avg24h = await getData(1);
      const avg48h = await getData(2);
      const avg1w = await getData(7);
      const avg1m = await getData(30);
    
      setAverageValues24h(avg24h);
      setAverageValues48h(avg48h);
      setAverageValues1w(avg1w);
      setAverageValues1m(avg1m);
      
    }
    
    setValeus();
    findAverage();

  }, [])

  useEffect(() => {
    findAverage();
  }, [averageValues])
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex justify-center">
          <table className="table-fixed border-separate border-spacing-3 border-red-800 bg-inherit text-black rounded-2xl mb-10" >
              <thead>
              <tr>
                  <th className="w-32">Id do Equipamento</th>
                  <th className="w-32">Valor Medio no Mes</th>
                  <th className="w-32">Valor Medio na Semana</th>
                  <th className="w-32">Valor Medio nas ultimas 48 horas</th>
                  <th className="w-32">Valor Medio nas ultimas 24 horas</th>
              </tr>
              </thead>
              <tbody className="text-center">
                  {
                    averageValues?.map((equipment) => (
                      <tr>
                          <td>{equipment?.equipmentId}</td>
                          <td>{equipment?.average_value1m}</td>
                          <td>{equipment?.average_value1w}</td>
                          <td>{equipment?.average_value48h}</td>
                          <td>{equipment?.average_value24h}</td>
                      </tr>
                  ))
                  }     
              </tbody>
          </table>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="self-center">Grafico do Ultimo Mes</h1>
        <div className="w-3/4 h-[600px] rounded-2xl mb-10">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
              width={500}
              height={300}
              data={averageValues1m}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 90,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="equipmentId" angle={-90} textAnchor="end" />
              <YAxis />
              <Tooltip />
              
              <Bar name={"Valor Medio"} dataKey="average_value" fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
              
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h1 className="self-center">Grafico da Ultima Semana</h1>
        <div className="w-3/4 h-[600px] rounded-2xl mb-10">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
              width={500}
              height={300}
              data={averageValues1w}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 90,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="equipmentId" angle={-90} textAnchor="end" />
              <YAxis />
              <Tooltip />
              
              <Bar name={"Valor Medio"} dataKey="average_value" fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
              
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h1 className="self-center">Grafico da Utimas 48 Horas</h1>
        <div className="w-3/4 h-[600px] rounded-2xl mb-10">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
              width={500}
              height={300}
              data={averageValues48h}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 90,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="equipmentId" angle={-90} textAnchor="end" />
              <YAxis />
              <Tooltip />
              
              <Bar name={"Valor Medio"} dataKey="average_value" fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
              
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h1 className="self-center">Grafico da Utimas 24 Horas</h1>
        <div className="w-3/4 h-[600px] rounded-2xl mb-10">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
              width={500}
              height={300}
              data={averageValues24h}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 90,
              }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="equipmentId" angle={-90} textAnchor="end" />
              <YAxis />
              <Tooltip />
              
              <Bar name={"Valor Medio"} dataKey="average_value" fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
              
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
              

    
    

    </main>
  );
}
function findAverage() {
  throw new Error("Function not implemented.");
}

