import { Container, Button, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import eventApis from "../apis/event";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const {getEventUsers} = eventApis()
export default function UserGraph() {
  const [graphData, setGraphData] = useState([])

  const router = useRouter()

  // graph option
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: '아이디, 조건 별 이벤트 참여자 수',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        ticks: {
          callback: function (index:any) {
            return `${graphData[index].condition}/${graphData[index].eventId}`;
          }
        }
      }
    },
  };
  
  // graph data
  const data = {
    labels: graphData.map((list:any)=>list.eventId),
    datasets: [
      {
        label: 'count',
        data: graphData.map((list:any)=>list.cnt),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      }
    ]
  }

  const getUsersByEventCondition = async () => {
    await getEventUsers().then((res: any) => {
      console.log(res)
      setGraphData(res.data.data)
    })
  }

  const backToEvents = () => {
    router.push({
      pathname: '/Event'
    })
  }
  useEffect(() => {
    getUsersByEventCondition()
  }, [])
  
  return (
    <>
      <Container mb={'50px'} maxW={'1400px'} mt={'50px'}>
        <Line options={options} data={data} />
        <Box textAlign={'center'} mt={'20px'} mb={'20px'} >
          <Button onClick={backToEvents}>Back</Button>
        </Box>
      </Container>
    </>
  )
}