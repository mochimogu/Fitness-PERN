import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';




export default function Data() {

    ChartJS.register(ArcElement, Tooltip, Legend);

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
                data: [1,2,1,2,3,1,4,5,6,7],
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
            <div className="container">
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
