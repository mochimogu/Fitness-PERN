import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";


export default function Data() {

    ChartJS.register(ArcElement, Tooltip, Legend);
    
    const info = useOutletContext();

    const [totalData, setTotalData] = useState([]);
    const [visible, setVisible] = useState(false);

    let consumption = [0,0,0,0,0,0,0,0,0,0,0];

    useEffect(() => {
        async function getFoodData() {
            const response = await fetch(process.env.REACT_APP_API_DOMAIN + '/api/getFoodData');
            if(response.ok) {
                const results = await response.json();
                // console.log(results.data)
                const userIndex = results.data.findIndex(
                    (item) => item.users === info.username
                );
                if(userIndex === -1) {
                    console.log('error - unable to find');
                    setVisible(false);
                }
                const dateIndex = results.data[userIndex].dates.findIndex((item) => item.date === info.date);
                if(dateIndex === -1) {
                    console.log('error - unable to find');
                    setVisible(false);
                }

                // console.log(results.data[userIndex].dates[dateIndex].food);
                if(dateIndex !== -1 && userIndex !== -1) {
                    setTotalData(results.data[userIndex].dates[dateIndex].food);
                    setVisible(true);
                }

            } else {
                console.log(response.status + " STATUS CODE");
                setVisible(false);
            }
        }
        getFoodData();
    },[info.date, info.username])

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
                <div className='w-100'>
                    {
                        visible ? 
                        <div className='d-flex justify-content-between w-100 h-50'>
                            <Doughnut
                                data={data}
                                className='p-1 w-50 h-50'
                            /> 
                            <div className='w-50 h-50'>
                                <ul className="list-group list-group-numbered">
                                    {
                                        totalData.map((datum) => (
                                            <li key={datum.name} className="list-group-item">{datum.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )

}
