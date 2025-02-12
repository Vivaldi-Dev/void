import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/ContextUSer';
import { useDashboard } from '../../hooks/useDashboard';
import { useInsumos } from '../../hooks/useinsumos';
import { useAreas } from '../../hooks/useAreas';
import { useFarmInputs } from '../../hooks/useFarmInputs';
import Loader from '../../components/Loader'; 

function Dashboard() {
    const { token } = useContext(AuthContext);
    const { data: body, loading, error } = useDashboard(token);
    const { dados, carregando, erro } = useInsumos(token);
    const [selectedSector, setSelectedSector] = useState('');
    const { areas, loading: areasLoading, error: areasError } = useAreas(selectedSector, token);

    const phaseId = '23e9336a-b20a-4478-a58f-875cc065e871';
    const { farmData, isLoading, fetchError } = useFarmInputs(token, phaseId);

    const sectors = farmData?.sectors || [];
    const corpo = dados ? dados : [];


    if (loading || carregando || areasLoading || isLoading) {
        return <Loader />;
    }

    if (error || areasError || fetchError) {
        console.error("Erro ao carregar os dados no componente:", error || areasError || fetchError);
        return <div className="text-red-500 text-center mt-10">Erro ao carregar os dados: {error || areasError || fetchError}</div>;
    }

    return (
        <div className=''>
            <div className="mb-4 flex gap-4 px-20 mt-10">
                <input type="text" placeholder="Buscar por setor" className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" />

                <select className="px-24 text-start py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option className='text-start' value="">Registro</option>
                    {body?.data?.technicians?.map((tech) => (
                        <option key={tech.technician_id} value={tech.area_name}>{tech.area_name}</option>
                    ))}
                </select>

                <select className="px-14 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Selecione a Area</option>
                    {body?.data?.technicians?.map((tech) => (
                        <option key={tech.technician_id} value={tech.area_name}>{tech.area_name}</option>
                    ))}
                </select>

                <select className="px-14 py-2 bg-gray-800 text-white border border-gray-700 rounded">
                    <option value="">Selecione a Sector</option>
                    {body?.data?.technicians?.map((tech) => (
                        <option key={tech.technician_id} value={tech.sector}>{tech.sector}</option>
                    ))}
                </select>
            </div>

            <div className="mt-10 px-14">
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full text-white bg-gray-800 rounded-2xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-4 border-b text-start">SECTOR</th>
                                <th className="px-4 py-2 border-b text-start">ÁREA</th>
                                <th className="px-4 py-2 border-b text-start">TÉCNICO</th>
                                {[...Array(body?.data?.weeksCount).keys()].map(i => (
                                    <th key={i} className="px-20 py-2 border-b text-center whitespace-nowrap">{`SEMANA ${i + 1}`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {body?.data?.technicians?.map(tech => (
                                <tr key={tech.technician_id}>
                                    <td className="px-4 py-4 border-b">{tech.sector}</td>
                                    <td className="px-4 py-4 border-b">{tech.area_name}</td>
                                    <td className="px-4 py-4 border-b whitespace-nowrap">{tech.technician_name}</td>
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

            <div className='px-20 mt-10'>
                <div className="mb-4 flex gap-4 px-20 mt-10 justify-end">
                    <select
                        id="select1"
                        name="select1"
                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setSelectedSector(e.target.value)}
                    >
                        <option value="">Sector</option>
                        {corpo.length > 0 &&
                            corpo.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>

                    <select
                        id="select2"
                        name="select2"
                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Area</option>
                        {areas.map((area) => (
                            <option key={area.id} value={area.id}>
                                {area.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <div className="mt-10 px-14">
                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Técnico</th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produtores</th>
                                        <th colSpan="2" className="px-6 py-3 bg-gray-100 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Semente X</th>
                                        <th colSpan="2" className="px-6 py-3 bg-gray-100 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Semente Y</th>
                                    </tr>
                                    <tr>
                                        <th colSpan="4"></th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Distribuídos</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recebidos</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Distribuídos</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recebidos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sectors.map((sector, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-6 py-4 text-sm text-gray-900">{sector.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">-</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">-</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{sector.totalFarmers}</td>
                                            {sector.packages.map((pkg, pkgIndex) => (
                                                <React.Fragment key={pkgIndex}>
                                                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{pkg.sent}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{pkg.received}</td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr className="border-b border-gray-200 font-bold">
                                        <td className="px-6 py-4 text-sm text-gray-900">Totais</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">-</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">-</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {sectors.reduce((total, sector) => total + sector.totalFarmers, 0)}
                                        </td>
                                        {farmData?.inputsColumns.map((column, colIndex) => (
                                            <React.Fragment key={colIndex}>
                                                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                                                    {sectors.reduce((total, sector) => {
                                                        const pkg = sector.packages.find(p => p.name === column);
                                                        return total + (pkg ? parseFloat(pkg.sent) : 0);
                                                    }, 0)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                                                    {sectors.reduce((total, sector) => {
                                                        const pkg = sector.packages.find(p => p.name === column);
                                                        return total + (pkg ? parseFloat(pkg.received) : 0);
                                                    }, 0)}
                                                </td>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;