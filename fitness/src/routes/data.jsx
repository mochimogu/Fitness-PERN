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
                // console.log(results.data)
                const userIndex = results.data.findIndex(
                    (item) => item.users === 'JohnDoe'
                );
                if(userIndex === -1) {
                    console.log('error - unable to find');
                }
                const dateIndex = results.data[userIndex].dates.findIndex((item) => item.date === '12/12/2002');
                if(dateIndex === -1) {
                    console.log('error - unable to find');
                }

                console.log(results.data[userIndex].dates[dateIndex].food);
                setTotalData(results.data[userIndex].dates[dateIndex].food);
            } else {
                console.log(response.status + " STATUS CODE");
            }
        }
        getFoodData();
    },[])

    function calculate() {
        // console.log(totalData);
        for(let i = 0; i < totalData.length; i++) {
            const data = Object.values(totalData[i]);
            // console.log(data);
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
            "fiber",
            "sugar",
            "calories",
            "protein",
            "sodium",
            "total fat",
            "potassium",
            "cholesterol",
            "fat saturated",
            "carbohydrates",
            ],
        datasets : [
            {
                data: calculate(),
                backgroundColor: [ 
                    'lightgreen',
                    'steelblue',
                    'pink',
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
                    'pink',
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
