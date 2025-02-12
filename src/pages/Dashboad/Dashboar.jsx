import React, { useContext } from 'react';
import { AuthContext } from '../../context/ContextUSer';
import { useDashboard } from '../../hooks/useDashboard';

function Dashboard() {
    const { token } = useContext(AuthContext);
    const { data: body, loading, error } = useDashboard(token);

    console.log("Token no Dashboard:", token);
    console.log("Dados recebidos no componente:");
    const data = body?.data;

    if (loading) {
        console.log("Carregando dados...");
        return <div>Carregando...</div>;
    }

    if (error) {
        console.error("Erro ao carregar os dados no componente:", error);
        return <div>{error}</div>;
    }

    return (
        <div className=''>
            <div className="mb-4 flex gap-4 px-20 mt-10">
                <input type="text" placeholder="Buscar por setor" className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" />

                <select className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Registro</option>
                    {data?.technicians?.map((tech) => (
                        <option key={tech.technician_id} value={tech.area_name}>{tech.area_name}</option>
                    ))}
                </select>

                <select className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Selecione a Area</option>
                    {data?.technicians?.map((tech) => (
                        <option key={tech.technician_id} value={tech.area_name}>{tech.area_name}</option>
                    ))}
                </select>




                <select className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Selecione a Sector</option>
                    {data?.technicians?.map((tech) => (

                        <option key={tech.technician_id} value={tech.sector}>{tech.sector}</option>
                    ))}
                </select>


            </div>

            <div className="mt-10 px-14">
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full text-white bg-gray-800 rounded-2xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-start">SECTOR</th>
                                <th className="px-4 py-2 border-b text-start">ÁREA</th>
                                <th className="px-4 py-2 border-b text-start">TÉCNICO</th>
                                {[...Array(data?.weeksCount).keys()].map(i => (
                                    <th key={i} className="px-20 py-2 border-b text-center">{`SEMANA ${i + 1}`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.technicians?.map(tech => (
                                <tr key={tech.technician_id}>
                                    <td className="px-4 py-2 border-b">{tech.sector}</td>
                                    <td className="px-4 py-2 border-b">{tech.area_name}</td>
                                    <td className="px-4 py-2 border-b whitespace-nowrap">{tech.technician_name}</td>
                                    {tech.weeks.map((week, index) => (
                                        <td key={index} className="px-4 py-2 border-b text-center">
                                            <div className="flex gap-10 justify-center">
                                                <p>{week.total_records}</p>
                                                <p className="border-r-2 bg-gray-900"></p>
                                                <p>{week.total_records}</p>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {/* <div class="overflow-x-auto px-10 mt-10">
                <table class="min-w-full text-white bg-gray-900">
                    <thead class="bg-gray-800">
                        <tr>
                            <th className="px-8 py-2 border-b text-start">SECTOR</th>
                            <th className="px-4 py-2 border-b text-start">ÁREA</th>
                            <th className="px-4 py-2 border-b text-start">TÉCNICO</th>
                            {[...Array(data?.weeksCount).keys()].map(i => (
                                <th key={i} className="px-16 py-2 border-b text-center">{`SEMANA ${i + 1}`}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-gray-700">
                            <td class="px-4 py-2 border-b border-gray-700">Lalaue</td>
                            <td class="px-4 py-2 border-b border-gray-700">lalaue</td>
                            <td class="px-4 py-2 border-b border-gray-700">Sonia Tecnico</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">2 | 2</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">2 | 2</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">0 | 0</td>
                        </tr>
                        <tr class="bg-gray-600">
                            <td class="px-4 py-2 border-b border-gray-700">Malema</td>
                            <td class="px-4 py-2 border-b border-gray-700">maputo</td>
                            <td class="px-4 py-2 border-b border-gray-700">Edson Tecnico</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">3 | 3</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">3 | 3</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">0 | 0</td>
                        </tr>
                        <tr class="bg-gray-800 font-bold">
                            <td class="px-4 py-2 border-b border-gray-700" colspan="3">Totais</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">5 | 5</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">5 | 5</td>
                            <td class="px-4 py-2 border-b border-gray-700 text-center">0 | 0</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}



        </div>
    );
}

export default Dashboard;
