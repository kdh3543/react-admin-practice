import { Container, Button, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import member from "../apis/member";
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

const {getCreateWalletUsers} = member()
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
        text: '일별 신규 지갑 연동 유저 수',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '유저 수'
        }
      },
      x: {
        title: {
          display: true,
          text: '날짜'
        }
      }
    },
  };
  
  // graph data
  const data = {
    labels: graphData.map((list:any)=>list.date),
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

  // get daily user
  const getDailyCreateUsers = async () => {
    await getCreateWalletUsers().then((res:any) => {
      console.log(res)
      setGraphData(res.data.data)
    })
  }

  const backToUsers = () => {
    router.push({
      pathname: '/Users'
    })
  }
  useEffect(() => {
    getDailyCreateUsers()
  }, [])
  
  return (
    <>
      <Container mb={'50px'} maxW={'1400px'} mt={'50px'}>
        User Graph
        <Line options={options} data={data} />
        <Box textAlign={'center'} mt={'20px'} mb={'20px'} >
          <Button onClick={backToUsers}>Back</Button>
        </Box>
      </Container>
    </>
  )
}