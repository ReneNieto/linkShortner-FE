import { useState, useEffect } from 'react'
import ky from "ky"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function Graph() {
    const [isGraphData, setIsGraphData] = useState([]);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    useEffect(() => {
        (async function fetchData() {
            const accessToken = localStorage.getItem('access_token')
            const resp = await ky.get(`${process.env.REACT_APP_API_URL}/views`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }).json()

            setIsGraphData(resp)

        })();

    }, [])



    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
        scales: {
            x: {
                grid: {
                    color: 'white',
                    borderColor: 'grey',
                    tickColor: 'grey'
                }
            }
        },
        maintainAspectRatio: false,
    };



    const data = {
        labels,
        datasets: [
            {
                label: 'Views',
                data: isGraphData,
                parsing: {
                    xAxisKey: 'month',
                    yAxisKey: 'views',
                },
                backgroundColor: '#575bdf',
            },

        ],
    };

    return (
        <div className="h-[400px] lg:h-[46%]  w-[calc(100%-32px)] flex flex-col items-center shadow">
            <div className="h-14 w-full bg-[#f6f6f9] flex items-center rounded-t-lg">
                <p className='px-4'>This Year</p>
            </div>
            <div className="h-[calc(100%-56px)] w-full bg-white p-4 rounded-b-lg">
                <Bar options={options} data={data} width={100} height={50} />
            </div>
        </div>

    )
}