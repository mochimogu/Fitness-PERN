import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

export default function Data() {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [totalData, setTotalData] = useState([]);
    let consumption = [0,0,0,0,0,0,0,0,0,0,0];

    useEffect(() => {
        async function getFoodData() {
            const response = await fetch('/api/getFoodData');

            if(response.ok) {
                const results = await response.json();
                setTotalData(results);
            } else {
                console.log(response.status + " STATUS CODE");
            }
        }
        getFoodData();
    },[])

    function calculate() {
        console.log(totalData);
        for(let i = 0; i < totalData.length; i++) {
            const data = Object.values(totalData[i]);
            data.shift();
            // console.log("SHIFT DATA" , data);
            for(let j = 0; j < data.length; j++) {
                consumption[j] += data[j];
            }
        }
        return consumption;
    }
    
    const data = {
        labels: [
            "calories",
            "carbohydrates",
            "cholesterol",
            "fat saturated",
            "total fat",
            "fiber",
            "potassium",
            "protein",
            "sodium",
            "sugar"
            ],
        datasets : [
            {
                data: calculate(),
                backgroundColor: [ 
                    'lightgreen',
                    'steelblue',
                    'lightcyan',
                    'orange',
                    'beige',
                    'salmon',
                    'red',
                    'lightyellow',
                    'cyan',
                    'coral'
                  ],
                  borderColor: [
                    'lightgreen',
                    'steelblue',
                    'lightcyan',
                    'orange',
                    'beige',
                    'salmon',
                    'red',
                    'lightyellow',
                    'cyan',
                    'coral'
                  ],
                  borderWidth: 1,
            }
        ]
    }

    return (
        <div>
            <div className="container mb-5">
                <h1 className='pb-3 fs-3 text-center'>Overall Consumption</h1>
                <div className='w-50 h-50 m-auto'>
                    <Doughnut 
                    data={data}
                    className='p-1'
                    />
                </div>
            </div>
        </div>
    )

}
