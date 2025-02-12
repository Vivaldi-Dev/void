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
            <div className="mb-4 flex gap-4 px-14 mt-10">
                <input type="text" placeholder="Buscar por setor" className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" />
                <input type="text" placeholder="Buscar por área" className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" />
                <select className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Selecione o técnico</option>
                    {data?.technicians?.map((tech) => (
                        <option key={tech.technician_id} value={tech.technician_name}>{tech.technician_name}</option>
                    ))}
                </select>
                <select className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Selecione a semana</option>
                    {[...Array(data?.weeksCount).keys()].map(i => (
                        <option key={i} value={`Semana ${i + 1}`}>{`Semana ${i + 1}`}</option>
                    ))}
                </select>
            </div>

            <div className="px-10 mt-10">
                {/* Contêiner com overflow */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-white bg-gray-800 rounded-2xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-start">SECTOR</th>
                                <th className="px-4 py-2 border-b text-start">ÁREA</th>
                                <th className="px-4 py-2 border-b text-start">TÉCNICO</th>
                                {[...Array(data?.weeksCount).keys()].map(i => (
                                    <th key={i} className="px-4 py-2 border-b text-center">{`SEMANA ${i + 1}`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.technicians?.map(tech => (
                                <tr key={tech.technician_id}>
                                    <td className="px-4 py-2 border-b">{tech.sector}</td>
                                    <td className="px-4 py-2 border-b">{tech.area_name}</td>
                                    <td className="px-4 py-2 border-b">{tech.technician_name}</td>
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


            <div class="overflow-x-auto px-10 mt-10">
                <table class="min-w-full text-white bg-gray-900">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="px-4 py-2 border-b border-gray-700">SECTOR</th>
                            <th class="px-4 py-2 border-b border-gray-700">ÁREA</th>
                            <th class="px-4 py-2 border-b border-gray-700">TÉCNICO</th>
                            <th class="px-4 py-2 border-b border-gray-700">Produtores</th>
                           
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
            </div>



        </div>
    );
}

export default Dashboard;
